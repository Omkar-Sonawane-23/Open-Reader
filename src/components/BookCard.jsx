import { Link } from 'react-router-dom'
import BookCover from './BookCover'
import { useLibrary } from '../lib/store'
import { interactiveEndings } from '../data/books'
import { IconSparkles, IconCheck } from './Icon'

function ProgressRing({ frac, size = 40 }) {
  const r = (size - 5) / 2
  const c = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(1, frac))
  return (
    <svg className="progress-ring" width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <circle cx={size / 2} cy={size / 2} r={r} fill="var(--bg-card)" stroke="var(--line)" strokeWidth="3" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" className="progress-ring-label">
        {pct >= 1 ? '✓' : `${Math.round(pct * 100)}%`}
      </text>
    </svg>
  )
}

export default function BookCard({ book }) {
  const { getBookState } = useLibrary()
  const st = getBookState(book.id)
  const isInteractive = book.type === 'interactive'
  const totalEndings = isInteractive ? interactiveEndings(book).length : 0
  const endings = st?.endingsFound?.length || 0
  // Interactive books are only "finished" once every ending has been found.
  const finished = isInteractive ? totalEndings > 0 && endings >= totalEndings : Boolean(st?.finished)
  const frac = finished ? 1 : isInteractive ? endings / totalEndings : st?.frac || 0

  return (
    <Link to={`/book/${book.id}`} className={`book-card ${frac > 0 ? 'started' : ''}`} data-finished={finished || null}>
      <div className="book-card-cover">
        <BookCover book={book} />
        {isInteractive && (
          <span className="badge badge-interactive">
            <IconSparkles size={13} /> Interactive
          </span>
        )}
        {finished && (
          <span className="badge badge-finished">
            <IconCheck size={13} /> Finished
          </span>
        )}
        {frac > 0 && !finished && (
          <span className="book-card-ring">
            <ProgressRing frac={frac} />
          </span>
        )}
      </div>
      <div className="book-card-meta">
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card-author">{book.author}</p>
        <p className="book-card-tag">{book.tagline}</p>
        {isInteractive && endings > 0 && (
          <p className="book-card-endings">{endings} ending{endings === 1 ? '' : 's'} found</p>
        )}
      </div>
    </Link>
  )
}
