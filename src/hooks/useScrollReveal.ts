import { useEffect, useRef } from 'react'

/**
 * IntersectionObserver-based scroll reveal.
 * Adds `.is-visible` to elements with `.reveal` when they enter viewport.
 * Stagger via `--reveal-delay` custom property in ms.
 */
export function useScrollReveal() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback: just show everything
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const delay = parseFloat(el.dataset.delay || '0')
            window.setTimeout(() => el.classList.add('is-visible'), delay)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )
    observerRef.current = observer

    const els = document.querySelectorAll('.reveal:not(.is-visible)')
    els.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}
