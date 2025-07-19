-- Fix users table - Add missing plan column and fix default value
-- Run this in your Supabase SQL Editor

-- Add plan column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'plan') THEN
        ALTER TABLE public.users ADD COLUMN plan TEXT DEFAULT 'Not Active';
    END IF;
END $$;

-- Fix the default value for plan column (clean up any malformed defaults)
ALTER TABLE public.users ALTER COLUMN plan SET DEFAULT 'Not Active';

-- Update any existing users with malformed plan values
UPDATE public.users 
SET plan = 'Not Active' 
WHERE plan IS NULL OR plan = '' OR plan LIKE '%::text%';

-- Add plan_start and plan_expiry columns if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'plan_start') THEN
        ALTER TABLE public.users ADD COLUMN plan_start TIMESTAMP WITH TIME ZONE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'plan_expiry') THEN
        ALTER TABLE public.users ADD COLUMN plan_expiry TIMESTAMP WITH TIME ZONE;
    END IF;
END $$;

-- Verify the table structure
SELECT column_name, data_type, column_default, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'users' 
ORDER BY ordinal_position; 