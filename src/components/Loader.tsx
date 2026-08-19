import { useEffect, useState } from 'react'
import './Loader.css'

interface LoadingLine {
  text: string
  delay: number
  type: 'status' | 'gap' | 'sql-kw' | 'sql' | 'result'
}

const LOADING_LINES: LoadingLine[] = [
  { text: 'CONNECTING TO verbis.core...',           delay: 0,    type: 'status' },
  { text: '',                                        delay: 500,  type: 'gap' },
  { text: 'SELECT * FROM intelligence',              delay: 700,  type: 'sql-kw' },
  { text: "WHERE capability = 'nl2sql'",             delay: 1200, type: 'sql' },
  { text: '  AND privacy = guaranteed',              delay: 1700, type: 'sql' },
  { text: "  AND latency < '3s';",                   delay: 2100, type: 'sql' },
  { text: '',                                        delay: 2400, type: 'gap' },
  { text: '1 row returned.',                         delay: 2700, type: 'result' },
]

interface LoaderProps {
  onDone: () => void
}

export default function Loader({ onDone }: LoaderProps) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [progressVisible, setProgressVisible] = useState(false)
  const [progressComplete, setProgressComplete] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [removed, setRemoved] = useState(false)

  useEffect(() => {
    const timers: number[] = []
    LOADING_LINES.forEach((line, i) => {
      const t = window.setTimeout(() => setVisibleLines(i + 1), line.delay)
      timers.push(t)
    })

    // Show progress bar after last line
    const showProgress = window.setTimeout(() => setProgressVisible(true), 3200)
    timers.push(showProgress)

    // Fill progress bar
    const fillProgress = window.setTimeout(() => setProgressComplete(true), 3500)
    timers.push(fillProgress)

    // Start exit slide
    const startExit = window.setTimeout(() => setExiting(true), 4200)
    timers.push(startExit)

    // Remove from DOM
    const remove = window.setTimeout(() => setRemoved(true), 4900)
    timers.push(remove)

    // Notify done
    const done = window.setTimeout(() => onDone(), 4900)
    timers.push(done)

    return () => timers.forEach(clearTimeout)
  }, [onDone])

  if (removed) return null

  return (
    <div className={`loading-screen ${exiting ? 'exiting' : ''}`}>
      <div className="loading-content">
        {LOADING_LINES.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className={`loading-line visible type-${line.type}`}
          >
            {line.text || '\u00A0'}
          </div>
        ))}

        <div className={`loading-progress-bar ${progressVisible ? 'visible' : ''}`}>
          <div className={`loading-progress-fill ${progressComplete ? 'complete' : ''}`} />
        </div>
      </div>
    </div>
  )
}
