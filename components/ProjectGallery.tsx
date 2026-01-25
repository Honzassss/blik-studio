'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/projects'
import { useI18n } from '@/lib/i18n'

type Props = {
  projects: Project[]
}

export default function ProjectGallery({ projects }: Props) {
  const { t } = useI18n()
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null)
  const [filter, setFilter] = useState<'all' | 'web' | 'saas' | 'app'>('all')
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 })
  const containerRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || reduce) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const categories = [
    { value: 'all' as const, label: t.projects.filters.all },
    { value: 'web' as const, label: t.projects.filters.web },
    { value: 'saas' as const, label: t.projects.filters.saas },
    { value: 'app' as const, label: t.projects.filters.app },
  ]

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="relative">
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-12 md:mb-16">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === cat.value
                ? 'bg-primary-700 text-white'
                : 'bg-primary-50 dark:bg-[#221e1a] text-gray-700 dark:text-gray-200 hover:bg-primary-100 dark:hover:bg-[#27221d] border border-primary-100 dark:border-[#2a2520]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Desktop: list + hover preview */}
      <div className="hidden lg:block">
        <div className="space-y-1">
          {filtered.map((project, idx) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group block"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: reduce ? 0.2 : 0.5, delay: reduce ? 0 : idx * 0.05 }}
                className="flex items-center justify-between py-6 border-b border-primary-100 dark:border-[#2a2520] hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold group-hover:translate-x-2 transition-transform">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    {project.description}
                  </p>
                </div>
                <div className="flex items-center gap-6 ml-8">
                  <div className="flex flex-wrap gap-2 justify-end">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-primary-50 dark:bg-[#221e1a] rounded border border-primary-100 dark:border-[#2a2520]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Hover preview (follows cursor) */}
        <AnimatePresence>
          {hoveredProject && !reduce && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              style={{
                left: springX,
                top: springY,
                x: '-50%',
                y: '-50%',
              }}
              className="pointer-events-none fixed z-50 w-80 h-52 rounded-2xl overflow-hidden shadow-2xl border-2 border-white dark:border-[#27221d]"
            >
              <Image
                src={hoveredProject.image}
                alt={hoveredProject.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-sm font-semibold">{hoveredProject.title}</p>
                <p className="text-white/80 text-xs mt-1">{hoveredProject.outcome}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile/tablet: stacked card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:hidden">
        {filtered.map((project, idx) => (
          <Link key={project.slug} href={`/projects/${project.slug}`} className="group block">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#221e1a] border border-primary-100 dark:border-[#2a2520] hover:border-primary-300 dark:hover:border-primary-700 transition-all hover:shadow-xl"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-primary-50 dark:bg-[#27221d] rounded border border-primary-100 dark:border-[#2a2520]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  )
}
