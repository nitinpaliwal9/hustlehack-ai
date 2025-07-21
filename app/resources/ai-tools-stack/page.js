'use client';

import Link from 'next/link';

const tools = [
  {
    name: 'AutoGPT',
    description: 'No-code AI agent that breaks down goals, executes tasks, and refines results. Build your own AutoGPT system!',
    href: '/resources/ai-tools-stack/auto-gpt',
    icon: '🤖',
    comingSoon: false,
  },
  // Add other tools here as needed, or keep as comingSoon: true for placeholders
];

export default function Page() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-gradient">AI Tools Stack</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool) => (
          <div key={tool.name} className="bg-zinc-900 rounded-xl p-6 shadow flex flex-col justify-between">
            <div>
              <div className="text-4xl mb-2">{tool.icon}</div>
              <h2 className="text-xl font-bold mb-2">{tool.name}</h2>
              <p className="text-gray-300 mb-4">{tool.description}</p>
            </div>
            {tool.comingSoon ? (
              <span className="inline-block bg-yellow-400 text-black px-3 py-1 rounded-full font-semibold text-xs">Coming Soon</span>
            ) : (
              <Link href={tool.href} className="btn btn-primary w-full mt-2">Explore</Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}