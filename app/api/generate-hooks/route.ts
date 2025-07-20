import { NextRequest, NextResponse } from 'next/server';
import hooksData from '../../../data/hooks.json';

export async function POST(request: NextRequest) {
  try {
    const { platform, niche, count = 5 } = await request.json();

    // Check if we have static data for this platform/niche
    let staticHooks: string[] | undefined = undefined;
    if (platform in hooksData) {
      const platformData = hooksData[platform as keyof typeof hooksData];
      if (niche in platformData) {
        staticHooks = platformData[niche as keyof typeof platformData] as string[];
      }
    }
    
    // For MVP, we'll use static data as fallback
    // TODO: Replace with actual OpenRouter API call
    const mockAIGeneration = async () => {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
      
      // Generate hooks based on platform and niche
      const baseHooks = [
        `This ${niche} secret will change your ${platform} game!`,
        `Why ${platform} creators are obsessed with this ${niche} hack`,
        `The ${niche} strategy that went viral on ${platform}`,
        `Can you believe this ${niche} trend on ${platform}?`,
        `This ${niche} tip will boost your ${platform} engagement`,
        `The ${niche} mistake every ${platform} creator makes`,
        `How I grew my ${platform} following with ${niche} content`,
        `The ${niche} formula that works on ${platform}`,
        `Why ${niche} content is exploding on ${platform}`,
        `The ${niche} secret nobody talks about on ${platform}`
      ];
      
      // Shuffle and return requested count
      return baseHooks
        .sort(() => Math.random() - 0.5)
        .slice(0, count);
    };

    const generatedHooks = await mockAIGeneration();

    return NextResponse.json({
      success: true,
      hooks: generatedHooks,
      platform,
      niche,
      count: generatedHooks.length
    });

  } catch (error) {
    console.error('Hook generation error:', error);
    
    // Fallback to static data
    const { platform, niche } = await request.json();
    let fallbackHooks: string[] | undefined = undefined;
    if (platform in hooksData) {
      const platformData = hooksData[platform as keyof typeof hooksData];
      if (niche in platformData) {
        fallbackHooks = platformData[niche as keyof typeof platformData] as string[];
      }
    }
    fallbackHooks = fallbackHooks || [
      "This content will change your life!",
      "Can you believe this trend?",
      "The secret nobody talks about",
      "Why creators are obsessed with this",
      "This hack will blow your mind!"
    ];

    return NextResponse.json({
      success: true,
      hooks: fallbackHooks.slice(0, 5),
      platform,
      niche,
      count: fallbackHooks.length,
      fallback: true
    });
  }
} 