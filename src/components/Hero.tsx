import { useEffect, useState } from 'react'
import './Hero.css'

const MARKETPLACE_URL = 'https://marketplace.visualstudio.com/items?itemName=Pratham2511.verbis-db-assistant'
const GITHUB_URL = 'https://github.com/Pratham2511/Verbis-Intelligent-Database-Assistant'

interface HeroExample {
  nl: string
  memoryNote?: string
  sql: string
  confidence: number
  time: string
  dialect: string
  shield: boolean
}

const EXAMPLES: HeroExample[] = [
  {
    nl: 'Show me the top 10 customers by revenue last quarter',
    memoryNote: '💾 Remembered: "last quarter" = calendar Q',
    sql: `SELECT
  c.customer_id,
  c.name,
  SUM(o.total) AS revenue
FROM customers c
JOIN orders o ON o.customer_id = c.id
WHERE o.created_at >= '2026-04-01'
  AND o.created_at <  '2026-07-01'
GROUP BY c.customer_id, c.name
ORDER BY revenue DESC
LIMIT 10;`,
    confidence: 94,
    time: '2.1s',
    dialect: 'PostgreSQL',
    shield: false,
  },
  {
    nl: 'Average salary by department — anonymize my schema first',
    sql: `-- 🔒 Privacy Shield active
-- Schema anonymized before cloud call

SELECT
  d.dept_name,
  ROUND(AVG(e.salary), 2) AS avg_salary
FROM employees e
JOIN departments d ON d.id = e.dept_id
GROUP BY d.dept_name
ORDER BY avg_salary DESC;`,
    confidence: 97,
    time: '1.8s',
    dialect: 'MySQL',
    shield: true,
  },
  {
    nl: 'Build me a database for a school management system',
    memoryNote: '💾 Remembered: "school" → 6-table schema template',
    sql: `-- 🏗️ Text2Schema: 6 tables, 14 relationships

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  enrolled_at DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE teachers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  ...`,
    confidence: 91,
    time: '3.2s',
    dialect: 'PostgreSQL',
    shield: false,
  },
]

export default function Hero() {
  const [activeExample, setActiveExample] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveExample((i) => (i + 1) % EXAMPLES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const current = EXAMPLES[activeExample]

  return (
    <section className="hero-section" id="hero">
      <div className="hero-label reveal" data-reveal>
        <span className="hero-label-dot" />
        VS Code Extension · v1.1.0 · MIT Licensed
      </div>

      <h1 className="hero-headline reveal" data-reveal>
        SQL without the SQL.
      </h1>

      <p className="hero-subtext reveal" data-reveal>
        Type what you mean. Verbis generates the SQL — validated, optimized, and privacy-safe.
      </p>

      <div className="hero-demo reveal" data-reveal>
        {/* LEFT: Natural language input */}
        <div className="hero-nl-pane">
          <div className="pane-header">
            <span className="pane-dot red" />
            <span className="pane-dot yellow" />
            <span className="pane-dot green" />
            <span className="pane-title">Verbis Chat</span>
          </div>
          <div className="nl-content">
            <div className="nl-prompt-label">You asked:</div>
            <div className="nl-input-bubble">
              <TypewriterText text={current.nl} key={activeExample} />
            </div>
            {current.memoryNote && (
              <div className="memory-note">{current.memoryNote}</div>
            )}
          </div>
        </div>

        {/* CENTER: Animated beam */}
        <div className="hero-beam-container">
          <svg className="beam-svg" viewBox="0 0 80 40" fill="none">
            <path
              d="M 5 20 L 75 20"
              stroke="url(#beamGradient)"
              strokeWidth="2"
              strokeDasharray="8 4"
              className="beam-path"
            />
            <path d="M 68 14 L 75 20 L 68 26" stroke="#F97316" strokeWidth="2" fill="none" />
            <defs>
              <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
            </defs>
          </svg>
          <div className="beam-badge">AI</div>
        </div>

        {/* RIGHT: SQL output */}
        <div className="hero-sql-pane">
          <div className="pane-header">
            <span className="pane-dot red" />
            <span className="pane-dot yellow" />
            <span className="pane-dot green" />
            <span className="pane-title">{current.dialect}</span>
            {current.shield && <span className="shield-badge">🔒 Shield</span>}
          </div>
          <div className="sql-output">
            <SqlHighlight sql={current.sql} key={activeExample} />
          </div>
          <div className="sql-meta">
            <span className="confidence-badge">
              ⚡ {current.confidence}% confident
            </span>
            <span className="time-badge">
              ⏱ {current.time}
            </span>
          </div>
        </div>
      </div>

      <div className="hero-switcher">
        {EXAMPLES.map((_, i) => (
          <button
            key={i}
            className={`switcher-dot ${i === activeExample ? 'active' : ''}`}
            onClick={() => setActiveExample(i)}
            aria-label={`Example ${i + 1}`}
          />
        ))}
      </div>

      <div className="hero-ctas reveal" data-reveal>
        <a
          href={MARKETPLACE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Install on VS Code — Free
        </a>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          ★ Star on GitHub
        </a>
      </div>
    </section>
  )
}

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    setDisplayed('')
    let i = 0
    const timer = window.setInterval(() => {
      i += 1
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(timer)
    }, 35)
    return () => clearInterval(timer)
  }, [text])
  return <span>{displayed}<span className="cursor-blink">|</span></span>
}

function SqlHighlight({ sql }: { sql: string }) {
  const keywords = /\b(SELECT|FROM|WHERE|JOIN|ON|GROUP|ORDER|LIMIT|BY|AS|AND|OR|NOT|CREATE|TABLE|PRIMARY|KEY|FOREIGN|REFERENCES|UNIQUE|NOT NULL|DEFAULT|INSERT|INTO|VALUES|UPDATE|SET|DELETE|INNER|LEFT|RIGHT|OUTER|HAVING|DISTINCT|COUNT|SUM|AVG|MAX|MIN|ROUND|WITH|CASE|WHEN|THEN|ELSE|END)\b/gi
  const types = /\b(SERIAL|VARCHAR|INT|INTEGER|TEXT|DATE|TIMESTAMP|BOOLEAN|DECIMAL|FLOAT|BIGINT|SMALLINT|NUMERIC)\b/gi
  const strings = /'[^']*'/g
  const numbers = /\b\d+(\.\d+)?\b/g
  const comments = /(--.*$|\/\*[\s\S]*?\*\/)/gm

  const placeholders: string[] = []
  const stash = (html: string) => {
    placeholders.push(html)
    return `\x00${placeholders.length - 1}\x00`
  }

  let highlighted = sql
    .replace(comments, (m) => stash(`<span class="sql-comment">${escapeHtml(m)}</span>`))
    .replace(strings, (m) => stash(`<span class="sql-string">${escapeHtml(m)}</span>`))
    .replace(keywords, (m) => stash(`<span class="sql-keyword">${escapeHtml(m)}</span>`))
    .replace(types, (m) => stash(`<span class="sql-type">${escapeHtml(m)}</span>`))
    .replace(numbers, (m) => stash(`<span class="sql-number">${escapeHtml(m)}</span>`))

  highlighted = escapeHtmlKeepPlaceholders(highlighted)
  highlighted = highlighted.replace(/\x00(\d+)\x00/g, (_, i) => placeholders[Number(i)])

  return (
    <pre
      className="sql-highlighted"
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  )
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function escapeHtmlKeepPlaceholders(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
