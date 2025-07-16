// Plan utility: display names and hierarchy for consistent use everywhere

export const PLAN_DISPLAY_NAMES = {
  pro: 'Pro Hacker',
  creator: 'Creator Mode',
  starter: 'Starter Hustler',
};

export const PLAN_HIERARCHY = {
  starter: 1,
  creator: 2,
  pro: 3,
};

export function getPlanDisplayName(plan) {
  if (!plan) return 'Not active';
  return PLAN_DISPLAY_NAMES[plan] || (plan.charAt(0).toUpperCase() + plan.slice(1));
}

export function isPlanAtLeast(userPlan, requiredPlan) {
  // Returns true if userPlan is at least as high as requiredPlan
  return (PLAN_HIERARCHY[userPlan] || 0) >= (PLAN_HIERARCHY[requiredPlan] || 0);
} 