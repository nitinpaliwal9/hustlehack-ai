-- Add Payments Table for Billing System
-- Run this in your Supabase SQL Editor

-- Create payments table
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    plan_id TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'INR',
    status TEXT NOT NULL DEFAULT 'pending',
    payment_intent_id TEXT,
    payment_method TEXT,
    gateway_response JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Create policies for payments table
DROP POLICY IF EXISTS "Users can view their own payments" ON public.payments;
CREATE POLICY "Users can view their own payments" ON public.payments
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own payments" ON public.payments;
CREATE POLICY "Users can insert their own payments" ON public.payments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own payments" ON public.payments;
CREATE POLICY "Users can update their own payments" ON public.payments
    FOR UPDATE USING (auth.uid() = user_id);

-- Create trigger to update updated_at
CREATE TRIGGER update_payments_updated_at
    BEFORE UPDATE ON public.payments
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample payment for first 100 users (Creator Mode - Free)
INSERT INTO public.payments (user_id, plan_id, amount, currency, status, payment_intent_id, payment_method, created_at, updated_at)
SELECT 
    u.id,
    'creator',
    0.00,
    'INR',
    'completed',
    'pi_first100_free',
    'Promotional',
    u.created_at,
    u.created_at
FROM public.users u
WHERE u.created_at <= (
    SELECT created_at 
    FROM public.users 
    ORDER BY created_at 
    LIMIT 1 OFFSET 99
)
AND u.id NOT IN (SELECT user_id FROM public.payments WHERE plan_id = 'creator')
ON CONFLICT DO NOTHING; 