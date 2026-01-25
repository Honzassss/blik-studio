'use client'

import { useMotionValue, useSpring, useTransform, motion, useReducedMotion, HTMLMotionProps } from 'framer-motion'
import React from 'react'

type Props = Omit<HTMLMotionProps<'button'>, 'onMouseMove' | 'onMouseLeave'> & {
  children: React.ReactNode
}

export default function MagneticButton({ children, className = '', ...rest }: Props) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })
  const translateX = useTransform(springX, (v) => v)
  const translateY = useTransform(springY, (v) => v)

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
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
    <motion.button
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ translateX, translateY }}
      className={`px-9 py-3.5 rounded-xl font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5 ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  )
}
