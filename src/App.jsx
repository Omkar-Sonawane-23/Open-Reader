import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { LibraryProvider } from './lib/store'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import BookDetail from './pages/BookDetail'
import Reader from './pages/Reader'
import NotFound from './pages/NotFound'
import { useEffect } from 'react'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Shell() {
  const { pathname } = useLocation()
  const isReading = pathname.startsWith('/read/')
  return (
    <>
      {!isReading && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:bookId" element={<BookDetail />} />
        <Route path="/read/:bookId" element={<Reader />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isReading && (
        <footer className="site-footer">
          <div className="site-footer-inner">
            <span>
              <strong>Open Reader</strong> — under construction, made in the open. Stories are
              original works written for this project.
            </span>
            <span className="site-footer-links">
              <a href="https://github.com/Omkar-Sonawane-23/Open-Reader" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href="https://discord.gg/vNKMUNRg" target="_blank" rel="noreferrer">
                Discord
              </a>
            </span>
          </div>
        </footer>
      )}
    </>
  )
}

export default function App() {
  return (
    <LibraryProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Shell />
      </BrowserRouter>
    </LibraryProvider>
  )
}
