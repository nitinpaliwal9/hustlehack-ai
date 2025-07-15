import Razorpay from 'razorpay'

export async function POST(request) {
  const body = await request.json()
  const { email, amount } = body

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
    return new Response(JSON.stringify({ orderId: order.id }), {
      status: 200,
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    })
  }
}
