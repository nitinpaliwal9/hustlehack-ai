import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Missing Supabase environment variables in auth callback');
      return NextResponse.redirect(`${origin}/?error=config_error`);
    }
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('OAuth callback error:', error)
        return NextResponse.redirect(`${origin}/?error=auth_error`)
      }

      console.log('✅ OAuth callback successful')
      
      // Get the current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        console.error('Error getting user after OAuth:', userError)
        return NextResponse.redirect(`${origin}/contact`)
      }

      // Check if user profile is complete
      const { data: userProfile, error: profileError } = await supabase
        .from('users')
        .select('profile_completed')
        .eq('id', user.id)
        .single()

      console.log('Profile check result:', { userProfile, profileError })

      // If profile doesn't exist or profile_completed is false, redirect to complete-profile
      if (profileError || !userProfile || userProfile.profile_completed === false) {
        console.log('🔁 Redirecting to complete-profile')
        return NextResponse.redirect(`${origin}/complete-profile`)
      }

      // Profile is complete, redirect to contact form
      return NextResponse.redirect(`${origin}/contact`)
    } catch (error) {
      console.error('OAuth exchange error:', error)
      return NextResponse.redirect(`${origin}/?error=auth_error`)
    }
  }

  // If no code, redirect to home
  return NextResponse.redirect(`${origin}/`)
}
