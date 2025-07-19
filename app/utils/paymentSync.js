// Payment Sync Utilities
// Handles email mismatches and legacy payment synchronization

import { supabase } from '../../lib/supabaseClient';

// Handle email mismatch between payment and login
export async function handleEmailMismatch(paymentEmail, loginEmail) {
  try {
    // 1. Check if payment email exists as a user
    const { data: paymentUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', paymentEmail)
      .single();

    // 2. Check if login email exists as a user
    const { data: loginUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', loginEmail)
      .single();

    if (paymentUser && loginUser) {
      // Both users exist - merge accounts
      return await mergeUserAccounts(paymentUser, loginUser);
    } else if (paymentUser && !loginUser) {
      // Payment user exists, login user doesn't - update payment user email
      return await updateUserEmail(paymentUser.id, loginEmail);
    } else if (!paymentUser && loginUser) {
      // Login user exists, payment user doesn't - update login user email
      return await updateUserEmail(loginUser.id, paymentEmail);
    } else {
      // Neither exists - create new user with login email
      return await createNewUser(loginEmail);
    }
  } catch (error) {
    console.error('Error handling email mismatch:', error);
    throw error;
  }
}

// Merge two user accounts
async function mergeUserAccounts(paymentUser, loginUser) {
  try {
    // Determine which user to keep (prefer the one with better plan/expiry)
    const keepUser = determinePrimaryUser(paymentUser, loginUser);
    const mergeUser = keepUser.id === paymentUser.id ? loginUser : paymentUser;

    // Transfer all payments from merge user to keep user
    const { error: paymentError } = await supabase
      .from('payments')
      .update({ user_id: keepUser.id })
      .eq('user_id', mergeUser.id);

    if (paymentError) {
      throw new Error('Failed to transfer payments: ' + paymentError.message);
    }

    // Update keep user with better plan/expiry if needed
    const updatedUser = await updateUserWithBetterPlan(keepUser, mergeUser);

    // Delete merge user
    const { error: deleteError } = await supabase
      .from('users')
      .delete()
      .eq('id', mergeUser.id);

    if (deleteError) {
      console.warn('Failed to delete merge user:', deleteError);
    }

    return updatedUser;
  } catch (error) {
    console.error('Error merging user accounts:', error);
    throw error;
  }
}

// Determine which user to keep when merging
function determinePrimaryUser(user1, user2) {
  // Priority: active plan > higher plan > newer user
  const now = new Date();
  
  const user1Active = user1.plan_expiry && new Date(user1.plan_expiry) > now;
  const user2Active = user2.plan_expiry && new Date(user2.plan_expiry) > now;
  
  if (user1Active && !user2Active) return user1;
  if (user2Active && !user1Active) return user2;
  
  // If both active or both inactive, compare plans
  const planHierarchy = { 'pro': 3, 'creator': 2, 'starter': 1 };
  const user1Plan = planHierarchy[user1.plan] || 0;
  const user2Plan = planHierarchy[user2.plan] || 0;
  
  if (user1Plan > user2Plan) return user1;
  if (user2Plan > user1Plan) return user2;
  
  // If same plan, keep the newer user
  return new Date(user1.created_at) > new Date(user2.created_at) ? user1 : user2;
}

// Update user with better plan from another user
async function updateUserWithBetterPlan(keepUser, mergeUser) {
  try {
    const now = new Date();
    const keepExpiry = keepUser.plan_expiry ? new Date(keepUser.plan_expiry) : null;
    const mergeExpiry = mergeUser.plan_expiry ? new Date(mergeUser.plan_expiry) : null;
    
    const planHierarchy = { 'pro': 3, 'creator': 2, 'starter': 1 };
    const keepPlan = planHierarchy[keepUser.plan] || 0;
    const mergePlan = planHierarchy[mergeUser.plan] || 0;
    
    let updatedPlan = keepUser.plan;
    let updatedExpiry = keepUser.plan_expiry;
    
    // If merge user has better plan or longer expiry, use that
    if (mergePlan > keepPlan || 
        (mergePlan === keepPlan && mergeExpiry && mergeExpiry > keepExpiry)) {
      updatedPlan = mergeUser.plan;
      updatedExpiry = mergeUser.plan_expiry;
    }
    
    const { data: updatedUser, error } = await supabase
      .from('users')
      .update({
        plan: updatedPlan,
        plan_expiry: updatedExpiry,
        updated_at: new Date().toISOString()
      })
      .eq('id', keepUser.id)
      .select()
      .single();
    
    if (error) {
      throw new Error('Failed to update user plan: ' + error.message);
    }
    
    return updatedUser;
  } catch (error) {
    console.error('Error updating user with better plan:', error);
    throw error;
  }
}

// Update user email
async function updateUserEmail(userId, newEmail) {
  try {
    const { data: updatedUser, error } = await supabase
      .from('users')
      .update({
        email: newEmail,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();
    
    if (error) {
      throw new Error('Failed to update user email: ' + error.message);
    }
    
    return updatedUser;
  } catch (error) {
    console.error('Error updating user email:', error);
    throw error;
  }
}

// Create new user
async function createNewUser(email) {
  try {
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
      throw new Error('Failed to create new user: ' + error.message);
    }
    
    return createdUser;
  } catch (error) {
    console.error('Error creating new user:', error);
    throw error;
  }
}

// Sync legacy payments from Google Sheets to Supabase
export async function syncLegacyPayments(googleSheetsData) {
  try {
    const results = {
      processed: 0,
      skipped: 0,
      errors: 0,
      details: []
    };
    
    for (const payment of googleSheetsData) {
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
            gateway_response: { source: 'legacy_sync' },
            created_at: payment.created_at,
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
  } catch (error) {
    console.error('Error syncing legacy payments:', error);
    throw error;
  }
}

// Find or create user (reusable function)
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

// Calculate plan expiry (reusable function)
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

// Check user subscription status
export async function checkUserSubscription(userId) {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('plan, plan_expiry, plan_start')
      .eq('id', userId)
      .single();
    
    if (error) {
      throw new Error('Failed to fetch user subscription: ' + error.message);
    }
    
    const now = new Date();
    const expiry = user.plan_expiry ? new Date(user.plan_expiry) : null;
    const isActive = expiry && expiry > now;
    
    return {
      plan: user.plan,
      isActive,
      expiry: user.plan_expiry,
      start: user.plan_start,
      daysRemaining: isActive ? Math.ceil((expiry - now) / (1000 * 60 * 60 * 24)) : 0
    };
  } catch (error) {
    console.error('Error checking user subscription:', error);
    throw error;
  }
} 