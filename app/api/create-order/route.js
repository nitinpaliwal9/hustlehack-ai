import Razorpay from 'razorpay'
import { validatePaymentRequest, createRateLimiter } from '../../../lib/validation'
import { logPaymentEvent, logApiError, logRateLimitExceeded, ACTION_TYPES } from '../../../lib/auditLogger'

export async function POST(request) {
  try {
    // Get client IP for rate limiting and audit logging
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'
    
    const body = await request.json()
    const { email, amount } = body
    
    // Initialize rate limiter
    const rateLimiter = createRateLimiter()
    const identifier = email || clientIP
    const rateLimit = rateLimiter.checkLimit(identifier, 5, 60000) // 5 payment attempts per minute
    
    if (!rateLimit.allowed) {
      await logRateLimitExceeded(identifier, '/api/create-order', null, clientIP)
      return new Response(JSON.stringify({ 
        error: 'Too many payment attempts. Please try again later.',
        retryAfter: 60
      }), { 
        status: 429,
        headers: { 'Retry-After': '60' }
      })
    }
    
    // Validate input
    const validation = validatePaymentRequest({ email, amount })
    if (!validation.isValid) {
      await logPaymentEvent(ACTION_TYPES.INVALID_INPUT, {
        endpoint: '/api/create-order',
        error: validation.error,
        input: { email, amount }
      }, null, clientIP)
      
      return new Response(JSON.stringify({ error: validation.error }), { status: 400 })
    }

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  })

  const options = {
    amount: amount * 100, // ₹99 becomes 9900 paise
    currency: 'INR',
    receipt: 'receipt#1',
    notes: {
      email: email, // this helps webhook identify the user
    },
  }

  try {
    const order = await razorpay.orders.create(options)
    
    // Log successful payment initiation
    await logPaymentEvent(ACTION_TYPES.PAYMENT_INITIATED, {
      orderId: order.id,
      amount,
      email,
      success: true
    }, null, clientIP)
    
    return new Response(JSON.stringify({ orderId: order.id }), {
      status: 200,
    })
  } catch (err) {
    console.error('Payment order creation error:', err)
    
    // Log payment error
    await logPaymentEvent(ACTION_TYPES.PAYMENT_FAILED, {
      error: err.message,
      amount,
      email
    }, null, clientIP)
    
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    })
  }
  } catch (err) {
    console.error('Payment API error:', err)
    
    // Log API error
    await logApiError('/api/create-order', err, null, clientIP)
    
    return new Response(JSON.stringify({ error: 'Payment service unavailable. Please try again later.' }), {
      status: 500,
    })
  }
}
