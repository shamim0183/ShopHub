// ============================================
// Input Component - Reusable Form Input
// ============================================
// Flexible input field with label, error states,
// and consistent styling across the application
// ============================================

'use client';

export default function Input({
  label,              // Input label text
  type = 'text',      // HTML input type
  name,               // Input name attribute
  value,              // Controlled input value
  onChange,           // Change handler function
  placeholder,        // Placeholder text
  error,              // Error message to display
  required = false,   // Mark field as required
  disabled = false,   // Disabled state
  className = '',     // Additional custom classes
  icon,               // Optional icon (left side)
  ...props            // Pass through other HTML input props
}) {
  return (
    <div className="input-wrapper">
      {/* Label */}
      {label && (
        <label htmlFor={name} className="input-label">
          {label}
          {required && <span className="required-asterisk">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="input-container">
        {/* Icon (if provided) */}
        {icon && (
          <span className="input-icon-left">{icon}</span>
        )}

        {/* Input Field */}
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`input-field ${error ? 'input-error' : ''} ${icon ? 'input-with-icon' : ''} ${className}`}
          {...props}
        />
      </div>

      {/* Error Message */}
      {error && (
        <span className="input-error-message">{error}</span>
      )}

      {/* Scoped Component Styles */}
      <style jsx>{`
        /* Wrapper for full input group */
        .input-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
        }

        /* Label styling */
        .input-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--foreground);
          display: block;
        }

        /* Required asterisk */
        .required-asterisk {
          color: var(--error);
          margin-left: 0.25rem;
        }

        /* Input container (for icon positioning) */
        .input-container {
          position: relative;
          width: 100%;
        }

        /* Icon styling */
        .input-icon-left {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--foreground-muted);
          display: flex;
          align-items: center;
          pointer-events: none;
        }

        /* Input field base styles */
        .input-field {
          width: 100%;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          border: 2px solid var(--border);
          border-radius: var(--radius-md);
          background: var(--surface);
          color: var(--foreground);
          transition: all var(--transition-base);
          font-family: inherit;
        }

        /* Input with icon - add left padding */
        .input-with-icon {
          padding-left: 2.75rem;
        }

        /* Focus state */
        .input-field:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        /* Hover state */
        .input-field:hover:not(:disabled) {
          border-color: var(--border-hover);
        }

        /* Placeholder styling */
        .input-field::placeholder {
          color: var(--foreground-muted);
        }

        /* Error state */
        .input-error {
          border-color: var(--error);
        }

        .input-error:focus {
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }

        /* Error message */
        .input-error-message {
          font-size: 0.875rem;
          color: var(--error);
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        /* Disabled state */
        .input-field:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          background: var(--background-secondary);
        }

        /* Autofill styling (override browser defaults) */
        .input-field:-webkit-autofill,
        .input-field:-webkit-autofill:hover,
        .input-field:-webkit-autofill:focus {
          -webkit-text-fill-color: var(--foreground);
          -webkit-box-shadow: 0 0 0px 1000px var(--surface) inset;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </div>
  );
}
