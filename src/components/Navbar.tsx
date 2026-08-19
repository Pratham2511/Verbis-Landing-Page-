import { useEffect, useState } from 'react'
import './Navbar.css'

const LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Demo', href: '#demo' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Install', href: '#install-about' },
]

const MARKETPLACE_URL = 'https://marketplace.visualstudio.com/items?itemName=Pratham2511.verbis-db-assistant'
const GITHUB_URL = 'https://github.com/Pratham2511/Verbis-Intelligent-Database-Assistant'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a href="#hero" className="nav__brand" aria-label="Verbis home">
          <span className="nav__dot" aria-hidden />
          <span className="nav__wordmark">VERBIS</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav__link">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__cta">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost nav__btn-ghost"
          >
            <GitHubIcon /> GitHub
          </a>
          <a
            href={MARKETPLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary nav__btn-primary"
          >
            Install on VS Code
          </a>
        </div>

        <button
          className={`nav__burger ${menuOpen ? 'is-open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`nav__overlay ${menuOpen ? 'is-open' : ''}`}>
        <nav aria-label="Mobile" className="nav__overlay-nav">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className="nav__overlay-link"
              style={{ '--i': i } as React.CSSProperties}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href={MARKETPLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary nav__overlay-cta"
            onClick={() => setMenuOpen(false)}
          >
            Install on VS Code →
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost nav__overlay-cta"
            onClick={() => setMenuOpen(false)}
          >
            View on GitHub
          </a>
        </nav>
      </div>
    </header>
  )
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.69-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.76.41-1.27.74-1.56-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.19-3.07-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.17a11.07 11.07 0 0 1 5.79 0c2.2-1.48 3.17-1.17 3.17-1.17.63 1.59.23 2.76.11 3.05.74.8 1.19 1.82 1.19 3.07 0 4.4-2.69 5.37-5.25 5.65.42.36.79 1.08.79 2.18v3.23c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  )
}
