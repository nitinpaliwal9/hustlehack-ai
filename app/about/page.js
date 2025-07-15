import './about.css';
import Image from 'next/image';

// --- SEO Metadata for About Page ---
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

// --- Semantic Structure & Headings Suggestion ---
// Use this as a template for your main content:
/*
<main>
  <section>
    <h1>About HustleHack AI</h1>
    <p>Our mission: empower Gen Z students, creators, and founders in India with free AI tools and Notion templates.</p>
    <Image src="/assets/images/logo.png" alt="HustleHack AI Logo - Gen Z AI Tools" ... />
  </section>
  <section>
    <h2>Meet the Team</h2>
    <article>...</article>
  </section>
  <section>
    <h2>Our Story</h2>
    <article>...</article>
  </section>
  <section>
    <h2>Join the Hustle</h2>
    <a href="/resources" className="cta">Explore Free AI Tools</a>
    <a href="/contact" className="cta">Contact Us</a>
  </section>
</main>
*/
// Add alt text to all images and CTAs as shown above.
// Use Next.js <Image /> for all images for performance.
// Add internal links to /resources and /contact.

export default function AboutPage() {
  return (
    <main className="about-main">
      <section>
        <h1>About HustleHack AI</h1>
        <p>Our mission: empower Gen Z students, creators, and founders in India with free AI tools and Notion templates.</p>
        <Image src="/assets/images/logo.png" alt="HustleHack AI Logo - Gen Z AI Tools" width={200} height={150} />
      </section>
      <section>
        <h2>Meet the Team</h2>
        <article>Coming soon...</article>
      </section>
      <section>
        <h2>Our Story</h2>
        <article>Coming soon...</article>
      </section>
      <section>
        <h2>Join the Hustle</h2>
        <a href="/resources" className="cta">Explore Free AI Tools</a>
        <a href="/contact" className="cta">Contact Us</a>
      </section>
    </main>
  );
}
