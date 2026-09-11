import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'open-reader:v1'

const defaultSettings = {
  surface: 'dark', // 'dark' | 'paper' | 'sepia'
  font: 'serif', // 'serif' | 'bookish' | 'sans'
  size: 19, // px
  leading: 1.65,
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        settings: { ...defaultSettings, ...(parsed.settings || {}) },
        books: parsed.books && typeof parsed.books === 'object' ? parsed.books : {},
      }
    }
  } catch (err) {
    // corrupted storage — start fresh
  }
  return { settings: defaultSettings, books: {} }
}

const LibraryContext = createContext(null)

export function LibraryProvider({ children }) {
  const [state, setState] = useState(loadState)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (err) {
      /* storage full / unavailable — reading still works, just won't persist */
    }
  }, [state])

  const api = useMemo(() => {
    const updateBook = (bookId, patch) =>
      setState((s) => {
        const prev = s.books[bookId] || {}
        return {
          ...s,
          books: {
            ...s.books,
            [bookId]: { ...prev, ...patch(prev), updatedAt: Date.now() },
          },
        }
      })

    return {
      settings: state.settings,
      setSettings(patch) {
        setState((s) => ({ ...s, settings: { ...s.settings, ...patch } }))
      },

      bookState: state.books,

      getBookState(bookId) {
        return state.books[bookId] || null
      },

      // ── Linear books ────────────────────────────────────────────────────
      savePosition(bookId, { anchor, frac, finished }) {
        updateBook(bookId, (prev = {}) => ({ anchor, frac, finished: finished ?? prev.finished }))
      },

      markFinished(bookId) {
        updateBook(bookId, (prev = {}) => ({ finished: true, frac: 1 }))
      },

      addBookmark(bookId, bookmark) {
        updateBook(bookId, (prev = {}) => ({
          bookmarks: [...(prev.bookmarks || []), bookmark],
        }))
      },

      removeBookmark(bookId, bookmarkId) {
        updateBook(bookId, (prev = {}) => ({
          bookmarks: (prev.bookmarks || []).filter((b) => b.id !== bookmarkId),
        }))
      },

      // ── Interactive books ───────────────────────────────────────────────
      saveScene(bookId, { sceneId, path, choices, finished }) {
        updateBook(bookId, (prev = {}) => ({
          sceneId,
          path,
          choices,
          finished: finished ?? prev.finished,
        }))
      },

      recordEnding(bookId, endingId, frac) {
        setState((s) => {
          const prev = s.books[bookId] || {}
          const endingsFound = prev.endingsFound || []
          const next = endingsFound.includes(endingId)
            ? endingsFound
            : [...endingsFound, endingId]
          return {
            ...s,
            books: {
              ...s.books,
              [bookId]: {
                ...prev,
                endingsFound: next,
                finished: true,
                frac: frac != null ? frac : prev.frac,
                updatedAt: Date.now(),
              },
            },
          }
        })
      },

      resetBook(bookId) {
        setState((s) => {
          if (!s.books[bookId]) return s
          const books = { ...s.books }
          delete books[bookId]
          return { ...s, books }
        })
      },
    }
  }, [state])

  return <LibraryContext.Provider value={api}>{children}</LibraryContext.Provider>
}

export function useLibrary() {
  const ctx = useContext(LibraryContext)
  if (!ctx) throw new Error('useLibrary must be used inside <LibraryProvider>')
  return ctx
}
