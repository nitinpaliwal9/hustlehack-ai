# Welcome Email System - Debugging Guide

## 🔍 **PROBLEM: Recent Data Shows `welcome_email_sent = false`**

Since you've replicated data from `profiles` table to `users` table, let's debug why recent users still show `welcome_email_sent = false`.

---

## **📋 DEBUGGING CHECKLIST**

### **Step 1: Verify Database Structure**
Run this in your Supabase SQL Editor:

```sql
-- Check if welcome_email_sent column exists
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'users' AND column_name = 'welcome_email_sent';

-- Check recent users
SELECT 
    id, 
    email, 
    name, 
    welcome_email_sent, 
    created_at,
    updated_at
FROM users 
ORDER BY created_at DESC 
LIMIT 10;
```

### **Step 2: Check Database Trigger**
```sql
-- Check if the trigger function is updated
SELECT 
    routine_name,
    routine_definition
FROM information_schema.routines 
WHERE routine_name = 'handle_new_user';

-- Check if trigger exists
SELECT 
    trigger_name,
    event_manipulation,
    action_statement
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';
```

### **Step 3: Test Welcome Email API**
```bash
# Test the API endpoint
curl -X GET "http://localhost:3000/api/welcome?user_id=YOUR_USER_ID"
```

### **Step 4: Check Environment Variables**
```bash
# Verify these environment variables are set
echo $RESEND_API_KEY
echo $SUPABASE_SERVICE_ROLE_KEY
echo $GOOGLE_APPS_SCRIPT_WEBHOOK_URL
```

---

## **🚨 POSSIBLE ISSUES & SOLUTIONS**

### **Issue 1: Database Trigger Not Updated**
**Problem**: The `handle_new_user()` function doesn't set `welcome_email_sent = false`

**Solution**: Run this SQL to update the trigger:

```sql
-- Update the handle_new_user function
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
```

### **Issue 2: Welcome Email Not Triggered**
**Problem**: The client-side code isn't calling the welcome email API

**Solution**: Check browser console for errors and verify the trigger function is called:

```javascript
// Add this to your browser console to test
async function testWelcomeEmail() {
  const response = await fetch('/api/welcome', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: 'YOUR_USER_ID',
      email: 'test@example.com',
      name: 'Test User',
      plan: 'creator-beta'
    })
  });
  
  const result = await response.json();
  console.log('Welcome email result:', result);
}
```

### **Issue 3: Environment Variables Missing**
**Problem**: Email services not configured

**Solution**: Set up environment variables:

```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
GOOGLE_APPS_SCRIPT_WEBHOOK_URL=https://script.google.com/macros/s/your-script-id/exec
```

### **Issue 4: API Route Not Working**
**Problem**: The `/api/welcome` endpoint returns errors

**Solution**: Check server logs and test the API:

```bash
# Test API directly
curl -X POST "http://localhost:3000/api/welcome" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "YOUR_USER_ID",
    "email": "test@example.com",
    "name": "Test User",
    "plan": "creator-beta"
  }'
```

---

## **🧪 TESTING PROCEDURE**

### **Test 1: Database Check**
```sql
-- Check recent users
SELECT 
    id, 
    email, 
    name, 
    welcome_email_sent, 
    created_at
FROM users 
ORDER BY created_at DESC 
LIMIT 5;
```

### **Test 2: API Test**
```javascript
// Run in browser console
testWelcomeEmail();
```

### **Test 3: Manual Trigger**
```javascript
// Replace with actual user ID
triggerWelcomeEmailForExistingUser('YOUR_USER_ID');
```

### **Test 4: New Signup Test**
1. Create a new test account
2. Check if `welcome_email_sent = false` initially
3. Verify welcome email is sent
4. Check if `welcome_email_sent = true` after

---

## **🔧 FIXES FOR COMMON ISSUES**

### **Fix 1: Update Existing Users**
```sql
-- Set welcome_email_sent = false for existing users who don't have it set
UPDATE users 
SET welcome_email_sent = false 
WHERE welcome_email_sent IS NULL;

-- Set first_name for existing users
UPDATE users 
SET first_name = COALESCE(first_name, name, split_part(email, '@', 1))
WHERE first_name IS NULL;
```

### **Fix 2: Manual Welcome Email Trigger**
```sql
-- Create function to manually trigger welcome email
CREATE OR REPLACE FUNCTION public.trigger_welcome_email_manual(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    -- Update welcome_email_sent flag
    UPDATE public.users 
    SET welcome_email_sent = true, updated_at = NOW()
    WHERE id = user_uuid AND welcome_email_sent = false;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.trigger_welcome_email_manual(UUID) TO service_role;
```

### **Fix 3: Check Service Role Permissions**
```sql
-- Ensure service role can manage users table
DROP POLICY IF EXISTS "Service role can manage all users" ON public.users;
CREATE POLICY "Service role can manage all users" ON public.users
    FOR ALL USING (auth.role() = 'service_role');
```

---

## **📊 MONITORING & LOGS**

### **Check API Logs**
```bash
# Check Next.js server logs
npm run dev
# Look for welcome email related logs
```

### **Check Database Logs**
```sql
-- Check recent user activity
SELECT 
    id, 
    email, 
    welcome_email_sent, 
    created_at,
    updated_at
FROM users 
WHERE created_at > NOW() - INTERVAL '1 day'
ORDER BY created_at DESC;
```

### **Check Email Service Logs**
- Resend dashboard: Check email delivery status
- Google Apps Script: Check execution logs

---

## **✅ SUCCESS CRITERIA**

The system is working correctly when:

1. ✅ New users have `welcome_email_sent = false` initially
2. ✅ Welcome email API is called after signup
3. ✅ Email is sent successfully (Resend or Google Apps Script)
4. ✅ `welcome_email_sent` is updated to `true`
5. ✅ No duplicate emails are sent (idempotency)

---

## **🚨 EMERGENCY FIXES**

### **If Nothing Works: Manual Update**
```sql
-- Manually update recent users to trigger welcome emails
UPDATE users 
SET welcome_email_sent = false 
WHERE created_at > NOW() - INTERVAL '1 day'
AND welcome_email_sent IS NULL;
```

### **If API is Broken: Direct Database Update**
```sql
-- Manually mark welcome emails as sent (emergency only)
UPDATE users 
SET welcome_email_sent = true 
WHERE id = 'YOUR_USER_ID';
```

---

## **📞 NEXT STEPS**

1. **Run the database checks** above
2. **Test the API endpoints**
3. **Check environment variables**
4. **Update the trigger function** if needed
5. **Test with a new signup**

Let me know what you find from these debugging steps! 🔍 