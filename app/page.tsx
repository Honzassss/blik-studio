'use client'

import Hero from '@/components/Hero'
import FeaturedProjects from '@/components/FeaturedProjects'
import Services from '@/components/Services'
import Process from '@/components/Process'
import Testimonials from '@/components/Testimonials'
import TechStack from '@/components/TechStack'
import CTASection from '@/components/CTASection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Services />
      <Process />
      <Testimonials />
      <TechStack />
      <CTASection />
      <ContactSection />
    </>
  )
}
