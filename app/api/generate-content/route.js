console.log('API route hit. OPENROUTER KEY:', process.env.NEXT_PUBLIC_OPENROUTER_API_KEY);

export const runtime = 'edge';

import { createClient } from '@supabase/supabase-js';

export async function POST(req) {
  try {
    const { contentType, topic, tone, length, userId } = await req.json();
    
    if (!topic) {
      return new Response(JSON.stringify({ error: 'Topic is required.' }), { status: 400 });
    }

    // Build the prompt based on the parameters
    let systemPrompt = '';
    let userPrompt = '';

    // Content type specific prompts
    switch (contentType) {
      case 'social-media':
        systemPrompt = `You are a social media expert. Create a ${tone} ${length} social media post about the given topic. Make it engaging, shareable, and include relevant hashtags.`;
        break;
      case 'blog':
        systemPrompt = `You are a professional blogger. Write a ${tone} ${length} blog post introduction about the given topic. Make it compelling and hook the reader.`;
        break;
      case 'email':
        systemPrompt = `You are an email marketing expert. Write a ${tone} ${length} email about the given topic. Make it professional and engaging.`;
        break;
      case 'ad-copy':
        systemPrompt = `You are a copywriting expert. Create ${tone} ${length} ad copy about the given topic. Make it persuasive and action-oriented.`;
        break;
      case 'product-description':
        systemPrompt = `You are a product marketing expert. Write a ${tone} ${length} product description about the given topic. Highlight benefits and features.`;
        break;
      default:
        systemPrompt = `You are a content creator. Write ${tone} ${length} content about the given topic.`;
    }

    // Add length specifications
    const lengthSpecs = {
      short: 'Keep it concise (50-100 words)',
      medium: 'Make it detailed but not too long (150-300 words)',
      long: 'Provide comprehensive coverage (400-600 words)'
    };

    systemPrompt += ` ${lengthSpecs[length] || lengthSpecs.medium}`;

    userPrompt = `Topic: ${topic}`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ];

    const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'OpenRouter API key not set.' }), { status: 500 });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://yourdomain.com', // Optional: set your domain
        'X-Title': 'HustleHack AI Content Generator'
      },
      body: JSON.stringify({
        model: 'mistral-7b-instruct',
        messages,
        max_tokens: length === 'long' ? 800 : length === 'medium' ? 400 : 200,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenRouter API error:', error);
      return new Response(JSON.stringify({ error: 'Failed to generate content. Please try again.' }), { status: 500 });
    }

    const data = await response.json();
    const aiContent = data.choices?.[0]?.message?.content || '';

    if (!aiContent) {
      return new Response(JSON.stringify({ error: 'No content generated. Please try again.' }), { status: 500 });
    }

    // Usage logging (if userId is provided)
    if (userId) {
      try {
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
        await supabase.from('usage_logs').insert({
          user_id: userId,
          action_type: 'generated',
          tool_used: 'content-generator',
          timestamp: new Date().toISOString()
        });
      } catch (logError) {
        console.error('Failed to log usage:', logError);
        // Don't fail the request if logging fails
      }
    }

    return new Response(JSON.stringify({ content: aiContent }), { status: 200 });
  } catch (err) {
    console.error('Content generation error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error. Please try again.' }), { status: 500 });
  }
}

export function GET() {
  return new Response('Method Not Allowed', { status: 405 });
} 