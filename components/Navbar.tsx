'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import { useI18n } from '@/lib/i18n'

export default function Navbar() {
  const { t } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const navLinks = [
    { href: '/#home', label: t.nav.home },
    { href: '/#projects', label: t.nav.projects },
    { href: '/about', label: t.nav.about },
    { href: '/#contact', label: t.nav.contact },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault()
      const id = href.substring(2)
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
      setIsOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 ${
        isScrolled
          ? 'translate-y-0'
          : '-translate-y-1'
      }`}
    >
      <div className="container-custom">
        <div className={`flex items-center justify-between h-16 md:h-18 px-6 md:px-8 rounded-2xl transition-all duration-500 ${
          isScrolled
            ? 'bg-white/70 dark:bg-[#1f1b18]/70 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20 border border-primary-100/50 dark:border-white/10'
            : 'bg-white/40 dark:bg-[#1f1b18]/40 backdrop-blur-md border border-primary-100/30 dark:border-white/5'
        }`}>
          {/* Logo */}
          <Link href="/" className="text-xl md:text-2xl font-bold hover:scale-105 transition-transform">
            Your<span className="text-primary-600">Name</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-medium hover:text-primary-600 transition-all hover:scale-105 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all group-hover:w-full" />
              </Link>
            ))}
            <LanguageSwitcher />
            <ThemeToggle />
            <Link
              href="/#contact"
              onClick={(e) => handleLinkClick(e, '/#contact')}
              className="px-6 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all hover:shadow-lg hover:shadow-primary-600/30 hover:-translate-y-0.5 font-medium"
            >
              {t.nav.bookCall}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 animate-slide-down">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-base font-medium hover:text-primary-600 transition-colors px-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                onClick={(e) => handleLinkClick(e, '/#contact')}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-center"
              >
                {t.nav.bookCall}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
