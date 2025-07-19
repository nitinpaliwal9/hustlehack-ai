import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase client with service role key for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables for signup API');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

/**
 * POST /api/signup
 * Handle user signup and trigger welcome email
 * 
 * Expected payload:
 * {
 *   email: "user@example.com",
 *   password: "password123",
 *   first_name: "User Name",
 *   role: "Student"
 * }
 */
export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json();
    const { email, password, first_name, role } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields: email and password' },
        { status: 400 }
      );
    }

    console.log('👤 Signup request for:', { email, first_name, role });

    // Check if user already exists
    const { data: existingUsers, error: checkError } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', email)
      .limit(1);

    if (checkError) {
      console.error('❌ Error checking existing user:', checkError);
      return NextResponse.json(
        { error: 'Database error while checking existing user' },
        { status: 500 }
      );
    }

    if (existingUsers && existingUsers.length > 0) {
      return NextResponse.json(
        { error: 'This email is already registered. Please sign in instead.' },
        { status: 409 }
      );
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email for immediate access
      user_metadata: {
        first_name,
        role,
        timestamp: new Date().toISOString()
      }
    });

    if (authError) {
      console.error('❌ Auth user creation error:', authError);
      
      // Handle specific auth errors
      if (authError.message.includes('User already registered')) {
        return NextResponse.json(
          { error: 'This email is already registered. Please sign in instead.' },
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      );
    }

    const user = authData.user;
    console.log('✅ User created successfully:', user.id);

    // Wait a moment for the database trigger to create the profile
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user was created by trigger
    const { data: userRecord, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (userError || !userRecord) {
      console.error('❌ User record not found after user creation:', userError);
      
      // Manually create user record if trigger failed
      const { error: manualUserError } = await supabase
        .from('users')
        .insert({
          id: user.id,
          email: user.email,
          name: first_name || user.user_metadata?.first_name,
          first_name: first_name || user.user_metadata?.first_name,
          plan: 'creator-beta',
          welcome_email_sent: false
        });

      if (manualUserError) {
        console.error('❌ Manual user record creation failed:', manualUserError);
        // Continue anyway - the user was created successfully
      }
    }

    // Trigger welcome email (async, don't wait for response)
    triggerWelcomeEmail(user.id, user.email, first_name).catch(error => {
      console.error('❌ Welcome email trigger failed:', error);
      // Don't fail the signup if welcome email fails
    });

    console.log('✅ Signup completed successfully for user:', user.id);

    return NextResponse.json({
      message: 'Account created successfully',
      user: {
        id: user.id,
        email: user.email,
        first_name: first_name || user.user_metadata?.first_name
      }
    });

  } catch (error) {
    console.error('❌ Signup API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Trigger welcome email for new user
 * @param {string} user_id - User ID
 * @param {string} email - User email
 * @param {string} name - User name
 */
async function triggerWelcomeEmail(user_id, email, name) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/welcome`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id,
        email,
        name,
        plan: 'creator-beta'
      }),
    });

    if (!response.ok) {
      throw new Error(`Welcome email API returned ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('✅ Welcome email triggered successfully:', result);

  } catch (error) {
    console.error('❌ Welcome email trigger error:', error);
    throw error;
  }
} 