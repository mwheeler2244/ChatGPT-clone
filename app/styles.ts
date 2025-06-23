export const styles = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

:root {
  --font-heading: 'Outfit', system-ui, sans-serif;
  --font-body: 'Plus Jakarta Sans', system-ui, sans-serif;
}

/* Add viewport meta for proper mobile scaling */
@media screen and (max-width: 640px) {
  html, body {
    font-size: 14px;
  }
}

body {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 15px;
  line-height: 1.5;
  letter-spacing: -0.011em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
}

h1, h2, h3, h4, h5, h6, .font-heading {
  font-family: var(--font-heading);
  letter-spacing: -0.022em;
  line-height: 1.3;
}

/* Refined button typography */
button, .btn {
  font-family: var(--font-heading);
  letter-spacing: -0.011em;
}

/* Message bubbles */
.message-bubble {
  line-height: 1.6;
  letter-spacing: -0.009em;
}

/* Nav and sidebar items */
.nav-item, .sidebar-item {
  letter-spacing: -0.011em;
}

/* Size optimizations */
.text-xs {
  letter-spacing: 0;
}

.text-sm {
  letter-spacing: -0.006em;
}

.uppercase {
  letter-spacing: 0.05em;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes messageIn {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.animate-slideUp {
  animation: slideUp 0.3s ease-out;
}

.animate-messageIn {
  animation: messageIn 0.3s ease-out;
}

/* Mobile-specific adjustments */
@media screen and (max-width: 640px) {
  .message-bubble {
    max-width: 85vw !important;
    padding-left: 0.75rem !important;
    padding-right: 0.75rem !important;
    font-size: 0.9375rem !important;
  }
  
  .mobile-smaller-text {
    font-size: 0.875rem;
  }
  
  .mobile-smaller-padding {
    padding: 0.5rem !important;
  }
  
  .mobile-feature-buttons {
    flex-wrap: wrap;
  }
  
  /* Optimize for very small screens */
  @media screen and (max-width: 320px) {
    .mobile-xs-hide {
      display: none !important;
    }
    
    .message-bubble {
      max-width: 90vw !important;
      padding-left: 0.5rem !important;
      padding-right: 0.5rem !important;
      padding-top: 0.5rem !important;
      padding-bottom: 0.5rem !important;
      font-size: 0.875rem !important;
    }
    
    .mobile-feature-buttons {
      gap: 0.25rem !important;
    }
    
    .mobile-xs-smaller-text {
      font-size: 0.75rem !important;
    }
  }
}

/* Fix iOS Safari issues */
@supports (-webkit-touch-callout: none) {
  /* Target iOS devices */
  .safari-padding-fix {
    padding-bottom: env(safe-area-inset-bottom, 0.5rem);
  }
  
  .safari-full-height {
    min-height: -webkit-fill-available;
  }
}
`;
