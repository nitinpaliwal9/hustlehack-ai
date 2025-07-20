'use client';

type Props = {
  platform: string;
  niche: string;
  onBack: () => void;
};

// Enhanced mock template data with better visual designs
const MOCK_TEMPLATES = [
  {
    id: 1,
    name: "Viral Hook Template",
    category: "Hook",
    gradient: "from-red-500 to-pink-500",
    icon: "🔥",
    text: "VIRAL"
  },
  {
    id: 2,
    name: "Story Template",
    category: "Story",
    gradient: "from-blue-500 to-purple-500",
    icon: "📱",
    text: "STORY"
  },
  {
    id: 3,
    name: "Carousel Template",
    category: "Carousel",
    gradient: "from-green-500 to-teal-500",
    icon: "📊",
    text: "CAROUSEL"
  },
  {
    id: 4,
    name: "Quote Template",
    category: "Quote",
    gradient: "from-yellow-500 to-orange-500",
    icon: "💬",
    text: "QUOTE"
  },
  {
    id: 5,
    name: "Product Showcase",
    category: "Product",
    gradient: "from-indigo-500 to-purple-500",
    icon: "🛍️",
    text: "PRODUCT"
  },
  {
    id: 6,
    name: "Behind the Scenes",
    category: "BTS",
    gradient: "from-gray-600 to-gray-800",
    icon: "🎬",
    text: "BTS"
  },
  {
    id: 7,
    name: "Tutorial Template",
    category: "Tutorial",
    gradient: "from-emerald-500 to-green-500",
    icon: "📚",
    text: "HOW TO"
  },
  {
    id: 8,
    name: "Challenge Template",
    category: "Challenge",
    gradient: "from-pink-500 to-red-500",
    icon: "⚡",
    text: "CHALLENGE"
  },
  {
    id: 9,
    name: "Inspiration Template",
    category: "Inspiration",
    gradient: "from-cyan-500 to-blue-500",
    icon: "✨",
    text: "INSPIRE"
  }
];

export default function TemplateGrid({ platform, niche, onBack }: Props) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-[#7F5AF0] hover:text-[#6B46C1] transition-colors"
        >
          <span className="mr-2">←</span>
          Back
        </button>
        <h2 className="text-2xl font-bold text-gray-800">
          <span className="text-gray-100">{niche} Templates</span>
        </h2>
        <div className="w-16"></div> {/* Spacer for centering */}
      </div>
      
      <p className="text-gray-600 mb-8">
        Professional templates designed for {platform} {niche} content
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {MOCK_TEMPLATES.map((template) => (
          <div
            key={template.id}
            className="group bg-[#232136] border border-[#2d2a45] rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 shadow-[0_0_40px_0_rgba(255,215,0,0.22)] hover:shadow-[0_0_64px_8px_rgba(255,215,0,0.32)]"
          >
            {/* Enhanced template preview */}
            <div className={`aspect-[4/3] bg-gradient-to-br ${template.gradient} flex items-center justify-center relative overflow-hidden`}>
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-white rounded-full opacity-50"></div>
              </div>
              
              {/* Main content */}
              <div className="text-white text-center z-10">
                <div className="text-3xl mb-2">{template.icon}</div>
                <div className="text-lg font-bold mb-1">{template.text}</div>
                <div className="text-xs opacity-80">TEMPLATE</div>
              </div>
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white bg-opacity-90 text-gray-800 px-4 py-2 rounded-lg font-semibold">
                    <span className="text-gray-100">Preview</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-100">{template.name}</h3>
                <span className="text-xs bg-[#7F5AF0]/10 text-[#7F5AF0] px-2 py-1 rounded-full">
                  {template.category}
                </span>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 bg-[#7F5AF0] text-white py-2 px-3 rounded text-sm font-medium hover:bg-[#6B46C1] transition-colors">
                  Preview
                </button>
                <button className="flex-1 bg-[#00FFC2] text-black py-2 px-3 rounded text-sm font-medium hover:bg-[#00E6B8] transition-colors">
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-sm text-gray-500">
        {platform} • {niche} • {MOCK_TEMPLATES.length} templates available
      </div>
    </div>
  );
} 