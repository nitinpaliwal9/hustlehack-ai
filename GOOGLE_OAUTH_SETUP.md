# Google OAuth Setup Guide

## 🎯 **Step 1: Create Google Cloud Project**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API (if not already enabled)

## 🔑 **Step 2: Create OAuth Credentials**

1. **Go to APIs & Services > Credentials**
2. **Click "Create Credentials" > "OAuth 2.0 Client ID"**
3. **Configure OAuth consent screen** (if not done):
   - User Type: External
   - App Name: HustleHack AI
   - Support Email: your email
   - App Domain: http://localhost:3000 (for dev)
   - Authorized Domains: localhost, your-domain.com

4. **Create OAuth 2.0 Client ID**:
   - Application Type: Web Application
   - Name: HustleHack AI Local
   - Authorized JavaScript origins:
     - `http://localhost:3000`
     - `https://your-domain.com` (for production)
   - Authorized redirect URIs:
     - `http://localhost:3000/auth/callback`
     - `https://bmgvtzwesdkitdjfszsh.supabase.co/auth/v1/callback`

5. **Copy the Client ID and Client Secret**

## 🔧 **Step 3: Configure Supabase**

1. **Go to Supabase Dashboard > Authentication > Providers**
2. **Enable Google provider**
3. **Add your Google OAuth credentials**:
   - Client ID: (from step 2)
   - Client Secret: (from step 2)
4. **Set redirect URL**: `http://localhost:3000/auth/callback`

## ⚙️ **Step 4: Test Your Setup**

1. **Start your Next.js app**: `npm run dev`
2. **Click the Google sign-in button**
3. **You should be redirected to Google's OAuth page**
4. **After signing in, you'll be redirected back to your app**

## 🛠️ **Common Issues & Solutions**

### Issue 1: "Error 400: redirect_uri_mismatch"
**Solution**: Make sure your redirect URI exactly matches what you configured in Google Cloud Console

### Issue 2: "This app hasn't been verified by Google"
**Solution**: For development, click "Advanced" > "Go to [App Name] (unsafe)"

### Issue 3: "The OAuth client was not found"
**Solution**: Double-check your Client ID and Client Secret in Supabase

### Issue 4: Not redirecting after sign-in
**Solution**: Check that your callback route handler is working properly

## 📋 **Quick Test Checklist**

- [ ] Google Cloud project created
- [ ] OAuth consent screen configured
- [ ] OAuth 2.0 Client ID created
- [ ] Redirect URIs match exactly
- [ ] Supabase Google provider enabled
- [ ] Client ID and Secret added to Supabase
- [ ] Callback route handler created
- [ ] Local development server running

## 🔄 **For Production**

When deploying to production:
1. Add your production domain to Google Cloud Console
2. Update redirect URIs to use your production URL
3. Update Supabase redirect URL to production
4. Test thoroughly before going live

---

Need help? Check the console logs for specific error messages!
