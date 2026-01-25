'use client'

import { useEffect } from 'react'

export function useHorizontalScroll(sectionId: string) {
  useEffect(() => {
    const section = document.getElementById(sectionId)
    const track = section?.querySelector('.track') as HTMLElement | null
    if (!section || !track) return

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let active = false

    const updateActive = () => {
      const r = section.getBoundingClientRect()
      // >= matters - activates exactly when pinned
      active = r.top <= 0 && r.bottom >= window.innerHeight
    }

    const atStart = () => track.scrollLeft <= 0
    const atEnd = () => track.scrollLeft + track.clientWidth >= track.scrollWidth - 1

    const onWheel = (e: WheelEvent) => {
      if (!active) return

      const dy = e.deltaY
      const canScroll = (dy > 0 && !atEnd()) || (dy < 0 && !atStart())

      if (canScroll) {
        e.preventDefault() // Lock vertical scroll
        track.scrollLeft += dy // Map vertical to horizontal
      }
      // else: at edge -> allow normal vertical scroll
    }

    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('wheel', onWheel, { passive: false, capture: true })
    updateActive()

    return () => {
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('wheel', onWheel, { capture: true } as any)
    }
  }, [sectionId])
}
