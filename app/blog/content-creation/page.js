import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
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
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-[#0F0F1B] via-[#181A2A] to-[#0F0F1B] pb-12">
        <div className="max-w-6xl mx-auto px-4 pt-24 pb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-8">Content Creation</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOGS.length === 0 && <div className="text-gray-400">No blogs found in this category yet.</div>}
            {BLOGS.map(blog => (
              <div key={blog.slug} className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl p-6 flex flex-col gap-3 border border-white/10 hover:border-[#7F5AF0]/50 hover:scale-105 hover:shadow-2xl transition-all duration-300">
                <div className="relative w-full h-40 mb-2">
                  <Image 
                    src={blog.banner} 
                    alt={blog.bannerAlt} 
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                <h2 className="font-bold text-lg text-white mb-1">{blog.title}</h2>
                <p className="text-gray-300 text-base mb-2">{blog.excerpt}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-gray-400">By {blog.author} • {blog.date} • {blog.readTime}</span>
                  <Link href={`/blog/content-creation/${blog.slug}`} className="inline-block bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] text-white font-bold px-4 py-2 rounded-full text-sm shadow-lg hover:shadow-[#00FFC2]/25 transition-all duration-300 transform hover:scale-105">Read More →</Link>
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