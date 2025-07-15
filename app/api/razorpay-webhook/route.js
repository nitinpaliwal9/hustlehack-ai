import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(req) {
  try {
    const rawBody = await req.text()
    const signature = req.headers.get('x-razorpay-signature')

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest('hex')

    if (signature !== expectedSignature) {
      return new Response('Invalid webhook signature', { status: 400 })
    }

    const body = JSON.parse(rawBody)

    if (body.event === 'payment.captured') {
      const payment = body.payload.payment.entity
      const email = payment.notes?.email

      const plan = 'starter'
      const plan_expiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

      const { error } = await supabase
        .from('users')
        .update({ plan, plan_expiry })
        .eq('email', email)

      if (error) {
        return new Response(JSON.stringify({ error: 'Failed to update user plan' }), { status: 500 })
      }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
