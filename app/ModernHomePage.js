// --- SEO Metadata for Home Page ---
export const metadata = {
  title: "⚡ HustleHack AI: Build, Launch, Win — With AI.",
  description: "Everything you need to hustle smarter: AI-powered tools, creator kits, and startup launchpads — ready to deploy. No code. No budget. Just raw ambition.",
  keywords: "AI tools, startup, Gen Z, productivity, Notion templates, creator kits, hustle, entrepreneur, India",
  openGraph: {
    title: "⚡ HustleHack AI: Build, Launch, Win — With AI.",
    description: "Everything you need to hustle smarter: AI-powered tools, creator kits, and startup launchpads — ready to deploy. No code. No budget. Just raw ambition.",
    url: "https://hustlehack.ai",
    siteName: "HustleHack AI",
    images: [
      {
        url: "/assets/images/logo (2).png",
        width: 1200,
        height: 630,
        alt: "HustleHack AI - AI-Powered Tools for Gen Z Hustlers",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "⚡ HustleHack AI: Build, Launch, Win — With AI.",
    description: "Everything you need to hustle smarter: AI-powered tools, creator kits, and startup launchpads — ready to deploy. No code. No budget. Just raw ambition.",
    images: ["/assets/images/logo (2).png"],
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
};

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full bg-gradient-to-br from-black via-zinc-900 to-neutral-950 text-white font-sans overflow-x-hidden flex flex-col items-center justify-center">
      {/* === V5.3 VISUAL WORLDBUILDING SYSTEM === */}
      <div className="absolute inset-0 -z-50 overflow-hidden">
        {/* Main AI Universe Orb - Centerpiece */}
        <div className="absolute left-1/2 top-[25%] -translate-x-1/2 w-[1000px] h-[1000px] bg-[conic-gradient(from_0deg,_#7F5AF0_0deg,_#00FFC2_120deg,_#7F5AF0_240deg,_#00FFC2_360deg)] opacity-20 blur-3xl animate-universe-rotation" />
        {/* ... rest of the code ... */}
      </div>
      {/* ... rest of the code ... */}
    </main>
  );
} 