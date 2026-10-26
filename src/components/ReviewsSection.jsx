import { useState } from 'react';
import { Store, save, initStorage } from '../utils/storage';
import { REVIEWS_KEY, INITIAL_REVIEWS } from '../data/seed';
import useForm from '../hooks/useForm';
import Modal from './Modal';
import { FormSelect, FormTextarea, SubmitButton } from './FormField';
import { FormError } from './FormError';
import { required } from '../utils/validators';
import { initials } from '../utils/format';

function ReviewCard({ r }) {
  const rating = Math.max(0, Math.min(5, parseInt(r.rating, 10) || 5));
  return (
    <article className="rev-card">
      <i className="fa-solid fa-quote-left rev-quote-icon"></i>
      <p className="rev-text">{r.text}</p>
      <div className="rev-foot">
        <div className="rev-avatar">{initials(r.name)}</div>
        <div><div className="rev-name">{r.name}</div><div className="rev-meta">{r.meta}</div><div className="rev-stars">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</div></div>
      </div>
    </article>
  );
}

const RATINGS = [
  { value: '5', label: '★★★★★ Excellent' },
  { value: '4', label: '★★★★☆ Good' },
  { value: '3', label: '★★★☆☆ Average' },
];

// Reviews are only used here, so this component keeps them in its own state.
// The "review modal is open" flag is local too – nobody else cares about it.
export default function ReviewsSection({ user, notify }) {
  const [reviews, setReviews] = useState(() => { initStorage(); return Store.get(REVIEWS_KEY, INITIAL_REVIEWS); });
  const [open, setOpen] = useState(false);

  const form = useForm({
    initialValues: { rating: '5', text: '' },
    schema: { text: [required('Your review')] },
    onSubmit: (v) => {
      const name = user ? user.name : 'Anonymous Student';
      const meta = user ? `${user.dept || 'Chitkara University'}${user.year ? ', ' + user.year : ''} • Chitkara University` : 'Chitkara University, Punjab';
      const next = [{ name, meta, rating: parseInt(v.rating, 10), text: v.text.trim() }, ...reviews];
      save(REVIEWS_KEY, next);
      setReviews(next);
      setOpen(false);
      notify('Thanks for sharing your review!');
    },
  });

  const close = () => { setOpen(false); form.reset(); };

  return (
    <section id="reviews-section" className="reviews-band">
      <div className="container">
        <span className="rev-eyebrow">Student Reviews</span>
        <h2 className="rev-title">What Students Say</h2>
        <p className="rev-sub">Real stories from Chitkarians who share their daily NH-64 commute.</p>
      </div>
      <div className="marquee" id="review-marquee" aria-label="Student reviews">
        {reviews.length ? (
          <div className="marquee-track" id="review-track" style={{ animationDuration: Math.max(36, reviews.length * 10) + 's' }}>
            {/* rendered twice so the scrolling loop is seamless */}
            {reviews.map((r, i) => <ReviewCard r={r} key={'a' + i} />)}
            {reviews.map((r, i) => <ReviewCard r={r} key={'b' + i} />)}
          </div>
        ) : (
          <div className="marquee-track" id="review-track" style={{ animation: 'none' }}><p style={{ padding: '0 20px' }}>No reviews yet. Be the first to share yours!</p></div>
        )}
      </div>
      <div className="rev-actions"><button className="btn btn-primary" onClick={() => setOpen(true)}><i className="fa-solid fa-pen"></i> Share Your Review</button></div>

      {open && (
        <Modal onClose={close}>
          <h3 style={{ marginBottom: '6px' }}><i className="fa-solid fa-pen" style={{ color: 'var(--primary)' }}></i> Share Your Review</h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '14px' }}>Tell fellow Chitkarians about your CarpoolCampus experience.</p>
          <FormError message={form.submitError} />
          <form id="review-form" onSubmit={form.handleSubmit} noValidate>
            <FormSelect id="review-rating-input" name="rating" label="Your Rating" options={RATINGS} value={form.values.rating} onChange={form.handleChange} />
            <FormTextarea id="review-text-input" name="text" label="Your Review" rows={4} placeholder="Share your commute experience..."
              value={form.values.text} onChange={form.handleChange} onBlur={form.handleBlur} error={form.errors.text} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button type="button" className="btn btn-secondary" onClick={close}>Cancel</button>
              <SubmitButton loading={form.submitting} loadingText="Submitting...">Submit Review</SubmitButton>
            </div>
          </form>
        </Modal>
      )}
    </section>
  );
}
