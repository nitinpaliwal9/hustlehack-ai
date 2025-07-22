import { supabase } from '../../lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, product_type, price } = req.body;
  if (!email || !product_type || !price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const id = uuidv4();
  const created_at = new Date().toISOString();

  // Insert into Supabase
  const { error } = await supabase
    .from('orders_onetime')
    .insert([
      {
        id,
        created_at,
        email,
        product_type,
        price,
        status: 'pending',
      },
    ]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // For now, use a static Razorpay payment link and append order_id as query param
  const paymentLink = `https://rzp.io/rzp/QzrZpGB?order_id=${id}`;

  return res.status(200).json({ order_id: id, payment_link: paymentLink });
} 