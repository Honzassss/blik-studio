import type { Metadata } from 'next'
/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import { skills } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'O mně',
  description: 'Zjistěte více o mém vzdělání, dovednostech a přístupu k webovému vývoji.',
}

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            title="About Me"
            subtitle="Passionate about building exceptional digital experiences"
            centered={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Profile image placeholder */}
            <div className="md:col-span-1">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-6xl font-bold">
                YN
              </div>
            </div>

            {/* Bio */}
            <div className="md:col-span-2 space-y-4 text-lg text-gray-600 dark:text-gray-300">
              <p>
                Hi! I'm a full-stack developer with over 8 years of experience building
                web applications that users love. I specialize in creating fast, accessible,
                and beautiful digital experiences using modern technologies.
              </p>
              <p>
                My journey in web development started when I built my first website in high
                school. Since then, I've had the privilege of working with startups,
                agencies, and established companies to bring their digital visions to life.
              </p>
              <p>
                I'm passionate about writing clean, maintainable code and staying up-to-date
                with the latest web technologies. When I'm not coding, you'll find me
                contributing to open-source projects, writing technical articles, or
                mentoring junior developers.
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Skills & Expertise</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="p-4 bg-primary-50 dark:bg-[#1f1b18] rounded-lg border border-primary-100 dark:border-[#2a2520]"
                >
                  <span className="font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Experience highlights */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Experience Highlights</h2>
            <div className="space-y-6">
              <div className="p-6 bg-primary-50 dark:bg-[#1f1b18] rounded-xl border border-primary-100 dark:border-[#2a2520]">
                <h3 className="text-xl font-semibold mb-2">Senior Full-Stack Developer</h3>
                <p className="text-primary-600 mb-3">Tech Company Inc. • 2021 - Present</p>
                <p className="text-gray-600 dark:text-gray-300">
                  Lead development of enterprise SaaS platform serving 10,000+ users.
                  Architected microservices infrastructure and mentored junior developers.
                </p>
              </div>

              <div className="p-6 bg-primary-50 dark:bg-[#1f1b18] rounded-xl border border-primary-100 dark:border-[#2a2520]">
                <h3 className="text-xl font-semibold mb-2">Web Developer</h3>
                <p className="text-primary-600 mb-3">Digital Agency • 2018 - 2021</p>
                <p className="text-gray-600 dark:text-gray-300">
                  Built custom websites and web applications for diverse clients across
                  e-commerce, healthcare, and finance industries.
                </p>
              </div>

              <div className="p-6 bg-primary-50 dark:bg-[#1f1b18] rounded-xl border border-primary-100 dark:border-[#2a2520]">
                <h3 className="text-xl font-semibold mb-2">Freelance Developer</h3>
                <p className="text-primary-600 mb-3">Self-Employed • 2016 - 2018</p>
                <p className="text-gray-600 dark:text-gray-300">
                  Provided web development services to small businesses and startups,
                  specializing in WordPress and custom PHP applications.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center p-12 bg-gradient-to-r from-primary-50 to-primary-200 dark:from-[#1f1b18] dark:to-[#27221d] rounded-2xl border border-primary-100 dark:border-[#2a2520]">
            <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              I'm currently available for freelance projects and full-time opportunities.
              Let's discuss how I can help bring your ideas to life.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all hover:scale-105 font-medium"
            >
              <Mail className="w-5 h-5" />
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
