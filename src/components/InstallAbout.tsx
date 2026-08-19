import './InstallAbout.css'

const MARKETPLACE_URL = 'https://marketplace.visualstudio.com/items?itemName=Pratham2511.verbis-db-assistant'
const GITHUB_URL = 'https://github.com/Pratham2511/Verbis-Intelligent-Database-Assistant'

export default function InstallAbout() {
  return (
    <section className="section install-about-section" id="install-about">
      <div className="container">
        <div className="install-about-grid">
          {/* Left: Install */}
          <div className="install-steps">
            <div className="section-eyebrow">GET STARTED</div>
            <h2 className="section-heading-left">Up and running in 60 seconds</h2>

            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Install from VS Code Marketplace</h3>
                  <a
                    href={MARKETPLACE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Install Now
                  </a>
                </div>
              </div>

              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Get a Free API Key</h3>
                  <p>Grab a free Gemini API key, or use Groq for fast inference. Prefer offline? Run Ollama locally.</p>
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                  >
                    Get Free Key
                  </a>
                </div>
              </div>

              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Start Querying</h3>
                  <p>Open any workspace, press Ctrl+Shift+Q, and ask your first question in plain English.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: About */}
          <div className="about-card glass-card reveal" data-reveal data-delay={100}>
            <h3 className="about-name">Pratham Pansare</h3>
            <p className="about-role">Developer · Researcher · Creator</p>
            <p className="about-text">
              I built Verbis because every developer deserves to talk to their database without fighting SQL syntax.
            </p>
            <p className="about-text">
              What started as a research project with 18 novel contributions grew into a full-blown VS Code extension.
            </p>
            <p className="about-text">
              MIT licensed. Fully open-source. Built to be hacked on.
            </p>
            <div className="about-links">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="about-link"
              >
                GitHub
              </a>
              <a
                href={MARKETPLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="about-link"
              >
                VS Code Marketplace
              </a>
              <a href="mailto:pratham2511.dev@gmail.com" className="about-link">
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
