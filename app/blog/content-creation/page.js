import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

const BLOGS = [
  {
    title: 'How AI Tools Can 10x Your Content Creation Speed',
    slug: 'how-ai-tools-10x-content-speed',
    author: 'Nitin Paliwal',
    date: 'July 22, 2025',
    category: 'content-creation',
    banner: '/ai-hero-illustration.webp',
    bannerAlt: 'AI tools for content creation speed illustration',
    excerpt: 'Discover how AI tools like HustleHack AI can help you create content 10x faster, save money, and scale your brand—even if you have zero team.',
    readTime: '6 min read',
  },
  // Add more blog objects here
];

export default function ContentCreationCategoryPage() {
  return (
    <>
      <Navigation active="blog" />
      <main className="min-h-screen bg-gradient-to-b from-[#232946] via-[#181A2A] to-[#232946] pb-12">
        <div className="max-w-4xl mx-auto px-4 pt-24 pb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-8">Content Creation</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BLOGS.length === 0 && <div className="text-gray-400">No blogs found in this category yet.</div>}
            {BLOGS.map(blog => (
              <div key={blog.slug} className="bg-white/10 rounded-2xl shadow-xl p-6 flex flex-col gap-3 border border-[#7F5AF0]/10 hover:scale-105 hover:shadow-2xl transition">
                <Image src={blog.banner} alt={blog.bannerAlt} width={400} height={180} className="rounded-lg object-cover w-full h-40 mb-2" />
                <h2 className="font-bold text-lg text-white mb-1">{blog.title}</h2>
                <p className="text-gray-300 text-base mb-2">{blog.excerpt}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-gray-400">By {blog.author} • {blog.date} • {blog.readTime}</span>
                  <Link href={`/blog/content-creation/${blog.slug}`} className="btn btn-sm premium-btn rounded-full font-bold px-4 py-2 text-sm shadow hover:scale-105 transition">Read More →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 