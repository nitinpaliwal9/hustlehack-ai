// Environment Variables Test Script
import dotenv from 'dotenv';
import { readFileSync, existsSync } from 'fs';

dotenv.config();

console.log('🔧 Environment Variables Test');
console.log('=============================\n');

// Check .env.local file
console.log('1️⃣ Checking .env.local file...');
if (existsSync('.env.local')) {
  console.log('✅ .env.local file exists');
  
  try {
    const envContent = readFileSync('.env.local', 'utf8');
    const lines = envContent.split('\n').filter(line => line.trim());
    console.log(`📄 File contains ${lines.length} lines`);
    
    // Check for specific variables
    const hasSupabaseUrl = envContent.includes('NEXT_PUBLIC_SUPABASE_URL');
    const hasSupabaseKey = envContent.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY');
    const hasGoogleSheetId = envContent.includes('GOOGLE_SHEET_ID');
    const hasGoogleEmail = envContent.includes('GOOGLE_SERVICE_ACCOUNT_EMAIL');
    const hasGoogleKey = envContent.includes('GOOGLE_PRIVATE_KEY');
    
    console.log('📋 Variable Status:');
    console.log(`  - NEXT_PUBLIC_SUPABASE_URL: ${hasSupabaseUrl ? '✅ Found' : '❌ Missing'}`);
    console.log(`  - NEXT_PUBLIC_SUPABASE_ANON_KEY: ${hasSupabaseKey ? '✅ Found' : '❌ Missing'}`);
    console.log(`  - GOOGLE_SHEET_ID: ${hasGoogleSheetId ? '✅ Found' : '❌ Missing'}`);
    console.log(`  - GOOGLE_SERVICE_ACCOUNT_EMAIL: ${hasGoogleEmail ? '✅ Found' : '❌ Missing'}`);
    console.log(`  - GOOGLE_PRIVATE_KEY: ${hasGoogleKey ? '✅ Found' : '❌ Missing'}`);
    
  } catch (error) {
    console.log('❌ Error reading .env.local:', error.message);
  }
} else {
  console.log('❌ .env.local file not found');
}

// Check loaded environment variables
console.log('\n2️⃣ Checking loaded environment variables...');
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
    // Show first 20 characters for security
    const preview = value.length > 20 ? value.substring(0, 20) + '...' : value;
    console.log(`✅ ${varName}: ${preview}`);
  } else {
    console.log(`❌ ${varName}: Missing`);
    missingVars.push(varName);
  }
});

// Provide setup instructions
console.log('\n📝 Setup Instructions:');
console.log('=====================');

if (missingVars.length === 0) {
  console.log('🎉 All environment variables are set!');
  console.log('✅ You can now run the full sync test.');
} else {
  console.log('⚠️  Missing variables:', missingVars.join(', '));
  console.log('\n🔧 To complete setup:');
  console.log('\n1️⃣ Create Google Service Account:');
  console.log('   - Go to https://console.cloud.google.com/');
  console.log('   - Create a new project or select existing');
  console.log('   - Enable Google Sheets API');
  console.log('   - Create Service Account');
  console.log('   - Download JSON key file');
  
  console.log('\n2️⃣ Share Google Sheet:');
  console.log('   - Open your Google Sheet');
  console.log('   - Click "Share" (top right)');
  console.log('   - Add service account email');
  console.log('   - Give "Editor" access');
  
  console.log('\n3️⃣ Add to .env.local:');
  console.log('   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url');
  console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key');
  console.log('   GOOGLE_SHEET_ID=your_sheet_id');
  console.log('   GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email');
  console.log('   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nYour Key\\n-----END PRIVATE KEY-----\\n"');
}

console.log('\n🚀 Next Steps:');
console.log('1. Complete environment setup (if needed)');
console.log('2. Run: node scripts/test-sync.js');
console.log('3. Run: node scripts/sync-google-sheets-to-supabase.js');
console.log('4. Test API endpoint: curl http://localhost:3000/api/sync-sheets');

console.log('\n✅ Environment test completed!'); 