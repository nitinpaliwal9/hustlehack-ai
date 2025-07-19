-- Fix Welcome Email Integration for Existing Users Table
-- Run this in your Supabase SQL Editor

-- Add welcome_email_sent column to existing users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS welcome_email_sent BOOLEAN DEFAULT false;

-- Add first_name column if it doesn't exist
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS first_name TEXT;

-- Update the existing handle_new_user function to include welcome email logic
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert user profile with welcome email flag
    INSERT INTO public.users (id, email, name, first_name, profile_completed, plan, welcome_email_sent, created_at, updated_at)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'first_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        false, -- set profile_completed to false for new users
        'creator-beta', -- set plan to creator-beta for first 100 users
        false, -- set welcome_email_sent to false for new users
        NOW(),
        NOW()
    ) ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        first_name = COALESCE(EXCLUDED.first_name, users.first_name),
        updated_at = NOW();
    
    -- Insert default subscription
    INSERT INTO public.subscriptions (user_id, plan_name, created_at, updated_at)
    VALUES (
        NEW.id,
        'creator-beta',
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

-- Create service role policy for users table (for server-side operations)
DROP POLICY IF EXISTS "Service role can manage all users" ON public.users;
CREATE POLICY "Service role can manage all users" ON public.users
    FOR ALL USING (auth.role() = 'service_role');

-- Create function to trigger welcome email (for manual execution)
CREATE OR REPLACE FUNCTION public.trigger_welcome_email(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    -- Update welcome_email_sent flag
    UPDATE public.users 
    SET welcome_email_sent = true, updated_at = NOW()
    WHERE id = user_uuid AND welcome_email_sent = false;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.trigger_welcome_email(UUID) TO service_role; 