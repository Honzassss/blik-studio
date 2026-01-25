'use client'

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import KineticHeadline from './KineticHeadline'
import MagneticLink from './MagneticLink'
import { useI18n } from '@/lib/i18n'

const heroPills = [
  'Conversion-driven UX',
  'Lightning-fast builds',
  'SEO-first approach',
  'Next.js + TypeScript',
  'Scalable architectures',
  'Analytics & CRO',
]

const featuredHighlights = [
  { label: 'Avg. lift', value: '+156% conversions' },
  { label: 'Performance', value: 'Lighthouse 95+' },
  { label: 'Delivery', value: '4-6 week sprints' },
]

export default function Hero() {
  const { t } = useI18n()
  const [isClient, setIsClient] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 20, mass: 0.3 })
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 20, mass: 0.3 })
  const spotlight = useMotionTemplate`radial-gradient(800px circle at ${smoothX}px ${smoothY}px, rgba(176,166,149,0.65), rgba(176,166,149,0.35) 40%, transparent 70%)`
  const spotlightGlow = useMotionTemplate`radial-gradient(1400px circle at ${smoothX}px ${smoothY}px, rgba(176,166,149,0.25), transparent 65%)`
  const rotateX = useTransform(smoothY, [0, 1200], [8, -8])
  const rotateY = useTransform(smoothX, [0, 1200], [-10, 10])

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isClient) return
    const { left, top } = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - left)
    mouseY.set(e.clientY - top)
  }

  return (
    <section
      id="home"
      className="relative pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background gradient + animated layers */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-primary-50 via-[#f3eeea] to-[#ebe3d5] dark:from-[#1d1a17] dark:via-[#221e1a] dark:to-[#2a2520]" />
      <div className="pointer-events-none absolute inset-0 -z-10 mix-blend-screen hidden md:block">
        <div className="hero-grid" />
        <div className="hero-noise" />
        <div className="hero-aurora" />
        <div className="hero-aurora hero-aurora-2" />
        <div className="hero-aurora hero-aurora-3" />
        <motion.div
          className="absolute inset-0 opacity-90"
          style={{ backgroundImage: spotlightGlow }}
        />
        <motion.div
          className="absolute inset-0 opacity-100"
          style={{ backgroundImage: spotlight }}
        />
      </div>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="hero-orb orb-1"
          animate={{ x: [0, 40, -30, 0], y: [0, -30, 20, 0], scale: [1, 1.05, 0.95, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hero-orb orb-2"
          animate={{ x: [0, -20, 30, 0], y: [0, 25, -20, 0], scale: [1, 0.92, 1.08, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hero-orb orb-3"
          animate={{ x: [0, 15, -25, 0], y: [0, -15, 18, 0], scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      
      <div className="container-custom relative">
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white dark:bg-[#1f1b18] rounded-full shadow-sm border border-primary-100 dark:border-[#2a2520]"
            >
              <Sparkles className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium">{t.hero.available}</span>
            </motion.div>

            {/* Headline */}
            <KineticHeadline
              className="mb-6"
              lines={[
                t.hero.title,
              ]}
            />

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-10 text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-2xl"
            >
              {t.hero.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-10"
            >
              <MagneticLink
                href="/#projects"
                className="px-9 py-3.5 bg-primary-700 text-white rounded-xl hover:bg-primary-800 transition-all font-semibold inline-block"
                onClick={(e) => handleScroll(e as any, 'projects')}
              >
                {t.hero.viewWork}
              </MagneticLink>
              <MagneticLink
                href="/#contact"
                className="px-9 py-3.5 bg-white dark:bg-[#1f1b18] text-gray-900 dark:text-white rounded-xl hover:bg-primary-50 dark:hover:bg-[#27221d] transition-all border border-primary-100 dark:border-[#2a2520] font-semibold inline-flex items-center gap-2"
                onClick={(e) => handleScroll(e as any, 'contact')}
              >
                {t.hero.getInTouch}
                <ArrowRight className="w-4 h-4" />
              </MagneticLink>
            </motion.div>

            {/* Marquee pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hero-marquee"
            >
              <div className="hero-marquee-track">
                {[...heroPills, ...heroPills].map((pill, idx) => (
                  <span key={idx} className="hero-pill">{pill}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column interactive card */}
          <motion.div
            style={{ rotateX, rotateY }}
            className="relative w-full hidden lg:block"
          >
            <motion.div
              className="relative rounded-[28px] bg-white/85 dark:bg-[#1f1b18]/85 border border-primary-100 dark:border-[#2a2520] shadow-2xl backdrop-blur-xl overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100/70 via-transparent to-transparent dark:from-[#27221d]/60" />
              <div className="p-8 md:p-10 space-y-6 relative z-10">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-600 text-white font-semibold shadow-md">QA</span>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Selected Case Study</p>
                    <p className="font-semibold text-lg">E-Commerce Redesign</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-200 text-base leading-relaxed">
                  Rebuilt a fashion storefront with conversion-focused UX, blazing performance, and a streamlined checkout.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {featuredHighlights.map((item) => (
                    <div key={item.label} className="p-3 rounded-xl bg-primary-50 dark:bg-[#27221d] border border-primary-100 dark:border-[#2a2520]">
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex -space-x-2">
                    <span className="w-9 h-9 rounded-full bg-primary-200/90 dark:bg-[#27221d] border border-white/80 dark:border-[#1d1a17] text-xs flex items-center justify-center font-semibold text-gray-800 dark:text-white">UX</span>
                    <span className="w-9 h-9 rounded-full bg-primary-200/60 dark:bg-[#1f1b18] border border-white/80 dark:border-[#1d1a17] text-xs flex items-center justify-center font-semibold text-gray-800 dark:text-white">FE</span>
                    <span className="w-9 h-9 rounded-full bg-primary-100/70 dark:bg-[#2a2520] border border-white/80 dark:border-[#1d1a17] text-xs flex items-center justify-center font-semibold text-gray-800 dark:text-white">SEO</span>
                  </div>
                  <Link
                    href="/projects/ecommerce-platform"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800"
                  >
                    View case study
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Floating chips */}
            <motion.div
              className="absolute -left-6 top-8 px-4 py-2 rounded-full bg-primary-700 text-white shadow-lg"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              Next.js • TypeScript
            </motion.div>
            <motion.div
              className="absolute -right-4 bottom-8 px-4 py-2 rounded-full bg-white dark:bg-[#1f1b18] border border-primary-100 dark:border-[#2a2520] text-sm font-semibold shadow-md"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            >
              Performance • 95+
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating call-to-action stripe */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-primary-100/60 via-transparent to-transparent dark:from-primary-900/30"
      />
    </section>
  )
}
