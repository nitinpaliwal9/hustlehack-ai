'use client';

import { useEffect, useState } from 'react';
import nichesData from '../../../data/niches.json';

type Props = {
  platform: string;
  onSelect: (niche: string) => void;
  onBack: () => void;
};

export default function NicheSelector({ platform, onSelect, onBack }: Props) {
  const [niches, setNiches] = useState<string[]>([]);
  const [filteredNiches, setFilteredNiches] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const platformData = nichesData.platforms.find(p => p.name === platform);
    if (platformData) {
      setNiches(platformData.niches);
      setFilteredNiches(platformData.niches);
    }
  }, [platform]);

  useEffect(() => {
    const filtered = niches.filter(niche =>
      niche.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNiches(filtered);
  }, [searchTerm, niches]);

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
        <h2 className="text-2xl font-bold text-gray-100">
          Select Your Niche
        </h2>
        <div className="w-16"></div> {/* Spacer for centering */}
      </div>
      
      <p className="text-gray-400 mb-8">
        Choose the niche that best fits your content
      </p>

      {/* Search Bar */}
      {niches.length > 15 && (
        <div className="max-w-md mx-auto mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search niches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7F5AF0] focus:border-transparent outline-none"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
          {searchTerm && (
            <p className="text-sm text-gray-500 mt-2">
              {filteredNiches.length} of {niches.length} niches
            </p>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {filteredNiches.map((niche) => (
          <button
            key={niche}
            onClick={() => onSelect(niche)}
            className="group bg-[#18181b] border-2 border-[#232136] rounded-xl p-4 hover:border-[#00FFC2] hover:shadow-[0_0_16px_0_#00FFC2aa] transition-all duration-300 transform hover:scale-105"
          >
            <div className="text-lg font-medium text-gray-100 group-hover:text-[#00FFC2] transition-colors">
              {niche}
            </div>
          </button>
        ))}
      </div>

      {filteredNiches.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <p className="text-gray-500">No niches found for "{searchTerm}"</p>
          <button
            onClick={() => setSearchTerm('')}
            className="text-[#7F5AF0] hover:text-[#6B46C1] mt-2"
          >
            Clear search
          </button>
        </div>
      )}
      
      <div className="mt-8 text-sm text-gray-500">
        {platform} • {niches.length} niches available
      </div>
    </div>
  );
} 