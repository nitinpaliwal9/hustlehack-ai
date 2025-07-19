// Test script to verify Google Sheets sync setup
import dotenv from 'dotenv';
import { google } from 'googleapis';

dotenv.config();

// Configuration
const CONFIG = {
  GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID,
  GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

async function testGoogleSheetsAccess() {
  try {
    console.log('🔍 Testing Google Sheets access...');
    
    // Check environment variables
    console.log('✅ Environment variables:');
    console.log('  - GOOGLE_SHEET_ID:', CONFIG.GOOGLE_SHEET_ID ? '✅ Set' : '❌ Missing');
    console.log('  - GOOGLE_SERVICE_ACCOUNT_EMAIL:', CONFIG.GOOGLE_SERVICE_ACCOUNT_EMAIL ? '✅ Set' : '❌ Missing');
    console.log('  - GOOGLE_PRIVATE_KEY:', CONFIG.GOOGLE_PRIVATE_KEY ? '✅ Set' : '❌ Missing');
    
    if (!CONFIG.GOOGLE_SHEET_ID || !CONFIG.GOOGLE_SERVICE_ACCOUNT_EMAIL || !CONFIG.GOOGLE_PRIVATE_KEY) {
      console.log('❌ Missing required environment variables');
      return false;
    }
    
    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: CONFIG.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: CONFIG.GOOGLE_PRIVATE_KEY,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    
    const sheets = google.sheets({ version: 'v4', auth });
    
    // Test sheet access
    console.log('🔍 Testing sheet access...');
    const response = await sheets.spreadsheets.get({
      spreadsheetId: CONFIG.GOOGLE_SHEET_ID,
    });
    
    console.log('✅ Sheet access successful!');
    console.log('  - Sheet title:', response.data.properties.title);
    console.log('  - Sheet ID:', response.data.spreadsheetId);
    
    // Test reading data
    console.log('🔍 Testing data reading...');
    const dataResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: CONFIG.GOOGLE_SHEET_ID,
      range: 'A:I',
    });
    
    const rows = dataResponse.data.values;
    console.log('✅ Data reading successful!');
    console.log('  - Total rows:', rows ? rows.length : 0);
    console.log('  - Headers:', rows && rows.length > 0 ? rows[0] : 'No data');
    
    if (rows && rows.length > 1) {
      console.log('  - Sample data row:', rows[1]);
    }
    
    return true;
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    if (error.message.includes('not found')) {
      console.log('💡 Tip: Make sure you shared the sheet with your service account email');
    }
    
    if (error.message.includes('invalid_grant')) {
      console.log('💡 Tip: Check your service account credentials');
    }
    
    return false;
  }
}

async function testSupabaseConnection() {
  try {
    console.log('🔍 Testing Supabase connection...');
    
    const { createClient } = await import('@supabase/supabase-js');
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    console.log('✅ Supabase environment variables:');
    console.log('  - NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
    console.log('  - NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Set' : '❌ Missing');
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.log('❌ Missing Supabase environment variables');
      return false;
    }
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Test connection by reading users table
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Supabase connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Supabase connection successful!');
    return true;
    
  } catch (error) {
    console.error('❌ Supabase test failed:', error.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting Google Sheets to Supabase sync tests...\n');
  
  const sheetsTest = await testGoogleSheetsAccess();
  console.log('');
  
  const supabaseTest = await testSupabaseConnection();
  console.log('');
  
  if (sheetsTest && supabaseTest) {
    console.log('🎉 All tests passed! Your sync setup is ready.');
    console.log('\n📋 Next steps:');
    console.log('1. Run the sync script: node scripts/sync-google-sheets-to-supabase.js');
    console.log('2. Set up automation (cron, Vercel, or GitHub Actions)');
    console.log('3. Monitor the sync logs');
  } else {
    console.log('❌ Some tests failed. Please check the setup instructions.');
  }
}

// Run tests if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests()
    .then(() => {
      console.log('\n✅ Test completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Test failed:', error);
      process.exit(1);
    });
}

export { testGoogleSheetsAccess, testSupabaseConnection }; 