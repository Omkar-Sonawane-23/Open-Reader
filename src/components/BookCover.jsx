import coverImports from './coverImports'

// BookCover — renders the generated cover art with a typographic overlay
// (title + author), or a CSS-only fallback cover when no art exists.
export default function BookCover({ book, className = '' }) {
  const art = coverImports[book.id]
  return (
    <div className={`book-cover ${className}`} data-has-art={Boolean(art)}>
      {art ? (
        <>
          <img className="book-cover-art" src={art} alt="" loading="lazy" />
          <div className="book-cover-scrim" />
        </>
      ) : (
        <div
          className="book-cover-fallback"
          style={{
            '--c-from': book.palette.from,
            '--c-to': book.palette.to,
            '--c-accent': book.palette.accent,
          }}
        >
          <span className="book-cover-ornament">{book.title.charAt(0)}</span>
        </div>
      )}
      <div className="book-cover-spine" />
      <div className="book-cover-text">
        <span className="book-cover-genre">{book.genre}</span>
        <h3 className="book-cover-title">{book.title}</h3>
        <span className="book-cover-author">{book.author}</span>
      </div>
    </div>
  )
}
