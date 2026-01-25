'use client'

export default function NoiseOverlay() {
  return (
    <div className="pointer-events-none">
      <div className="grain-overlay fixed inset-0 z-10" />
      <div className="vignette-overlay" />
    </div>
  )
}
