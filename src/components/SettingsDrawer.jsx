import { useLibrary } from '../lib/store'
import { IconX, IconMinus, IconPlus } from './Icon'

const SIZES = { min: 16, max: 26 }
const LEADINGS = [
  { key: 1.5, label: 'Compact' },
  { key: 1.65, label: 'Comfortable' },
  { key: 1.85, label: 'Roomy' },
]
const SURFACES = [
  { key: 'dark', label: 'Dark' },
  { key: 'paper', label: 'Paper' },
  { key: 'sepia', label: 'Sepia' },
]
const FONTS = [
  { key: 'serif', label: 'Serif' },
  { key: 'bookish', label: 'Bookish' },
  { key: 'sans', label: 'Sans' },
]

export default function SettingsDrawer({ onClose }) {
  const { settings, setSettings } = useLibrary()

  return (
    <>
      <div className="drawer-scrim" onClick={onClose} />
      <aside className="drawer drawer-right" role="dialog" aria-label="Reading settings">
        <div className="drawer-head">
          <h3>Reading settings</h3>
          <button className="reader-icon-btn" onClick={onClose} aria-label="Close settings">
            <IconX size={17} />
          </button>
        </div>

        <div className="setting-group">
          <span className="setting-label">Background</span>
          <div className="surface-row">
            {SURFACES.map((s) => (
              <button
                key={s.key}
                className={`surface-swatch surface-${s.key} ${settings.surface === s.key ? 'active' : ''}`}
                onClick={() => setSettings({ surface: s.key })}
                aria-pressed={settings.surface === s.key}
                title={s.label}
              >
                Aa
              </button>
            ))}
          </div>
        </div>

        <div className="setting-group">
          <span className="setting-label">Typeface</span>
          <div className="font-row">
            {FONTS.map((f) => (
              <button
                key={f.key}
                className={`font-btn font-${f.key} ${settings.font === f.key ? 'active' : ''}`}
                onClick={() => setSettings({ font: f.key })}
                aria-pressed={settings.font === f.key}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="setting-group">
          <span className="setting-label">Text size</span>
          <div className="size-row">
            <button
              className="reader-icon-btn"
              onClick={() => setSettings({ size: Math.max(SIZES.min, settings.size - 1) })}
              aria-label="Smaller text"
            >
              <IconMinus size={16} />
            </button>
            <span className="size-value" style={{ fontSize: `${Math.min(20, settings.size)}px` }}>
              {settings.size}px
            </span>
            <button
              className="reader-icon-btn"
              onClick={() => setSettings({ size: Math.min(SIZES.max, settings.size + 1) })}
              aria-label="Larger text"
            >
              <IconPlus size={16} />
            </button>
          </div>
        </div>

        <div className="setting-group">
          <span className="setting-label">Line spacing</span>
          <div className="font-row">
            {LEADINGS.map((l) => (
              <button
                key={l.key}
                className={`font-btn ${settings.leading === l.key ? 'active' : ''}`}
                onClick={() => setSettings({ leading: l.key })}
                aria-pressed={settings.leading === l.key}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <p className="drawer-hint">
          Settings and your place in every book are saved on this device — no account needed.
        </p>
      </aside>
    </>
  )
}
