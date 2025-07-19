// Debug Profile Completion
// Add this to your browser console to test profile completion directly

async function debugProfileCompletion() {
  console.log('🔍 Starting profile completion debug...');
  
  // Check if Supabase is available
  if (typeof supabase === 'undefined') {
    console.error('❌ Supabase client not found');
    return;
  }
  
  console.log('✅ Supabase client found');
  
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    console.error('❌ No authenticated user:', userError);
    return;
  }
  
  console.log('✅ User authenticated:', user.id);
  
  // Check current user profile
  const { data: currentProfile, error: profileError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();
  
  if (profileError) {
    console.error('❌ Error fetching current profile:', profileError);
    return;
  }
  
  console.log('📋 Current profile:', currentProfile);
  
  // Try to update the profile
  const testUpdate = {
    name: 'Test User Debug',
    phone: '+91 1234567890',
    role: 'Student',
    profile_completed: true,
    updated_at: new Date().toISOString(),
  };
  
  console.log('🔄 Attempting update with:', testUpdate);
  
  const { data: updateResult, error: updateError } = await supabase
    .from('users')
    .update(testUpdate)
    .eq('id', user.id)
    .select();
  
  if (updateError) {
    console.error('❌ Update failed:', updateError);
    console.error('Error details:', {
      message: updateError.message,
      details: updateError.details,
      hint: updateError.hint,
      code: updateError.code
    });
    return;
  }
  
  console.log('✅ Update successful:', updateResult);
  
  // Verify the update
  const { data: verifyResult, error: verifyError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();
  
  if (verifyError) {
    console.error('❌ Verification failed:', verifyError);
    return;
  }
  
  console.log('✅ Verification successful:', verifyResult);
  
  // Revert the test
  const revertUpdate = {
    name: currentProfile.name,
    phone: currentProfile.phone,
    role: currentProfile.role,
    profile_completed: currentProfile.profile_completed,
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
}

// Run the debug function
debugProfileCompletion(); 