import type { Metadata } from 'next'
import { Domine } from 'next/font/google'
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
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Your Name - Web Developer & Designer',
    template: '%s | Your Name',
  },
  description: 'I build fast, modern websites that convert. Specializing in Next.js, React, and performance optimization.',
  keywords: ['web developer', 'web design', 'Next.js', 'React', 'TypeScript', 'portfolio', 'freelance'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Your Name - Web Developer & Designer',
    description: 'I build fast, modern websites that convert. Specializing in Next.js, React, and performance optimization.',
    siteName: 'Your Name Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Your Name Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Name - Web Developer & Designer',
    description: 'I build fast, modern websites that convert.',
    images: ['/og-image.jpg'],
    creator: '@yourusername',
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
    <html lang="en" suppressHydrationWarning>
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
      </body>
    </html>
  )
}
