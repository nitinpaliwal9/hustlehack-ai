import { NextRequest, NextResponse } from 'next/server';
import captionsData from '../../../data/captions.json';

export async function POST(request: NextRequest) {
  try {
    const { platform, niche, count = 5 } = await request.json();

    // Check if we have static data for this platform/niche
    let staticCaptions: string[] | undefined = undefined;
    if (platform in captionsData) {
      const platformData = captionsData[platform as keyof typeof captionsData];
      if (niche in platformData) {
        staticCaptions = platformData[niche as keyof typeof platformData] as string[];
      }
    }
    
    // For MVP, we'll use static data as fallback
    // TODO: Replace with actual OpenRouter API call
    const mockAIGeneration = async () => {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));
      
      // Generate captions based on platform and niche
      const baseCaptions = [
        `Amazing ${niche} content! 🔥 #${niche.replace(/\s+/g, '')} #${platform}`,
        `This ${niche} tip changed everything! 💡 #${platform}Creator`,
        `Who else loves ${niche} content? 🙋‍♀️ #${platform}Community`,
        `The ${niche} secret that works every time! ✨ #${platform}Growth`,
        `Can't stop creating ${niche} content! 🚀 #${platform}Life`,
        `This ${niche} hack is everything! 💯 #${platform}Tips`,
        `Why ${niche} content is the future! 🌟 #${platform}Trending`,
        `The ${niche} formula that never fails! 📈 #${platform}Success`,
        `Obsessed with this ${niche} content! 😍 #${platform}Vibes`,
        `The ${niche} strategy that works! 🎯 #${platform}Strategy`
      ];
      
      // Shuffle and return requested count
      return baseCaptions
        .sort(() => Math.random() - 0.5)
        .slice(0, count);
    };

    const generatedCaptions = await mockAIGeneration();

    return NextResponse.json({
      success: true,
      captions: generatedCaptions,
      platform,
      niche,
      count: generatedCaptions.length
    });

  } catch (error) {
    console.error('Caption generation error:', error);
    
    // Fallback to static data
    const { platform, niche } = await request.json();
    let fallbackCaptions: string[] | undefined = undefined;
    if (platform in captionsData) {
      const platformData = captionsData[platform as keyof typeof captionsData];
      if (niche in platformData) {
        fallbackCaptions = platformData[niche as keyof typeof platformData] as string[];
      }
    }
    fallbackCaptions = fallbackCaptions || [
      "Amazing content! �� #ContentCreator",
      "This tip changed everything! 💡 #Growth",
      "Who else loves this? 🙋‍♀️ #Community",
      "The secret that works! ✨ #Success",
      "Can't stop creating! 🚀 #CreatorLife"
    ];

    return NextResponse.json({
      success: true,
      captions: fallbackCaptions.slice(0, 5),
      platform,
      niche,
      count: fallbackCaptions.length,
      fallback: true
    });
  }
} 