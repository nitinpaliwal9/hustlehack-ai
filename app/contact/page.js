// --- SEO Metadata for Contact Page ---
export const metadata = {
  title: "Contact HustleHack AI | Gen Z Support & Collab",
  description: "Reach out to HustleHack AI for support, collabs, or feedback. We help Gen Z students, creators, and founders in India with AI tools and templates.",
  openGraph: {
    title: "Contact HustleHack AI | Gen Z Support & Collab",
    description: "Reach out to HustleHack AI for support, collabs, or feedback. We help Gen Z students, creators, and founders in India with AI tools and templates.",
    url: "https://yourdomain.com/contact",
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
    title: "Contact HustleHack AI | Gen Z Support & Collab",
    description: "Reach out to HustleHack AI for support, collabs, or feedback. We help Gen Z students, creators, and founders in India with AI tools and templates.",
    images: ["/assets/images/logo.png"],
  },
};

import ContactClient from './ContactClient';

export default function ContactPage() {
  return <ContactClient />;
}
