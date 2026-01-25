'use client'

import { motion, useReducedMotion } from 'framer-motion'

type Props = {
  lines: string[]
  className?: string
  as?: 'h1' | 'h2' | 'div'
}

export default function KineticHeadline({ lines, className, as = 'h1' }: Props) {
  const reduce = useReducedMotion()
  const base = 0.12

  const Wrapper: any = as

  return (
    <Wrapper className={`text-4xl md:text-5xl lg:text-6xl font-bold ${className || ''}`}>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20, letterSpacing: '-0.01em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '0em' }}
          transition={{ duration: reduce ? 0.3 : 0.7, delay: reduce ? 0 : base * i, ease: 'easeOut' }}
          className="leading-tight break-words"
        >
          <span>{line}</span>
        </motion.div>
      ))}
    </Wrapper>
  )
}
