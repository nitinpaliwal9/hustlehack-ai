/**
 * Google Apps Script Webhook Handler for HustleHack AI Welcome Emails
 * 
 * Deploy this as a web app in Google Apps Script:
 * 1. Create new Google Apps Script project
 * 2. Replace the default code with this
 * 3. Deploy as web app
 * 4. Set access to "Anyone"
 * 5. Copy the web app URL to your environment variables as GOOGLE_APPS_SCRIPT_WEBHOOK_URL
 */

/**
 * Handle POST requests for welcome emails
 */
function doPost(e) {
  try {
    // Parse the request
    const requestData = JSON.parse(e.postData.contents);
    
    // Log the request for debugging
    console.log('Received webhook request:', requestData);
    
    // Validate request type
    if (requestData.type !== 'welcome_email') {
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'Invalid request type' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Extract email data
    const { email, name, plan, cta_url, timestamp } = requestData;
    
    if (!email) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'Email is required' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Send welcome email
    const emailSent = sendWelcomeEmailViaGmail(email, name, plan, cta_url);
    
    if (emailSent) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          success: true, 
          message: 'Welcome email sent successfully',
          email,
          timestamp: new Date().toISOString()
        }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          error: 'Failed to send welcome email' 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    console.error('Webhook handler error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ 
        error: 'Internal server error',
        details: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Send welcome email using Gmail
 * @param {string} email - Recipient email
 * @param {string} name - Recipient name
 * @param {string} plan - User plan
 * @param {string} cta_url - CTA URL
 * @returns {boolean} - Success status
 */
function sendWelcomeEmailViaGmail(email, name, plan, cta_url) {
  try {
    const displayName = name || email.split('@')[0];
    const appUrl = cta_url || 'https://www.hustlehackai.in/app';
    
    // Email subject
    const subject = '🎉 Welcome to HustleHack AI - Your Creator Pack is Ready!';
    
    // HTML email content
    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to HustleHack AI</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #6b46c1 0%, #14b8a6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">🎉 Welcome to HustleHack AI!</h1>
          <p style="margin: 8px 0 0 0; font-size: 16px; opacity: 0.9;">Your Creator Pack is Ready</p>
        </div>
        
        <div style="padding: 30px; background: white; border-radius: 0 0 8px 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <p style="font-size: 18px; margin-bottom: 20px;"><strong>Hi ${displayName},</strong></p>
          
          <p style="font-size: 16px; margin-bottom: 25px;">
            <strong>Welcome to HustleHack AI! 🎉</strong><br><br>
            You're officially one of the first 100 founding members to get <strong>30 days of free access</strong> to our Creator Pack — designed to help students and creators build, grow, and monetize their online presence using AI.
          </p>
          
          <div style="background-color: #f8fafc; border-left: 4px solid #6b46c1; padding: 20px; margin: 25px 0; border-radius: 4px;">
            <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">🚀 What's Inside Your Free Creator Pack?</h3>
            <ul style="margin: 0; padding-left: 20px; color: #555;">
              <li style="margin-bottom: 8px; font-size: 15px;"><strong>300+ Social Media Prompts</strong> (Instagram, LinkedIn, TikTok, Twitter, etc.)</li>
              <li style="margin-bottom: 8px; font-size: 15px;"><strong>Content Hooks & Caption Ideas</strong> to go viral</li>
              <li style="margin-bottom: 8px; font-size: 15px;"><strong>Weekly AI Drops</strong> – new resources every week</li>
            </ul>
          </div>
          
          <div style="margin: 25px 0;">
            <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">📋 What's Next?</h3>
            <ol style="margin: 0; padding-left: 20px; color: #555;">
              <li style="margin-bottom: 8px; font-size: 15px;">Start exploring your <strong>Social Media Prompt Pack</strong> (already live).</li>
              <li style="margin-bottom: 8px; font-size: 15px;">Keep an eye on your inbox — our <strong>Hook Vault drops this Friday!</strong></li>
              <li style="margin-bottom: 8px; font-size: 15px;">Share your feedback: <em>"What should we add next?"</em> (Your ideas shape HustleHack AI.)</li>
            </ol>
          </div>
          
          <div style="text-align: center; margin: 35px 0;">
            <a href="${appUrl}" style="display: inline-block; background: linear-gradient(135deg, #6b46c1 0%, #14b8a6 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 25px; font-size: 16px; font-weight: bold; box-shadow: 0 4px 12px rgba(107, 70, 193, 0.3);">👉 Click Here to Get Started</a>
          </div>
          
          <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 20px; margin: 25px 0; border-radius: 6px; font-size: 15px; color: #166534;">
            <strong>Thank you for being an early supporter!</strong><br><br>
            You're not just getting resources — you're joining a movement of students and creators who are building businesses with AI.
          </div>
          
          <div style="background-color: #f8fafc; padding: 25px; text-align: center; border-top: 1px solid #e2e8f0; margin-top: 25px;">
            <div style="margin-bottom: 15px;">
              <p style="margin: 4px 0; color: #555; font-size: 15px;">Talk soon,</p>
              <p style="margin: 4px 0; font-weight: bold; color: #333;">Nitin Paliwal</p>
              <p style="margin: 4px 0; color: #6b46c1; font-weight: 500;">Founder – HustleHack AI</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
    
    // Plain text version
    const textBody = `
🎉 Welcome to HustleHack AI!

Hi ${displayName},

Welcome to HustleHack AI! 🎉

You're officially one of the first 100 founding members to get 30 days of free access to our Creator Pack — designed to help students and creators build, grow, and monetize their online presence using AI.

🚀 What's Inside Your Free Creator Pack?
• 300+ Social Media Prompts (Instagram, LinkedIn, TikTok, Twitter, etc.)
• Content Hooks & Caption Ideas to go viral
• Weekly AI Drops – new resources every week

📋 What's Next?
1. Start exploring your Social Media Prompt Pack (already live).
2. Keep an eye on your inbox — our Hook Vault drops this Friday!
3. Share your feedback: "What should we add next?" (Your ideas shape HustleHack AI.)

👉 Get Started: ${appUrl}

Thank you for being an early supporter!

You're not just getting resources — you're joining a movement of students and creators who are building businesses with AI.

Talk soon,
Nitin Paliwal
Founder – HustleHack AI
    `.trim();
    
    // Send email using Gmail
    GmailApp.sendEmail(
      email,
      subject,
      textBody,
      {
        htmlBody: htmlBody,
        name: 'HustleHack AI',
        replyTo: 'noreply@hustlehackai.in'
      }
    );
    
    console.log('✅ Welcome email sent via Gmail to:', email);
    return true;
    
  } catch (error) {
    console.error('❌ Gmail email sending failed:', error);
    return false;
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      message: 'HustleHack AI Welcome Email Webhook',
      status: 'active',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
} 