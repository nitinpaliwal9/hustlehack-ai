export default function CTASection() {
  return (
    <div className="mt-12 bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] rounded-lg p-8 text-center text-white">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">
          Unlock 100+ Templates & Pro AI Tools
        </h3>
        <p className="text-lg mb-6 opacity-90">
          Get unlimited access to premium templates, AI-generated content, and advanced features with our Creator & Pro plans.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-[#7F5AF0] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Upgrade to Creator
          </button>
          <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
            Upgrade to Pro
          </button>
        </div>
        
        <p className="text-sm opacity-75 mt-4">
          Start with 3 free templates • No credit card required
        </p>
      </div>
    </div>
  );
} 