import { useEffect, useRef, useState } from 'react'
import './Demo.css'

const MARKETPLACE_URL = 'https://marketplace.visualstudio.com/items?itemName=Pratham2511.verbis-db-assistant'

interface DemoScenario {
  question: string
  confidence: string
  confidencePct: number
  badge: string
  sql: string[]
  plan: string
  narrative: string
}

const SCENARIOS: DemoScenario[] = [
  {
    question: 'Customers who haven\'t ordered in 90 days',
    confidence: '93% Confident',
    confidencePct: 93,
    badge: 'SQL · PostgreSQL',
    sql: [
      'SELECT c.customer_id, c.name, c.email',
      'FROM customers c',
      'WHERE c.customer_id NOT IN (',
      '  SELECT DISTINCT o.customer_id',
      '  FROM orders o',
      "  WHERE o.order_date >= NOW() - INTERVAL '90 days'",
      ')',
      'ORDER BY c.name ASC;',
    ],
    plan: 'Subquery scan on orders(date) → NOT IN filter on customers. Estimated rows: 47. Cost: 0.18.',
    narrative: '47 customers haven\'t placed an order in 90 days. Email list exported. Consider a win-back campaign — average reactivation rate for this segment is 12.4%.',
  },
  {
    question: 'Show top 10 customers by revenue',
    confidence: '94% Confident',
    confidencePct: 94,
    badge: 'SQL · PostgreSQL',
    sql: [
      'SELECT c.customer_id, c.name, SUM(o.order_total) AS revenue',
      'FROM customers c',
      'JOIN orders o ON c.customer_id = o.customer_id',
      "WHERE o.order_date >= NOW() - INTERVAL '90 days'",
      'GROUP BY c.customer_id, c.name',
      'ORDER BY revenue DESC',
      'LIMIT 10;',
    ],
    plan: 'Index scan on orders(order_date) → Hash join with customers → Sort top 10. Estimated rows: 1.2k. Cost: 0.42.',
    narrative: 'Your top customer this quarter is "Acme Corp" with $48,200 in revenue — a 23% increase over the previous period. 3 of the top 10 customers are new this quarter.',
  },
  {
    question: 'Average salary by department',
    confidence: '91% Confident',
    confidencePct: 91,
    badge: 'SQL · PostgreSQL',
    sql: [
      'SELECT d.dept_name, AVG(e.salary) AS avg_salary',
      'FROM employees e',
      'JOIN departments d ON e.dept_id = d.dept_id',
      "WHERE e.status = 'active'",
      'GROUP BY d.dept_name',
      'ORDER BY avg_salary DESC;',
    ],
    plan: 'Hash join employees↔departments → Group aggregate. Estimated rows: 14. Cost: 0.31.',
    narrative: 'Engineering has the highest average salary at $128,400, followed by Sales ($97,200). 14 departments total. 2 outliers detected in Finance.',
  },
  {
    question: 'Create schema for a blog platform',
    confidence: '88% Confident',
    confidencePct: 88,
    badge: 'Text2Schema · DDL',
    sql: [
      'CREATE TABLE users (id SERIAL PK, email VARCHAR, ...);',
      'CREATE TABLE posts (id SERIAL PK, author_id INT FK, ...);',
      'CREATE TABLE comments (id SERIAL PK, post_id INT FK, ...);',
      'CREATE TABLE tags (id SERIAL PK, name VARCHAR);',
      '-- + 2 more tables, 14 FK relationships, ER diagram ready',
    ],
    plan: 'Generated 6 tables, 14 FK relationships, 8 indexes. Schema validated against normalization 3NF.',
    narrative: 'A complete blog platform schema — users write posts, posts have tags via junction table, comments belong to posts and users. All FKs indexed.',
  },
]

type Msg =
  | { kind: 'user'; text: string }
  | { kind: 'bot'; scenario: DemoScenario }

