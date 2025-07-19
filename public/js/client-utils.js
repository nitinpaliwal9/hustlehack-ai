// HustleHack AI - Next.js Client-Side Utilities
// Modern JavaScript for React components and Next.js app

// Check if ClientUtils is already defined
if (typeof window !== 'undefined' && window.ClientUtils) {
  console.log('ClientUtils already loaded, skipping initialization');
} else {
  // Global utilities and helpers
  class ClientUtils {
  static instance = null;
  
  constructor() {
    if (ClientUtils.instance) {
      return ClientUtils.instance;
    }
    
    this.init();
    ClientUtils.instance = this;
  }
  
  init() {
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeApp());
    } else {
      this.initializeApp();
    }
  }

  // Global initialization function for route changes
  initializeClientUtils() {
    console.log('🔄 Re-initializing client utilities...');
    this.initializeApp();
  }
  
  initializeApp() {
    console.log('🚀 HustleHack AI - Client Utils Initialized');
    this.initializeAnimations();
    this.initializeScrollEffects();
    this.initializeTheme();
    this.initializeNetworkStatus();
    this.initializeKeyboardShortcuts();
  }
  
  // Enhanced Animation System
  initializeAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.card, .pricing-card, .section, .faq-item');
    animatedElements.forEach(el => observer.observe(el));
    
    // Typing animation for hero title
  }
  
  animateElement(element) {
    const animations = {
      'card': ['animate-fadeInUp', 'animate-fadeInLeft', 'animate-fadeInRight', 'animate-scaleIn'],
      'pricing-card': ['animate-scaleIn'],
      'section': ['animate-fadeIn'],
      'faq-item': ['animate-slideInDown']
    };
    
    const elementType = Array.from(element.classList).find(cls => animations[cls]);
    if (elementType) {
      const availableAnimations = animations[elementType];
      const animationIndex = Array.from(element.parentElement?.children || []).indexOf(element);
      const animation = availableAnimations[animationIndex % availableAnimations.length];
      element.classList.add(animation);
    } else {
      element.classList.add('animate-fadeInUp');
    }
  }
  
  typeWriter(element, text, speed = 100) {
    if (!element || !text) return;
    
    element.textContent = '';
    let i = 0;
    
    const type = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    };
    
    setTimeout(type, 1000);
  }
  
  // Scroll Effects
  initializeScrollEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
      this.handleParallax(hero);
    }
    
    // Progress bar
    this.createProgressBar();
    
    // Smooth scrolling
    this.initializeSmoothScrolling();
  }
  
  handleParallax(hero) {
    const handleScroll = this.throttle(() => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    }, 10);
    
    window.addEventListener('scroll', handleScroll);
  }
  
  createProgressBar() {
    const existingBar = document.querySelector('.scroll-progress');
    if (existingBar) return;
    
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    Object.assign(progressBar.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '0%',
      height: '3px',
      background: 'linear-gradient(135deg, #7F5AF0, #00FFC2)',
      zIndex: '1001',
      transition: 'width 0.1s ease'
    });
    
    document.body.appendChild(progressBar);
    
    const updateProgress = this.throttle(() => {
      const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      progressBar.style.width = `${Math.min(scrolled, 100)}%`;
    }, 10);
    
    window.addEventListener('scroll', updateProgress);
  }
  
  initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#' || href === '#!') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      });
    });
  }
  
  // Theme Management
  initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update theme toggle button
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  }
  
  toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.style.transform = 'scale(0.8)';
      setTimeout(() => {
        themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
        themeToggle.style.transform = 'scale(1)';
      }, 150);
    }
    
    this.showNotification(`🎨 Switched to ${newTheme} mode`, 'success');
  }
  
  // Network Status
  initializeNetworkStatus() {
    window.addEventListener('online', () => {
      this.showNotification('🌐 Connection restored!', 'success');
    });
    
    window.addEventListener('offline', () => {
      this.showNotification('⚠️ You are offline. Some features may not work.', 'warning', 5000);
    });
  }
  
  checkNetworkStatus() {
    if (!navigator.onLine) {
      this.showNotification('⚠️ You are offline. Please check your connection.', 'warning', 5000);
      return false;
    }
    return true;
  }
  
  // Keyboard Shortcuts
  initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Escape key to close modals
      if (e.key === 'Escape') {
        this.closeActiveModal();
      }
      
      // Ctrl/Cmd + K for quick search (if implemented)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Could implement quick search here
      }
    });
  }
  
  // Enhanced Notification System
  showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', type === 'error' || type === 'warning' ? 'assertive' : 'polite');
    
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    
    const colors = {
      success: '#10B981',
      error: '#EF4444',
      warning: '#F59E0B',
      info: '#3B82F6'
    };
    
    const icon = icons[type] || icons.info;
    notification.innerHTML = `
      <span style="margin-right: 8px;">${icon}</span>
      <span>${message}</span>
      <button class="notification-close" style="margin-left: auto; background: none; border: none; color: white; cursor: pointer;">×</button>
    `;
    
    // Enhanced styling
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '1rem 1.5rem',
      borderRadius: '12px',
      color: 'white',
      fontWeight: '500',
      zIndex: '3000',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      maxWidth: '400px',
      fontSize: '14px',
      lineHeight: '1.5',
      backgroundColor: colors[type] || colors.info
    });
    
    // Close button handler
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => this.removeNotification(notification));
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove
    setTimeout(() => {
      this.removeNotification(notification);
    }, duration);
  }
  
  removeNotification(notification) {
    if (notification && notification.parentNode) {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }
  }
  
  // Modal Management
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      
      // Focus first input
      const firstInput = modal.querySelector('input, textarea, select');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
    }
  }
  
  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }
  
  closeActiveModal() {
    const activeModal = document.querySelector('.modal[style*="flex"]');
    if (activeModal) {
      activeModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }
  
  // Form Validation
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  validatePassword(password) {
    return password.length >= 6;
  }
  
  showInputError(input, message) {
    this.clearInputError(input);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'input-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = 'color: #EF4444; font-size: 0.875rem; margin-top: 0.25rem;';
    
    input.parentNode.appendChild(errorDiv);
    input.style.borderColor = '#EF4444';
  }
  
  clearInputError(input) {
    const errorDiv = input.parentNode.querySelector('.input-error');
    if (errorDiv) {
      errorDiv.remove();
    }
    input.style.borderColor = '';
  }
  
  // Utility Functions
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  // Device Detection
  isMobileDevice() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  
  // Loading States
  setButtonLoading(button, isLoading) {
    if (!button) return;
    
    const btnText = button.querySelector('.btn-text') || button;
    const btnLoading = button.querySelector('.btn-loading');
    
    if (isLoading) {
      button.classList.add('loading');
      button.disabled = true;
      if (btnText && btnLoading) {
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
      } else {
        const originalText = button.textContent;
        button.textContent = 'Loading...';
        button.dataset.originalText = originalText;
      }
    } else {
      button.classList.remove('loading');
      button.disabled = false;
      if (btnText && btnLoading) {
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
      } else if (button.dataset.originalText) {
        button.textContent = button.dataset.originalText;
        delete button.dataset.originalText;
      }
    }
  }
  
  // Copy to Clipboard
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      this.showNotification('📋 Copied to clipboard!', 'success');
    } catch (err) {
      console.error('Failed to copy: ', err);
      this.showNotification('❌ Failed to copy to clipboard', 'error');
    }
  }
  
  // Local Storage Helpers
  setLocalStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }
  }
  
  getLocalStorage(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (err) {
      console.error('Failed to read from localStorage:', err);
      return defaultValue;
    }
  }
  
  // FAQ Toggle (React-compatible)
  toggleFAQ(button) {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('.faq-icon');
    
    if (answer.classList.contains('show')) {
      answer.classList.remove('show');
      icon.textContent = '+';
    } else {
      answer.classList.add('show');
      icon.textContent = '−';
    }
  }
  
  // Password Visibility Toggle
  togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const button = input?.nextElementSibling;
    
    if (input && button) {
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      button.textContent = isPassword ? '🙈' : '👁️';
      button.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
      
      // Add animation
      button.style.transform = 'scale(0.8)';
      setTimeout(() => {
        button.style.transform = 'scale(1)';
      }, 150);
    }
  }
  
  // Performance Monitoring
  measurePerformance(name, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
    return result;
  }
  
  // Error Handling
  handleError(error, context = 'Unknown') {
    console.error(`Error in ${context}:`, error);
    this.showNotification(`❌ An error occurred: ${error.message}`, 'error');
  }
  }

  // Initialize the utilities
  const clientUtils = new ClientUtils();

  // Export for React components
  window.ClientUtils = ClientUtils;
  window.clientUtils = clientUtils;

  // Export commonly used functions globally
  window.showNotification = (message, type, duration) => clientUtils.showNotification(message, type, duration);
  window.toggleFAQ = (button) => clientUtils.toggleFAQ(button);
  window.toggleTheme = () => clientUtils.toggleTheme();
  window.togglePasswordVisibility = (inputId) => clientUtils.togglePasswordVisibility(inputId);
  window.openModal = (modalId) => clientUtils.openModal(modalId);
  window.closeModal = (modalId) => clientUtils.closeModal(modalId);
  window.initializeClientUtils = () => clientUtils.initializeClientUtils();
}

// CSS Animations (to be added to global styles)
const animationStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeInUp {
    animation: fadeInUp 0.8s ease-out forwards;
  }
  
  .animate-fadeInLeft {
    animation: fadeInLeft 0.8s ease-out forwards;
  }
  
  .animate-fadeInRight {
    animation: fadeInRight 0.8s ease-out forwards;
  }
  
  .animate-scaleIn {
    animation: scaleIn 0.8s ease-out forwards;
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.8s ease-out forwards;
  }
  
  .animate-slideInDown {
    animation: slideInDown 0.8s ease-out forwards;
  }
  
  .notification {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .btn.loading {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  .faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
  }
  
  .faq-answer.show {
    max-height: 200px;
  }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

console.log('✅ Client Utils loaded successfully!');
