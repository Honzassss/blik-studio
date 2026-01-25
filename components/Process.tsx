'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { processSteps } from '@/lib/constants'
import RevealText from './RevealText'
import { useI18n } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

export default function Process() {
  const { t } = useI18n()
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const cardCount = processSteps.length

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) return

    const ctx = gsap.context(() => {
      const getDistance = () => {
        const endBuffer = Math.max(window.innerWidth * 0.3, 240)
        return track.scrollWidth - window.innerWidth + endBuffer
      }
      const snapPoints = cardCount > 1 ? 1 / (cardCount - 1) : 1

      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          snap: snapPoints,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative py-24 md:py-40 bg-gradient-to-b from-white to-primary-50 dark:from-[#1d1a17] dark:to-[#221e1a] overflow-hidden">
      {/* Section separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-200 dark:via-[#2a2520] to-transparent" />
      
      <div className="container-custom mb-16 md:mb-24">
        {/* Section header */}
        <RevealText as="div" className="space-y-4">
          <p className="text-sm md:text-base font-semibold text-primary-600 uppercase tracking-wider">
            © {t.process.label}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {t.process.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mt-6">
            {t.process.description}
          </p>
        </RevealText>
      </div>

      {/* Horizontal scroll section pinned via GSAP ScrollTrigger */}
      <section ref={sectionRef} className="hscroll" id="process-hscroll">
        <div ref={trackRef} className="hscroll__track">
          <div className="hscroll__spacer-start" aria-hidden />
          {processSteps.map((step, index) => {
            const itemKey = ['discovery', 'design', 'development', 'launch'][index]
            const translatedStep = t.process.items[itemKey]
            return (
            <article
              key={step.number}
              className="hscroll__card rounded-2xl bg-white dark:bg-[#221e1a] border border-primary-100 dark:border-[#2a2520] shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between group px-8 md:px-10 py-8 md:py-10"
            >
              {/* Image */}
              {step.image && (
                <div className="relative w-full aspect-[4/3] mb-6 rounded-xl overflow-hidden border border-primary-100 dark:border-[#2a2520]">
                  <Image
                    src={step.image}
                    alt={translatedStep?.title || step.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 560px, 90vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/10" />
                </div>
              )}
              
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-5xl font-black text-primary-600/40 group-hover:text-primary-600/60 transition-colors">{step.number.toString().padStart(2, '0')}</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-primary-300 to-transparent dark:from-primary-700" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{translatedStep?.title || step.title}</h3>
                <p className="text-gray-700 dark:text-gray-200 text-base leading-relaxed">
                  {translatedStep?.description || step.description}
                </p>
              </div>
              <div className="mt-8 h-1.5 w-full bg-gradient-to-r from-primary-400 via-primary-300 to-transparent rounded-full" />
            </article>
            )
          })}
          <div className="hscroll__spacer-end" aria-hidden />
        </div>
      </section>

      {/* Bottom divider */}
      <div className="container-custom py-12">
        <div className="border-t border-primary-100 dark:border-[#2a2520]" />
      </div>
    </section>
  )
}
