import { NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabaseClient'

export async function POST(request) {
  try {
    const { planId, amount, currency, userId } = await request.json()

    // Validate input
    if (!planId || !amount || !currency || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify user exists
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email')
      .eq('id', userId)
      .single()

    if (userError || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Create payment record in database
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert({
        user_id: userId,
        plan_id: planId,
        amount: amount,
        currency: currency,
        status: 'pending',
        payment_intent_id: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (paymentError) {
      console.error('Error creating payment record:', paymentError)
      return NextResponse.json(
        { error: 'Failed to create payment record' },
        { status: 500 }
      )
    }

    // For now, return a mock payment intent
    // In production, this would integrate with Razorpay, Stripe, or your preferred gateway
    const clientSecret = `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}_secret_${Math.random().toString(36).substr(2, 9)}`
    const paymentIntentId = payment.payment_intent_id

    return NextResponse.json({
      clientSecret,
      paymentIntentId,
      paymentId: payment.id
    })

  } catch (error) {
    console.error('Error in create-payment-intent:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 