import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { sendWelcomeEmail } from '../../../lib/emailSender.js';

// Initialize Supabase client with service role key for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables for welcome email API');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

/**
 * POST /api/welcome
 * Send welcome email to new user
 * 
 * Expected payload:
 * {
 *   user_id: "uuid",
 *   email: "user@example.com",
 *   name: "User Name",
 *   plan: "creator-beta"
 * }
 */
export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json();
    const { user_id, email, name, plan } = body;

    // Validate required fields
    if (!user_id || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: user_id and email' },
        { status: 400 }
      );
    }

    console.log('📧 Welcome email request for:', { user_id, email, name, plan });

    // Check if user exists and welcome email already sent
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('welcome_email_sent, first_name, name, plan')
      .eq('id', user_id)
      .single();

    if (userError) {
      console.error('❌ Error fetching user:', userError);
      return NextResponse.json(
        { error: 'User not found or access denied' },
        { status: 404 }
      );
    }

    // Check if welcome email already sent
    if (user.welcome_email_sent) {
      console.log('✅ Welcome email already sent for user:', user_id);
      return NextResponse.json(
        { message: 'Welcome email already sent', sent: true },
        { status: 200 }
      );
    }

    // Prepare email data
    const emailData = {
      email,
      name: name || user.first_name || user.name || email.split('@')[0],
      plan: plan || user.plan || 'creator-beta',
      cta_url: process.env.NEXT_PUBLIC_APP_URL || 'https://www.hustlehackai.in/app'
    };

    console.log('📧 Sending welcome email with data:', emailData);

    // Send welcome email
    const emailSent = await sendWelcomeEmail(emailData);

    if (!emailSent) {
      console.error('❌ Failed to send welcome email for user:', user_id);
      return NextResponse.json(
        { error: 'Failed to send welcome email' },
        { status: 500 }
      );
    }

    // Update user to mark welcome email as sent
    const { error: updateError } = await supabase
      .from('users')
      .update({ 
        welcome_email_sent: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', user_id);

    if (updateError) {
      console.error('❌ Error updating profile welcome_email_sent flag:', updateError);
      // Don't fail the request if update fails, but log it
      // The email was sent successfully, so we return success
    }

    console.log('✅ Welcome email sent and profile updated for user:', user_id);

    return NextResponse.json({
      message: 'Welcome email sent successfully',
      sent: true,
      user_id,
      email
    });

  } catch (error) {
    console.error('❌ Welcome email API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/welcome
 * Check welcome email status for a user
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');

    if (!user_id) {
      return NextResponse.json(
        { error: 'Missing user_id parameter' },
        { status: 400 }
      );
    }

    // Check user status
    const { data: user, error } = await supabase
      .from('users')
      .select('welcome_email_sent, email, first_name, name, plan')
      .eq('id', user_id)
      .single();

    if (error) {
      console.error('❌ Error fetching user:', error);
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user_id,
      welcome_email_sent: user.welcome_email_sent,
      email: user.email,
      name: user.first_name || user.name,
      plan: user.plan
    });

  } catch (error) {
    console.error('❌ Welcome email status check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 