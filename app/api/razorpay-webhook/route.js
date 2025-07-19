import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

export async function POST(req) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables');
    return new Response(JSON.stringify({ error: 'Server configuration error' }), { status: 500 });
  }
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    const body = await req.json();
    const signature = req.headers.get('X-Razorpay-Signature');
    
    // Verify webhook signature for security
    if (!verifyWebhookSignature(body, signature, webhookSecret)) {
      console.error('Invalid webhook signature');
      return new Response(JSON.stringify({ error: 'Invalid signature' }), { status: 401 });
    }

    if (body.event === 'payment.captured') {
      const payment = body.payload.payment.entity;
      const result = await handlePaymentCaptured(payment, supabase);
      return new Response(JSON.stringify(result), { status: 200 });
    }
    
    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (err) {
    console.error('Webhook processing error:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// Verify Razorpay webhook signature
function verifyWebhookSignature(body, signature, secret) {
  if (!signature || !secret) {
    console.warn('Missing signature or secret for verification');
    return true; // Allow in development, but log warning
  }
  
  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(body))
      .digest('hex');
    
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}

// Handle payment captured event
async function handlePaymentCaptured(payment, supabase) {
  try {
    const paymentData = {
      payment_id: payment.id,
      email: payment.email || payment.notes?.email,
      amount: payment.amount / 100, // Convert from paise to rupees
      currency: payment.currency,
      plan: determinePlanFromAmount(payment.amount),
      status: payment.status,
      payment_method: payment.method,
      created_at: new Date(payment.created_at * 1000).toISOString(),
      gateway_response: payment
    };

    // Check for duplicate payment
    const { data: existingPayment } = await supabase
      .from('payments')
      .select('id')
      .eq('payment_intent_id', paymentData.payment_id)
      .single();

    if (existingPayment) {
      console.log('Payment already processed:', paymentData.payment_id);
      return { success: true, message: 'Payment already processed' };
    }

    // Find or create user by email
    const user = await findOrCreateUser(paymentData.email, supabase);
    if (!user) {
      throw new Error('Failed to find or create user');
    }

    // Calculate plan expiry
    const expiryDate = calculatePlanExpiry(user, paymentData.plan);

    // Update user plan
    const { error: userError } = await supabase
      .from('users')
      .update({
        plan: paymentData.plan,
        plan_start: new Date().toISOString(),
        plan_expiry: expiryDate,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (userError) {
      throw new Error('Failed to update user plan: ' + userError.message);
    }

    // Insert payment record
    const { error: paymentError } = await supabase
      .from('payments')
      .insert({
        user_id: user.id,
        plan_id: paymentData.plan,
        amount: paymentData.amount,
        currency: paymentData.currency,
        status: paymentData.status,
        payment_intent_id: paymentData.payment_id,
        payment_method: paymentData.payment_method,
        gateway_response: paymentData.gateway_response,
        created_at: paymentData.created_at,
        updated_at: new Date().toISOString()
      });

    if (paymentError) {
      throw new Error('Failed to insert payment record: ' + paymentError.message);
    }

    console.log('Payment processed successfully:', {
      payment_id: paymentData.payment_id,
      email: paymentData.email,
      plan: paymentData.plan,
      user_id: user.id
    });

    return {
      success: true,
      message: 'Payment processed successfully',
      data: {
        payment_id: paymentData.payment_id,
        user_id: user.id,
        plan: paymentData.plan,
        expiry: expiryDate
      }
    };

  } catch (error) {
    console.error('Payment processing error:', error);
    throw error;
  }
}

// Determine plan based on payment amount
function determinePlanFromAmount(amountInPaise) {
  const amount = amountInPaise / 100;
  
  switch (amount) {
    case 99:
      return 'starter';
    case 199:
      return 'creator';
    case 299:
      return 'pro';
    default:
      return 'starter'; // Default fallback
  }
}

// Find or create user by email
async function findOrCreateUser(email, supabase) {
  try {
    // First, try to find existing user by email
    const { data: existingUser, error: findError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      return existingUser;
    }

    // Create new user if not found
    const newUser = {
      email: email,
      plan: 'starter',
      plan_start: new Date().toISOString(),
      plan_expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data: createdUser, error: createError } = await supabase
      .from('users')
      .insert(newUser)
      .select()
      .single();

    if (createError) {
      throw new Error('Failed to create user: ' + createError.message);
    }

    return createdUser;

  } catch (error) {
    console.error('Error finding/creating user:', error);
    return null;
  }
}

// Calculate plan expiry based on current plan and new payment
function calculatePlanExpiry(user, newPlan) {
  const now = new Date();
  const currentExpiry = user.plan_expiry ? new Date(user.plan_expiry) : null;
  
  // If same plan and not expired, extend from current expiry
  if (user.plan === newPlan && currentExpiry && currentExpiry > now) {
    const newExpiry = new Date(currentExpiry);
    newExpiry.setDate(newExpiry.getDate() + 30);
    return newExpiry.toISOString();
  }
  
  // New plan or expired, set expiry to 30 days from now
  const newExpiry = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  return newExpiry.toISOString();
}
