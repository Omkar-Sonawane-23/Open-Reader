import { useParams } from 'react-router-dom'
import { getBook } from '../data/books'
import LinearReader from '../readers/LinearReader'
import InteractiveReader from '../readers/InteractiveReader'

export default function Reader() {
  const { bookId } = useParams()
  const book = getBook(bookId)

  if (!book) {
    return (
      <main className="page">
        <div className="empty-state">
          <p>That book isn’t on the shelf.</p>
        </div>
      </main>
    )
  }

  return book.type === 'interactive' ? <InteractiveReader book={book} /> : <LinearReader book={book} />
}
