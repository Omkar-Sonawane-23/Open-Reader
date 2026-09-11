# Open Reader

We're making a website like that user can read the story book in interactive way. it can be a next competitor of Amazon Kindle.

Currently We are working on That. This Project is Under Construction.

![Open](https://github.com/Web403/Open-Reader/assets/130058150/c1827822-a8fa-4205-9966-69739aaf2d16)

**Open Reader** is a web-native home for storybooks — a comfortable, distraction-free reader for the books you love, and branching worlds you don't just read but walk around in. No device, no account, no lock-in: just you, a page, and the odd door in the wall.

---

## ✨ What's inside

**The Library** — a browsable shelf of original stories written for this project, with search, genre filters, reading time, and progress tracking that lives in your browser.

**The Reader (linear books)**
- Real book-style pagination that adapts to your screen — turn pages with arrow keys, clicks, or swipes
- Reading surfaces: Dark, Paper, and Sepia
- Typeface (Serif / Bookish / Sans), text size, and line-spacing controls
- Chapter table of contents with progress ticks
- Bookmarks with deep links back to the exact page
- Progress, position, and settings persist locally — resume where you left off, no account needed
- "Time left in book" estimates and an end-of-book card

**Interactive storytelling (branching books)**
- Choose-your-path scenes where your choices rewrite the story
- **The Clockmaker's Choice** ships with 5 endings — including a hidden *true ending* that requires carrying the right object through the right door
- An endings tracker that survives replays (find them all), path memory, undo-last-choice, and a journey summary that reflects how *you* decided

## 📚 The launch shelf

| Story | Author | Type |
| --- | --- | --- |
| The Clockmaker's Choice | R. S. Vane | Interactive · 5 endings |
| The Lighthouse Keeper | Ada Mercer | Mystery |
| The Last Cartographer | Jonas Feld | Adventure |
| Where the River Remembers | Mara Ellison | Literary |

All stories are original works written for Open Reader.

## 🛠 Tech stack

- [React 18](https://react.dev) + [Vite 5](https://vitejs.dev)
- [React Router 6](https://reactrouter.com) for routing
- Zero UI frameworks — hand-rolled CSS design system with reading surfaces
- A custom DOM-measuring pagination engine (`src/lib/paginate.js`) that splits prose into pages that fit *your* viewport and font choices
- `localStorage` persistence via a small React context store

## 🚀 Getting started

```bash
git clone https://github.com/Omkar-Sonawane-23/Open-Reader.git
cd Open-Reader
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build      # production build to dist/
npm run preview    # serve the production build
node scripts/validate.mjs   # data & pagination property tests (no browser needed)
```

## 📁 Project structure

```
src/
├── data/books.js          # the story library (content is data)
├── lib/
│   ├── paginate.js        # DOM-measuring pagination engine
│   ├── store.jsx          # localStorage-backed library store (progress, bookmarks, settings)
│   └── format.js          # reading-time / excerpt helpers
├── readers/
│   ├── LinearReader.jsx   # paginated reading experience
│   └── InteractiveReader.jsx  # branching story engine
├── components/            # covers, cards, settings drawer, icons
├── pages/                 # Home (library), BookDetail, Reader routes
└── styles/global.css      # design system
```

Stories are plain data — add a linear book by appending a `chapters` array, or an interactive one with a `scenes` map. See `src/data/books.js` for the shape.

## 🗺 Roadmap

- [ ] Reading streaks & stats
- [ ] Text-to-speech reading mode
- [ ] EPUB import
- [ ] Highlights & notes
- [ ] Community story submissions
- [ ] PWA / offline support

## 🤝 Contributing

If You want to Contribute Then You can join the Discord Channel: **https://discord.gg/vNKMUNRg**

Issues and pull requests are welcome — good first issues include new short stories for the shelf (original work only, please), accessibility improvements, and new endings for *The Clockmaker's Choice*.

---

*Open Reader is under construction, made in the open.*
