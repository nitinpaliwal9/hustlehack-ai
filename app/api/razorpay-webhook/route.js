import { createClient } from '@supabase/supabase-js';

export async function POST(req) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl) throw new Error('supabaseUrl is required');
  if (!supabaseAnonKey) throw new Error('supabaseKey is required');
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    const body = await req.json();
    // TODO: Verify Razorpay webhook signature for security!
    // See: https://razorpay.com/docs/webhooks/verification/

    if (body.event === 'payment.captured') {
      const payment = body.payload.payment.entity;
      const email = payment.email || (payment.notes && payment.notes.email);
      // TODO: Use payment.amount or notes to determine the plan
      let plan = 'starter';
      let now = new Date();
      let newExpiry;

      // Fetch current user plan and expiry
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('plan, plan_expiry')
        .eq('email', email)
        .single();
      if (userError) {
        return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
      }

      // If same plan and not expired, extend from current expiry
      if (user.plan === plan && user.plan_expiry && new Date(user.plan_expiry) > now) {
        newExpiry = new Date(user.plan_expiry);
        newExpiry.setDate(newExpiry.getDate() + 30);
      } else {
        // New plan or expired, set expiry to 30 days from now
        newExpiry = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      }

      // If upgrading to a higher plan, you can add logic here to check plan hierarchy
      // For now, any plan change resets expiry from today
      if (user.plan !== plan) {
        newExpiry = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      }

      // Update user
      const { error } = await supabase
        .from('users')
        .update({ plan, plan_expiry: newExpiry.toISOString() })
        .eq('email', email);
      if (error) {
        return new Response(JSON.stringify({ error: 'Failed to update user plan' }), { status: 500 });
      }
    }
    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
