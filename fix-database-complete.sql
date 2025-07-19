-- Complete Database Fix for HustleHack AI
-- Run this in your Supabase SQL Editor to fix all issues

-- 1. Add missing columns to users table
DO $$ 
BEGIN
    -- Add plan column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'plan') THEN
        ALTER TABLE public.users ADD COLUMN plan TEXT DEFAULT 'Not Active';
    END IF;
    
    -- Add plan_start column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'plan_start') THEN
        ALTER TABLE public.users ADD COLUMN plan_start TIMESTAMP WITH TIME ZONE;
    END IF;
    
    -- Add plan_expiry column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'plan_expiry') THEN
        ALTER TABLE public.users ADD COLUMN plan_expiry TIMESTAMP WITH TIME ZONE;
    END IF;
END $$;

-- 2. Fix the default value for plan column
ALTER TABLE public.users ALTER COLUMN plan SET DEFAULT 'Not Active';

-- 3. Update any existing users with malformed or incorrect plan values
UPDATE public.users 
SET plan = 'Not Active' 
WHERE plan IS NULL 
   OR plan = '' 
   OR plan LIKE '%::text%'
   OR plan = 'starter'; -- Reset any users who shouldn't have starter access yet

-- 4. Update the handle_new_user function to ensure proper user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert user profile with correct plan
    INSERT INTO public.users (id, email, name, profile_completed, plan, created_at, updated_at)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        false, -- set profile_completed to false for new users
        'Not Active', -- set plan to 'Not Active' for new users
        NOW(),
        NOW()
    ) ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        updated_at = NOW();
    
    -- Insert default subscription (but don't give access yet)
    INSERT INTO public.subscriptions (user_id, plan_name, created_at, updated_at)
    VALUES (
        NEW.id,
        'Not Active', -- Don't give starter access until they pay
        NOW(),
        NOW()
    ) ON CONFLICT DO NOTHING;
    
    -- Insert default user analytics
    INSERT INTO public.user_analytics (user_id, tools_used, total_usage, created_at, updated_at)
    VALUES (
        NEW.id,
        0,
        0,
        NOW(),
        NOW()
    ) ON CONFLICT DO NOTHING;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Update existing subscriptions to match user plans
UPDATE public.subscriptions 
SET plan_name = 'Not Active' 
WHERE user_id IN (
    SELECT id FROM public.users WHERE plan = 'Not Active'
);

-- 6. Verify the fixes
SELECT 
    'Users table structure:' as info,
    column_name, 
    data_type, 
    column_default, 
    is_nullable 
FROM information_schema.columns 
WHERE table_name = 'users' 
ORDER BY ordinal_position;

-- 7. Show current user plans
SELECT 
    'Current user plans:' as info,
    id,
    email,
    plan,
    profile_completed
FROM public.users 
ORDER BY created_at DESC 
LIMIT 10;

-- 8. Show subscription status
SELECT 
    'Subscription status:' as info,
    s.user_id,
    s.plan_name,
    u.plan as user_plan
FROM public.subscriptions s
JOIN public.users u ON s.user_id = u.id
ORDER BY s.created_at DESC 
LIMIT 10; 