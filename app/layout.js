// app/layout.js

import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import './legacy-styles.css'
import ErrorBoundary from './components/ErrorBoundary'
import GlobalLoadingProvider from './components/GlobalLoadingProvider'
import OfflineNotification from './components/OfflineNotification'
import { SpeedInsights } from '@vercel/speed-insights/next'

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
  title: 'HustleHack AI - Build Faster. Learn Smarter.',
  description: 'Apply your AI skills to grow studies, side hustles, and creative projects faster with HustleHack AI.',
  keywords: 'AI tools, productivity, students, creators, solopreneurs, India, templates, prompts, automation',
  author: 'HustleHack AI',
  robots: 'index, follow',
  language: 'English',
  openGraph: {
    title: 'HustleHack AI - Build Faster. Learn Smarter.',
    description: 'Discover AI-powered tools and content packs to hustle smarter, build faster, and succeed.',
    type: 'website',
    url: 'https://hustlehackai.in',
    images: [
      {
        url: '/assets/images/logo (2).png',
        width: 1200,
        height: 630,
        alt: 'HustleHack AI - Build Faster. Learn Smarter.',
      }
    ],
    siteName: 'HustleHack AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HustleHack AI - Build Faster. Learn Smarter.',
    description: 'Discover AI-powered tools and content packs to hustle smarter, build faster, and succeed.',
    images: [
      {
        url: '/assets/images/logo (2).png',
        alt: 'HustleHack AI - Build Faster. Learn Smarter.',
      }
    ],
  },
  icons: {
    icon: '/assets/images/logo (2).png',
  },
}

export const viewport = {
  themeColor: '#7F5AF0',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className={`${inter.className} premium-bg min-h-screen`}>
        <ErrorBoundary>
          <GlobalLoadingProvider>
            {children}
            <OfflineNotification />
            <SpeedInsights />
          </GlobalLoadingProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
