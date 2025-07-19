import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client for audit logging
let supabase = null;

try {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
  }
} catch (error) {
  console.warn('Failed to initialize Supabase client for audit logging:', error);
}

// Audit log levels
export const LOG_LEVELS = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  SECURITY: 'security',
  CRITICAL: 'critical'
};

// Action types for categorization
export const ACTION_TYPES = {
  // Authentication
  LOGIN: 'login',
  LOGOUT: 'logout',
  SIGNUP: 'signup',
  PASSWORD_RESET: 'password_reset',
  EMAIL_VERIFICATION: 'email_verification',
  
  // Profile
  PROFILE_UPDATE: 'profile_update',
  PROFILE_VIEW: 'profile_view',
  
  // Content
  CONTENT_GENERATION: 'content_generation',
  CONTENT_VIEW: 'content_view',
  CONTENT_DOWNLOAD: 'content_download',
  
  // Payment
  PAYMENT_INITIATED: 'payment_initiated',
  PAYMENT_SUCCESS: 'payment_success',
  PAYMENT_FAILED: 'payment_failed',
  
  // Security
  SUSPICIOUS_ACTIVITY: 'suspicious_activity',
  RATE_LIMIT_EXCEEDED: 'rate_limit_exceeded',
  INVALID_INPUT: 'invalid_input',
  UNAUTHORIZED_ACCESS: 'unauthorized_access',
  
  // System
  SYSTEM_ERROR: 'system_error',
  API_ERROR: 'api_error'
};

/**
 * Log an audit event
 * @param {string} action - The action being performed
 * @param {string} level - Log level (info, warning, error, security, critical)
 * @param {Object} details - Additional details about the event
 * @param {string} userId - User ID (optional)
 * @param {string} ipAddress - IP address (optional)
 * @param {string} userAgent - User agent (optional)
 */
export const logAuditEvent = async ({
  action,
  level = LOG_LEVELS.INFO,
  details = {},
  userId = null,
  ipAddress = null,
  userAgent = null
}) => {
  try {
    if (!supabase) {
      console.warn('Supabase client not available for audit logging');
      return;
    }

    const auditLog = {
      action,
      level,
      details: JSON.stringify(details),
      user_id: userId,
      ip_address: ipAddress,
      user_agent: userAgent,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV
    };

    const { error } = await supabase
      .from('audit_logs')
      .insert(auditLog);

    if (error) {
      console.error('Failed to log audit event:', error);
    }
  } catch (error) {
    console.error('Audit logging error:', error);
  }
};

/**
 * Log security events
 */
export const logSecurityEvent = (action, details, userId = null, ipAddress = null) => {
  return logAuditEvent({
    action,
    level: LOG_LEVELS.SECURITY,
    details,
    userId,
    ipAddress
  });
};

/**
 * Log authentication events
 */
export const logAuthEvent = (action, details, userId = null, ipAddress = null) => {
  return logAuditEvent({
    action,
    level: LOG_LEVELS.INFO,
    details,
    userId,
    ipAddress
  });
};

/**
 * Log content generation events
 */
export const logContentEvent = (action, details, userId = null) => {
  return logAuditEvent({
    action,
    level: LOG_LEVELS.INFO,
    details,
    userId
  });
};

/**
 * Log payment events
 */
export const logPaymentEvent = (action, details, userId = null, ipAddress = null) => {
  return logAuditEvent({
    action,
    level: LOG_LEVELS.INFO,
    details,
    userId,
    ipAddress
  });
};

/**
 * Log suspicious activity
 */
export const logSuspiciousActivity = (details, userId = null, ipAddress = null) => {
  return logAuditEvent({
    action: ACTION_TYPES.SUSPICIOUS_ACTIVITY,
    level: LOG_LEVELS.WARNING,
    details,
    userId,
    ipAddress
  });
};

/**
 * Log rate limit exceeded
 */
export const logRateLimitExceeded = (identifier, endpoint, userId = null, ipAddress = null) => {
  return logAuditEvent({
    action: ACTION_TYPES.RATE_LIMIT_EXCEEDED,
    level: LOG_LEVELS.WARNING,
    details: {
      identifier,
      endpoint,
      timestamp: new Date().toISOString()
    },
    userId,
    ipAddress
  });
};

/**
 * Log API errors
 */
export const logApiError = (endpoint, error, userId = null, ipAddress = null) => {
  return logAuditEvent({
    action: ACTION_TYPES.API_ERROR,
    level: LOG_LEVELS.ERROR,
    details: {
      endpoint,
      error: error.message || error,
      stack: error.stack,
      timestamp: new Date().toISOString()
    },
    userId,
    ipAddress
  });
};

/**
 * Get audit logs for a user (admin function)
 */
export const getUserAuditLogs = async (userId, limit = 100) => {
  try {
    if (!supabase) {
      console.warn('Supabase client not available for audit logging');
      return [];
    }

    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Failed to fetch audit logs:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    return [];
  }
};

/**
 * Get security events (admin function)
 */
export const getSecurityEvents = async (limit = 100) => {
  try {
    if (!supabase) {
      console.warn('Supabase client not available for audit logging');
      return [];
    }

    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .in('level', [LOG_LEVELS.SECURITY, LOG_LEVELS.WARNING, LOG_LEVELS.ERROR, LOG_LEVELS.CRITICAL])
      .order('timestamp', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Failed to fetch security events:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching security events:', error);
    return [];
  }
}; 