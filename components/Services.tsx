'use client'

import { motion } from 'framer-motion'
import { services } from '@/lib/constants'
import RevealText from './RevealText'
import { useI18n } from '@/lib/i18n'

export default function Services() {
  const { t } = useI18n()
  const serviceKeys = ['webDev', 'uxDesign', 'mobile', 'perf', 'seo', 'support'] as const
  return (
    <section id="services" className="relative py-24 md:py-40 bg-white dark:bg-[#1d1a17] overflow-hidden">
      {/* Section separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-200 dark:via-[#2a2520] to-transparent" />
      
      <div className="container-custom">
        {/* Section header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <RevealText as="div" className="space-y-4">
            <p className="text-sm md:text-base font-semibold text-primary-600 uppercase tracking-wider">
              © {t.services.label}
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {t.services.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mt-6">
              {t.services.description}
            </p>
          </RevealText>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 md:mb-24">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 md:p-10 rounded-2xl bg-primary-50 dark:bg-[#221e1a] border border-primary-100 dark:border-[#2a2520] hover:border-primary-200 dark:hover:border-[#2a2520] transition-all hover:shadow-xl"
            >
              <div className="w-12 h-12 mb-6 rounded-xl bg-primary-600/10 dark:bg-primary-600/20 flex items-center justify-center group-hover:bg-primary-600/20 dark:group-hover:bg-primary-600/30 transition-colors">
                <service.icon className="w-6 h-6 text-primary-600" />
              </div>

              {(() => {
                const itemKey = serviceKeys[index]
                return (
                  <>
                    <h3 className="text-2xl font-bold mb-3">{t.services.items?.[itemKey]?.title || service.title}</h3>
                    <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                      {t.services.items?.[itemKey]?.description || service.description}
                    </p>
                  </>
                )
              })()}

              <ul className="space-y-3">
                {service.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <span className="text-primary-600 font-bold mt-0.5">→</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom divider */}
        <div className="border-t border-primary-100 dark:border-[#2a2520]" />
      </div>
    </section>
  )
}
