export const metadata = {
  title: "About HustleHack AI: Gen Z AI Tools & Templates",
  description: "Meet the team behind HustleHack AI. Our mission: empower Gen Z students, creators, and founders in India with free AI tools and Notion templates.",
  openGraph: {
    title: "About HustleHack AI: Gen Z AI Tools & Templates",
    description: "Meet the team behind HustleHack AI. Our mission: empower Gen Z students, creators, and founders in India with free AI tools and Notion templates.",
    url: "https://yourdomain.com/about",
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
    title: "About HustleHack AI: Gen Z AI Tools & Templates",
    description: "Meet the team behind HustleHack AI. Our mission: empower Gen Z students, creators, and founders in India with free AI tools and Notion templates.",
    images: ["/assets/images/logo.png"],
  },
};

export default function AboutLayout({ children }) {
  return <>{children}</>;
}
