import { useEffect } from 'react';
import { createPortal } from 'react-dom';

// Same markup/classes as the original modals. Rendered into document.body with a portal
// so it is never clipped by a parent. Esc key or clicking the dark backdrop closes it.
export default function Modal({ onClose, wide = false, children }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return createPortal(
    <div className="modal-backdrop open" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={`modal${wide ? ' modal-wide' : ''}`} role="dialog" aria-modal="true">{children}</div>
    </div>,
    document.body,
  );
}
