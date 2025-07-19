// Google Apps Script - Central Payment Hub
// This script handles all Razorpay webhooks and updates both Google Sheets and Supabase

// Configuration
const CONFIG = {
  SUPABASE_URL: 'YOUR_SUPABASE_URL',
  SUPABASE_ANON_KEY: 'YOUR_SUPABASE_ANON_KEY',
  GOOGLE_SHEET_ID: 'YOUR_GOOGLE_SHEET_ID',
  DRIVE_FOLDER_ID: 'YOUR_DRIVE_FOLDER_ID',
  WEBHOOK_SECRET: 'YOUR_RAZORPAY_WEBHOOK_SECRET'
};

// Main webhook handler
function doPost(e) {
  try {
    // Parse webhook data
    const webhookData = JSON.parse(e.postData.contents);
    
    // Verify webhook signature (security)
    if (!verifyWebhookSignature(e.postData.contents, e.headers['X-Razorpay-Signature'])) {
      console.error('Invalid webhook signature');
      return ContentService.createTextOutput(JSON.stringify({ error: 'Invalid signature' }))
        .setMimeType(ContentService.MimeType.JSON)
        .setStatusCode(401);
    }
    
    // Handle payment captured event
    if (webhookData.event === 'payment.captured') {
      return handlePaymentCaptured(webhookData.payload.payment.entity);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ received: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Webhook processing error:', error);
    return ContentService.createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON)
      .setStatusCode(500);
  }
}

// Handle payment captured event
function handlePaymentCaptured(payment) {
  try {
    const paymentData = {
      payment_id: payment.id,
      email: payment.email || payment.notes?.email,
      amount: payment.amount / 100, // Convert from paise to rupees
      currency: payment.currency,
      plan: determinePlanFromAmount(payment.amount),
      status: payment.status,
      payment_method: payment.method,
      created_at: new Date(payment.created_at * 1000).toISOString(),
      gateway_response: JSON.stringify(payment)
    };
    
    // 1. Log to Google Sheets (existing functionality)
    logToGoogleSheets(paymentData);
    
    // 2. Grant Drive access (existing functionality)
    grantDriveAccess(paymentData.email, paymentData.plan);
    
    // 3. Update Supabase (new functionality)
    updateSupabase(paymentData);
    
    // 4. Send confirmation email
    sendConfirmationEmail(paymentData);
    
    return ContentService.createTextOutput(JSON.stringify({ 
      success: true, 
      message: 'Payment processed successfully' 
    }))
    .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    console.error('Payment processing error:', error);
    return ContentService.createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON)
      .setStatusCode(500);
  }
}

// Determine plan based on payment amount
function determinePlanFromAmount(amountInPaise) {
  const amount = amountInPaise / 100;
  
  switch (amount) {
    case 99:
      return 'starter';
    case 199:
      return 'creator';
    case 299:
      return 'pro';
    default:
      return 'starter'; // Default fallback
  }
}

// Log payment to Google Sheets
function logToGoogleSheets(paymentData) {
  try {
    const sheet = SpreadsheetApp.openById(CONFIG.GOOGLE_SHEET_ID).getActiveSheet();
    
    // Check for duplicate payment
    const existingRow = findPaymentInSheet(paymentData.payment_id);
    if (existingRow) {
      console.log('Payment already logged:', paymentData.payment_id);
      return;
    }
    
    // Add new payment record
    sheet.appendRow([
      new Date(), // Timestamp
      paymentData.payment_id,
      paymentData.email,
      paymentData.plan,
      paymentData.amount,
      paymentData.currency,
      paymentData.status,
      paymentData.payment_method,
      'Processed by Apps Script'
    ]);
    
    console.log('Payment logged to Google Sheets:', paymentData.payment_id);
    
  } catch (error) {
    console.error('Error logging to Google Sheets:', error);
    throw error;
  }
}

