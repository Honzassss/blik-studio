'use client'

import Link from 'next/link'
import { Github, Linkedin, Mail } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

const socialLinks = [
  { icon: Github, href: 'https://github.com/Honzassss', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/jan-štok-587a88305/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:stok@blik-studio.cz', label: 'Email' },
]

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
]

export default function Footer() {
  const { t } = useI18n()
  
  const footerLinks = [
    { href: '/', label: t.nav.home },
    { href: '/projects', label: t.nav.projects },
    { href: '/#contact', label: t.nav.contact },
  ]
  
  return (
    <footer className="bg-primary-50 dark:bg-[#1d1a17] border-t border-primary-100 dark:border-[#2a2520]">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-3">
              <span className="text-primary-600">Blik</span>.
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t.footer.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-3">{t.footer.connect}</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white dark:bg-[#1f1b18] hover:bg-primary-50 dark:hover:bg-[#27221d] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-primary-100 dark:border-[#2a2520]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} blik-studio. {t.footer.rights}
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
