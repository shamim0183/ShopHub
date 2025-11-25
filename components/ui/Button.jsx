// ============================================
// Button Component - Reusable UI Element
// ============================================
// Flexible button with multiple variants and sizes
// Supports loading state and custom icons
// ============================================

'use client';

export default function Button({ 
  children,           // Button text or content
  variant = 'primary', // Button style: 'primary', 'secondary', 'outline', 'ghost'
  size = 'md',        // Size: 'sm', 'md', 'lg'
  onClick,            // Click handler function
  type = 'button',    // HTML button type
  disabled = false,   // Disabled state
  loading = false,    // Loading state (shows spinner)
  className = '',     // Additional custom classes
  icon,               // Optional icon component
  fullWidth = false,  // Make button full width
  ...props            // Pass through other HTML button props
}) {
  // ============================================
  // Build CSS Classes Based on Props
  // ============================================
  
  // Base classes for all buttons
  let buttonClasses = 'btn-base';
  
  // Add variant-specific classes
  switch (variant) {
    case 'primary':
      buttonClasses += ' btn-primary';
      break;
    case 'secondary':
      buttonClasses += ' btn-secondary';
      break;
    case 'outline':
      buttonClasses += ' btn-outline';
      break;
    case 'ghost':
      buttonClasses += ' btn-ghost';
      break;
    default:
      buttonClasses += ' btn-primary';
  }
  
  // Add size-specific classes
  switch (size) {
    case 'sm':
      buttonClasses += ' btn-sm';
      break;
    case 'md':
      buttonClasses += ' btn-md';
      break;
    case 'lg':
      buttonClasses += ' btn-lg';
      break;
    default:
      buttonClasses += ' btn-md';
  }
  
  // Add modifier classes
  if (fullWidth) buttonClasses += ' btn-full-width';
  if (disabled || loading) buttonClasses += ' btn-disabled';
  if (className) buttonClasses += ` ${className}`;

  return (
    <>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={buttonClasses}
        {...props}
      >
        {/* Show spinner when loading */}
        {loading && (
          <span className="btn-spinner" />
        )}
        
        {/* Show icon if provided */}
        {icon && !loading && (
          <span className="btn-icon">{icon}</span>
        )}
        
        {/* Button text/content */}
        {children}
      </button>

      {/* Scoped Component Styles */}
      <style jsx>{`
        /* Base button styles */
        .btn-base {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 600;
          border-radius: var(--radius-md);
          border: none;
          cursor: pointer;
          transition: all var(--transition-base);
          text-decoration: none;
          white-space: nowrap;
          font-family: inherit;
        }

        /* Primary variant - gradient background */
        .btn-primary {
          background: var(--primary-gradient);
          color: white;
          box-shadow: var(--shadow-md);
        }

        .btn-primary:hover:not(.btn-disabled) {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
          filter: brightness(1.1);
        }

        /* Secondary variant */
        .btn-secondary {
          background: var(--secondary-gradient);
          color: white;
          box-shadow: var(--shadow-md);
        }

        .btn-secondary:hover:not(.btn-disabled) {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
          filter: brightness(1.1);
        }

        /* Outline variant */
        .btn-outline {
          background: transparent;
          color: var(--primary);
          border: 2px solid var(--primary);
        }

        .btn-outline:hover:not(.btn-disabled) {
          background: var(--primary);
          color: white;
        }

        /* Ghost variant */
        .btn-ghost {
          background: transparent;
          color: var(--foreground);
        }

        .btn-ghost:hover:not(.btn-disabled) {
          background: var(--surface-hover);
        }

        /* Size variants */
        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }

        .btn-md {
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
        }

        .btn-lg {
          padding: 1rem 2rem;
          font-size: 1.125rem;
        }

        /* Full width modifier */
        .btn-full-width {
          width: 100%;
        }

        /* Disabled state */
        .btn-disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
        }

        /* Loading spinner */
        .btn-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Icon spacing */
        .btn-icon {
          display: flex;
          align-items: center;
        }

        /* Active/pressed state */
        .btn-base:active:not(.btn-disabled) {
          transform: scale(0.98);
        }
      `}</style>
    </>
  );
}
