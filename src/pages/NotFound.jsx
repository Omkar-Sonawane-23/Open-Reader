import { Link } from 'react-router-dom'
import { Logo } from '../components/Icon'

export default function NotFound() {
  return (
    <main className="page notfound">
      <div className="notfound-inner">
        <Logo size={56} />
        <h1>Page not found</h1>
        <p>Even the best cartographers have blank quarters. This page is one of them.</p>
        <Link className="btn btn-primary" to="/">Back to the library</Link>
      </div>
    </main>
  )
}
