// Backend validation utilities that mirror frontend validation

// Email validation
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return { isValid: false, error: 'Email is required' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  // Check for common disposable email domains
  const disposableDomains = [
    'tempmail.org', '10minutemail.com', 'guerrillamail.com', 
    'mailinator.com', 'yopmail.com', 'temp-mail.org'
  ];
  
  const domain = email.split('@')[1];
  if (disposableDomains.includes(domain)) {
    return { isValid: false, error: 'Please use a valid email address' };
  }
  
  return { isValid: true, error: null };
};

// Password validation
export const validatePassword = (password) => {
  if (!password || typeof password !== 'string') {
    return { isValid: false, error: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters long' };
  }
  
  if (password.length > 128) {
    return { isValid: false, error: 'Password must be less than 128 characters' };
  }
  
  // Check for common weak passwords
  const weakPasswords = [
    'password', '123456', '12345678', 'qwerty', 'abc123',
    'password123', 'admin', 'letmein', 'welcome'
  ];
  
  if (weakPasswords.includes(password.toLowerCase())) {
    return { isValid: false, error: 'Please choose a stronger password' };
  }
  
  return { isValid: true, error: null };
};

// Name validation
export const validateName = (name) => {
  if (!name || typeof name !== 'string') {
    return { isValid: false, error: 'Name is required' };
  }
  
  const trimmedName = name.trim();
  if (trimmedName.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters' };
  }
  
  if (trimmedName.length > 50) {
    return { isValid: false, error: 'Name must be less than 50 characters' };
  }
  
  // Check for suspicious patterns
  const suspiciousPatterns = [
    /<script/i, /javascript:/i, /on\w+\s*=/i, /<iframe/i,
    /<object/i, /<embed/i, /<applet/i, /<meta/i
  ];
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(trimmedName)) {
      return { isValid: false, error: 'Name contains invalid characters' };
    }
  }
  
  return { isValid: true, error: null };
};

// Phone number validation (international)
export const validatePhone = (phone) => {
  if (!phone || typeof phone !== 'string') {
    return { isValid: false, error: 'Phone number is required' };
  }
  
  // Remove all non-digit characters except + and -
  const cleaned = phone.replace(/[^\d+\-()\s]/g, '');
  
  // Basic international phone validation
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  if (!phoneRegex.test(cleaned.replace(/[\s\-()]/g, ''))) {
    return { isValid: false, error: 'Please enter a valid phone number' };
  }
  
  return { isValid: true, error: null };
};

// Role validation
export const validateRole = (role) => {
  const validRoles = ['student', 'creator', 'solopreneur', 'freelancer', 'entrepreneur'];
  
  if (!role || typeof role !== 'string') {
    return { isValid: false, error: 'Please select your role' };
  }
  
  if (!validRoles.includes(role)) {
    return { isValid: false, error: 'Please select a valid role' };
  }
  
  return { isValid: true, error: null };
};

// Content validation for AI generation
export const validateContentRequest = (data) => {
  const { contentType, topic, tone, length, userId } = data;
  
  // Validate content type
  const validContentTypes = ['social-media', 'blog', 'email', 'ad-copy', 'product-description'];
  if (!contentType || !validContentTypes.includes(contentType)) {
    return { isValid: false, error: 'Invalid content type' };
  }
  
  // Validate topic
  if (!topic || typeof topic !== 'string' || topic.trim().length < 3) {
    return { isValid: false, error: 'Topic must be at least 3 characters long' };
  }
  
  if (topic.length > 500) {
    return { isValid: false, error: 'Topic must be less than 500 characters' };
  }
  
  // Validate tone
  const validTones = ['professional', 'casual', 'friendly', 'formal', 'enthusiastic'];
  if (!tone || !validTones.includes(tone)) {
    return { isValid: false, error: 'Invalid tone selection' };
  }
  
  // Validate length
  const validLengths = ['short', 'medium', 'long'];
  if (!length || !validLengths.includes(length)) {
    return { isValid: false, error: 'Invalid length selection' };
  }
  
  // Validate userId if provided
  if (userId && (typeof userId !== 'string' || userId.length < 1)) {
    return { isValid: false, error: 'Invalid user ID' };
  }
  
  return { isValid: true, error: null };
};

// Payment validation
export const validatePaymentRequest = (data) => {
  const { email, amount } = data;
  
  // Validate email
  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    return { isValid: false, error: emailValidation.error };
  }
  
  // Validate amount
  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return { isValid: false, error: 'Invalid amount' };
  }
  
  if (amount > 10000) { // ₹10,000 limit
    return { isValid: false, error: 'Amount exceeds maximum limit' };
  }
  
  return { isValid: true, error: null };
};

// Rate limiting helper
export const createRateLimiter = () => {
  const requests = new Map();
  
  return {
    checkLimit: (identifier, maxRequests = 10, windowMs = 60000) => {
      const now = Date.now();
      const windowStart = now - windowMs;
      
      if (!requests.has(identifier)) {
        requests.set(identifier, []);
      }
      
      const userRequests = requests.get(identifier);
      
      // Remove old requests outside the window
      const validRequests = userRequests.filter(timestamp => timestamp > windowStart);
      requests.set(identifier, validRequests);
      
      if (validRequests.length >= maxRequests) {
        return { allowed: false, remaining: 0 };
      }
      
      // Add current request
      validRequests.push(now);
      requests.set(identifier, validRequests);
      
      return { 
        allowed: true, 
        remaining: maxRequests - validRequests.length 
      };
    }
  };
};

// Sanitize input to prevent XSS
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Validate and sanitize user input
export const validateAndSanitize = (data, validationRules) => {
  const sanitized = {};
  const errors = {};
  
  for (const [field, value] of Object.entries(data)) {
    if (validationRules[field]) {
      const validation = validationRules[field](value);
      if (!validation.isValid) {
        errors[field] = validation.error;
      } else {
        sanitized[field] = sanitizeInput(value);
      }
    } else {
      sanitized[field] = sanitizeInput(value);
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    sanitized,
    errors
  };
}; 