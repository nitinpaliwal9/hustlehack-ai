# Environment Variables for HustleHack AI Welcome Email Flow

## Required Environment Variables

### Supabase Configuration
```bash
# Supabase URL and Keys
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Email Configuration
```bash
# Resend (Primary Email Service)
RESEND_API_KEY=re_xxxxxxxxxxxx

# Google Apps Script (Fallback Email Service)
GOOGLE_APPS_SCRIPT_WEBHOOK_URL=https://script.google.com/macros/s/your-script-id/exec

# App URL for CTA links
NEXT_PUBLIC_APP_URL=https://www.hustlehackai.in/app
```

## Setup Instructions

### 1. Supabase Setup
1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the Project URL and anon key
4. For the service role key, go to Settings > API > Project API keys
5. Copy the `service_role` key (keep this secret!)

### 2. Resend Setup (Primary Email Service)
1. Sign up at [resend.com](https://resend.com)
2. Create an API key in your dashboard
3. Add your domain (hustlehackai.in) to Resend
4. Verify your domain ownership
5. Set the `RESEND_API_KEY` environment variable

### 3. Google Apps Script Setup (Fallback)
1. Go to [script.google.com](https://script.google.com)
2. Create a new project
3. Copy the code from `google-apps-script-webhook-handler.js`
4. Deploy as web app:
   - Click "Deploy" > "New deployment"
   - Choose "Web app"
   - Set "Execute as" to "Me"
   - Set "Who has access" to "Anyone"
5. Copy the web app URL to `GOOGLE_APPS_SCRIPT_WEBHOOK_URL`

### 4. Database Migration
Run the SQL from `add-profiles-table.sql` in your Supabase SQL Editor.

## Environment Variable Details

### `NEXT_PUBLIC_SUPABASE_URL`
- **Type**: String
- **Required**: Yes
- **Description**: Your Supabase project URL
- **Example**: `https://bmgvtzwesdkitdjfszsh.supabase.co`

### `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Type**: String
- **Required**: Yes
- **Description**: Public anon key for client-side operations
- **Example**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### `SUPABASE_SERVICE_ROLE_KEY`
- **Type**: String
- **Required**: Yes
- **Description**: Service role key for server-side operations (keep secret!)
- **Example**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### `RESEND_API_KEY`
- **Type**: String
- **Required**: No (but recommended for production)
- **Description**: Resend API key for sending emails
- **Example**: `re_1234567890abcdef`

### `GOOGLE_APPS_SCRIPT_WEBHOOK_URL`
- **Type**: String
- **Required**: No (fallback for when Resend is not available)
- **Description**: Google Apps Script web app URL
- **Example**: `https://script.google.com/macros/s/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms4tU6SPA9iMZPnJm1_96H4iZ-uJmgxDsrGQ/exec`

### `NEXT_PUBLIC_APP_URL`
- **Type**: String
- **Required**: No
- **Description**: Your app's main URL for CTA links
- **Default**: `https://www.hustlehackai.in/app`
- **Example**: `https://www.hustlehackai.in/app`

## Testing the Setup

### 1. Test Database Connection
```bash
# Check if profiles table exists
curl -X GET "https://your-project.supabase.co/rest/v1/profiles?select=count" \
  -H "apikey: your-anon-key" \
  -H "Authorization: Bearer your-anon-key"
```

### 2. Test Welcome Email API
```bash
# Test the welcome email endpoint
curl -X POST "http://localhost:3000/api/welcome" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "test-user-id",
    "email": "test@example.com",
    "name": "Test User",
    "plan": "creator-beta"
  }'
```

### 3. Test Google Apps Script
```bash
# Test the Google Apps Script webhook
curl -X POST "your-google-apps-script-url" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "welcome_email",
    "email": "test@example.com",
    "name": "Test User",
    "plan": "creator-beta",
    "cta_url": "https://www.hustlehackai.in/app"
  }'
```

## Security Notes

1. **Never expose service role keys** in client-side code
2. **Keep API keys secret** and rotate them regularly
3. **Use environment variables** instead of hardcoding values
4. **Monitor email sending** to prevent abuse
5. **Implement rate limiting** on the welcome email API

## Troubleshooting

### Common Issues

1. **"Missing Supabase environment variables"**
   - Check that all Supabase variables are set
   - Verify the project URL and keys are correct

2. **"Resend API key not found"**
   - Ensure `RESEND_API_KEY` is set
   - Check that the API key is valid and active

3. **"Google Apps Script URL not configured"**
   - Deploy the Google Apps Script as a web app
   - Copy the correct web app URL

4. **"Profile not found"**
   - Run the database migration SQL
   - Check that the database trigger is working

5. **"Welcome email already sent"**
   - This is expected behavior (idempotency)
   - Check the `welcome_email_sent` flag in the profiles table

### Debug Mode

Enable debug logging by setting:
```bash
NODE_ENV=development
```

This will show detailed logs for email sending attempts and API calls. 