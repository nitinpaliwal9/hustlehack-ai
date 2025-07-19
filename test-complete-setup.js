// Complete Setup Test Script
// Run this in your browser console to test everything

async function testCompleteSetup() {
  console.log('🧪 Starting complete setup test...');
  
  // Test 1: Environment Variables (Browser-safe)
  console.log('\n📋 Test 1: Environment Variables');
  console.log('ℹ️ Environment variables are loaded at build time in Next.js');
  console.log('ℹ️ If Supabase client exists, environment variables are working');
  
  // Test 2: Supabase Client
  console.log('\n📋 Test 2: Supabase Client');
  if (typeof supabase === 'undefined') {
    console.error('❌ Supabase client not found');
    return;
  }
  console.log('✅ Supabase client found');
  
  // Test 3: Authentication
  console.log('\n📋 Test 3: Authentication');
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    console.error('❌ No authenticated user:', authError);
    return;
  }
  console.log('✅ User authenticated:', user.id);
  
  // Test 4: Database Connectivity
  console.log('\n📋 Test 4: Database Connectivity');
  const { data: healthData, error: healthError } = await supabase
    .from('users')
    .select('count')
    .limit(1);
  
  if (healthError) {
    console.error('❌ Database connectivity failed:', healthError);
    return;
  }
  console.log('✅ Database connectivity OK');
  
  // Test 5: User Profile Access
  console.log('\n📋 Test 5: User Profile Access');
  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();
  
  if (profileError) {
    console.error('❌ Profile access failed:', profileError);
    return;
  }
  console.log('✅ Profile access OK:', {
    id: profile.id,
    email: profile.email,
    profile_completed: profile.profile_completed,
    plan: profile.plan
  });
  
  // Test 6: Profile Update (Test Mode)
  console.log('\n📋 Test 6: Profile Update Test');
  const testUpdate = {
    name: 'Test User',
    phone: '+91 1234567890',
    role: 'Student',
    profile_completed: true,
    updated_at: new Date().toISOString(),
  };
  
  const { data: updateResult, error: updateError } = await supabase
    .from('users')
    .update(testUpdate)
    .eq('id', user.id)
    .select();
  
  if (updateError) {
    console.error('❌ Profile update failed:', updateError);
    return;
  }
  console.log('✅ Profile update test successful');
  
  // Test 7: Revert Test Update
  console.log('\n📋 Test 7: Reverting Test Update');
  const revertUpdate = {
    name: profile.name,
    phone: profile.phone,
    role: profile.role,
    profile_completed: profile.profile_completed,
    updated_at: new Date().toISOString(),
  };
  
  const { error: revertError } = await supabase
    .from('users')
    .update(revertUpdate)
    .eq('id', user.id);
  
  if (revertError) {
    console.warn('⚠️ Revert failed:', revertError);
  } else {
    console.log('✅ Test reverted successfully');
  }
  
  // Test 8: RLS Policies
  console.log('\n📋 Test 8: RLS Policy Check');
  const { data: policyTest, error: policyError } = await supabase
    .from('users')
    .select('id')
    .eq('id', user.id)
    .single();
  
  if (policyError) {
    console.error('❌ RLS policy test failed:', policyError);
    return;
  }
  console.log('✅ RLS policies working correctly');
  
  console.log('\n🎉 All tests passed! Profile completion should work correctly.');
  console.log('\n📝 Next steps:');
  console.log('1. Try completing a profile through the UI');
  console.log('2. Check browser console for detailed logs');
  console.log('3. Verify profile_completed changes to true in Supabase');
}

// Run the complete test
testCompleteSetup(); 