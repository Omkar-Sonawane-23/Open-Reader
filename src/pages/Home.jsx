import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { books, genreList, interactiveEndings, bookWordCount } from '../data/books'
import { useLibrary } from '../lib/store'
import BookCard from '../components/BookCard'
import BookCover from '../components/BookCover'
import { IconSearch, IconArrowRight, IconSparkles } from '../components/Icon'
import { readingMinutes } from '../lib/format'

export default function Home() {
  const { bookState } = useLibrary()
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('All')

  // Interactive books stay "in progress" until every ending is discovered.
  const inProgress = useMemo(() => {
    return books
      .filter((b) => {
        const st = bookState[b.id]
        if (!st) return false
        if (b.type === 'interactive') {
          const total = interactiveEndings(b).length
          return (st.endingsFound?.length || 0) < total
        }
        return !st.finished
      })
      .sort((a, b) => (bookState[b.id].updatedAt || 0) - (bookState[a.id].updatedAt || 0))
      .slice(0, 3)
  }, [bookState])

  const stats = useMemo(() => {
    return {
      started: books.filter((b) => bookState[b.id]).length,
      finished: books.filter((b) => {
        const st = bookState[b.id]
        if (!st) return false
        if (b.type === 'interactive') return (st.endingsFound?.length || 0) >= interactiveEndings(b).length
        return Boolean(st.finished)
      }).length,
      endings: Object.values(bookState).reduce((n, s) => n + (s.endingsFound?.length || 0), 0),
    }
  }, [bookState])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return books.filter((b) => {
      const matchGenre = genre === 'All' || b.genre === genre
      const matchQuery =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.tagline.toLowerCase().includes(q)
      return matchGenre && matchQuery
    })
  }, [query, genre])

  const totalEndings = books.reduce((n, b) => n + (b.type === 'interactive' ? interactiveEndings(b).length : 0), 0)

  return (
    <main className="page home">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-inner">
          <p className="hero-eyebrow">
            <IconSparkles size={15} /> Open Reader · under construction, made in the open
          </p>
          <h1 className="hero-title">
            Stories you don’t <em>just</em> read.
          </h1>
          <p className="hero-sub">
            A web-native home for storybooks — a comfortable reader for the books you love, and
            branching worlds you can walk around in. No devices, no lock-in: just you, a page, and
            the odd door in the wall.
          </p>
          <div className="hero-search">
            <IconSearch size={18} />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search titles, authors, moods…"
              aria-label="Search the library"
            />
          </div>
          {stats.started > 0 && (
            <p className="hero-stats">
              {stats.started} {stats.started === 1 ? 'story' : 'stories'} started
              {stats.finished > 0 && <> · {stats.finished} finished</>}
              {stats.endings > 0 && <> · {stats.endings} of {totalEndings} endings discovered</>}
            </p>
          )}
        </div>
      </section>

      {/* ── Continue reading ──────────────────────────────────────────── */}
      {inProgress.length > 0 && (
        <section className="continue" aria-label="Continue reading">
          <div className="section-head">
            <h2>Continue reading</h2>
          </div>
          <div className="continue-grid">
            {inProgress.map((book) => {
              const st = bookState[book.id]
              const frac = st?.frac || 0
              const isInteractive = book.type === 'interactive'
              const endingsTotal = isInteractive ? interactiveEndings(book).length : 0
              const label = isInteractive
                ? `${st.endingsFound?.length || 0}/${endingsTotal} endings found`
                : `${Math.round(frac * 100)}% · ${readingMinutes(Math.round(bookWordCount(book) * (1 - frac)))} min left`
              return (
                <Link to={`/read/${book.id}`} className="continue-card" key={book.id}>
                  <BookCover book={book} className="continue-cover" />
                  <div className="continue-info">
                    <span className="continue-kicker">{isInteractive ? 'Your path awaits' : 'Pick up where you left off'}</span>
                    <h3>{book.title}</h3>
                    <p>{label}</p>
                    <div className="continue-bar">
                      <span style={{ width: `${Math.max(4, frac * 100)}%` }} />
                    </div>
                    <span className="continue-cta">
                      Resume <IconArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* ── Library ───────────────────────────────────────────────────── */}
      <section className="shelf" aria-label="Library">
        <div className="section-head">
          <h2>The Library</h2>
          <div className="chips" role="group" aria-label="Filter by genre">
            {['All', ...genreList].map((g) => (
              <button
                key={g}
                className={`chip ${genre === g ? 'active' : ''}`}
                onClick={() => setGenre(g)}
                aria-pressed={genre === g}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>Nothing on this shelf yet.</p>
            <button className="btn btn-ghost" onClick={() => { setQuery(''); setGenre('All') }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="shelf-grid">
            {filtered.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
