import { useEffect, useRef } from 'react'
import './SqlCursor.css'

/**
 * SQL Cursor — idle state is a blinking orange vertical bar (the SQL caret).
 * Hovering interactive elements snaps into crosshair + dot.
 * Includes magnetic snap toward nearby links/buttons.
 * Disabled on touch devices.
 */
export default function SqlCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const pos = useRef({ x: -100, y: -100 })
  const target = useRef({ x: -100, y: -100 })

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduce.matches) return

    const el = cursorRef.current
    if (!el) return

    document.body.classList.add('sql-cursor-active')

    const onMove = (e: MouseEvent) => {
      let x = e.clientX
      let y = e.clientY

      // Magnetic snap toward interactive elements
      const interactive = document.elementFromPoint(x, y) as HTMLElement | null
      if (interactive) {
        const hit = interactive.closest('a, button, [data-cursor], [role="button"]') as HTMLElement | null
        if (hit) {
          const r = hit.getBoundingClientRect()
          const cx = r.left + r.width / 2
          const cy = r.top + r.height / 2
          const dx = x - cx
          const dy = y - cy
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 60) {
            // Pull 10% toward the center
            x += (cx - x) * 0.18
            y += (cy - y) * 0.18
          }
        }
      }

      target.current = { x, y }
    }

    const onEnter = () => el.classList.add('hovering')
    const onLeave = () => el.classList.remove('hovering')

    const onClick = () => {
      el.classList.add('clicking')
      window.setTimeout(() => el.classList.remove('clicking'), 200)
    }

    const attachHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, input, textarea, [data-cursor], [role="button"]')
      interactives.forEach((node) => {
        if ((node as HTMLElement).dataset.sqlCursorBound) return
        ;(node as HTMLElement).dataset.sqlCursorBound = '1'
        node.addEventListener('mouseenter', onEnter)
        node.addEventListener('mouseleave', onLeave)
      })
    }
    attachHoverListeners()
    const rescanTimer = window.setTimeout(attachHoverListeners, 1500)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('click', onClick)

    let frame = 0
    const animate = () => {
      // Lerp 0.32 — feels instant with no overshoot, no visible lag
      pos.current.x += (target.current.x - pos.current.x) * 0.32
      pos.current.y += (target.current.y - pos.current.y) * 0.32
      // translate3d forces GPU layer for buttery follow
      el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(rescanTimer)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('click', onClick)
      document.body.classList.remove('sql-cursor-active')
    }
  }, [])

  return <div ref={cursorRef} className="sql-cursor" aria-hidden="true" />
}
