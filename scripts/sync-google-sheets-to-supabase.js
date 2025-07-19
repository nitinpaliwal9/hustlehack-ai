// Google Sheets to Supabase Sync Script
// Runs as a cron job to keep Supabase updated with new Google Sheets data

import { createClient } from '@supabase/supabase-js';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

// Configuration
const CONFIG = {
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID,
  GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  SYNC_INTERVAL_MINUTES: 5, // Sync every 5 minutes
  LAST_SYNC_FILE: './last-sync-timestamp.json'
};

// Initialize Supabase client
const supabase = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: CONFIG.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: CONFIG.GOOGLE_PRIVATE_KEY,
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Main sync function
async function syncGoogleSheetsToSupabase() {
  try {
    console.log('🔄 Starting Google Sheets to Supabase sync...');
    
    // Get last sync timestamp
    const lastSync = await getLastSyncTimestamp();
    
    // Fetch new data from Google Sheets
    const newPayments = await fetchNewPaymentsFromSheets(lastSync);
    
    if (newPayments.length === 0) {
      console.log('✅ No new payments to sync');
      return;
    }
    
    console.log(`📊 Found ${newPayments.length} new payments to sync`);
    
    // Process each new payment
    const results = await processNewPayments(newPayments);
    
    // Update last sync timestamp
    await updateLastSyncTimestamp();
    
    console.log('✅ Sync completed successfully:', results);
    
  } catch (error) {
    console.error('❌ Sync failed:', error);
    throw error;
  }
}

// Get last sync timestamp
async function getLastSyncTimestamp() {
  try {
    const fs = await import('fs');
    if (fs.existsSync(CONFIG.LAST_SYNC_FILE)) {
      const data = fs.readFileSync(CONFIG.LAST_SYNC_FILE, 'utf8');
      return JSON.parse(data).timestamp;
    }
  } catch (error) {
    console.warn('Could not read last sync timestamp:', error);
  }
  return null;
}

// Update last sync timestamp
async function updateLastSyncTimestamp() {
  try {
    const fs = await import('fs');
    const timestamp = new Date().toISOString();
    fs.writeFileSync(CONFIG.LAST_SYNC_FILE, JSON.stringify({ timestamp }));
  } catch (error) {
    console.warn('Could not write last sync timestamp:', error);
  }
}

// Fetch new payments from Google Sheets
async function fetchNewPaymentsFromSheets(lastSync) {
  try {
    // Get all data from the sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: CONFIG.GOOGLE_SHEET_ID,
      range: 'A:I', // Adjust range based on your sheet structure
    });
    
    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return [];
    }
    
    // Skip header row and filter by timestamp
    const payments = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const timestamp = new Date(row[0]); // Assuming timestamp is in column A
      
      // If no last sync or this row is newer than last sync
      if (!lastSync || timestamp > new Date(lastSync)) {
        payments.push({
          timestamp: row[0],
          payment_id: row[1],
          email: row[2],
          plan: row[3],
          amount: parseFloat(row[4]),
          currency: row[5],
          status: row[6],
          payment_method: row[7],
          source: row[8] || 'Google Sheets Sync'
        });
      }
    }
    
    return payments;
    
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    throw error;
  }
}

// Process new payments
async function processNewPayments(payments) {
  const results = {
    processed: 0,
    skipped: 0,
    errors: 0,
    details: []
  };
  
  for (const payment of payments) {
    try {
      // Check if payment already exists in Supabase
      const { data: existingPayment } = await supabase
        .from('payments')
        .select('id')
        .eq('payment_intent_id', payment.payment_id)
        .single();
      
      if (existingPayment) {
        results.skipped++;
        results.details.push({
          payment_id: payment.payment_id,
          status: 'skipped',
          reason: 'Already exists in Supabase'
        });
        continue;
      }
      
      // Find or create user
      const user = await findOrCreateUser(payment.email);
      if (!user) {
        results.errors++;
        results.details.push({
          payment_id: payment.payment_id,
          status: 'error',
          reason: 'Failed to find/create user'
        });
        continue;
      }
      
      // Insert payment record
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          user_id: user.id,
          plan_id: payment.plan,
          amount: payment.amount,
          currency: payment.currency,
          status: payment.status,
          payment_intent_id: payment.payment_id,
          payment_method: payment.payment_method,
          gateway_response: { 
            source: 'Google Sheets Sync',
            original_timestamp: payment.timestamp
          },
          created_at: payment.timestamp,
          updated_at: new Date().toISOString()
        });
      
      if (paymentError) {
        results.errors++;
        results.details.push({
          payment_id: payment.payment_id,
          status: 'error',
          reason: paymentError.message
        });
        continue;
      }
      
      // Update user plan if needed
      await updateUserPlanIfNeeded(user, payment.plan);
      
      results.processed++;
      results.details.push({
        payment_id: payment.payment_id,
        status: 'processed',
        user_id: user.id
      });
      
    } catch (error) {
      results.errors++;
      results.details.push({
        payment_id: payment.payment_id,
        status: 'error',
        reason: error.message
      });
    }
  }
  
  return results;
}

// Find or create user
async function findOrCreateUser(email) {
  try {
    // First, try to find existing user
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (existingUser) {
      return existingUser;
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
    
    const { data: createdUser, error } = await supabase
      .from('users')
      .insert(newUser)
      .select()
      .single();
    
    if (error) {
      throw new Error('Failed to create user: ' + error.message);
    }
    
    return createdUser;
  } catch (error) {
    console.error('Error finding/creating user:', error);
    return null;
  }
}

// Update user plan if needed
async function updateUserPlanIfNeeded(user, newPlan) {
  try {
    const now = new Date();
    const currentExpiry = user.plan_expiry ? new Date(user.plan_expiry) : null;
    
    const planHierarchy = { 'pro': 3, 'creator': 2, 'starter': 1 };
    const currentPlan = planHierarchy[user.plan] || 0;
    const newPlanLevel = planHierarchy[newPlan] || 0;
    
    // Only update if new plan is better or current plan is expired
    if (newPlanLevel > currentPlan || 
        (currentExpiry && currentExpiry <= now)) {
      
      const expiryDate = calculatePlanExpiry(user, newPlan);
      
      const { error } = await supabase
        .from('users')
        .update({
          plan: newPlan,
          plan_start: new Date().toISOString(),
          plan_expiry: expiryDate,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) {
        throw new Error('Failed to update user plan: ' + error.message);
      }
    }
  } catch (error) {
    console.error('Error updating user plan:', error);
    throw error;
  }
}

// Calculate plan expiry
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

// Run sync if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  syncGoogleSheetsToSupabase()
    .then(() => {
      console.log('✅ Sync completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Sync failed:', error);
      process.exit(1);
    });
}

export { syncGoogleSheetsToSupabase }; 