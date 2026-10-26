import { useState } from 'react';
import { FieldError } from './FormError';

// Wrapper: .form-group + <label htmlFor> + control + inline error.
// Labels can contain icons (the original labels do), so `label` is a node, not only a string.
export function FormField({ id, label, error, children, style }) {
  return (
    <div className="form-group" style={style}>
      <label className="form-label" htmlFor={id}>{label}</label>
      {children}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

const aria = (id, error) => ({ 'aria-invalid': error ? 'true' : 'false', 'aria-describedby': error ? `${id}-error` : undefined });
const cls = (error) => `form-control${error ? ' has-error' : ''}`;

export function FormInput({ id, label, error, fieldStyle, ...rest }) {
  return (
    <FormField id={id} label={label} error={error} style={fieldStyle}>
      <input id={id} className={cls(error)} {...aria(id, error)} {...rest} />
    </FormField>
  );
}

export function FormSelect({ id, label, error, options, fieldStyle, ...rest }) {
  return (
    <FormField id={id} label={label} error={error} style={fieldStyle}>
      <select id={id} className={cls(error)} {...aria(id, error)} {...rest}>
        {options.map((o) => {
          const opt = typeof o === 'string' ? { value: o, label: o } : o;
          return <option key={opt.value} value={opt.value}>{opt.label}</option>;
        })}
      </select>
    </FormField>
  );
}

export function FormTextarea({ id, label, error, fieldStyle, ...rest }) {
  return (
    <FormField id={id} label={label} error={error} style={fieldStyle}>
      <textarea id={id} className={cls(error)} {...aria(id, error)} {...rest} />
    </FormField>
  );
}

// Password box with the original Show / Hide button. `children` = e.g. the strength meter.
export function FormPassword({ id, label, error, children, ...rest }) {
  const [show, setShow] = useState(false);
  return (
    <FormField id={id} label={label} error={error}>
      <div className="pass-wrap">
        <input id={id} type={show ? 'text' : 'password'} className={cls(error)} {...aria(id, error)} {...rest} />
        <button type="button" className="pass-toggle" onClick={() => setShow((s) => !s)}>{show ? 'Hide' : 'Show'}</button>
      </div>
      {children}
    </FormField>
  );
}

// Submit button that shows a spinner and is disabled while the form is submitting
export function SubmitButton({ loading, loadingText = 'Please wait...', children, className = '', ...rest }) {
  return (
    <button type="submit" className={`btn btn-primary ${className}${loading ? ' is-loading' : ''}`} disabled={loading} {...rest}>
      {loading ? <><i className="fa-solid fa-spinner fa-spin"></i> {loadingText}</> : children}
    </button>
  );
}
