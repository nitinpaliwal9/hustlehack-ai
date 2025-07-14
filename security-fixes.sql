-- Security Fixes for Supabase Security Advisor Warnings
-- Run these in your Supabase SQL Editor after the main database setup

-- 1. Fix function search_path settings
-- Update existing functions to use explicit schema references
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, created_at)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', now());
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 2. Configure OTP expiry settings (run in Supabase Auth settings or via API)
-- This should be done in your Supabase dashboard under Authentication > Settings
-- Set OTP expiry to 600 seconds (10 minutes) or less

-- 3. Enable leaked password protection
-- This should be done in your Supabase dashboard under Authentication > Settings
-- Enable "Leaked Password Protection"

-- Additional security enhancements
-- Enable email confirmations for better security
-- This should be configured in Authentication > Settings > Email confirmations

-- Rate limiting for auth endpoints (configure in Edge Functions or middleware)
-- Add these settings to your Supabase project settings:
-- - Enable rate limiting on auth endpoints
-- - Set reasonable limits for signup/login attempts

-- Database security enhancements
-- Enable audit logging for sensitive operations
CREATE OR REPLACE FUNCTION log_profile_updates()
RETURNS trigger AS $$
BEGIN
  -- Log profile updates for security monitoring
  INSERT INTO public.user_activity (user_id, action, details, created_at)
  VALUES (
    NEW.id,
    'profile_updated',
    jsonb_build_object(
      'changed_fields', 
      (SELECT array_agg(key) FROM jsonb_each(to_jsonb(NEW)) WHERE key != 'updated_at')
    ),
    now()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Apply the trigger
DROP TRIGGER IF EXISTS on_profile_update ON users;
CREATE TRIGGER on_profile_update
  AFTER UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION log_profile_updates();
