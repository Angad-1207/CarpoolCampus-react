import { useEffect } from 'react';

function ToastItem({ toast, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(() => onDismiss(toast.id), 2800); // same 2.8s as the original
    return () => clearTimeout(t);
  }, [onDismiss, toast.id]);

  const isError = toast.type === 'error';
  return (
    <div className={`toast${isError ? ' toast-error' : ''}`}>
      <i className={`fa-solid ${isError ? 'fa-circle-exclamation' : 'fa-circle-check'}`} style={{ color: isError ? 'var(--danger)' : 'var(--primary)', marginRight: '6px' }}></i> {toast.message}
    </div>
  );
}

// Shows the toast list that lives in App's state. Any page adds one with app.notify('message').
export default function Toast({ app }) {
  return (
    <div className="toast-box" id="toast-box" aria-live="polite">
      {app.toasts.map((t) => <ToastItem key={t.id} toast={t} onDismiss={app.dismissToast} />)}
    </div>
  );
}
