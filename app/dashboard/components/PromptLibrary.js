'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  Star, 
  Copy, 
  Edit, 
  Trash2, 
  Share2, 
  Heart, 
  Tag, 
  User, 
  Calendar,
  BookOpen,
  Brain
} from 'lucide-react'
import { searchPrompts, getSearchSuggestions } from '../../utils/searchUtils'

export default function PromptLibrary({ platformData, bonusVault, userPlan: propUserPlan = 'starter' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState(platformData?.name || 'Instagram');
  const categories = platformData?.categories || [];
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState({ categories: [], allPrompts: [] });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  // For demo, mock user plan. In real use, fetch from user profile or subscription.
  const userPlan = propUserPlan || 'starter';

  // Reset selectedCategory when platform changes
  useEffect(() => {
    setSelectedCategory('');
    setSearchResults({ categories: [], allPrompts: [] });
  }, [selectedPlatform]);

  // Enhanced search functionality
  useEffect(() => {
    if (searchTerm.trim()) {
      const results = searchPrompts(searchTerm, categories, selectedCategory);
      setSearchResults(results);
      setSuggestions(getSearchSuggestions(searchTerm));
      setShowSuggestions(true);
    } else {
      setSearchResults({ categories: [], allPrompts: [] });
      setShowSuggestions(false);
    }
  }, [searchTerm, categories, selectedCategory]);

  // Get prompts for selected category or search results
  const currentCategory = categories.find(cat => cat.name === selectedCategory);
  let prompts = [];
  
  if (searchTerm.trim()) {
    // Use search results
    if (selectedCategory) {
      // Search within selected category
      prompts = searchResults.allPrompts;
    } else {
      // Search across all categories
      prompts = searchResults.allPrompts;
    }
  } else {
    // No search term, show selected category prompts
    prompts = currentCategory?.prompts || [];
  }
  
  const unlockedCount = userPlan === 'pro' ? prompts.length : 3;

  const PromptCard = ({ prompt, locked }) => (
    <div className={`relative rounded-xl shadow-lg border p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] ${locked ? 'opacity-60' : ''}`} style={{ background: 'rgba(36,41,46,0.96)', borderColor: 'var(--border-color)' }}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-1 text-white">{prompt.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 text-xs rounded-full ${prompt.type === 'free' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
            {prompt.type === 'free' ? 'Free' : 'Pro'}
          </span>
        </div>
      </div>
      <div className="mb-4">
        <div className="rounded-lg p-3 max-h-32 overflow-y-auto bg-gray-800/50">
          <p className="text-sm font-mono leading-relaxed text-gray-300">{prompt.prompt}</p>
        </div>
      </div>
      <button
        onClick={() => !locked && navigator.clipboard.writeText(prompt.prompt)}
        className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm ${locked ? 'bg-gray-600 cursor-not-allowed text-gray-400' : 'bg-[#7F5AF0] hover:bg-[#6D4DC6] text-white'}`}
        disabled={locked}
      >
        <Copy className="w-4 h-4" />
        {locked ? 'Locked' : 'Copy'}
      </button>
      {locked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 rounded-xl z-10">
          <span className="text-lg font-bold text-[#7F5AF0] mb-2">Premium</span>
          <button className="bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] text-black px-4 py-2 rounded font-semibold shadow hover:from-[#6e4ae2] hover:to-[#00e6b2] transition">Upgrade to Unlock</button>
        </div>
      )}
    </div>
  );

  // Bonus Vault Section (unchanged, but use bonusVault prop)
  const BonusVault = () => (
    <div className="space-y-6 mt-10">
      <h3 className="text-2xl font-bold text-white">💡 Bonus Vault</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-semibold mb-2 text-[#7F5AF0]">Hooks</h4>
          <ul className="list-disc pl-5 space-y-1">
            {bonusVault?.hooks?.map((hook, idx) => (
              <li key={idx} className="text-sm text-gray-300">{hook}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-[#7F5AF0]">CTAs</h4>
          <ul className="list-disc pl-5 space-y-1">
            {bonusVault?.ctas?.map((cta, idx) => (
              <li key={idx} className="text-sm text-gray-300">{cta}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-[#7F5AF0]">Caption Hacks</h4>
          <ul className="list-disc pl-5 space-y-1">
            {bonusVault?.caption_hacks?.map((hack, idx) => (
              <li key={idx} className="text-sm text-gray-300">{hack}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-300">Loading your prompt library...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-white">📚 Social Media Prompt Library</h2>
          <p className="text-gray-300">100+ ready-to-use prompts for Instagram, LinkedIn, Twitter, and more.</p>
        </div>
      </div>
      {/* Platform Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 relative z-50">
        {platformData?.platforms?.map(platform => (
          <button
            key={platform.name}
            onClick={() => setSelectedPlatform(platform.name)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              selectedPlatform === platform.name 
                ? 'bg-[#7F5AF0] text-white' 
                : 'bg-gray-800 text-gray-300 hover:text-white'
            }`}
          >
            {platform.name}
          </button>
        ))}
      </div>
      {/* Category Grid */}
      {!selectedCategory && (
        <div className="py-8">
          <h3 className="text-xl font-bold mb-6 text-center text-[#7F5AF0]">Choose a Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {categories.map(cat => (
              <button
                key={cat.name}
                className="flex flex-col items-center justify-center p-6 rounded-xl border border-gray-600 shadow hover:shadow-lg transition bg-gradient-to-br from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white font-semibold text-lg"
                onClick={() => setSelectedCategory(cat.name)}
              >
                <span className="mb-2 text-2xl">🏷️</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Prompts and Search */}
      {selectedCategory && (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search prompts... (e.g., 'gym', 'fitness', 'workout')"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => searchTerm.trim() && setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    className="w-full pl-10 pr-10 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#7F5AF0] focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
                  />
                  
                  {/* Clear Search Button */}
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-2 w-5 h-5 text-gray-400 hover:text-white transition-colors"
                      aria-label="Clear search"
                    >
                      ✕
                    </button>
                  )}
                  
                  {/* Search Suggestions */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchTerm(suggestion.split(' (')[0]);
                            setShowSuggestions(false);
                          }}
                          className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Search Results Header */}
            {searchTerm.trim() && searchResults.categories.length > 0 && (
              <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-600">
                <h4 className="text-lg font-semibold text-white mb-2">
                  Search Results for "{searchTerm}"
                </h4>
                <div className="flex flex-wrap gap-2">
                  {searchResults.categories.map((category, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#7F5AF0]/20 text-[#7F5AF0] rounded-full text-sm font-medium"
                    >
                      {category.name} ({category.prompts.length})
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Prompts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prompts.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-400" />
                  <p className="text-lg text-gray-300">No prompts found</p>
                  <p className="text-gray-400">
                    {searchTerm.trim() 
                      ? `Try searching for different terms like "fitness", "gym", "workout" for fitness-related prompts`
                      : "Try adjusting your search or category"
                    }
                  </p>
                </div>
              )}
              {prompts.map((prompt, idx) => (
                <PromptCard key={idx} prompt={prompt} locked={idx >= unlockedCount} />
              ))}
            </div>
            <button
              className="mt-4 text-sm text-[#7F5AF0] underline hover:text-[#6D4DC6] transition-colors"
              onClick={() => setSelectedCategory('')}
            >
              ← Back to Categories
            </button>
          </div>
        </div>
      )}
      {/* Bonus Vault */}
      <BonusVault />
    </div>
  );
}
