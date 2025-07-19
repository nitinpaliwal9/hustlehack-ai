// Simple test script for Google Sheets to Supabase sync
import dotenv from 'dotenv';

dotenv.config();

console.log('🧪 Testing Google Sheets to Supabase Sync Setup');
console.log('===============================================\n');

// Test 1: Check if dependencies are installed
console.log('1️⃣ Testing Dependencies...');
try {
  const { google } = await import('googleapis');
  console.log('✅ googleapis package is installed');
} catch (error) {
  console.log('❌ googleapis package is missing. Run: npm install googleapis');
}

try {
  const { createClient } = await import('@supabase/supabase-js');
  console.log('✅ @supabase/supabase-js package is installed');
} catch (error) {
  console.log('❌ @supabase/supabase-js package is missing. Run: npm install @supabase/supabase-js');
}

// Test 2: Check environment variables
console.log('\n2️⃣ Testing Environment Variables...');
const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'GOOGLE_SHEET_ID',
  'GOOGLE_SERVICE_ACCOUNT_EMAIL',
  'GOOGLE_PRIVATE_KEY'
];

let missingVars = [];
requiredVars.forEach(varName => {
  if (process.env[varName]) {
    console.log(`✅ ${varName}: Set`);
  } else {
    console.log(`❌ ${varName}: Missing`);
    missingVars.push(varName);
  }
});

// Test 3: Check if sync script exists
console.log('\n3️⃣ Testing Script Files...');
import { readFileSync, existsSync } from 'fs';

const scripts = [
  'scripts/sync-google-sheets-to-supabase.js',
  'scripts/test-sync.js',
  'app/api/sync-sheets/route.js'
];

scripts.forEach(script => {
  if (existsSync(script)) {
    console.log(`✅ ${script}: Exists`);
  } else {
    console.log(`❌ ${script}: Missing`);
  }
});

// Test 4: Check package.json configuration
console.log('\n4️⃣ Testing Package Configuration...');
try {
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
  
  if (packageJson.type === 'module') {
    console.log('✅ package.json has "type": "module"');
  } else {
    console.log('❌ package.json missing "type": "module"');
  }
  
  const hasGoogleapis = packageJson.dependencies?.googleapis;
  if (hasGoogleapis) {
    console.log('✅ googleapis dependency is configured');
  } else {
    console.log('❌ googleapis dependency is missing');
  }
  
  const hasDotenv = packageJson.dependencies?.dotenv;
  if (hasDotenv) {
    console.log('✅ dotenv dependency is configured');
  } else {
    console.log('❌ dotenv dependency is missing');
  }
  
} catch (error) {
  console.log('❌ Error reading package.json:', error.message);
}

// Summary
console.log('\n📋 Setup Summary:');
console.log('==================');

if (missingVars.length === 0) {
  console.log('🎉 All environment variables are set!');
  console.log('✅ You can now run the full test: node scripts/test-sync.js');
} else {
  console.log('⚠️  Missing environment variables:', missingVars.join(', '));
  console.log('\n📝 To complete setup:');
  console.log('1. Create a Google Service Account');
  console.log('2. Share your Google Sheet with the service account email');
  console.log('3. Add the environment variables to .env.local');
  console.log('4. Run: node scripts/test-sync.js');
}

console.log('\n🚀 Next Steps:');
console.log('1. Set up environment variables (if missing)');
console.log('2. Run: node scripts/test-sync.js');
console.log('3. Run: node scripts/sync-google-sheets-to-supabase.js');
console.log('4. Set up automation (cron, Vercel, or GitHub Actions)');

console.log('\n✅ Test completed!'); 