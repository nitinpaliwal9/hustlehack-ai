import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('OAuth callback error:', error)
        return NextResponse.redirect(`${origin}/?error=auth_error`)
      }

      console.log('✅ OAuth callback successful')
      return NextResponse.redirect(`${origin}/dashboard`)
    } catch (error) {
      console.error('OAuth exchange error:', error)
      return NextResponse.redirect(`${origin}/?error=auth_error`)
    }
  }

  // If no code, redirect to home
  return NextResponse.redirect(`${origin}/`)
}
