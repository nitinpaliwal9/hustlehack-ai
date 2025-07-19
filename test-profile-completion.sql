-- Test Profile Completion Setup
-- Run this in your Supabase SQL Editor to verify everything is ready

-- 1. Check if users table has all required columns
SELECT 
    'Users table structure:' as info,
    column_name, 
    data_type, 
    column_default, 
    is_nullable 
FROM information_schema.columns 
WHERE table_name = 'users' 
ORDER BY ordinal_position;

-- 2. Check RLS policies
SELECT 
    'RLS Policies:' as info,
    policyname,
    cmd,
    permissive
FROM pg_policies 
WHERE tablename = 'users';

-- 3. Test if we can update a user profile (simulate profile completion)
-- This will help identify any permission issues
DO $$
DECLARE
    test_user_id UUID;
    update_result RECORD;
BEGIN
    -- Get the first user for testing
    SELECT id INTO test_user_id FROM public.users LIMIT 1;
    
    IF test_user_id IS NOT NULL THEN
        -- Try to update the user (simulate profile completion)
        UPDATE public.users 
        SET 
            name = 'Test User',
            phone = '+91 1234567890',
            role = 'Student',
            profile_completed = true,
            updated_at = NOW()
        WHERE id = test_user_id;
        
        -- Check if update was successful
        SELECT * INTO update_result FROM public.users WHERE id = test_user_id;
        
        RAISE NOTICE 'Test update result: %', update_result;
        
        -- Revert the test
        UPDATE public.users 
        SET 
            name = NULL,
            phone = NULL,
            role = NULL,
            profile_completed = false,
            updated_at = NOW()
        WHERE id = test_user_id;
        
    ELSE
        RAISE NOTICE 'No users found for testing';
    END IF;
END $$;

-- 4. Show current user states
SELECT 
    'Current user states:' as info,
    id,
    email,
    name,
    phone,
    role,
    profile_completed,
    plan
FROM public.users 
ORDER BY created_at DESC 
LIMIT 5; 