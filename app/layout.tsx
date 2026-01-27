import type { Metadata } from 'next'
import { Domine } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { I18nProvider } from '@/lib/i18n'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import InitialLoadGate from '@/components/InitialLoadGate'
import NoiseOverlay from '@/components/NoiseOverlay'

const domine = Domine({ 
  subsets: ['latin'],
  variable: '--font-domine',
  display: 'swap',
  weight: ['400', '700'],
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://blik-studio.cz'),
  title: {
      default: 'blik-studio — Digitální Řešení',
      template: '%s | blik-studio',
  },
    description: 'Kompletní studio vytvářející digitální řešení, která propojují design a technologii.',
  keywords: ['web developer', 'web design', 'Next.js', 'React', 'TypeScript', 'portfolio', 'freelance'],
    authors: [{ name: 'blik-studio' }],
    creator: 'blik-studio',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
      url: 'https://your-domain.com',
      title: 'blik-studio — Digitální Řešení',
    description: 'Kompletní studio vytvářející digitální řešení, která propojují design a technologii.',
      siteName: 'blik-studio Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
          alt: 'blik-studio Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'blik-studio — Digitální Řešení',
    description: 'Kompletní studio vytvářející digitální řešení, která propojují design a technologii.',
    images: ['/og-image.jpg'],
    creator: '@blikstudio',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <body className={domine.variable}>
        <I18nProvider>
          <ThemeProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <InitialLoadGate>
                  <NoiseOverlay />
                  {children}
                </InitialLoadGate>
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  )
}
