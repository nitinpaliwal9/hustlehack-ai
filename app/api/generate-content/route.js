import { validateContentRequest, createRateLimiter } from '../../../lib/validation';
import { logContentEvent, logApiError, logRateLimitExceeded, ACTION_TYPES } from '../../../lib/auditLogger';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';

export async function POST(req) {
  try {
    // Get client IP for rate limiting and audit logging
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';
    
    const { contentType, topic, tone, length, userId } = await req.json();
    
    // Initialize rate limiter
    const rateLimiter = createRateLimiter();
    const identifier = userId || clientIP;
    const rateLimit = rateLimiter.checkLimit(identifier, 20, 60000); // 20 requests per minute
    
    if (!rateLimit.allowed) {
      await logRateLimitExceeded(identifier, '/api/generate-content', userId, clientIP);
      return new Response(JSON.stringify({ 
        error: 'Rate limit exceeded. Please try again later.',
        retryAfter: 60
      }), { 
        status: 429,
        headers: { 'Retry-After': '60' }
      });
    }
    
    // Validate input
    const validation = validateContentRequest({ contentType, topic, tone, length, userId });
    if (!validation.isValid) {
      await logContentEvent(ACTION_TYPES.INVALID_INPUT, {
        endpoint: '/api/generate-content',
        error: validation.error,
        input: { contentType, topic, tone, length }
      }, userId, clientIP);
      
      return new Response(JSON.stringify({ error: validation.error }), { status: 400 });
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

    // Prepare the Hugging Face API payload
    const prompt = `${systemPrompt}\n${userPrompt}`;
    const apiKey = process.env.HF_API_TOKEN;
    if (!apiKey) {
      console.error('Hugging Face API key not set.');
      return new Response(JSON.stringify({ error: 'AI service unavailable. Please try again later.' }), { status: 500 });
    }

    // Model selection (default to mistralai/Mistral-7B-Instruct-v0.1)
    const model = 'mistralai/Mistral-7B-Instruct-v0.1';
    const apiUrl = `https://api-inference.huggingface.co/models/${model}`;

    // Set max tokens based on length
    const maxTokens = length === 'long' ? 800 : length === 'medium' ? 400 : 200;

    let hfResponse, data, aiContent;
    try {
      console.log('Sending request to Hugging Face Inference API...');
      hfResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: maxTokens,
            temperature: 0.7
          }
        })
      });
    } catch (apiErr) {
      console.error('Hugging Face API fetch error:', apiErr);
      return new Response(JSON.stringify({ error: "\u26A0\uFE0F Couldn’t generate content right now. Please try again later." }), { status: 500 });
    }

    if (!hfResponse.ok) {
      const error = await hfResponse.text();
      console.error('Hugging Face API error:', error);
      return new Response(JSON.stringify({ error: "\u26A0\uFE0F Couldn’t generate content right now. Please try again later." }), { status: 500 });
    }

    try {
      data = await hfResponse.json();
      // Hugging Face returns an array of generated texts
      if (Array.isArray(data)) {
        aiContent = data[0]?.generated_text || '';
      } else if (typeof data === 'object' && data.generated_text) {
        aiContent = data.generated_text;
      } else {
        aiContent = '';
      }
    } catch (parseErr) {
      console.error('Failed to parse Hugging Face response:', parseErr);
      return new Response(JSON.stringify({ error: "\u26A0\uFE0F Couldn’t generate content right now. Please try again later." }), { status: 500 });
    }

    if (!aiContent) {
      return new Response(JSON.stringify({ error: "\u26A0\uFE0F Couldn’t generate content right now. Please try again later." }), { status: 500 });
    }

    // Log successful content generation
    await logContentEvent(ACTION_TYPES.CONTENT_GENERATION, {
      contentType,
      topic: topic.substring(0, 100), // Truncate for privacy
      tone,
      length,
      success: true
    }, userId, clientIP);
    
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
    
    // Log API error
    await logApiError('/api/generate-content', err, userId, clientIP);
    
    return new Response(JSON.stringify({ error: "\u26A0\uFE0F Couldn't generate content right now. Please try again later." }), { status: 500 });
  }
}

export function GET() {
  return new Response('Method Not Allowed', { status: 405 });
} 