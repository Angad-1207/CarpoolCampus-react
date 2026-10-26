import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm';
import Modal from './Modal';
import { FormError } from './FormError';
import { FormInput, FormPassword, FormSelect, SubmitButton } from './FormField';
import { required, minLength, chitkaraEmail, email, phone10, matchesField } from '../utils/validators';
import { passScore } from '../utils/format';
import { DEPARTMENTS, YEARS } from '../data/seed';

const loginSchema = {
  email: [required('University mailbox'), email, chitkaraEmail],
  password: [required('Password')],
};

function LoginModal({ app }) {
  const { openModal, closeModal: close, notify, login } = app;
  const navigate = useNavigate();

  const form = useForm({
    initialValues: { email: '', password: '' },
    schema: loginSchema,
    onSubmit: (v) => {
      const u = login(v.email, v.password);
      close();
      notify(`Welcome back, ${u.name}!`);
      navigate('/dashboard');
    },
  });

  return (
    <Modal onClose={close}>
      <h3 style={{ marginBottom: '6px' }}><i className="fa-solid fa-lock" style={{ color: 'var(--primary)' }}></i> Student Sign In</h3>
      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '14px' }}>Sign in with your Chitkara University email to continue.</p>
      <FormError id="login-error" message={form.submitError} />
      <form onSubmit={form.handleSubmit} noValidate>
        <FormInput id="input-login-email" name="email" type="email" label="University Mailbox" placeholder="you@chitkara.edu.in"
          value={form.values.email} onChange={form.handleChange} onBlur={form.handleBlur} error={form.errors.email} />
        <FormPassword id="input-login-pass" name="password" label="Password" placeholder="••••••••"
          value={form.values.password} onChange={form.handleChange} onBlur={form.handleBlur} error={form.errors.password} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <button type="button" className="btn btn-secondary" onClick={close}>Cancel</button>
          <SubmitButton loading={form.submitting} loadingText="Signing in...">Sign In</SubmitButton>
        </div>
      </form>
      <div className="modal-switch">New to CarpoolCampus? <a onClick={() => openModal('signup')}>Create an account</a></div>
    </Modal>
  );
}

const signupSchema = {
  name: [minLength(2, 'Please enter your full name.')],
  email: [required('University email'), email, chitkaraEmail],
  studentId: [required('Student ID')],
  phone: [required('Phone number'), phone10],
  password: [required('Password'), minLength(8, 'Password must be at least 8 characters.')],
  password2: [required('Confirm password'), matchesField('password', 'Passwords do not match.')],
};

function SignupModal({ app }) {
  const { openModal, closeModal: close, notify, signup } = app;
  const navigate = useNavigate();

  const form = useForm({
    initialValues: { name: '', email: '', studentId: '', dept: DEPARTMENTS[0], year: YEARS[0], phone: '', password: '', password2: '' },
    schema: signupSchema,
    onSubmit: (v) => {
      const u = signup(v);
      close();
      notify(`Account created. Welcome, ${u.name}!`);
      navigate('/profile');
    },
  });

  const score = form.values.password ? passScore(form.values.password) : 0;
  const strengthText = ['Use 8+ characters with letters, numbers & symbols', 'Weak', 'Fair', 'Good', 'Strong'][score];
  const f = (name) => ({ name, value: form.values[name], onChange: form.handleChange, onBlur: form.handleBlur, error: form.errors[name] });

  return (
    <Modal onClose={close} wide>
      <h3 style={{ marginBottom: '6px' }}><i className="fa-solid fa-user-plus" style={{ color: 'var(--primary)' }}></i> Create your account</h3>
      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '14px' }}>Sign up with your university details to start riding.</p>
      <FormError id="signup-error" message={form.submitError} />
      <form onSubmit={form.handleSubmit} autoComplete="off" noValidate>
        <FormInput id="su-name" type="text" label="Full Name" placeholder="e.g. Angad Singh" {...f('name')} />
        <div className="form-row">
          <FormInput id="su-email" type="email" label="University Email" placeholder="you@chitkara.edu.in" {...f('email')} />
          <FormInput id="su-id" type="text" label="Student ID" placeholder="CU21CSE1042" {...f('studentId')} />
        </div>
        <div className="form-row">
          <FormSelect id="su-dept" label="Department" options={DEPARTMENTS} {...f('dept')} />
          <FormSelect id="su-year" label="Year" options={YEARS} {...f('year')} />
        </div>
        <FormInput id="su-phone" type="tel" label="Phone Number" placeholder="98xxxxxxxx" {...f('phone')} />
        <div className="form-row">
          <FormPassword id="su-pass" label="Password" {...f('password')}>
            <div className={`strength-bars${score ? ' s' + score : ''}`} id="strength-bars"><span></span><span></span><span></span><span></span></div>
            <div className="strength-text" id="strength-text">{strengthText}</div>
          </FormPassword>
          <FormPassword id="su-pass2" label="Confirm Password" {...f('password2')} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <button type="button" className="btn btn-secondary" onClick={close}>Cancel</button>
          <SubmitButton loading={form.submitting} loadingText="Creating..."><i className="fa-solid fa-user-check"></i> Create Account</SubmitButton>
        </div>
      </form>
      <div className="modal-switch">Already have an account? <a onClick={() => openModal('login')}>Log in</a></div>
    </Modal>
  );
}

function SosModal({ app }) {
  const close = app.closeModal;
  const rows = [
    ['Campus Security Control', 'Main Gate • 24x7', '01762-507084'],
    ['University Dispensary', 'Ambulance & Medical Room', '01762-507000'],
    ['Women Safety Helpline', 'Punjab Police Special Cell', '1091'],
    ['Police / Emergency', 'National emergency number', '112'],
  ];
  return (
    <Modal onClose={close}>
      <h3 style={{ marginBottom: '6px' }}><i className="fa-solid fa-shield-halved" style={{ color: 'var(--accent)' }}></i> Emergency Contacts</h3>
      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '14px' }}>Tap a number to call. In immediate danger, dial 112.</p>
      {rows.map(([title, sub, num]) => (
        <div className="sos-row" key={title}><div><strong>{title}</strong><small>{sub}</small></div><span className="num-box"><i className="fa-solid fa-phone"></i> {num}</span></div>
      ))}
      <div style={{ textAlign: 'right', marginTop: '6px' }}><button className="btn btn-secondary btn-sm" onClick={close}>Close</button></div>
    </Modal>
  );
}

// Which global modal is open comes from App's state (app.activeModal)
export default function AuthModals({ app }) {
  const active = app.activeModal;
  if (active === 'login') return <LoginModal app={app} />;
  if (active === 'signup') return <SignupModal app={app} />;
  if (active === 'sos') return <SosModal app={app} />;
  return null;
}
