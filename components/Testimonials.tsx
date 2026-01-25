'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { testimonials } from '@/lib/constants'
import { useI18n } from '@/lib/i18n'

export default function Testimonials() {
  const { t } = useI18n()
  const testimonialKeys = ['sarah', 'michael', 'emma', 'david'] as const
  return (
    <section className="relative py-24 md:py-40 bg-gradient-to-b from-primary-50 to-white dark:from-[#221e1a] dark:to-[#1d1a17] overflow-hidden">
      {/* Section separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-200 dark:via-[#2a2520] to-transparent" />
      
      <div className="container-custom">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16 md:mb-24 space-y-4"
        >
          <p className="text-sm md:text-base font-semibold text-primary-600 uppercase tracking-wider">
            © {t.testimonials.label}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {t.testimonials.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mt-6">
            {t.testimonials.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => {
            const itemKey = testimonialKeys[index]
            const translatedTestimonial = t.testimonials.items?.[itemKey]
            return (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-white dark:bg-[#1f1b18] border border-primary-100 dark:border-[#2a2520]"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                &ldquo;{translatedTestimonial?.content || testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold">
                  {(translatedTestimonial?.name || testimonial.name).charAt(0)}
                </div>
                <div>
                  <div className="font-semibold">{translatedTestimonial?.name || testimonial.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {translatedTestimonial?.role || testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
            )
          })}
        </div>

        {/* Bottom divider */}
        <div className="border-t border-primary-100 dark:border-[#2a2520] mt-16 md:mt-24" />
      </div>
    </section>
  )
}
