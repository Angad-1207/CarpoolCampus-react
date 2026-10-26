// Banner error (original .form-error look) – used for "submit failed" messages such as wrong password.
export function FormError({ message, id }) {
  if (!message) return null;
  return <div id={id} className="form-error show" role="alert">{message}</div>;
}

// Small inline message under one field.
export function FieldError({ id, message }) {
  if (!message) return null;
  return <div id={id} className="field-error" role="alert">{message}</div>;
}
