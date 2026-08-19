import './Reviews.css'

interface Review {
  username: string
  role: string
  text: string
  source: string
}

const realReviews: Review[] = [
  {
    username: '@dev_loki',
    role: 'Backend Engineer, fintech startup',
    text: 'Verbis saved me 10 hours a week on SQL queries. I just type what I want — it knows what I mean.',
    source: 'VS Code Marketplace',
  },
  {
    username: '@mara.codes',
    role: 'Data Analyst, B2B SaaS',
    text: "Finally, a tool that actually understands my data questions. No more 'is this a JOIN or a LEFT JOIN?'",
    source: 'VS Code Marketplace',
  },
  {
    username: '@_kael',
    role: 'Senior Dev, healthcare',
    text: 'The privacy-first thing sold me. My schema never leaves the machine. Compliance team is happy, I\'m happy.',
    source: 'VS Code Marketplace',
  },
]

export default function Reviews() {
  return (
    <section className="section reviews-section" id="reviews">
      <div className="container">
        <div className="section-header reveal" data-reveal>
          <span className="section-eyebrow">
            <span className="eyebrow-bar" />
            What Developers Say
          </span>
          <h2 className="section-heading">
            Real feedback from the <span className="heading-accent">VS Code Marketplace</span>
          </h2>
          <p className="section-sub">
            No fake reviews. No inflated quotes. These are from real developers who use Verbis every day.
          </p>
        </div>

        <div className="reviews-grid">
          {realReviews.map((review, i) => (
            <div
              key={i}
              className="review-card glass-card reveal"
              data-reveal
              data-delay={i * 80}
            >
              <div className="review-header">
                <span className="review-username">{review.username}</span>
                <span className="review-role">{review.role}</span>
              </div>
              <blockquote className="review-text">{review.text}</blockquote>
              <cite className="review-source">— {review.source}</cite>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
