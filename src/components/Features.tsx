import { useState } from 'react'
import './Features.css'

function CodeBlock({ code, language = 'sql' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <div className="code-block-wrapper">
      <pre className="feature-code-block">
        <code>{code}</code>
      </pre>
      <button
        className={`copy-btn ${copied ? 'copied' : ''}`}
        onClick={copy}
        aria-label={`Copy ${language} code`}
      >
        {copied ? '✓ Copied' : 'Copy'}
      </button>
    </div>
  )
}

interface Feature {
  icon: string
  title: string
  description: string
  code: string
  language?: string
}

const FEATURES: Feature[] = [
  {
    icon: '🎯',
    title: 'Ask in Plain English',
    description: 'No SQL syntax required. Ask in English, get validated queries in under 3 seconds.',
    code: `> "Top customers last quarter"

SELECT customer_id, SUM(total) AS revenue
FROM orders
WHERE date BETWEEN '2026-01-01' AND '2026-03-31'
GROUP BY customer_id
ORDER BY revenue DESC
LIMIT 10;`,
  },
  {
    icon: '🔒',
    title: 'Your Schema Stays Private',
    description: 'Table names are tokens. Real names never leave your machine.',
    code: `-- Schema anonymized with AES-256-GCM

-- What the LLM sees:
SELECT AVG(col_1) FROM table_A
JOIN table_B ON table_A.col_3 = table_B.id

-- What you see:
SELECT AVG(salary) FROM employees
JOIN departments ON employees.dept_id = departments.id`,
  },
  {
    icon: '⚡',
    title: 'Three Queries, One Winner',
    description: 'Generates 3 SQL paths, validates each, picks the best.',
    code: `✅ Path 1 (direct):   97% confident — 2.1s — SELECTED
⚡ Path 2 (CoT):      94% confident — 2.4s
📋 Path 3 (skeleton): 91% confident — 2.8s

-- 3 candidates, AST-validated, best selected`,
    language: 'terminal',
  },
  {
    icon: '🧠',
    title: 'Stops Asking Twice',
    description: 'Disambiguate once. Verbis remembers forever.',
    code: `// Remembered in .qmind/memory.json
{
  "last quarter": "calendar Q",
  "revenue": "SUM(order_total)",
  "active": "status = 'ACTIVE'"
}`,
    language: 'json',
  },
]

export default function Features() {
  return (
    <section className="section features-section" id="features">
      <div className="container">
        <div className="section-header reveal" data-reveal>
          <span className="section-eyebrow">
            <span className="eyebrow-bar" />
            What it does
          </span>
          <h2 className="section-heading">
            Four things Verbis does <span className="heading-accent">stupidly well</span>
          </h2>
          <p className="section-sub">
            Built by a developer tired of fighting SQL. Every feature here is one I needed myself.
          </p>
        </div>

        <div className="features-grid">
          {FEATURES.map((feature, i) => (
            <article
              key={feature.title}
              className="feature-card glass-card reveal"
              data-reveal
              data-delay={i * 80}
            >
              <div className="feature-card-header">
                <span className="feature-icon">{feature.icon}</span>
                <h3 className="feature-title">{feature.title}</h3>
              </div>
              <p className="feature-description">{feature.description}</p>
              <CodeBlock code={feature.code} language={feature.language} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
