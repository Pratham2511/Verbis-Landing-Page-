import { useEffect, useState } from 'react'
import './Footer.css'

const GITHUB_REPO = 'Pratham2511/Verbis-Intelligent-Database-Assistant'
const GITHUB_URL = `https://github.com/${GITHUB_REPO}`
const MARKETPLACE_URL = 'https://marketplace.visualstudio.com/items?itemName=Pratham2511.verbis-db-assistant'

function GitHubStars() {
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch(`https://api.github.com/repos/${GITHUB_REPO}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data && typeof data.stargazers_count === 'number') {
          setStars(data.stargazers_count)
        }
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  return (
    <a
      href={GITHUB_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="github-stars-badge"
      aria-label={`${stars ?? '—'} stars on GitHub`}
    >
      <span className="github-stars-star">★</span>
      <span className="github-stars-count">
        {stars !== null ? stars.toLocaleString() : '—'}
      </span>
      <span className="github-stars-label">stars</span>
    </a>
  )
}

const LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Demo', href: '#demo' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Install', href: '#install-about' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-icon">V</span>
              <span className="logo-text">Verbis</span>
            </div>
            <p className="footer-tagline">Built by Pratham Pansare</p>
            <p className="footer-personal">Made with <span className="footer-heart">❤</span> and too much coffee</p>
            <GitHubStars />
            <p className="footer-tech">
              Built with FastAPI · React · ChromaDB · sqlglot · VS Code API<br />
              Runs fully local. Open source on GitHub.
            </p>
          </div>
          <div className="footer-links">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="footer-link">
                {l.label}
              </a>
            ))}
          </div>
          <div className="footer-social">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com/pratham2511"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              Twitter
            </a>
            <a href="mailto:pratham2511.dev@gmail.com" className="social-link">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
