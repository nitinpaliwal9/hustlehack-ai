// app/layout.js

import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import './legacy-styles.css'
import { AuthProvider } from './hooks/useAuth'

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
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;800&family=Inter:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="premium-bg font-sora min-h-screen">
        {children}
      </body>
    </html>
  );
}
