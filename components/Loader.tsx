'use client'

import { motion, useReducedMotion } from 'framer-motion'

type LoaderProps = {
  onComplete?: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const shouldReduceMotion = useReducedMotion()

  const duration = shouldReduceMotion ? 0.4 : 1.2

  return (
    <div className="fixed inset-0 z-[1000] bg-[#f3eeea] dark:bg-[#1d1a17] flex items-center justify-center">
      <div className="relative">
        {/* Wordmark */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration, ease: 'easeOut' }}
          className="text-3xl md:text-4xl font-bold tracking-tight"
        >
          Your Name
        </motion.h1>
        {/* Progress line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: duration, ease: 'easeInOut' }}
          onAnimationComplete={() => {
            // slight delay to feel premium
            setTimeout(() => onComplete?.(), shouldReduceMotion ? 100 : 300)
          }}
          className="mt-4 h-1 origin-left bg-gradient-to-r from-[#b0a695] via-[#776b5d] to-[#ebe3d5] rounded"
        />
      </div>
    </div>
  )
}
