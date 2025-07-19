// Email sender utility for welcome emails
// Supports Resend (primary) and Google Apps Script (fallback)

/**
 * Send welcome email using Resend (primary method)
 * @param {Object} emailData - Email data object
 * @param {string} emailData.email - Recipient email
 * @param {string} emailData.name - Recipient name
 * @param {string} emailData.plan - User plan
 * @param {string} emailData.cta_url - CTA URL
 * @returns {Promise<boolean>} - Success status
 */
export async function sendWelcomeEmailResend(emailData) {
  try {
    const { email, name, plan, cta_url } = emailData;
    
    // Check if Resend API key is available
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.warn('Resend API key not found, falling back to Google Apps Script');
      return false;
    }

    // Import Resend dynamically to avoid bundling issues
    const { Resend } = await import('resend');
    const resend = new Resend(resendApiKey);

    // Get HTML email template
    const htmlContent = await getWelcomeEmailHTML(name, plan, cta_url);

    const { data, error } = await resend.emails.send({
      from: 'HustleHack AI <noreply@hustlehackai.in>',
      to: [email],
      subject: '🎉 Welcome to HustleHack AI - Your Creator Pack is Ready!',
      html: htmlContent,
      text: getWelcomeEmailText(name, plan, cta_url),
    });

    if (error) {
      console.error('Resend email error:', error);
      return false;
    }

    console.log('✅ Welcome email sent via Resend:', data);
    return true;
  } catch (error) {
    console.error('Resend email sending failed:', error);
    return false;
  }
}

/**
 * Send welcome email using Google Apps Script (fallback method)
 * @param {Object} emailData - Email data object
 * @param {string} emailData.email - Recipient email
 * @param {string} emailData.name - Recipient name
 * @param {string} emailData.plan - User plan
 * @param {string} emailData.cta_url - CTA URL
 * @returns {Promise<boolean>} - Success status
 */
export async function sendWelcomeEmailGoogleAppsScript(emailData) {
  try {
    const { email, name, plan, cta_url } = emailData;
    
    // Check if Google Apps Script URL is available
    const googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL;
    if (!googleAppsScriptUrl) {
      console.error('Google Apps Script URL not configured');
      return false;
    }

    const payload = {
      type: 'welcome_email',
      email,
      name,
      plan,
      cta_url,
      timestamp: new Date().toISOString()
    };

    const response = await fetch(googleAppsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script returned ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('✅ Welcome email sent via Google Apps Script:', result);
    return true;
  } catch (error) {
    console.error('Google Apps Script email sending failed:', error);
    return false;
  }
}

/**
 * Send welcome email with fallback logic
 * @param {Object} emailData - Email data object
 * @returns {Promise<boolean>} - Success status
 */
export async function sendWelcomeEmail(emailData) {
  // Try Resend first
  const resendSuccess = await sendWelcomeEmailResend(emailData);
  if (resendSuccess) {
    return true;
  }

  // Fallback to Google Apps Script
  const googleSuccess = await sendWelcomeEmailGoogleAppsScript(emailData);
  if (googleSuccess) {
    return true;
  }

  console.error('❌ All email sending methods failed');
  return false;
}

/**
 * Get HTML email template
 * @param {string} name - Recipient name
 * @param {string} plan - User plan
 * @param {string} cta_url - CTA URL
 * @returns {Promise<string>} - HTML content
 */
async function getWelcomeEmailHTML(name, plan, cta_url) {
  // Use the existing welcome email HTML template
  const fs = await import('fs');
  const path = await import('path');
  
  try {
    const templatePath = path.join(process.cwd(), 'welcome-email.html');
    let htmlContent = fs.readFileSync(templatePath, 'utf8');
    
    // Replace placeholders
    const displayName = name || 'there';
    htmlContent = htmlContent
      .replace(/\[First Name\]/g, displayName)
      .replace(/href="#" class="cta-button"/g, `href="${cta_url}" class="cta-button"`)
      .replace(/plan → plan/g, `plan → ${plan}`);
    
    return htmlContent;
  } catch (error) {
    console.error('Error reading email template:', error);
    // Fallback to inline HTML
    return getFallbackWelcomeEmailHTML(name, plan, cta_url);
  }
}

/**
 * Get fallback HTML email template (if file reading fails)
 * @param {string} name - Recipient name
 * @param {string} plan - User plan
 * @param {string} cta_url - CTA URL
 * @returns {string} - HTML content
 */
function getFallbackWelcomeEmailHTML(name, plan, cta_url) {
  const displayName = name || 'there';
  
  return `
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
          <a href="${cta_url}" style="display: inline-block; background: linear-gradient(135deg, #6b46c1 0%, #14b8a6 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 25px; font-size: 16px; font-weight: bold; box-shadow: 0 4px 12px rgba(107, 70, 193, 0.3);">👉 Click Here to Get Started</a>
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
}

/**
 * Get plain text email template
 * @param {string} name - Recipient name
 * @param {string} plan - User plan
 * @param {string} cta_url - CTA URL
 * @returns {string} - Plain text content
 */
function getWelcomeEmailText(name, plan, cta_url) {
  const displayName = name || 'there';
  
  return `
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

👉 Get Started: ${cta_url}

Thank you for being an early supporter!

You're not just getting resources — you're joining a movement of students and creators who are building businesses with AI.

Talk soon,
Nitin Paliwal
Founder – HustleHack AI
  `.trim();
} 