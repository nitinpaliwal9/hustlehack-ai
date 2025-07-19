// app/layout.js

import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import './legacy-styles.css'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingSpinner from './components/LoadingSpinner'
import { useState, useEffect } from 'react'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})

// ✅ ✅ ONLY ONE export const metadata
export const metadata = {
  metadataBase: new URL('https://hustlehackai.in'),
  title: 'HustleHack AI - Unleash AI. Build Faster. Learn Smarter.',
  description: 'AI-powered platform for young Indian students, creators, and solopreneurs. Tools, templates, prompts & guides to help you grow faster.',
  keywords: 'AI tools, productivity, students, creators, solopreneurs, India, templates, prompts, automation',
  author: 'HustleHack AI',
  robots: 'index, follow',
  language: 'English',
  openGraph: {
    title: 'HustleHack AI - Unleash AI. Build Faster. Learn Smarter.',
    description: 'AI-powered platform for young Indian students, creators, and solopreneurs. Tools, templates, prompts & guides to help you grow faster.',
    type: 'website',
    url: 'https://hustlehackai.com',
    images: ['/assets/images/logo (2).png'],
    siteName: 'HustleHack AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HustleHack AI - Unleash AI. Build Faster. Learn Smarter.',
    description: 'AI-powered platform for young Indian students, creators, and solopreneurs.',
    images: ['/assets/images/logo (2).png'],
  },
  icons: {
    icon: '/assets/images/logo (2).png',
  },
}

export const viewport = {
  themeColor: '#7F5AF0',
}

export default function RootLayout({ children }) {
  // Global loading state
  const [globalLoading, setGlobalLoading] = useState(false);

  useEffect(() => {
    // Listen for custom events to show/hide global loading spinner
    const show = () => setGlobalLoading(true);
    const hide = () => setGlobalLoading(false);
    window.addEventListener('show-global-loading', show);
    window.addEventListener('hide-global-loading', hide);
    return () => {
      window.removeEventListener('show-global-loading', show);
      window.removeEventListener('hide-global-loading', hide);
    };
  }, []);

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className={`${inter.className} premium-bg min-h-screen`}>
        <ErrorBoundary>
          {globalLoading && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60">
              <LoadingSpinner message="Loading..." size="lg" />
            </div>
          )}
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
