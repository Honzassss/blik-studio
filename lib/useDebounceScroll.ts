import { useEffect, useRef, useState } from 'react'

/**
 * RAF-throttled scroll handler for smooth, non-blocking scroll listeners
 * Respects prefers-reduced-motion and uses requestAnimationFrame for 60fps updates
 */
export function useDebounceScroll(callback: (scrollY: number) => void, threshold = 20) {
  const [isScrolled, setIsScrolled] = useState(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        ticking = true
        rafRef.current = requestAnimationFrame(() => {
          const scrollY = window.scrollY
          if (prefersReducedMotion) {
            setIsScrolled(scrollY > 0)
          } else {
            setIsScrolled(scrollY > threshold)
          }
          callback(scrollY)
          ticking = false
        })
      }
    }

    // Passive listener for better scroll perf
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [callback, threshold])

  return isScrolled
}
