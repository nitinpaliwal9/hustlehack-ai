-- Check First 100 Users with Creator Mode Access
-- Run this in your Supabase SQL Editor

-- Query 1: Count of users with Creator Mode
SELECT 
    COUNT(*) as creator_mode_users,
    'Total Creator Mode Users' as description
FROM public.subscriptions 
WHERE plan_name = 'creator'

UNION ALL

-- Query 2: Count of first 100 users (by creation date)
SELECT 
    COUNT(*) as first_100_users,
    'First 100 Users (by creation date)' as description
FROM (
    SELECT u.id 
    FROM auth.users u 
    ORDER BY u.created_at 
    LIMIT 100
) first_100

UNION ALL

-- Query 3: Count of users who should have Creator Mode (first 100)
SELECT 
    COUNT(*) as should_have_creator,
    'Users who should have Creator Mode (first 100)' as description
FROM (
    SELECT u.id 
    FROM auth.users u 
    ORDER BY u.created_at 
    LIMIT 100
) first_100
JOIN public.subscriptions s ON s.user_id = first_100.id
WHERE s.plan_name = 'creator';

-- Query 4: Detailed list of first 100 users with their plan status
SELECT 
    u.id,
    u.email,
    u.created_at as user_created,
    s.plan_name,
    s.expiry_date,
    s.created_at as subscription_created,
    CASE 
        WHEN ROW_NUMBER() OVER (ORDER BY u.created_at) <= 100 THEN 'First 100'
        ELSE 'Regular User'
    END as user_category
FROM auth.users u
LEFT JOIN public.subscriptions s ON s.user_id = u.id
ORDER BY u.created_at
LIMIT 100;

-- Query 5: Summary statistics
SELECT 
    'Summary' as category,
    COUNT(*) as total_users,
    COUNT(CASE WHEN s.plan_name = 'creator' THEN 1 END) as creator_users,
    COUNT(CASE WHEN s.plan_name = 'starter' THEN 1 END) as starter_users,
    COUNT(CASE WHEN s.plan_name = 'pro' THEN 1 END) as pro_users,
    COUNT(CASE WHEN s.plan_name IS NULL THEN 1 END) as no_plan_users
FROM auth.users u
LEFT JOIN public.subscriptions s ON s.user_id = u.id; 