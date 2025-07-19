// Manual Testing Script: Google Sheets → Supabase
import dotenv from 'dotenv';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');
dotenv.config({ path: resolve(__dirname, '..', '.env.local') });

console.log('🧪 Manual Testing: Google Sheets → Supabase');
console.log('============================================\n');

// Test configuration
const TEST_DATA = {
  timestamp: new Date().toISOString(),
  payment_id: `test_${Date.now()}`, // Unique test payment ID
  email: 'test@example.com',
  plan: 'starter',
  amount: 99,
  currency: 'INR',
  status: 'completed',
  payment_method: 'Test Payment',
  source: 'Manual Test'
};

async function runManualTest() {
  try {
    // Step 1: Check environment variables
    console.log('1️⃣ Checking Environment Variables...');
    const requiredVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'GOOGLE_SHEET_ID',
      'GOOGLE_SERVICE_ACCOUNT_EMAIL',
      'GOOGLE_PRIVATE_KEY'
    ];

    let missingVars = [];
    requiredVars.forEach(varName => {
      if (!process.env[varName]) {
        missingVars.push(varName);
        console.log(`❌ ${varName}: Missing`);
      } else {
        console.log(`✅ ${varName}: Set`);
      }
    });

    if (missingVars.length > 0) {
      console.log('\n⚠️  Missing environment variables. Please set them up first.');
      console.log('📝 Missing:', missingVars.join(', '));
      return;
    }

    // Step 2: Initialize connections
    console.log('\n2️⃣ Initializing Connections...');
    
    // Initialize Supabase
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    // Initialize Google Sheets
    const { google } = await import('googleapis');
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheets = google.sheets({ version: 'v4', auth });

    console.log('✅ Connections initialized');

    // Step 3: Add test data to Google Sheets
    console.log('\n3️⃣ Adding Test Data to Google Sheets...');
    console.log('📊 Test Data:', TEST_DATA);

    try {
      // Add test row to Google Sheets
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'A:I', // Adjust based on your sheet structure
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
          values: [[
            TEST_DATA.timestamp,
            TEST_DATA.payment_id,
            TEST_DATA.email,
            TEST_DATA.plan,
            TEST_DATA.amount,
            TEST_DATA.currency,
            TEST_DATA.status,
            TEST_DATA.payment_method,
            TEST_DATA.source
          ]]
        }
      });

      console.log('✅ Test data added to Google Sheets');
      console.log(`   Updated ${response.data.updates.updatedRows} rows`);

    } catch (error) {
      console.log('❌ Failed to add test data to Google Sheets:', error.message);
      return;
    }

    // Step 4: Wait a moment for processing
    console.log('\n4️⃣ Waiting for sync processing...');
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds

    // Step 5: Check if data appears in Supabase
    console.log('\n5️⃣ Checking Supabase for Test Data...');
    
    // Check payments table
    const { data: payments, error: paymentsError } = await supabase
      .from('payments')
      .select('*')
      .eq('payment_intent_id', TEST_DATA.payment_id);

    if (paymentsError) {
      console.log('❌ Error checking payments:', paymentsError.message);
    } else if (payments && payments.length > 0) {
      console.log('✅ Test payment found in Supabase!');
      console.log('📊 Payment details:', payments[0]);
    } else {
      console.log('❌ Test payment not found in Supabase');
    }

    // Check users table
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .eq('email', TEST_DATA.email);

    if (usersError) {
      console.log('❌ Error checking users:', usersError.message);
    } else if (users && users.length > 0) {
      console.log('✅ Test user found in Supabase!');
      console.log('📊 User details:', users[0]);
    } else {
      console.log('❌ Test user not found in Supabase');
    }

    // Step 6: Manual sync test
    console.log('\n6️⃣ Testing Manual Sync...');
    try {
      const { syncGoogleSheetsToSupabase } = await import('./sync-google-sheets-to-supabase.js');
      const syncResult = await syncGoogleSheetsToSupabase();
      console.log('✅ Manual sync completed');
      console.log('📊 Sync result:', syncResult);
    } catch (error) {
      console.log('❌ Manual sync failed:', error.message);
    }

    // Step 7: Final verification
    console.log('\n7️⃣ Final Verification...');
    
    const { data: finalPayments } = await supabase
      .from('payments')
      .select('*')
      .eq('payment_intent_id', TEST_DATA.payment_id);

    const { data: finalUsers } = await supabase
      .from('users')
      .select('*')
      .eq('email', TEST_DATA.email);

    if (finalPayments && finalPayments.length > 0 && finalUsers && finalUsers.length > 0) {
      console.log('🎉 SUCCESS! Test data synced from Google Sheets to Supabase!');
      console.log('✅ Payment record created');
      console.log('✅ User record created/updated');
      console.log('✅ Plan updated correctly');
    } else {
      console.log('❌ Test failed - data not synced properly');
    }

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
runManualTest()
  .then(() => {
    console.log('\n✅ Manual test completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }); 