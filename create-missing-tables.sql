-- Create missing tables that are referenced in frontend
-- Run this in your Supabase SQL Editor

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
ALTER TABLE public.usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;

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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_usage_logs_user_id ON public.usage_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_logs_created_at ON public.usage_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_prompts_user_id ON public.prompts(user_id);
CREATE INDEX IF NOT EXISTS idx_prompts_category ON public.prompts(category);
CREATE INDEX IF NOT EXISTS idx_prompts_is_public ON public.prompts(is_public);

-- Insert some sample prompts for testing
INSERT INTO public.prompts (user_id, title, description, content, category, is_public) VALUES
(
    (SELECT id FROM public.users LIMIT 1),
    'Instagram Post Generator',
    'Generate engaging Instagram posts with trending hashtags',
    'Create an engaging Instagram post about [topic] that includes:\n- A catchy hook\n- 3-5 relevant hashtags\n- A call-to-action\n- Emoji usage for visual appeal',
    'Social Media',
    true
),
(
    (SELECT id FROM public.users LIMIT 1),
    'Study Plan Creator',
    'Create a personalized study plan for any subject',
    'Create a comprehensive study plan for [subject] that includes:\n- Daily study goals\n- Weekly milestones\n- Practice exercises\n- Review sessions\n- Progress tracking',
    'Education',
    true
),
(
    (SELECT id FROM public.users LIMIT 1),
    'Business Pitch Generator',
    'Generate compelling business pitch presentations',
    'Create a business pitch for [business idea] that includes:\n- Problem statement\n- Solution overview\n- Market opportunity\n- Revenue model\n- Competitive advantage\n- Call to action',
    'Business',
    true
)
ON CONFLICT DO NOTHING;

-- Success message
SELECT 'Missing tables created successfully!' as status; 