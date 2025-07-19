-- Fix Plan Expiry Dates for All Users
-- Run this in your Supabase SQL Editor

-- Step 1: Update first 100 users to have Creator Mode with 30-day expiry
UPDATE public.subscriptions 
SET 
    plan_name = 'creator',
    expiry_date = NOW() + INTERVAL '30 days',
    updated_at = NOW()
WHERE user_id IN (
    SELECT u.id 
    FROM auth.users u 
    ORDER BY u.created_at 
    LIMIT 100
)
AND (expiry_date IS NULL OR plan_name = 'starter');

-- Step 2: Update remaining users to have Starter plan with no expiry (or 90-day trial)
UPDATE public.subscriptions 
SET 
    plan_name = 'starter',
    expiry_date = CASE 
        WHEN plan_name = 'creator' THEN NULL  -- Keep creator users as is
        ELSE NOW() + INTERVAL '90 days'      -- Give others 90-day trial
    END,
    updated_at = NOW()
WHERE user_id NOT IN (
    SELECT u.id 
    FROM auth.users u 
    ORDER BY u.created_at 
    LIMIT 100
)
AND expiry_date IS NULL;

-- Step 3: Ensure all users have a subscription record
INSERT INTO public.subscriptions (user_id, plan_name, expiry_date, created_at, updated_at)
SELECT 
    u.id,
    CASE 
        WHEN u.id IN (
            SELECT u2.id 
            FROM auth.users u2 
            ORDER BY u2.created_at 
            LIMIT 100
        ) THEN 'creator'
        ELSE 'starter'
    END,
    CASE 
        WHEN u.id IN (
            SELECT u2.id 
            FROM auth.users u2 
            ORDER BY u2.created_at 
            LIMIT 100
        ) THEN NOW() + INTERVAL '30 days'
        ELSE NOW() + INTERVAL '90 days'
    END,
    NOW(),
    NOW()
FROM auth.users u
WHERE NOT EXISTS (
    SELECT 1 FROM public.subscriptions s WHERE s.user_id = u.id
);

-- Step 4: Update users table to sync with subscriptions
UPDATE public.users 
SET 
    plan = s.plan_name,
    plan_expiry = s.expiry_date,
    updated_at = NOW()
FROM public.subscriptions s
WHERE public.users.id = s.user_id;

-- Step 5: Show summary of what was updated
SELECT 
    'Summary' as info,
    COUNT(*) as total_users,
    COUNT(CASE WHEN plan_name = 'creator' THEN 1 END) as creator_users,
    COUNT(CASE WHEN plan_name = 'starter' THEN 1 END) as starter_users,
    COUNT(CASE WHEN expiry_date IS NULL THEN 1 END) as no_expiry,
    COUNT(CASE WHEN expiry_date IS NOT NULL THEN 1 END) as with_expiry
FROM public.subscriptions;

-- Step 6: Show first 100 users details
SELECT 
    'First 100 Users' as category,
    u.email,
    s.plan_name,
    s.expiry_date,
    u.created_at as user_created
FROM auth.users u
JOIN public.subscriptions s ON u.id = s.user_id
ORDER BY u.created_at
LIMIT 100; 