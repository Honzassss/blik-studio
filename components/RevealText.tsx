'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

type Props = {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'p' | 'span' | 'h1' | 'h2' | 'h3'
}

export default function RevealText({ children, className = '', delay = 0, as = 'div' }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const reduce = useReducedMotion()

  const Wrapper: any = as

  return (
    <Wrapper ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: reduce ? 0.2 : 0.6, delay: reduce ? 0 : delay, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </Wrapper>
  )
}
