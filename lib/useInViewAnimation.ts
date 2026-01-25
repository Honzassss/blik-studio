import { useEffect, useRef, useState } from 'react'

/**
 * Hook for lazily triggering animations when component comes into view
 * Uses IntersectionObserver for optimal perf, respects prefers-reduced-motion
 */
export function useInViewAnimation(options = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      // If user prefers reduced motion, immediately mark as in view
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        // Unobserve after triggering to save perf
        observer.unobserve(entry.target)
      }
    }, options)

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [options])

  return { ref, isInView }
}
