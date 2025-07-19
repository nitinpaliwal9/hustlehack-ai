import { NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabaseClient'

export async function POST(request) {
  try {
    const body = await request.json()
    
    // In production, you would verify the webhook signature here
    // For now, we'll process the payment data directly
    
    const { 
      payment_intent_id, 
      status, 
      amount, 
      currency,
      user_id,
      plan_id 
    } = body

    if (!payment_intent_id || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Update payment status
    const { error: paymentError } = await supabase
      .from('payments')
      .update({
        status: status,
        gateway_response: body,
        updated_at: new Date().toISOString()
      })
      .eq('payment_intent_id', payment_intent_id)

    if (paymentError) {
      console.error('Error updating payment:', paymentError)
      return NextResponse.json(
        { error: 'Failed to update payment' },
        { status: 500 }
      )
    }

    // If payment is successful, update user subscription
    if (status === 'completed' && user_id && plan_id) {
      // Update subscription
      const { error: subError } = await supabase
        .from('subscriptions')
        .upsert({
          user_id: user_id,
          plan_name: plan_id,
          expiry_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
          updated_at: new Date().toISOString()
        })

      if (subError) {
        console.error('Error updating subscription:', subError)
      }

      // Update user plan
      const { error: userError } = await supabase
        .from('users')
        .update({
          plan: plan_id,
          plan_start: new Date().toISOString(),
          plan_expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', user_id)

      if (userError) {
        console.error('Error updating user plan:', userError)
      }
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error in payment webhook:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 