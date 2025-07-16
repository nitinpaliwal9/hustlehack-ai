-- Create user_analytics table for dashboard metrics
-- Run this in your Supabase SQL Editor

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

-- Enable Row Level Security
ALTER TABLE public.user_analytics ENABLE ROW LEVEL SECURITY;

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

-- Create default analytics records for existing users
INSERT INTO public.user_analytics (user_id, tools_used, total_usage, created_at, updated_at)
SELECT 
    u.id,
    0,
    0,
    NOW(),
    NOW()
FROM public.users u
WHERE NOT EXISTS (
    SELECT 1 FROM public.user_analytics ua WHERE ua.user_id = u.id
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_user_analytics_user_id ON public.user_analytics(user_id);

-- Success message
SELECT 'User analytics table created successfully!' as status; 