import { Link, NavLink } from 'react-router-dom'
import { Logo, IconGitHub, IconDiscord } from './Icon'

const REPO_URL = 'https://github.com/Omkar-Sonawane-23/Open-Reader'
const DISCORD_URL = 'https://discord.gg/vNKMUNRg'

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" aria-label="Open Reader — home">
          <Logo />
          <span className="navbar-word">
            Open&nbsp;Reader
            <span className="navbar-word-sub">stories, interactively</span>
          </span>
        </Link>
        <nav className="navbar-nav" aria-label="Primary">
          <NavLink to="/" end className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
            Library
          </NavLink>
          <a className="navbar-link" href={REPO_URL} target="_blank" rel="noreferrer">
            <IconGitHub size={17} /> GitHub
          </a>
          <a className="navbar-link discord" href={DISCORD_URL} target="_blank" rel="noreferrer">
            <IconDiscord size={17} /> Discord
          </a>
        </nav>
      </div>
    </header>
  )
}
