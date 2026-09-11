import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { interactiveEndings } from '../data/books'
import { useLibrary } from '../lib/store'
import { dominantTag, tagTraits, plural } from '../lib/format'
import SettingsDrawer from '../components/SettingsDrawer'
import {
  IconArrowLeft,
  IconArrowRight,
  IconSparkles,
  IconUndo,
  IconRestart,
  IconClock,
} from '../components/Icon'

export default function InteractiveReader({ book }) {
  const { saveScene, recordEnding, getBookState, settings } = useLibrary()
  const location = useLocation()
  const st = getBookState(book.id)
  const endings = useMemo(() => interactiveEndings(book), [book.id])

  const [sceneId, setSceneId] = useState(() => {
    if (new URLSearchParams(location.search).get('from') === 'start') return book.start
    return st?.sceneId && book.scenes[st.sceneId] ? st.sceneId : book.start
  })
  const [path, setPath] = useState(() => {
    if (new URLSearchParams(location.search).get('from') === 'start') return [book.start]
    return st?.path?.length ? st.path : [book.start]
  })
  const [choices, setChoices] = useState(() => (st?.choices ? st.choices : []))
  const [showSettings, setShowSettings] = useState(false)
  const recordedRef = useRef(null)

  const scene = book.scenes[sceneId]
  const isEnding = Boolean(scene.ending)
  const hasWatch = path.some((id) => book.scenes[id]?.item === 'watch')
  const endingsFound = st?.endingsFound?.length || 0
  const isTrueEnding = scene.ending?.trueEnding

  // Persist the path as it unfolds.
  useEffect(() => {
    saveScene(book.id, { sceneId, path, choices })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneId, path, choices])

  // Record endings (once per arrival).
  useEffect(() => {
    if (!isEnding) return
    const id = scene.ending.id
    const key = `${book.id}:${id}`
    if (recordedRef.current === key) return
    recordedRef.current = key
    const alreadyFound = st?.endingsFound?.includes(id)
    const total = endings.length
    const newCount = alreadyFound ? endingsFound : endingsFound + 1
    recordEnding(book.id, id, newCount / total)
    if (!alreadyFound) saveScene(book.id, { sceneId, path, choices, finished: true, frac: newCount / total })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneId])

  const sceneChoices = useMemo(() => {
    const list = [...(scene.choices || [])]
    const extra = hasWatch && book.watchChoiceAt?.[sceneId]
    if (extra && !list.some((c) => c.next === extra.next)) list.push(extra)
    return list
  }, [sceneId, hasWatch, book])

  const choose = (choice) => {
    setChoices((c) => [...c, { from: sceneId, text: choice.text, tag: choice.tag, to: choice.next }])
    setPath((p) => [...p, choice.next])
    setSceneId(choice.next)
  }

  const undo = () => {
    if (path.length < 2) return
    const newPath = path.slice(0, -1)
    setPath(newPath)
    setSceneId(newPath[newPath.length - 1])
    setChoices((c) => c.slice(0, -1))
  }

  const restart = () => {
    setSceneId(book.start)
    setPath([book.start])
    setChoices([])
  }

  // Escape closes the settings drawer
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setShowSettings(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const trait = dominantTag(choices.map((c) => c.tag))

  return (
    <div className="reader interactive" data-surface={settings.surface} data-font={settings.font} style={{ '--book-size': `${settings.size}px`, '--book-leading': settings.leading }}>
      {/* ── Chrome ────────────────────────────────────────────────────── */}
      <header className="reader-header">
        <Link to={`/book/${book.id}`} className="reader-back" aria-label={`Back to ${book.title}`}>
          <IconArrowLeft size={17} />
          <span className="reader-back-label">Library</span>
        </Link>
        <div className="reader-title">
          <span className="reader-book">{book.title}</span>
          <span className="reader-chapter">{scene.act}</span>
        </div>
        <div className="reader-actions">
          <span className="endings-pill" title="Endings discovered">
            <IconSparkles size={14} /> {endingsFound}/{endings.length}
          </span>
          <button
            className="reader-icon-btn reader-aa"
            onClick={() => setShowSettings((v) => !v)}
            aria-label="Reading settings"
          >
            Aa
          </button>
        </div>
      </header>

      {/* ── The scene ─────────────────────────────────────────────────── */}
      <div className="scene-stage">
        <div className="scene-col">
          <article className="scene" key={sceneId}>
            <header className="scene-head">
              <span className="scene-act">{scene.act}</span>
              <h2 className="scene-title">{scene.title}</h2>
            </header>

            <div className="scene-text">
              {scene.text.map((p, i) => (
                <p key={i} style={{ animationDelay: `${0.08 + i * 0.12}s` }}>{p}</p>
              ))}
            </div>

            {hasWatch && !isEnding && (
              <p className="item-chip" style={{ animationDelay: `${0.1 + scene.text.length * 0.12}s` }}>
                <IconClock size={14} /> You carry a stopped pocket watch. It is warm, and it ticks — occasionally — in a way you have decided not to examine.
              </p>
            )}

            {!isEnding && (
              <div className="scene-choices" role="group" aria-label="Choices">
                <span className="choices-label">What do you do?</span>
                {sceneChoices.map((c, i) => (
                  <button
                    key={c.next + i}
                    className="choice"
                    onClick={() => choose(c)}
                    style={{ animationDelay: `${0.25 + scene.text.length * 0.12 + i * 0.15}s` }}
                  >
                    <span>{c.text}</span>
                    <IconArrowRight size={16} />
                  </button>
                ))}
              </div>
            )}

            {isEnding && (
              <div className="ending-panel" style={{ animationDelay: `${0.2 + scene.text.length * 0.12}s` }}>
                <p className="ending-eyebrow">
                  {isTrueEnding ? '✦ The true ending' : 'An ending'}
                </p>
                <h3 className="ending-name">{scene.ending.name}</h3>
                <p className="ending-trait">{tagTraits[trait]}</p>
                <div className="ending-stats">
                  <span>{plural(path.length, 'scene', 'scenes')} walked</span>
                  <span>{plural(choices.length, 'choice', 'choices')} made</span>
                </div>
                <div className="ending-found" aria-label={`${endingsFound} of ${endings.length} endings found`}>
                  {endings.map((e) => (
                    <span
                      key={e.id}
                      className={`ending-dot ${st?.endingsFound?.includes(e.id) ? 'found' : ''} ${e.trueEnding ? 'true' : ''}`}
                      title={st?.endingsFound?.includes(e.id) ? e.name : 'Not yet discovered'}
                    >
                      {st?.endingsFound?.includes(e.id) ? e.name : '?'}
                    </span>
                  ))}
                </div>
                <div className="ending-actions">
                  <button className="btn btn-primary" onClick={restart}>
                    <IconRestart size={15} /> Explore another path
                  </button>
                  {choices.length > 0 && (
                    <button className="btn btn-ghost" onClick={undo}>
                      <IconUndo size={15} /> Undo last choice
                    </button>
                  )}
                  <Link className="btn btn-ghost" to="/">Back to the library</Link>
                </div>
              </div>
            )}
          </article>
        </div>
      </div>

      {/* ── Settings drawer ─────────────────────────────────────────── */}
      {showSettings && <SettingsDrawer onClose={() => setShowSettings(false)} />}

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer className="reader-footer">
        <div className="reader-footer-meta scene-footer">
          <span className="reader-footer-ch">
            {isEnding ? `Ending — ${scene.ending.name}` : `Scene ${path.length} of your path`}
          </span>
          <span className="scene-footer-actions">
            {choices.length > 0 && !isEnding && (
              <button className="btn btn-ghost btn-sm" onClick={undo}>
                <IconUndo size={14} /> Undo
              </button>
            )}
            <button className="btn btn-ghost btn-sm" onClick={restart}>
              <IconRestart size={14} /> Start over
            </button>
          </span>
        </div>
      </footer>
    </div>
  )
}
