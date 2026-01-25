'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { techStack } from '@/lib/constants'
import RevealText from './RevealText'
import { useState, useMemo, useCallback, useEffect } from 'react'
import { useI18n } from '@/lib/i18n'

export default function TechStack() {
  const { t } = useI18n()
  const [selectedId, setSelectedId] = useState(techStack[0]?.id)

  const selectedTool = useMemo(
    () => techStack.find(t => t.id === selectedId) ?? techStack[0],
    [selectedId]
  )

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const currentIndex = techStack.findIndex(t => t.id === selectedId)
    
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      const newIndex = currentIndex > 0 ? currentIndex - 1 : techStack.length - 1
      setSelectedId(techStack[newIndex].id)
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      const newIndex = currentIndex < techStack.length - 1 ? currentIndex + 1 : 0
      setSelectedId(techStack[newIndex].id)
    }
  }, [selectedId])
  
  return (
    <section className="relative py-24 md:py-40 bg-white dark:bg-[#1d1a17] overflow-hidden">
      {/* Section separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-200 dark:via-[#2a2520] to-transparent" />
      
      <div className="container-custom">
        {/* Section header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <RevealText as="div" className="space-y-4">
            <p className="text-sm md:text-base font-semibold text-primary-600 uppercase tracking-wider">
              © {t.techStack.label}
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {t.techStack.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mt-6">
              {t.techStack.description} <span className="text-primary-600 font-medium">Click to explore.</span>
            </p>
          </RevealText>
        </div>

        {/* Two-column layout: pills on left, details on right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-10 lg:gap-16 items-start">
          {/* Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div
              role="tablist"
              aria-label="Technology stack"
              className="flex flex-wrap gap-3 md:gap-4"
              onKeyDown={handleKeyDown}
            >
              {techStack.map((tech, index) => (
                <motion.button
                  key={tech.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedId === tech.id}
                  aria-controls="tech-details-panel"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => setSelectedId(tech.id)}
                  className={`
                    relative px-4 md:px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base font-medium
                    transition-all duration-200
                    border shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2
                    ${selectedId === tech.id
                      ? 'bg-primary-600 text-white border-primary-600 shadow-lg hover:bg-primary-700'
                      : 'bg-primary-50 dark:bg-[#221e1a] text-gray-700 dark:text-gray-200 border-primary-100 dark:border-[#2a2520] hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-md hover:-translate-y-0.5'
                    }
                  `}
                >
                  {tech.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Details Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            role="tabpanel"
            id="tech-details-panel"
            aria-labelledby={`tab-${selectedId}`}
            className="rounded-3xl bg-primary-100 dark:bg-[#221e1a] border border-primary-200 dark:border-[#2a2520] p-8 md:p-10 shadow-xl"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  {t.techStack.items[selectedId]?.name || selectedTool?.name}
                </h3>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t.techStack.items[selectedId]?.description || selectedTool?.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Bottom divider */}
        <div className="border-t border-primary-100 dark:border-[#2a2520] mt-16 md:mt-24" />
      </div>
    </section>
  )
}
