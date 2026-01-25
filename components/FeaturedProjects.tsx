'use client'

import { motion } from 'framer-motion'
import ProjectGallery from './ProjectGallery'
import { getFeaturedProjects } from '@/lib/projects'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import RevealText from './RevealText'
import { useI18n } from '@/lib/i18n'

export default function FeaturedProjects() {
  const { t } = useI18n()
  const featuredProjects = getFeaturedProjects()

  return (
    <section id="projects" className="relative py-24 md:py-40 bg-gradient-to-b from-primary-50 via-white to-primary-50 dark:from-[#221e1a] dark:via-[#1d1a17] dark:to-[#221e1a] overflow-hidden">
      {/* Section separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-200 dark:via-[#2a2520] to-transparent" />
      
      <div className="container-custom">
        {/* Section header with subtitle style */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <RevealText as="div" className="space-y-4">
            <p className="text-sm md:text-base font-semibold text-primary-600 uppercase tracking-wider">
              {t.projects.badge}
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {t.projects.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mt-6">
              {t.projects.description}
            </p>
          </RevealText>
        </div>
        
        <ProjectGallery projects={featuredProjects} />

        {/* CTA to view all */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-16 md:mt-24 pt-16 md:pt-24 border-t border-primary-100 dark:border-[#2a2520]"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 uppercase tracking-wider">More work available</p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-9 py-3.5 bg-primary-700 text-white rounded-xl hover:bg-primary-800 transition-all hover:shadow-lg hover:-translate-y-0.5 font-semibold"
          >
            {t.projects.viewAll}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
