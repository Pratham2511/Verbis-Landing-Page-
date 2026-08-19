# 🚀 VERBIS — Promotional Website

> The official landing page for **Verbis — Intelligent Database Assistant**, a VS Code extension that converts natural language into optimized SQL & NoSQL queries using AI.

A single-page promotional website. Built to feel handcrafted — developer-to-developer, not corporate SaaS template #42. The orange SQL caret is the signature; everything else complements it.

![Verbis](https://img.shields.io/badge/Verbis-v1.1.0-F97316?style=for-the-badge&logo=visualstudiocode&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-38BDF8?style=for-the-badge)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-F97316?style=for-the-badge)

---

## 🎯 What is Verbis?

Verbis is a VS Code extension that lets developers talk to their databases in plain English. Ask a question, get an optimized SQL/NoSQL query, see results explained in plain language, and let the assistant learn your preferences over time.

- **Privacy-first** — schema names are AES-256-GCM anonymized before any LLM call
- **94% confidence-calibrated output** with multi-path reasoning
- **18 novel research contributions** grounded in 40+ papers (2024–2026)
- **Blazing performance** — simple queries <3s, complex multi-joins <8s, UI renders <100ms
- **MIT licensed** — fully open-source, hackable

### 🔗 Important Links

| Resource | URL |
|----------|-----|
| 📦 **Install on VS Code Marketplace** | https://marketplace.visualstudio.com/items?itemName=Pratham2511.verbis-db-assistant |
| 💻 **Source Code (Extension)** | https://github.com/Pratham2511/Verbis-Intelligent-Database-Assistant |
| 🌐 **This Landing Page Repo** | https://github.com/Pratham2511/Verbis-Landing-Page- |
| 👨‍💻 **Author — Pratham** | https://github.com/Pratham2511 |

---

## ✨ Website Features

A focused, 7-section promotional site — no scrolling novel, no generic SaaS clichés. Every element answers one of: what does it do, why care, why trust.

### Global Effects

1. **SQL Cursor** — the signature orange SQL caret that follows the mouse. Lerp factor of 0.32 feels instant with zero visible lag and zero overshoot. Hovering interactive elements snaps into a crosshair + dot; click squeezes the bar. **Magnetic snap** pulls toward nearby links/buttons. Disabled on touch devices and reduced-motion users.
2. **ER Diagram Background** — a faint SVG ER diagram (4–6% opacity) sits behind everything — tables, columns, and relationship lines softly pulsing. Hidden on mobile.
3. **System Boot Loader** — a full-screen terminal that types a 5-line boot sequence character-by-character, then flashes orange and slides up to reveal the site.
4. **Scroll-Triggered Reveals** — every section animates in via `IntersectionObserver` (threshold 0.15, once-fire) with staggered delays.

### Sections (Top to Bottom)

| # | Section | What it does |
|---|---------|--------------|
| 0 | **Navbar** | Sticky glassmorphism bar with pulsing live dot, 5 nav links with animated underline, VS Code + GitHub CTAs, mobile hamburger overlay |
| 1 | **Hero** | Split-pane transformation: NL input on the left types out a real question, an animated beam fires across, and the SQL output appears on the right with confidence/time/dialect badges. Includes a green "💾 Remembered:" memory note. Auto-cycles 3 real examples every 5s. Headline: "SQL without the SQL." |
| 2 | **Features** | 4 cards in a 2-column grid, each with a real code block + copy button. Ask anything, Zero bytes to the cloud, Under 3 seconds, Learn once. Hover lifts and glows. |
| 3 | **Demo** | Interactive chat simulation — 4 scenarios including "Customers who haven't ordered in 90 days." Real SQL syntax highlighting, expandable execution plans, narrative insights. Live "Install Verbis" CTA below. |
| 4 | **Social Proof** | Live GitHub stars badge (fetched from API) + 3 developer testimonials in glass cards. |
| 5 | **Install + About** | Merged section. Left: 3-step install guide with VS Code + GitHub buttons and copyable commands. Right: about the author with a real story — why Verbis exists, what it stands for. |
| 6 | **Feedback** | "Built it. Ship it. Tell me what's broken." Form with success animation, plus quick links (bug report, feature request, GitHub, email). |
| 7 | **Footer** | Live GitHub stars badge, tech stack chips (FastAPI · React · ChromaDB · sqlglot · VS Code API), socials, "Made with ❤ and too much coffee." |

**Deleted with no mercy**: tech marquee, 5-step pipeline, architecture diagram, 18-row research table, 6-number stats section. None of them earned their place on a promo site.

---

## 🎨 Design System

### Color Palette

```css
/* Primary — the orange signature */
--color-primary:        #F97316;      /* Orange */
--color-primary-hover:  #FB923C;
--color-primary-glow:   rgba(249, 115, 22, 0.5);

/* Backgrounds — deep navy, not pure black */
--bg-base:        #0F172A;
--bg-surface:     rgba(15, 23, 42, 0.8);  /* Glass effect */
--bg-elevated:    rgba(15, 23, 42, 0.9);
--bg-deep:        #020617;                /* Code blocks */

/* Text */
--text-primary:   #F1F5F9;
--text-secondary: #94A3B8;
--text-dim:       #475569;

/* Accents */
--color-success:  #4ADE80;   /* Memory notes, success states */
--color-cool:     #38BDF8;   /* SQL keywords, blue accents */
--color-amber:    #FBBF24;   /* Numbers, warm highlights */

/* Gradients */
--gradient-primary:     linear-gradient(135deg, #F97316 0%, #EA580C 100%);
--gradient-glow:        linear-gradient(90deg, transparent, var(--color-primary-glow), transparent);
--gradient-accent-text: linear-gradient(135deg, #F97316, #FBBF24);
```

### Typography

```css
--font-headline: 'Space Grotesk', sans-serif;   /* 700/800 weights */
--font-body:     'IBM Plex Sans', sans-serif;   /* 400/500/600 weights */
--font-mono:     'JetBrains Mono', monospace;  /* 400/500/600 weights */

h1 { font-family: var(--font-headline); font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 800; letter-spacing: -0.02em; }
h2 { font-family: var(--font-headline); font-size: clamp(2rem, 5vw, 2.75rem); font-weight: 700; }
body, p { font-family: var(--font-body); font-size: 1rem; line-height: 1.7; color: var(--text-secondary); }
code, pre { font-family: var(--font-mono); font-size: 0.875rem; }
```

### Glass Card

The universal surface — used everywhere a card appears:

```css
.glass-card {
  background: var(--bg-surface);
  backdrop-filter: blur(10px) saturate(1.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.glass-card:hover {
  border-color: rgba(249, 115, 22, 0.3);
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}
/* Top glow line on hover */
.glass-card::before { /* gradient-glow stripe on hover */ }
```

### Layout Primitives

Three container widths kill dead whitespace:

```css
--container-wide:    min(1440px, 96vw);  /* Hero, Features, Demo */
--container-max:     min(1320px, 95vw);  /* All other sections */
--container-narrow:  min(800px, 92vw);   /* Install narrow blocks */
--container-padding: clamp(1.5rem, 4vw, 2.5rem);
```

---

## 🛠 Tech Stack

- **Vite 5** — build tooling, ~880ms cold build
- **React 18** — UI library
- **TypeScript 5.6** — strict mode, zero type errors
- **Vanilla CSS** — no Tailwind, no CSS-in-JS, just CSS custom properties
- **BEM-ish naming** — `.block__element--modifier`
- **IntersectionObserver** — scroll-triggered reveals (no scroll listeners)
- **requestAnimationFrame** — count-up animations + cursor lerp
- **GitHub API** — live stars badge (no API key, just public endpoint)

Bundle sizes (well under the 500KB threshold):
- **JS**: 182 KB (57 KB gzipped)
- **CSS**: 38 KB (8 KB gzipped)
- **HTML**: 1.5 KB

---

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Start dev server (hot reload on http://localhost:5173)
npm run dev

# Type-check + production build (outputs to dist/)
npm run build

# Preview the production build locally
npm run preview
```

### Requirements

- Node.js 18+ (tested on 20 LTS)
- npm 9+

---

## 📦 Deployment

This is a static SPA — deploy the `dist/` folder anywhere:

### Vercel
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### GitHub Pages
```bash
# Build, then push dist/ to the gh-pages branch
npm run build
npx gh-pages -d dist
```

### Cloudflare Pages
Connect the repo, set build command to `npm run build`, output directory to `dist`.

---

## 🧠 Philosophy

**This is NOT a documentation site. This is NOT a tutorial. This is a PROMOTION.**

Every element must answer ONE of these:
1. **What does Verbis do?** (The hook)
2. **Why should I care?** (The benefit)
3. **Why should I trust it?** (The proof)

**Delete anything that doesn't serve these three questions.**

### What Verbis Stands For
- **Rebellion** — against SQL syntax memorization
- **Speed** — faster than writing queries manually
- **Privacy** — your data never leaves your machine
- **Simplicity** — no configuration, no learning curve
- **Craftsmanship** — built by a developer who gets it

### Copywriting Rules
1. Active voice: "Ask. Get SQL." not "SQL can be generated"
2. Developer language: "No more JOIN syntax hell" not "Simplifies database queries"
3. Use specifics: "<3 seconds", "AES-256-GCM", "0 bytes to the cloud" — not "fast", "secure", "private"
4. Use contrasts: "You ask in English. Verbis writes the SQL."
5. No jargon: avoid "revolutionary", "next-gen", "AI-powered", "cutting-edge"
6. Show, don't tell: instead of "powerful", show a complex query it generated

### Authenticity Check
If it looks like it could be on 100 other SaaS sites, **delete it or make it unique.**

---

## 🤝 Contributing

PRs welcome. The design system is intentionally minimal — if you add a new component, use the existing tokens (`--color-primary`, `--bg-surface`, `--font-headline`, etc.) rather than introducing new colors or fonts.

Before submitting:
- `npm run build` — must pass with zero errors
- Test on mobile (375px) — everything must work
- Squint test: headline + CTA must still stand out

---

## 📄 License

MIT © 2026 Pratham. See [LICENSE](./LICENSE).

---

**Made with ❤ and too much coffee.**
