import Navigation from '../components/Navigation';

export default function SavedPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#181824] via-[#232946] to-[#1a1a2e] pb-24">
      <Navigation />
      <div className="flex flex-col items-center justify-center mt-32 mb-12">
        <div className="bg-[#232946] border-2 border-gradient-to-r from-[#7F5AF0] to-[#00FFC2] rounded-3xl shadow-2xl px-10 py-12 max-w-2xl w-full text-center relative">
          <h1 className="text-4xl font-extrabold mb-4 text-white tracking-tight" style={{ fontFamily: 'Geist, sans-serif' }}>Saved Prompts</h1>
          <div className="mx-auto w-20 h-1 rounded-full mb-6" style={{ background: 'linear-gradient(90deg, #7F5AF0 0%, #00FFC2 100%)' }} />
          <p className="text-xl text-accent font-medium mb-4" style={{ fontFamily: 'Geist, sans-serif' }}>
            Your favorite prompts will appear here soon!
          </p>
          <div className="flex flex-col items-center mt-8">
            <span className="text-6xl mb-4">🔖</span>
            <p className="text-lg text-gray-300">Save prompts as you browse and they’ll show up here for quick access and inspiration.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 