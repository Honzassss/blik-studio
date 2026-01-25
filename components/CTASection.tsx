'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'

export default function CTASection() {
  const { t } = useI18n()
  return (
    <section className="relative py-24 md:py-40 bg-gradient-to-b from-white to-primary-50 dark:from-[#1d1a17] dark:to-[#221e1a] overflow-hidden">
      {/* Section separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-200 dark:via-[#2a2520] to-transparent" />
      
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 p-8 md:p-16 text-center"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="mb-4 md:mb-6 text-4xl md:text-5xl font-bold text-white leading-tight">
              {t.cta.title}
            </h2>
            <p className="mb-8 md:mb-10 text-lg md:text-xl text-white/90">
              {t.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="px-9 py-3.5 bg-white text-primary-700 rounded-xl hover:bg-primary-50 transition-all hover:shadow-lg hover:-translate-y-0.5 font-semibold inline-flex items-center justify-center gap-2"
              >
                {t.cta.primaryButton}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/projects"
                className="px-9 py-3.5 bg-white/15 text-white rounded-xl hover:bg-white/25 transition-all border border-white/30 font-semibold backdrop-blur-sm"
              >
                {t.cta.secondaryButton}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
