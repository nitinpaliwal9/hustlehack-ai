export const runtime = 'edge';

import { createClient } from '@supabase/supabase-js';

export async function POST(req) {
  try {
    const { prompt, outputType, userId } = await req.json();
    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required.' }), { status: 400 });
    }

    // Compose the system prompt based on outputType
    let systemPrompt = '';
    switch (outputType) {
      case 'caption':
        systemPrompt = 'Write a catchy social media caption for:';
        break;
      case 'blog-intro':
        systemPrompt = 'Write a compelling blog introduction for:';
        break;
      case 'tweet':
        systemPrompt = 'Write a tweet for:';
        break;
      default:
        systemPrompt = 'Write a helpful, creative response for:';
    }

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt }
    ];

    const apiKey = process.env.OPENROUTER_API_KEY;
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
        model: 'meta-llama/llama-3-8b-instruct',
        messages,
        max_tokens: 512,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const error = await response.text();
      return new Response(JSON.stringify({ error: error || 'Failed to generate content.' }), { status: 500 });
    }

    const data = await response.json();
    const aiContent = data.choices?.[0]?.message?.content || '';

    // Usage logging (if userId is provided)
    if (userId) {
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
      await supabase.from('usage_logs').insert({
        user_id: userId,
        action_type: 'generated',
        tool_used: 'content-generator',
        timestamp: new Date().toISOString()
      });
    }

    return new Response(JSON.stringify({ content: aiContent }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || 'Internal server error.' }), { status: 500 });
  }
}

export function GET() {
  return new Response('Method Not Allowed', { status: 405 });
} 