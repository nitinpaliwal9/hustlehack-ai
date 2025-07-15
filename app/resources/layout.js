export const metadata = {
  title: "AI Tools & Notion Templates for Students & Creators | HustleHack AI",
  description: "Explore free AI tools, Notion templates, and startup kits for Gen Z. Perfect for students, creators, and founders in India.",
  openGraph: {
    title: "AI Tools & Notion Templates for Students & Creators | HustleHack AI",
    description: "Explore free AI tools, Notion templates, and startup kits for Gen Z. Perfect for students, creators, and founders in India.",
    url: "https://yourdomain.com/resources",
    siteName: "HustleHack AI",
    images: [
      {
        url: "/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "HustleHack AI Logo - Gen Z AI Tools",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tools & Notion Templates for Students & Creators | HustleHack AI",
    description: "Explore free AI tools, Notion templates, and startup kits for Gen Z. Perfect for students, creators, and founders in India.",
    images: ["/assets/images/logo.png"],
  },
};

export default function ResourcesLayout({ children }) {
  return <>{children}</>;
} 