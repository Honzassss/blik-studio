'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send } from 'lucide-react'
import RevealText from './RevealText'
import MagneticButton from './MagneticButton'
import { useI18n } from '@/lib/i18n'

export default function ContactSection() {
  const { t } = useI18n()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="relative py-24 md:py-40 bg-gradient-to-b from-primary-50 to-white dark:from-[#221e1a] dark:to-[#1d1a17] overflow-hidden">
      {/* Section separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-200 dark:via-[#2a2520] to-transparent" />

      <div className="container-custom">
        {/* Section header */}
        <div className="max-w-3xl mx-auto mb-16 md:mb-24 text-center">
          <RevealText as="div" className="space-y-4">
            <p className="text-sm md:text-base font-semibold text-primary-600 uppercase tracking-wider">
              {t.contact.badge}
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {t.contact.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mt-6 mx-auto">
              {t.contact.description}
            </p>
          </RevealText>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                {t.contact.form.name}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-primary-200 dark:border-[#2a2520] bg-white dark:bg-[#1f1b18] focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition"
                placeholder={t.contact.form.namePlaceholder}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                {t.contact.form.email}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-primary-200 dark:border-[#2a2520] bg-white dark:bg-[#1f1b18] focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition"
                placeholder={t.contact.form.emailPlaceholder}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                {t.contact.form.message}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-primary-200 dark:border-[#2a2520] bg-white dark:bg-[#1f1b18] focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition resize-none"
                placeholder={t.contact.form.messagePlaceholder}
              />
            </div>

            <MagneticButton
              type="submit"
              disabled={status === 'loading'}
              className="w-full px-9 py-3.5 bg-primary-700 text-white rounded-xl hover:bg-primary-800 transition-all hover:shadow-lg font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                t.contact.form.sending
              ) : (
                <>
                  {t.contact.form.send}
                  <Send className="w-4 h-4" />
                </>
              )}
            </MagneticButton>

            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg"
              >
                {t.contact.form.success}
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg"
              >
                {t.contact.form.error}
              </motion.div>
            )}
          </form>

          <div className="mt-12 pt-12 border-t border-primary-100 dark:border-[#2a2520] text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">
              Or email directly
            </p>
            <a
              href="mailto:stok@blik-studio.cz"
              className="inline-flex items-center gap-2 text-lg font-semibold text-primary-700 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 transition"
            >
              <Mail className="w-5 h-5" />
              stok@blik-studio.cz
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
