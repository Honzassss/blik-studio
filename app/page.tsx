'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Hero from '@/components/Hero'
import FeaturedProjects from '@/components/FeaturedProjects'

// Defer heavy components below-fold (lazy load with no SSR for animation-heavy components)
const Services = dynamic(() => import('@/components/Services'), {
  loading: () => <div className="h-96" />,
  ssr: true,
})

const Process = dynamic(() => import('@/components/Process'), {
  loading: () => <div className="h-96" />,
  ssr: true,
})

const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  loading: () => <div className="h-96" />,
  ssr: true,
})

const TechStack = dynamic(() => import('@/components/TechStack'), {
  loading: () => <div className="h-96" />,
  ssr: true,
})

const CTASection = dynamic(() => import('@/components/CTASection'), {
  loading: () => <div className="h-32" />,
  ssr: true,
})

const ContactSection = dynamic(() => import('@/components/ContactSection'), {
  loading: () => <div className="h-96" />,
  ssr: true,
})

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Suspense fallback={<div className="h-96" />}>
        <Services />
      </Suspense>
      <Suspense fallback={<div className="h-96" />}>
        <Process />
      </Suspense>
      <Suspense fallback={<div className="h-96" />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<div className="h-96" />}>
        <TechStack />
      </Suspense>
      <Suspense fallback={<div className="h-32" />}>
        <CTASection />
      </Suspense>
      <Suspense fallback={<div className="h-96" />}>
        <ContactSection />
      </Suspense>
    </>
  )
}
