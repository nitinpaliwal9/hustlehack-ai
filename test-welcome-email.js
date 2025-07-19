// Test script to debug welcome email system
// Run this in your browser console or as a Node.js script

const testWelcomeEmail = async () => {
  try {
    console.log('🧪 Testing Welcome Email System...');
    
    // Test 1: Check API endpoint
    console.log('\n📡 Testing API endpoint...');
    const response = await fetch('/api/welcome', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    console.log('API Response Status:', response.status);
    console.log('API Response:', await response.text());
    
    // Test 2: Check a specific user (replace with actual user ID)
    const testUserId = 'YOUR_TEST_USER_ID'; // Replace with actual user ID
    
    if (testUserId !== 'YOUR_TEST_USER_ID') {
      console.log('\n👤 Testing specific user...');
      const userResponse = await fetch(`/api/welcome?user_id=${testUserId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const userData = await userResponse.json();
      console.log('User Welcome Email Status:', userData);
    }
    
    // Test 3: Check database directly (if you have access)
    console.log('\n🗄️ Database Check (if you have access):');
    console.log('Run this SQL query in Supabase SQL Editor:');
    console.log(`
      SELECT 
        id, 
        email, 
        name, 
        welcome_email_sent, 
        created_at
      FROM users 
      ORDER BY created_at DESC 
      LIMIT 5;
    `);
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
};

// Test welcome email trigger
const testWelcomeEmailTrigger = async (userId, email, name) => {
  try {
    console.log('🚀 Testing Welcome Email Trigger...');
    
    const response = await fetch('/api/welcome', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        email: email,
        name: name,
        plan: 'creator-beta'
      }),
    });
    
    const result = await response.json();
    console.log('Trigger Result:', result);
    
    return result;
  } catch (error) {
    console.error('❌ Trigger test failed:', error);
    return null;
  }
};

// Manual trigger for existing users
const triggerWelcomeEmailForExistingUser = async (userId) => {
  try {
    console.log(`📧 Manually triggering welcome email for user: ${userId}`);
    
    const result = await testWelcomeEmailTrigger(
      userId,
      'test@example.com', // Replace with actual email
      'Test User' // Replace with actual name
    );
    
    if (result && result.sent) {
      console.log('✅ Welcome email triggered successfully!');
    } else {
      console.log('❌ Welcome email trigger failed or already sent');
    }
    
    return result;
  } catch (error) {
    console.error('❌ Manual trigger failed:', error);
    return null;
  }
};

// Export functions for use
if (typeof window !== 'undefined') {
  // Browser environment
  window.testWelcomeEmail = testWelcomeEmail;
  window.testWelcomeEmailTrigger = testWelcomeEmailTrigger;
  window.triggerWelcomeEmailForExistingUser = triggerWelcomeEmailForExistingUser;
} else {
  // Node.js environment
  module.exports = {
    testWelcomeEmail,
    testWelcomeEmailTrigger,
    triggerWelcomeEmailForExistingUser
  };
}

console.log('🧪 Welcome Email Test Script Loaded');
console.log('Available functions:');
console.log('- testWelcomeEmail()');
console.log('- testWelcomeEmailTrigger(userId, email, name)');
console.log('- triggerWelcomeEmailForExistingUser(userId)'); 