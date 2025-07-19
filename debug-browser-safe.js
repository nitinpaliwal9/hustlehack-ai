// Browser-Safe Debug Script
// Run this in your browser console to test profile completion

async function debugProfileCompletion() {
  console.log('🔍 Starting browser-safe debug...');
  
  // Test 1: Supabase Client
  console.log('\n📋 Test 1: Supabase Client');
  if (typeof supabase === 'undefined') {
    console.error('❌ Supabase client not found');
    console.log('💡 This means environment variables are not loaded');
    return;
  }
  console.log('✅ Supabase client found');
  
  // Test 2: Authentication
  console.log('\n📋 Test 2: Authentication');
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    console.error('❌ No authenticated user:', authError);
    console.log('💡 Please log in first');
    return;
  }
  console.log('✅ User authenticated:', user.id);
  console.log('✅ User email:', user.email);
  
  // Test 3: Database Connectivity
  console.log('\n📋 Test 3: Database Connectivity');
  try {
    const { data: healthData, error: healthError } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (healthError) {
      console.error('❌ Database connectivity failed:', healthError);
      return;
    }
    console.log('✅ Database connectivity OK');
  } catch (error) {
    console.error('❌ Database test failed:', error);
    return;
  }
  
  // Test 4: User Profile Access
  console.log('\n📋 Test 4: User Profile Access');
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
    name: profile.name,
    phone: profile.phone,
    role: profile.role,
    profile_completed: profile.profile_completed,
    plan: profile.plan
  });
  
  // Test 5: Profile Update Test
  console.log('\n📋 Test 5: Profile Update Test');
  const originalProfile = { ...profile };
  
  const testUpdate = {
    name: 'Test User Debug',
    phone: '+91 1234567890',
    role: 'Student',
    profile_completed: true,
    updated_at: new Date().toISOString(),
  };
  
  console.log('🔄 Attempting test update...');
  const { data: updateResult, error: updateError } = await supabase
    .from('users')
    .update(testUpdate)
    .eq('id', user.id)
    .select();
  
  if (updateError) {
    console.error('❌ Profile update failed:', updateError);
    console.error('Error details:', {
      message: updateError.message,
      details: updateError.details,
      hint: updateError.hint,
      code: updateError.code
    });
    return;
  }
  
  console.log('✅ Profile update test successful:', updateResult[0]);
  
  // Test 6: Verify Update
  console.log('\n📋 Test 6: Verify Update');
  const { data: verifyResult, error: verifyError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();
  
  if (verifyError) {
    console.error('❌ Verification failed:', verifyError);
  } else {
    console.log('✅ Verification successful:', {
      profile_completed: verifyResult.profile_completed,
      name: verifyResult.name,
      phone: verifyResult.phone,
      role: verifyResult.role
    });
  }
  
  // Test 7: Revert Test
  console.log('\n📋 Test 7: Reverting Test');
  const revertUpdate = {
    name: originalProfile.name,
    phone: originalProfile.phone,
    role: originalProfile.role,
    profile_completed: originalProfile.profile_completed,
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
  
  console.log('\n🎉 All tests passed! Profile completion should work.');
  console.log('\n📝 Next steps:');
  console.log('1. Try the profile completion form');
  console.log('2. Watch the browser console for logs');
  console.log('3. Check if profile_completed changes to true');
}

// Run the debug function
debugProfileCompletion(); 