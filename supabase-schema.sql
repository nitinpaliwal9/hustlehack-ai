-- HustleHack AI Database Schema
-- Run this in your Supabase SQL Editor

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL,
    name TEXT,
    phone TEXT,
    role TEXT,
    profile_completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    last_login TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    plan_name TEXT NOT NULL DEFAULT 'starter',
    expiry_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create resources table or modify existing one
CREATE TABLE IF NOT EXISTS public.resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add missing columns to resources table if they don't exist
DO $$ 
BEGIN
    -- Add name column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'resources' AND column_name = 'name') THEN
        ALTER TABLE public.resources ADD COLUMN name TEXT NOT NULL DEFAULT 'Untitled Resource';
    END IF;
    
    -- Add category column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'resources' AND column_name = 'category') THEN
        ALTER TABLE public.resources ADD COLUMN category TEXT NOT NULL DEFAULT 'General';
    END IF;
    
    -- Add min_plan column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'resources' AND column_name = 'min_plan') THEN
        ALTER TABLE public.resources ADD COLUMN min_plan TEXT NOT NULL DEFAULT 'starter';
    END IF;
    
    -- Add title column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'resources' AND column_name = 'title') THEN
        ALTER TABLE public.resources ADD COLUMN title TEXT;
    END IF;
    
    -- Update any existing rows with NULL title to have a default value
    UPDATE public.resources SET title = COALESCE(title, name, 'Untitled Resource') WHERE title IS NULL;
    
    -- Make title NOT NULL if it exists
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'resources' AND column_name = 'title') THEN
        ALTER TABLE public.resources ALTER COLUMN title SET NOT NULL;
    END IF;
END $$;

-- Create user_activity table
CREATE TABLE IF NOT EXISTS public.user_activity (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    action TEXT NOT NULL,
    resource_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create user_analytics table for dashboard metrics
CREATE TABLE IF NOT EXISTS public.user_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    tools_used INTEGER DEFAULT 0,
    total_usage INTEGER DEFAULT 0,
    streak_days INTEGER DEFAULT 0,
    completed_tasks INTEGER DEFAULT 0,
    learning_progress INTEGER DEFAULT 0,
    weekly_activity JSONB DEFAULT '[]'::jsonb,
    category_usage JSONB DEFAULT '[]'::jsonb,
    progress_data JSONB DEFAULT '[]'::jsonb,
    achievements JSONB DEFAULT '[]'::jsonb,
    learning_path JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id)
);

-- Create usage_logs table
CREATE TABLE IF NOT EXISTS public.usage_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    resource_name TEXT NOT NULL,
    action TEXT NOT NULL,
    duration INTEGER DEFAULT 0,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create prompts table
CREATE TABLE IF NOT EXISTS public.prompts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    category TEXT DEFAULT 'General',
    tags TEXT[] DEFAULT '{}',
    is_public BOOLEAN DEFAULT false,
    is_favorite BOOLEAN DEFAULT false,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
CREATE POLICY "Users can insert their own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Create policies for subscriptions table
DROP POLICY IF EXISTS "Users can view their own subscriptions" ON public.subscriptions;
CREATE POLICY "Users can view their own subscriptions" ON public.subscriptions
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own subscriptions" ON public.subscriptions;
CREATE POLICY "Users can insert their own subscriptions" ON public.subscriptions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own subscriptions" ON public.subscriptions;
CREATE POLICY "Users can update their own subscriptions" ON public.subscriptions
    FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for resources table (read-only for all authenticated users)
DROP POLICY IF EXISTS "Authenticated users can view resources" ON public.resources;
CREATE POLICY "Authenticated users can view resources" ON public.resources
    FOR SELECT USING (auth.role() = 'authenticated');

-- Create policies for user_activity table
DROP POLICY IF EXISTS "Users can view their own activity" ON public.user_activity;
CREATE POLICY "Users can view their own activity" ON public.user_activity
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own activity" ON public.user_activity;
CREATE POLICY "Users can insert their own activity" ON public.user_activity
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policies for user_analytics table
DROP POLICY IF EXISTS "Users can view their own analytics" ON public.user_analytics;
CREATE POLICY "Users can view their own analytics" ON public.user_analytics
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own analytics" ON public.user_analytics;
CREATE POLICY "Users can insert their own analytics" ON public.user_analytics
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own analytics" ON public.user_analytics;
CREATE POLICY "Users can update their own analytics" ON public.user_analytics
    FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for usage_logs table
DROP POLICY IF EXISTS "Users can view their own usage logs" ON public.usage_logs;
CREATE POLICY "Users can view their own usage logs" ON public.usage_logs
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own usage logs" ON public.usage_logs;
CREATE POLICY "Users can insert their own usage logs" ON public.usage_logs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own usage logs" ON public.usage_logs;
CREATE POLICY "Users can update their own usage logs" ON public.usage_logs
    FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for prompts table
DROP POLICY IF EXISTS "Users can view their own prompts" ON public.prompts;
CREATE POLICY "Users can view their own prompts" ON public.prompts
    FOR SELECT USING (auth.uid() = user_id OR is_public = true);

DROP POLICY IF EXISTS "Users can insert their own prompts" ON public.prompts;
CREATE POLICY "Users can insert their own prompts" ON public.prompts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own prompts" ON public.prompts;
CREATE POLICY "Users can update their own prompts" ON public.prompts
    FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own prompts" ON public.prompts;
CREATE POLICY "Users can delete their own prompts" ON public.prompts
    FOR DELETE USING (auth.uid() = user_id);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert user profile
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
    
    -- Insert default subscription
    INSERT INTO public.subscriptions (user_id, plan_name, created_at, updated_at)
    VALUES (
        NEW.id,
        'starter',
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

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some default resources
INSERT INTO public.resources (name, category, min_plan, title) VALUES
    ('Social Media Prompt Pack', 'Toolkits & Templates', 'starter', 'Social Media Prompt Pack'),
    ('AI Content Generator', 'Weekly Drops', 'creator', 'AI Content Generator'),
    ('Advanced Automation Scripts', 'Pro Tools', 'pro', 'Advanced Automation Scripts'),
    ('Study Guide Templates', 'Prompt Packs', 'starter', 'Study Guide Templates'),
    ('Business Plan Generator', 'Toolkits & Templates', 'creator', 'Business Plan Generator'),
    ('Premium AI Models', 'Weekly Drops', 'pro', 'Premium AI Models')
ON CONFLICT DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON public.subscriptions;
CREATE TRIGGER update_subscriptions_updated_at
    BEFORE UPDATE ON public.subscriptions
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