// Find existing payment in sheet to prevent duplicates
function findPaymentInSheet(paymentId) {
  try {
    const sheet = SpreadsheetApp.openById(CONFIG.GOOGLE_SHEET_ID).getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) { // Skip header row
      if (data[i][1] === paymentId) { // Payment ID column
        return i + 1; // Return row number
      }
    }
    return null;
  } catch (error) {
    console.error('Error finding payment in sheet:', error);
    return null;
  }
}

// Grant Drive access (existing functionality)
function grantDriveAccess(email, plan) {
  try {
    const folder = DriveApp.getFolderById(CONFIG.DRIVE_FOLDER_ID);
    const subfolder = getOrCreateSubfolder(folder, plan);
    
    // Grant access to user
    subfolder.addEditor(email);
    
    console.log('Drive access granted to:', email, 'for plan:', plan);
    
  } catch (error) {
    console.error('Error granting Drive access:', error);
    // Don't throw error - Drive access is not critical
  }
}

// Get or create subfolder for plan
function getOrCreateSubfolder(parentFolder, plan) {
  try {
    const folders = parentFolder.getFoldersByName(plan);
    if (folders.hasNext()) {
      return folders.next();
    } else {
      return parentFolder.createFolder(plan);
    }
  } catch (error) {
    console.error('Error creating/getting subfolder:', error);
    return parentFolder; // Fallback to parent folder
  }
}

// Update Supabase with payment data
function updateSupabase(paymentData) {
  try {
    // First, find or create user by email
    const user = findOrCreateUser(paymentData.email);
    
    if (!user) {
      throw new Error('Failed to find or create user');
    }
    
    // Calculate plan expiry
    const expiryDate = calculatePlanExpiry(user, paymentData.plan);
    
    // Update user plan
    updateUserPlan(user.id, paymentData.plan, expiryDate);
    
    // Insert payment record
    insertPaymentRecord(user.id, paymentData);
    
    console.log('Supabase updated for user:', user.email);
    
  } catch (error) {
    console.error('Error updating Supabase:', error);
    throw error;
  }
}

