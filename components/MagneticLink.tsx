'use client'

import { useMotionValue, useSpring, useTransform, motion, useReducedMotion } from 'framer-motion'
import Link, { LinkProps } from 'next/link'
import React from 'react'

type Props = LinkProps & {
  className?: string
  children: React.ReactNode
}

export default function MagneticLink({ className = '', children, ...linkProps }: Props) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })
  const translateX = useTransform(springX, (v) => v)
  const translateY = useTransform(springY, (v) => v)

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return
    const rect = e.currentTarget.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    x.set(dx * 0.2)
    y.set(dy * 0.2)
  }
  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div style={{ translateX, translateY }} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <Link {...linkProps} className={className}>
        {children}
      </Link>
    </motion.div>
  )
}
