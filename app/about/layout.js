export const metadata = {
  title: 'About Us - HustleHack AI | Empowering the Next Generation',
  description: 'Learn about HustleHack AI\'s mission to empower young Indian students, creators, and entrepreneurs with cutting-edge AI tools and resources.',
  keywords: 'HustleHack AI, about us, AI education, Indian entrepreneurs, students, creators, mission, vision',
  openGraph: {
    title: 'About HustleHack AI - Empowering India\'s Future Innovators',
    description: 'We\'re on a mission to democratize AI education and tools for the next generation of Indian students, creators, and entrepreneurs.',
    type: 'website',
    images: ['/assets/images/logo (2).png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About HustleHack AI - Empowering India\'s Future Innovators',
    description: 'We\'re on a mission to democratize AI education and tools for the next generation of Indian students, creators, and entrepreneurs.',
    images: ['/assets/images/logo (2).png'],
  },
}

export default function AboutLayout({ children }) {
  return children
}