// Find or create user in Supabase
function findOrCreateUser(email) {
  try {
    // First, try to find existing user
    const response = fetchSupabase('/rest/v1/users?email=eq.' + encodeURIComponent(email), {
      method: 'GET',
      headers: getSupabaseHeaders()
    });
    
    if (response.code === 200 && response.data && response.data.length > 0) {
      return response.data[0];
    }
    
    // Create new user if not found
    const newUser = {
      email: email,
      plan: 'starter',
      plan_start: new Date().toISOString(),
      plan_expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const createResponse = fetchSupabase('/rest/v1/users', {
      method: 'POST',
      headers: getSupabaseHeaders(),
      body: JSON.stringify(newUser)
    });
    
    if (createResponse.code === 201) {
      return createResponse.data[0];
    }
    
    throw new Error('Failed to create user');
    
  } catch (error) {
    console.error('Error finding/creating user:', error);
    return null;
  }
}

// Calculate plan expiry based on current plan and new payment
function calculatePlanExpiry(user, newPlan) {
  const now = new Date();
  const currentExpiry = user.plan_expiry ? new Date(user.plan_expiry) : null;
  
  // If same plan and not expired, extend from current expiry
  if (user.plan === newPlan && currentExpiry && currentExpiry > now) {
    const newExpiry = new Date(currentExpiry);
    newExpiry.setDate(newExpiry.getDate() + 30);
    return newExpiry.toISOString();
  }
  
  // New plan or expired, set expiry to 30 days from now
  const newExpiry = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  return newExpiry.toISOString();
}

// Update user plan in Supabase
function updateUserPlan(userId, plan, expiryDate) {
  try {
    const updateData = {
      plan: plan,
      plan_start: new Date().toISOString(),
      plan_expiry: expiryDate,
      updated_at: new Date().toISOString()
    };
    
    const response = fetchSupabase('/rest/v1/users?id=eq.' + userId, {
      method: 'PATCH',
      headers: getSupabaseHeaders(),
      body: JSON.stringify(updateData)
    });
    
    if (response.code !== 204) {
      throw new Error('Failed to update user plan');
    }
    
  } catch (error) {
    console.error('Error updating user plan:', error);
    throw error;
  }
}

// Insert payment record in Supabase
function insertPaymentRecord(userId, paymentData) {
  try {
    const paymentRecord = {
      user_id: userId,
      plan_id: paymentData.plan,
      amount: paymentData.amount,
      currency: paymentData.currency,
      status: paymentData.status,
      payment_intent_id: paymentData.payment_id,
      payment_method: paymentData.payment_method,
      gateway_response: paymentData.gateway_response,
      created_at: paymentData.created_at,
      updated_at: new Date().toISOString()
    };
    
    const response = fetchSupabase('/rest/v1/payments', {
      method: 'POST',
      headers: getSupabaseHeaders(),
      body: JSON.stringify(paymentRecord)
    });
    
    if (response.code !== 201) {
      throw new Error('Failed to insert payment record');
    }
    
  } catch (error) {
    console.error('Error inserting payment record:', error);
    throw error;
  }
}

// Helper function to make Supabase API calls
function fetchSupabase(endpoint, options) {
  try {
    const url = CONFIG.SUPABASE_URL + endpoint;
    
    const response = UrlFetchApp.fetch(url, {
      method: options.method,
      headers: options.headers,
      payload: options.body,
      muteHttpExceptions: true
    });
    
    return {
      code: response.getResponseCode(),
      data: response.getContentText() ? JSON.parse(response.getContentText()) : null
    };
    
  } catch (error) {
    console.error('Supabase API error:', error);
    throw error;
  }
}

// Get Supabase headers
function getSupabaseHeaders() {
  return {
    'Content-Type': 'application/json',
    'apikey': CONFIG.SUPABASE_ANON_KEY,
    'Authorization': 'Bearer ' + CONFIG.SUPABASE_ANON_KEY
  };
}

// Verify Razorpay webhook signature
function verifyWebhookSignature(payload, signature) {
  try {
    // Implement signature verification using crypto-js
    // This is a simplified version - implement proper verification
    const expectedSignature = Utilities.computeHmacSha256Signature(payload, CONFIG.WEBHOOK_SECRET);
    return signature === expectedSignature;
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}

// Send confirmation email
function sendConfirmationEmail(paymentData) {
  try {
    const subject = 'Payment Confirmed - HustleHack AI';
    const body = `
      Hi there!
      
      Your payment of ₹${paymentData.amount} for ${paymentData.plan} plan has been confirmed.
      
      Payment Details:
      - Payment ID: ${paymentData.payment_id}
      - Plan: ${paymentData.plan}
      - Amount: ₹${paymentData.amount}
      - Date: ${new Date(paymentData.created_at).toLocaleDateString()}
      
      You now have access to all ${paymentData.plan} features on HustleHack AI.
      
      Thank you for choosing HustleHack AI!
      
      Best regards,
      The HustleHack AI Team
    `;
    
    GmailApp.sendEmail(paymentData.email, subject, body);
    console.log('Confirmation email sent to:', paymentData.email);
    
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    // Don't throw error - email is not critical
  }
}

// Test function to verify setup
function testSetup() {
  console.log('Testing Apps Script setup...');
  
  // Test Google Sheets access
  try {
    const sheet = SpreadsheetApp.openById(CONFIG.GOOGLE_SHEET_ID);
    console.log('✅ Google Sheets access: OK');
  } catch (error) {
    console.error('❌ Google Sheets access: FAILED');
  }
  
  // Test Supabase connection
  try {
    const response = fetchSupabase('/rest/v1/users?select=count', {
      method: 'GET',
      headers: getSupabaseHeaders()
    });
    console.log('✅ Supabase connection: OK');
  } catch (error) {
    console.error('❌ Supabase connection: FAILED');
  }
  
  console.log('Setup test completed');
} 