import { useEffect, useState } from 'react'
import Loader from './components/Loader'
import SqlCursor from './components/SqlCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Demo from './components/Demo'
import Reviews from './components/Reviews'
import InstallAbout from './components/InstallAbout'
import Footer from './components/Footer'
import { useScrollReveal } from './hooks/useScrollReveal'

export default function App() {
  const [booted, setBooted] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)

  useScrollReveal()

  useEffect(() => {
    document.body.style.overflow = booted ? '' : 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [booted])

  useEffect(() => {
    if (booted) {
      const t = window.setTimeout(() => setContentVisible(true), 50)
      return () => clearTimeout(t)
    }
  }, [booted])

  return (
    <>
      {!booted && <Loader onDone={() => setBooted(true)} />}
      <SqlCursor />

      <div className={`app-content ${contentVisible ? 'is-visible' : ''}`}>
        <Navbar />
        <main>
          <Hero />\n          <Features />
          <Demo />
          <Reviews />
          <InstallAbout />
        </main>
        <Footer />
      </div>
    </>
  )
}
