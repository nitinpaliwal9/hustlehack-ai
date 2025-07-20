'use client';

import { useEffect, useState } from 'react';
import nichesData from '../../../data/niches.json';

type Platform = {
  name: string;
  niches: string[];
};

type Props = {
  onSelect: (platform: string) => void;
};

export default function PlatformSelector({ onSelect }: Props) {
  const [platforms, setPlatforms] = useState<Platform[]>([]);

  useEffect(() => {
    setPlatforms(nichesData.platforms);
  }, []);

  const getPlatformIcon = (platformName: string) => {
    switch (platformName.toLowerCase()) {
      case 'instagram':
        return '📸';
      case 'youtube':
        return '📺';
      case 'linkedin':
        return '💼';
      default:
        return '📱';
    }
  };

  const getPlatformDescription = (platformName: string) => {
    switch (platformName.toLowerCase()) {
      case 'instagram':
        return 'Best for Reels & Visual Growth';
      case 'youtube':
        return 'Perfect for Long-form Content';
      case 'linkedin':
        return 'Ideal for Professional Networking';
      default:
        return 'Social Media Platform';
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-100 mb-6 drop-shadow-lg">
        Choose Your Platform
      </h2>
      <p className="text-gray-400 mb-8">
        Select the platform you want to create content for
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
        {platforms.map((platform) => (
          <button
            key={platform.name}
            onClick={() => onSelect(platform.name)}
            className="group relative bg-[#18181b] border-2 border-[#232136] rounded-xl p-6 hover:border-[#7F5AF0] hover:shadow-[0_0_24px_0_#7F5AF0aa] hover:ring-2 hover:ring-[#00FFC2]/60 transition-all duration-300 transform hover:scale-105"
          >
            <div className="text-4xl mb-4 drop-shadow-[0_0_8px_#7F5AF0]">{getPlatformIcon(platform.name)}</div>
            <h3 className="text-xl font-semibold text-gray-100 mb-2">
              {platform.name}
            </h3>
            <p className="text-[#00FFC2] text-sm font-medium mb-2">
              {getPlatformDescription(platform.name)}
            </p>
            <p className="text-gray-400 text-sm">
              {platform.niches.length} niches available
            </p>
            <div className="absolute inset-0 bg-gradient-to-r from-[#7F5AF0]/10 to-[#00FFC2]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </button>
        ))}
      </div>
    </div>
  );
} 