export default function Demo() {
  const [messages, setMessages] = useState<Msg[]>([])
  const [thinking, setThinking] = useState(false)
  const [activeScenario, setActiveScenario] = useState<DemoScenario | null>(null)
  const [expandedPlan, setExpandedPlan] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const autoStartRef = useRef<number | null>(null)

  const runScenario = (scenario: DemoScenario) => {
    setExpandedPlan(false)
    setMessages((m) => [...m, { kind: 'user', text: scenario.question }])
    setThinking(true)
    setActiveScenario(null)
    const t1 = window.setTimeout(() => {
      setThinking(false)
      setMessages((m) => [...m, { kind: 'bot', scenario }])
      setActiveScenario(scenario)
      const t2 = window.setTimeout(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }, 50)
      return () => clearTimeout(t2)
    }, 1500)
    return () => clearTimeout(t1)
  }

  const handleChip = (s: DemoScenario) => {
    if (activeScenario === s) return
    runScenario(s)
  }

  useEffect(() => {
    autoStartRef.current = window.setTimeout(() => {
      runScenario(SCENARIOS[0])
    }, 1200)
    return () => {
      if (autoStartRef.current) clearTimeout(autoStartRef.current)
    }
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, thinking])

  return (
    <section className="demo section" id="demo">
      <div className="container-wide">
        <div className="section-header reveal" data-reveal>
          <div className="section-eyebrow">
            <span className="eyebrow-bar" />
            Live Demo
          </div>
          <h2 className="section-heading">
            See Verbis <span className="heading-accent">in action</span>
          </h2>
          <p className="section-sub">
            Click any question below. Watch Verbis reason, generate, and explain — no syntax, no Googling, no copy-paste from Stack Overflow.
          </p>
        </div>

        <div className="demo__glow" aria-hidden />
        <div className="demo__panel glass-card reveal" data-reveal>
          {/* Sidebar — hidden on mobile */}
          <aside className="demo__sidebar" aria-hidden>
            <div className="demo__sidebar-label">EXPLORER</div>
            <div className="demo__sidebar-section">
              <div className="demo__sidebar-label">▾ CONNECTIONS</div>
              <div className="demo__sidebar-item demo__sidebar-item--active">
                <span className="demo__sidebar-dot" /> postgres · main
              </div>
              <div className="demo__sidebar-item">
                <span className="demo__sidebar-dot demo__sidebar-dot--muted" /> mongo · analytics
              </div>
            </div>
            <div className="demo__sidebar-section">
              <div className="demo__sidebar-label">▾ SCHEMA</div>
              <div className="demo__sidebar-item">customers</div>
              <div className="demo__sidebar-item">orders</div>
              <div className="demo__sidebar-item">employees</div>
              <div className="demo__sidebar-item">departments</div>
            </div>
            <div className="demo__sidebar-section">
              <div className="demo__sidebar-label">▾ HISTORY</div>
              <div className="demo__sidebar-item demo__sidebar-item--history">Top customers Q3</div>
              <div className="demo__sidebar-item demo__sidebar-item--history">Avg salary by dept</div>
              <div className="demo__sidebar-item demo__sidebar-item--history">Active users 7d</div>
            </div>
          </aside>

          {/* Chat */}
          <div className="demo__main">
            <div className="demo__header">
              <span className="demo__header-title">VERBIS · Intelligent Database Assistant</span>
              <span className="demo__header-status">
                <span className="demo__header-pulse" /> ready
              </span>
            </div>

            <div className="demo__chat" ref={scrollRef} role="log" aria-live="polite">
              {messages.length === 0 && !thinking && (
                <div className="demo__empty">
                  <span className="demo__empty-icon">💬</span>
                  Click a question below to begin
                </div>
              )}
              {messages.map((m, i) =>
                m.kind === 'user' ? (
                  <div key={i} className="demo__msg demo__msg--user">
                    <div className="demo__msg-bubble demo__msg-bubble--user">{m.text}</div>
                  </div>
                ) : (
                  <div key={i} className="demo__msg demo__msg--bot">
                    <div className="demo__msg-avatar">V</div>
                    <div className="demo__msg-bubble demo__msg-bubble--bot">
                      <div className="demo__response-header">
                        <span className="demo__confidence">
                          <span className="demo__confidence-ring" style={{ '--p': m.scenario.confidencePct + '%' } as React.CSSProperties} />
                          {m.scenario.confidence}
                        </span>
                        <span className="pill demo__badge">{m.scenario.badge}</span>
                      </div>
                      <pre className="code-block demo__sql">
                        {m.scenario.sql.map((line, idx) => (
                          <div key={idx}>{highlightSQL(line)}</div>
                        ))}
                      </pre>
                      <button
                        className="demo__plan-toggle"
                        onClick={() => setExpandedPlan((v) => !v)}
                        aria-expanded={expandedPlan}
                      >
                        <span className="demo__plan-arrow">{expandedPlan ? '▾' : '▸'}</span>
                        Execution Plan
                      </button>
                      {expandedPlan && (
                        <div className="demo__plan">{m.scenario.plan}</div>
                      )}
                      <div className="demo__narrative">
                        <span className="demo__narrative-label">📊 Narrative</span>
                        <p>{m.scenario.narrative}</p>
                      </div>
                    </div>
                  </div>
                )
              )}
              {thinking && (
                <div className="demo__msg demo__msg--bot">
                  <div className="demo__msg-avatar">V</div>
                  <div className="demo__msg-bubble demo__msg-bubble--bot demo__msg-bubble--thinking">
                    <span className="demo__think-dot" />
                    <span className="demo__think-dot" />
                    <span className="demo__think-dot" />
                  </div>
                </div>
              )}
            </div>

            {/* Chips */}
            <div className="demo__chips">
              {SCENARIOS.map((s) => (
                <button
                  key={s.question}
                  className={`demo__chip ${activeScenario === s ? 'is-active' : ''}`}
                  onClick={() => handleChip(s)}
                >
                  {s.question}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="demo__cta">
          <a
            href={MARKETPLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Install Verbis — Try it yourself
          </a>
        </div>
      </div>
    </section>
  )
}

function highlightSQL(line: string) {
  const tokens: { type: string; value: string }[] = []
  const re = /(\s+)|('[^']*')|(\b\d+(\.\d+)?\b)|(\b(SELECT|FROM|WHERE|JOIN|ON|GROUP BY|ORDER BY|LIMIT|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|AND|OR|NOT|NULL|AS|ASC|DESC|BETWEEN|IN|LIKE|AVG|SUM|COUNT|MAX|MIN|EXTRACT|YEAR|FROM|DATE_SUB|NOW|INTERVAL|DAY|DISTINCT)\b)|(--[^\n]*)|([A-Za-z_][A-Za-z0-9_]*)|([(),.;])/gi
  let m: RegExpExecArray | null
  let lastIdx = 0
  while ((m = re.exec(line)) !== null) {
    if (m.index > lastIdx) tokens.push({ type: 'punc', value: line.slice(lastIdx, m.index) })
    if (m[2]) tokens.push({ type: 'str', value: m[2] })
    else if (m[3]) tokens.push({ type: 'num', value: m[3] })
    else if (m[6]) tokens.push({ type: 'kw', value: m[6] })
    else if (m[7]) tokens.push({ type: 'com', value: m[7] })
    else if (m[8]) tokens.push({ type: 'fn', value: m[8] })
    else if (m[9]) tokens.push({ type: 'punc', value: m[9] })
    else if (m[1]) tokens.push({ type: 'ws', value: m[1] })
    lastIdx = re.lastIndex
  }
  if (lastIdx < line.length) tokens.push({ type: 'punc', value: line.slice(lastIdx) })
  return (
    <>
      {tokens.map((t, i) => (
        <span key={i} className={`tok-${t.type}`}>{t.value}</span>
      ))}
    </>
  )
}
