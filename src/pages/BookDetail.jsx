import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getBook, bookWordCount, bookChapterCount, interactiveEndings } from '../data/books'
import { useLibrary } from '../lib/store'
import BookCover from '../components/BookCover'
import { IconArrowLeft, IconArrowRight, IconClock, IconSparkles, IconBook, IconTrash, IconBookmark } from '../components/Icon'
import { readingMinutes, plural } from '../lib/format'

export default function BookDetail() {
  const { bookId } = useParams()
  const navigate = useNavigate()
  const book = getBook(bookId)
  const { getBookState, resetBook } = useLibrary()
  const [confirmReset, setConfirmReset] = useState(false)

  if (!book) {
    return (
      <main className="page detail">
        <div className="empty-state">
          <p>That book isn’t on the shelf.</p>
          <Link className="btn btn-primary" to="/">Back to the library</Link>
        </div>
      </main>
    )
  }

  const st = getBookState(book.id)
  const words = useMemo(() => bookWordCount(book), [book.id])
  const minutes = readingMinutes(words)
  const chapters = bookChapterCount(book)
  const endings = book.type === 'interactive' ? interactiveEndings(book) : []
  const isInteractive = book.type === 'interactive'
  const endingsFound = st?.endingsFound?.length || 0
  const allEndingsFound = isInteractive && endings.length > 0 && endingsFound >= endings.length
  const finished = isInteractive ? allEndingsFound : Boolean(st?.finished)
  const frac = finished ? 1 : isInteractive ? endingsFound / endings.length : st?.frac || 0
  const ctaLabel = !st
    ? isInteractive ? 'Begin the story' : 'Start reading'
    : finished
      ? isInteractive ? 'Explore another path' : 'Read it again'
      : isInteractive ? 'Return to your path' : 'Continue reading'
  // A finished linear book restarts from page one when reopened.
  const readHref =
    isInteractive || !finished ? `/read/${book.id}` : `/read/${book.id}?from=start`

  return (
    <main className="page detail">
      <div className="detail-top">
        <button className="btn btn-ghost btn-back" onClick={() => navigate(-1)}>
          <IconArrowLeft size={16} /> Back
        </button>
      </div>

      <div className="detail-grid">
        <div className="detail-cover">
          <BookCover book={book} />
        </div>

        <div className="detail-info">
          <p className="detail-genre">
            <span className={`genre-dot genre-${book.id}`} /> {book.genre}
            {isInteractive && (
              <span className="badge badge-interactive">
                <IconSparkles size={13} /> Interactive
              </span>
            )}
          </p>
          <h1 className="detail-title">{book.title}</h1>
          <p className="detail-author">by {book.author}</p>
          <p className="detail-tagline">“{book.tagline}”</p>

          <div className="detail-stats">
            <span><IconClock size={15} /> ~{minutes} min</span>
            <span>{plural(words, 'word', 'words')}</span>
            <span>
              {isInteractive ? <IconSparkles size={15} /> : <IconBook size={15} />}
              {isInteractive ? `${endings.length} endings` : `${chapters} chapters`}
            </span>
          </div>

          <p className="detail-desc">{book.description}</p>

          {st && frac > 0 && (
            <div className="detail-progress">
              <div className="detail-progress-head">
                <span>{finished ? (isInteractive ? 'Fully explored' : 'Finished') : isInteractive ? 'Your path so far' : 'In progress'}</span>
                {isInteractive
                  ? `${endingsFound}/${endings.length} endings found`
                  : `${Math.round(frac * 100)}%`}
              </div>
              <div className="continue-bar">
                <span style={{ width: `${Math.max(4, frac * 100)}%` }} />
              </div>
            </div>
          )}

          <div className="detail-actions">
            <Link className="btn btn-primary btn-lg" to={readHref}>
              {ctaLabel} <IconArrowRight size={16} />
            </Link>
            {isInteractive && endings.length > 0 && (
              <div className="endings-track" aria-label="Endings discovered">
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
            )}
          </div>

          {st?.bookmarks?.length > 0 && (
            <div className="detail-bookmarks">
              <h3><IconBookmark size={15} /> Bookmarks</h3>
              <ul>
                {st.bookmarks.map((bm) => (
                  <li key={bm.id}>
                    <Link to={`/read/${book.id}?at=${bm.block}`}>
                      <span className="bm-ch">{bm.chapterTitle}</span>
                      <span className="bm-label">{bm.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {st && (
            <div className="detail-danger">
              {confirmReset ? (
                <>
                  <span>Reset your progress in this book?</span>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      resetBook(book.id)
                      setConfirmReset(false)
                    }}
                  >
                    Yes, reset it
                  </button>
                  <button className="btn btn-ghost" onClick={() => setConfirmReset(false)}>
                    Keep it
                  </button>
                </>
              ) : (
                <button className="btn btn-ghost btn-danger-ghost" onClick={() => setConfirmReset(true)}>
                  <IconTrash size={15} /> Reset progress
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
