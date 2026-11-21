import { CircleAlert } from 'lucide-react'

// Label + control + hint + error message, with the accessibility wiring done once.
// `children` is a function that receives the props to spread onto the control.
function FormField({ id, label, required = false, hint, error, className = '', children }) {
  const hintId = hint ? `${id}-hint` : null
  const errorId = error ? `${id}-error` : null
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={`form-field${error ? ' has-error' : ''} ${className}`.trim()}>
      <label className="form-label" htmlFor={id}>
        {label}
        {required && <span className="form-required" aria-hidden="true"> *</span>}
      </label>
      {children({
        id,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': describedBy,
        'aria-required': required || undefined,
      })}
      {hint && !error && <p className="form-hint" id={hintId}>{hint}</p>}
      {error && (
        <p className="form-error" id={errorId}>
          <CircleAlert size={15} aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}

export default FormField
