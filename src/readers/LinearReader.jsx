import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { linearBlockList, bookWordCount } from '../data/books'
import { useLibrary } from '../lib/store'
import { paginateBlocks } from '../lib/paginate'
import { excerpt, readingMinutes, plural } from '../lib/format'
import SettingsDrawer from '../components/SettingsDrawer'
import {
  IconChevronLeft,
  IconChevronRight,
  IconArrowLeft,
  IconBookmark,
  IconList,
  IconX,
  IconTrash,
} from '../components/Icon'

export default function LinearReader({ book }) {
  const { settings, setSettings, getBookState, savePosition, markFinished, addBookmark, removeBookmark } = useLibrary()
  const location = useLocation()
  const st = getBookState(book.id)

  const blocks = useMemo(() => linearBlockList(book), [book.id])
  const words = useMemo(() => bookWordCount(book), [book.id])

  // anchor = global block index of the top of the current page (survives re-flow).
  // Supports ?from=start (restart) and ?at=<block> (deep-link from a bookmark).
  const initialAnchor = useMemo(() => {
    const params = new URLSearchParams(location.search)
    if (params.get('from') === 'start') return 0
    const at = parseInt(params.get('at'), 10)
    if (Number.isFinite(at) && at >= 0) return at
    return st?.anchor?.block ?? 0
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const anchorRef = useRef(initialAnchor)

  const [pages, setPages] = useState(null)
  const [pageIdx, setPageIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const [drawer, setDrawer] = useState(null) // 'settings' | 'toc' | null
  const [geom, setGeom] = useState(null)
  const [confirmedEnd, setConfirmedEnd] = useState(st?.finished || false)

  const stageRef = useRef(null)
  const measureRef = useRef(null)
  const touchRef = useRef(null)

  // Track the size of the reading area so pages can be re-laid-out on resize.
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth
      const h = el.clientHeight
      setGeom((prev) => (prev && prev.w === w && prev.h === h ? prev : { w, h }))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Paginate whenever the book, geometry, or type settings change.
  useLayoutEffect(() => {
    if (!geom || geom.w < 60 || geom.h < 120) return
    const host = measureRef.current
    if (!host) return
    const result = paginateBlocks(blocks, host)
    if (result.length) setPages(result)
  }, [book.id, geom, settings.size, settings.font, settings.leading])

  // After (re)pagination, land on the page containing the anchor block.
  useEffect(() => {
    if (!pages) return
    let idx = pages.findIndex((p) => p.last >= anchorRef.current)
    if (idx === -1) idx = pages.length - 1
    setPageIdx(idx)
  }, [pages])

  // Persist position.
  useEffect(() => {
    if (!pages || pageIdx >= pages.length) return
    const page = pages[pageIdx]
    anchorRef.current = page.first
    savePosition(book.id, {
      anchor: { block: page.first, chapter: page.chapter },
      frac: (pageIdx + 1) / pages.length,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIdx, pages])

  const atEnd = pages && pageIdx === pages.length

  // Mark the book finished when the reader reaches the end card.
  useEffect(() => {
    if (atEnd && !confirmedEnd) {
      setConfirmedEnd(true)
      markFinished(book.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [atEnd])

  const go = (delta) => {
    if (!pages) return
    setPageIdx((i) => {
      const next = Math.min(pages.length, Math.max(0, i + delta))
      if (next !== i) setDir(delta)
      return next
    })
  }

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'Escape') setDrawer(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [pages])

  const chapterStartPages = useMemo(() => {
    if (!pages) return []
    const starts = []
    pages.forEach((p, i) => {
      if (p.chapter !== pages[i - 1]?.chapter) starts[p.chapter] = i
    })
    return starts
  }, [pages])

  const page = pages && pageIdx < pages.length ? pages[pageIdx] : null
  const chapterTitle = page ? book.chapters[page.chapter].title : ''
  const minutesLeft = pages ? readingMinutes(Math.round((words * (pages.length - pageIdx)) / pages.length)) : 0

  const bookmarks = st?.bookmarks || []
  const currentBookmark = page ? bookmarks.find((b) => b.block >= page.first && b.block <= page.last) : undefined

  const toggleBookmark = () => {
    if (!page) return
    if (currentBookmark) {
      removeBookmark(book.id, currentBookmark.id)
      return
    }
    const firstPara = page.blocks.find((b) => b.type === 'p')
    addBookmark(book.id, {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      block: page.first,
      chapter: page.chapter,
      chapterTitle: book.chapters[page.chapter].title,
      label: firstPara ? excerpt(firstPara.text, 7) : book.chapters[page.chapter].title,
      at: Date.now(),
    })
  }

  const jumpToBlock = (block) => {
    if (!pages) return
    let idx = pages.findIndex((p) => p.last >= block)
    if (idx === -1) idx = pages.length - 1
    setDir(idx > pageIdx ? 1 : -1)
    setPageIdx(idx)
    setDrawer(null)
  }

  const onTouchStart = (e) => {
    touchRef.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchRef.current == null) return
    const dx = e.changedTouches[0].clientX - touchRef.current
    if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1)
    touchRef.current = null
  }

  const renderBlock = (b, i) => {
    if (b.type === 'h') return <h2 key={b.gi} className="chapter-title">{b.text}</h2>
    if (b.type === 'sep') return <div key={b.gi} className="sep" aria-hidden>❧</div>
    const cls = b.continued ? 'cont' : b.opener ? 'opener' : ''
    return (
      <p key={b.gi} className={`para ${cls}`.trim()}>
        {b.text}
      </p>
    )
  }

  return (
    <div
      className="reader"
      data-surface={settings.surface}
      data-font={settings.font}
      style={{ '--book-size': `${settings.size}px`, '--book-leading': settings.leading }}
    >
      {/* ── Chrome: header ──────────────────────────────────────────── */}
      <header className="reader-header">
        <Link to={`/book/${book.id}`} className="reader-back" aria-label={`Back to ${book.title}`}>
          <IconArrowLeft size={17} />
          <span className="reader-back-label">Library</span>
        </Link>
        <div className="reader-title">
          <span className="reader-book">{book.title}</span>
          {chapterTitle && <span className="reader-chapter">{chapterTitle}</span>}
        </div>
        <div className="reader-actions">
          <button
            className={`reader-icon-btn ${currentBookmark ? 'active' : ''}`}
            onClick={toggleBookmark}
            aria-pressed={Boolean(currentBookmark)}
            aria-label={currentBookmark ? 'Remove bookmark on this page' : 'Bookmark this page'}
            disabled={!page}
          >
            <IconBookmark size={17} filled={Boolean(currentBookmark)} />
          </button>
          <button className="reader-icon-btn" onClick={() => setDrawer(drawer === 'toc' ? null : 'toc')} aria-label="Contents and bookmarks">
            <IconList size={17} />
          </button>
          <button className="reader-icon-btn reader-aa" onClick={() => setDrawer(drawer === 'settings' ? null : 'settings')} aria-label="Reading settings">
            Aa
          </button>
        </div>
      </header>

      {/* ── Stage: the page ─────────────────────────────────────────── */}
      <div className="reader-stage" ref={stageRef} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="reader-col">
          {page ? (
            <div key={pageIdx} className={`reader-page turn-${dir}`} aria-live="polite">
              {page.blocks.map(renderBlock)}
            </div>
          ) : pages ? (
            <div className="reader-page endcard" key="end">
              <div className="endcard-inner">
                <div className="endcard-ornament" aria-hidden>❧</div>
                <p className="endcard-eyebrow">The end</p>
                <h2 className="endcard-title">{book.title}</h2>
                <p className="endcard-author">by {book.author}</p>
                <p className="endcard-stats">
                  {plural(pages.length, 'page', 'pages')} · {plural(words, 'word', 'words')} · ~{readingMinutes(words)} min
                  {bookmarks.length > 0 && <> · {plural(bookmarks.length, 'bookmark', 'bookmarks')}</>}
                </p>
                <div className="endcard-actions">
                  <Link className="btn btn-primary" to="/">Browse the library</Link>
                  <button className="btn btn-ghost" onClick={() => { setDir(-1); setPageIdx(0) }}>
                    Read it again
                  </button>
                </div>
                <p className="endcard-hint">Every path through this story is canon — even yours.</p>
              </div>
            </div>
          ) : (
            <div className="reader-page preparing" aria-hidden>
              <span />
              <span />
              <span />
            </div>
          )}

          {/* Hidden measuring twin — identical geometry & type, used by the paginator */}
          <div className="reader-page reader-measure" ref={measureRef} aria-hidden="true" />
        </div>

        <button className="pager-hit left" onClick={() => go(-1)} disabled={pageIdx === 0} aria-label="Previous page">
          <IconChevronLeft size={22} />
        </button>
        <button className="pager-hit right" onClick={() => go(1)} disabled={atEnd} aria-label="Next page">
          <IconChevronRight size={22} />
        </button>
      </div>

      {/* ── Chrome: footer ──────────────────────────────────────────── */}
      <footer className="reader-footer">
        <div className="reader-progress" aria-hidden>
          <div className="reader-progress-track">
            {chapterStartPages.map((pi, ci) =>
              pi != null && pi > 0 ? <span key={ci} className="reader-tick" style={{ left: `${(pi / pages.length) * 100}%` }} /> : null,
            )}
            <span className="reader-progress-fill" style={{ width: pages ? `${((pageIdx + (atEnd ? 0 : 1)) / pages.length) * 100}%` : 0 }} />
          </div>
        </div>
        <div className="reader-footer-meta">
          <span className="reader-footer-ch">{chapterTitle || 'The End'}</span>
          <span className="reader-footer-pages">
            {pages ? (atEnd ? pages.length : pageIdx + 1) : '…'} / {pages ? pages.length : '…'}
            {!atEnd && pages && pageIdx < pages.length - 1 && <> · ~{minutesLeft} min left</>}
          </span>
        </div>
      </footer>

      {/* ── Settings drawer ─────────────────────────────────────────── */}
      {drawer === 'settings' && <SettingsDrawer onClose={() => setDrawer(null)} />}

      {/* ── Contents drawer ─────────────────────────────────────────── */}
      {drawer === 'toc' && (
        <>
          <div className="drawer-scrim" onClick={() => setDrawer(null)} />
          <aside className="drawer drawer-right" role="dialog" aria-label="Contents">
            <div className="drawer-head">
              <h3>Contents</h3>
              <button className="reader-icon-btn" onClick={() => setDrawer(null)} aria-label="Close contents">
                <IconX size={17} />
              </button>
            </div>
            <ol className="toc-list">
              {book.chapters.map((ch, ci) => (
                <li key={ci}>
                  <button
                    className={`toc-link ${page?.chapter === ci ? 'current' : ''}`}
                    onClick={() => jumpToBlock(chapterStartPages[ci] != null ? pages[chapterStartPages[ci]].first : 0)}
                  >
                    <span className="toc-num">{String(ci + 1).padStart(2, '0')}</span>
                    {ch.title}
                  </button>
                </li>
              ))}
            </ol>

            <h3 className="drawer-sub">Bookmarks</h3>
            {bookmarks.length === 0 ? (
              <p className="drawer-hint">No bookmarks yet — tap the ribbon on any page to pin it here.</p>
            ) : (
              <ul className="bm-list">
                {bookmarks.map((bm) => (
                  <li key={bm.id}>
                    <button className="bm-link" onClick={() => jumpToBlock(bm.block)}>
                      <span className="bm-ch">{bm.chapterTitle}</span>
                      <span className="bm-label">{bm.label}</span>
                    </button>
                    <button className="reader-icon-btn bm-del" onClick={() => removeBookmark(book.id, bm.id)} aria-label="Delete bookmark">
                      <IconTrash size={15} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </>
      )}
    </div>
  )
}
