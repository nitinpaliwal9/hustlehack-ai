-- Fix RLS Policies for Users Table
-- Run this in your Supabase SQL Editor

-- Step 1: Drop all existing policies for users table
DROP POLICY IF EXISTS "Allow all inserts" ON public.users;
DROP POLICY IF EXISTS "Allow all inserts for testing" ON public.users;
DROP POLICY IF EXISTS "Allow all updates for testing" ON public.users;
DROP POLICY IF EXISTS "Allow inserts for system roles" ON public.users;
DROP POLICY IF EXISTS "Allow updates for supabase_auth_admin" ON public.users;
DROP POLICY IF EXISTS "Users can complete their profile" ON public.users;
DROP POLICY IF EXISTS "Users can delete their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;

-- Step 2: Create clean, secure policies
-- Policy 1: Users can view their own profile
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

-- Policy 2: Users can insert their own profile (for new users)
CREATE POLICY "Users can insert their own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Policy 3: Users can update their own profile
CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Policy 4: Users can delete their own profile
CREATE POLICY "Users can delete their own profile" ON public.users
    FOR DELETE USING (auth.uid() = id);

-- Step 3: Create policies for subscriptions table (if needed)
DROP POLICY IF EXISTS "Users can view their own subscriptions" ON public.subscriptions;
DROP POLICY IF EXISTS "Users can insert their own subscriptions" ON public.subscriptions;
DROP POLICY IF EXISTS "Users can update their own subscriptions" ON public.subscriptions;

CREATE POLICY "Users can view their own subscriptions" ON public.subscriptions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscriptions" ON public.subscriptions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscriptions" ON public.subscriptions
    FOR UPDATE USING (auth.uid() = user_id);

-- Step 4: Create policies for user_activity table
DROP POLICY IF EXISTS "Users can view their own activity" ON public.user_activity;
DROP POLICY IF EXISTS "Users can insert their own activity" ON public.user_activity;

CREATE POLICY "Users can view their own activity" ON public.user_activity
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own activity" ON public.user_activity
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Step 5: Create policies for user_analytics table
DROP POLICY IF EXISTS "Users can view their own analytics" ON public.user_analytics;
DROP POLICY IF EXISTS "Users can insert their own analytics" ON public.user_analytics;
DROP POLICY IF EXISTS "Users can update their own analytics" ON public.user_analytics;

CREATE POLICY "Users can view their own analytics" ON public.user_analytics
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analytics" ON public.user_analytics
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own analytics" ON public.user_analytics
    FOR UPDATE USING (auth.uid() = user_id);

-- Step 6: Create permissive policy for resources table (read-only for all authenticated users)
DROP POLICY IF EXISTS "Authenticated users can view resources" ON public.resources;
DROP POLICY IF EXISTS "Anyone can view resources" ON public.resources;

CREATE POLICY "Authenticated users can view resources" ON public.resources
    FOR SELECT USING (auth.role() = 'authenticated');

-- Step 7: Verify the policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename IN ('users', 'subscriptions', 'user_activity', 'user_analytics', 'resources')
ORDER BY tablename, policyname; 