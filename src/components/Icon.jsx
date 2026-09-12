// Lightweight inline SVG icon set (stroke inherits currentColor).
const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const Svg = ({ children, size = 18, ...rest }) => (
  <svg {...base} width={size} height={size} {...rest}>
    {children}
  </svg>
)

export const IconChevronLeft = (p) => (
  <Svg {...p}>
    <path d="M15 5l-7 7 7 7" />
  </Svg>
)

export const IconChevronRight = (p) => (
  <Svg {...p}>
    <path d="M9 5l7 7-7 7" />
  </Svg>
)

export const IconArrowLeft = (p) => (
  <Svg {...p}>
    <path d="M19 12H5" />
    <path d="M11 18l-6-6 6-6" />
  </Svg>
)

export const IconArrowRight = (p) => (
  <Svg {...p}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </Svg>
)

export const IconX = (p) => (
  <Svg {...p}>
    <path d="M18 6L6 18M6 6l12 12" />
  </Svg>
)

export const IconList = (p) => (
  <Svg {...p}>
    <path d="M4 6h16M4 12h16M4 18h10" />
  </Svg>
)

export const IconBookmark = ({ filled, ...p }) => (
  <Svg {...p} fill={filled ? 'currentColor' : 'none'}>
    <path d="M6 4h12v17l-6-4.2L6 21V4z" />
  </Svg>
)

export const IconSearch = (p) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </Svg>
)

export const IconSparkles = (p) => (
  <Svg {...p}>
    <path d="M12 3l1.6 4.6L18 9.2l-4.4 1.6L12 15.4l-1.6-4.6L6 9.2l4.4-1.6L12 3z" />
    <path d="M18.5 14.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z" />
  </Svg>
)

export const IconUndo = (p) => (
  <Svg {...p}>
    <path d="M4 10h9a5 5 0 0 1 0 10h-3" />
    <path d="M8 6l-4 4 4 4" />
  </Svg>
)

export const IconRestart = (p) => (
  <Svg {...p}>
    <path d="M3 12a9 9 0 1 0 3-6.7" />
    <path d="M3 4v5h5" />
  </Svg>
)

export const IconCheck = (p) => (
  <Svg {...p}>
    <path d="M5 13l4.5 4.5L19 7" />
  </Svg>
)

export const IconClock = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7v5.2l3.2 1.9" />
  </Svg>
)

export const IconBook = (p) => (
  <Svg {...p}>
    <path d="M4 5.5C7 3.8 10 3.8 12 5.7c2-1.9 5-1.9 8-.2V19c-3-1.7-6-1.7-8 .2-2-1.9-5-1.9-8-.2V5.5z" />
    <path d="M12 5.7V19" />
  </Svg>
)

export const IconCompass = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M14.8 9.2l-1.6 4-4 1.6 1.6-4 4-1.6z" />
  </Svg>
)

export const IconGitHub = (p) => (
  <Svg {...p} fill="currentColor" stroke="none">
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
  </Svg>
)

export const IconDiscord = (p) => (
  <Svg {...p} fill="currentColor" stroke="none">
    <path d="M19.3 5.4A16.4 16.4 0 0 0 15.2 4l-.2.4c1.4.4 2.6 1 3.7 1.7a13.9 13.9 0 0 0-13.3 0c1.1-.8 2.4-1.4 3.9-1.8L9 4a16.4 16.4 0 0 0-4.1 1.4C2.3 9 1.7 12.6 2 16.1A16.6 16.6 0 0 0 7 18.6l.5-1.1c-.7-.3-1.4-.6-2-1l.5-.4a11.8 11.8 0 0 0 10.1 0l.5.4c-.6.4-1.3.7-2 1l.5 1.1a16.5 16.5 0 0 0 5-2.5c.4-4-.6-7.6-2.3-10.7zM9.3 14.2c-.9 0-1.7-.9-1.7-1.9s.7-1.9 1.7-1.9 1.7.9 1.7 1.9-.8 1.9-1.7 1.9zm5.4 0c-.9 0-1.7-.9-1.7-1.9s.7-1.9 1.7-1.9 1.7.9 1.7 1.9-.8 1.9-1.7 1.9z" />
  </Svg>
)

export const IconType = (p) => (
  <Svg {...p}>
    <path d="M4 7V5h16v2" />
    <path d="M12 5v14" />
    <path d="M9 19h6" />
  </Svg>
)

export const IconMinus = (p) => (
  <Svg {...p}>
    <path d="M5 12h14" />
  </Svg>
)

export const IconPlus = (p) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
)

export const IconTrash = (p) => (
  <Svg {...p}>
    <path d="M4 7h16" />
    <path d="M9 7V4h6v3" />
    <path d="M6 7l1 13h10l1-13" />
  </Svg>
)

export const Logo = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
    <rect x="2" y="2" width="60" height="60" rx="14" fill="var(--logo-bg, #14100d)" />
    <path d="M14 18c6-2 12-2 17 1v30c-5-3-11-3-17-1V18z" fill="#e8a33d" opacity="0.95" />
    <path d="M50 18c-6-2-12-2-17 1v30c5-3 11-3 17-1V18z" fill="#c8862a" opacity="0.95" />
    <path d="M32 19v30" stroke="#14100d" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="45" cy="44" r="9" fill="#14100d" stroke="#e8a33d" strokeWidth="2" />
    <path d="M41.5 44l2.5 2.5 5-5" stroke="#e8a33d" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
