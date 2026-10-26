import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { FormInput, FormSelect, SubmitButton } from '../components/FormField';
import { FormError } from '../components/FormError';
import { required, minLength, phone10 } from '../utils/validators';
import { initials } from '../utils/format';
import { DEPARTMENTS, YEARS } from '../data/seed';

const schema = {
  name: [minLength(2, 'Please enter your full name.')],
  studentId: [required('Student ID')],
  phone: [required('Phone number'), phone10],
};

// The form is its own component so it starts with the logged-in user's values every time it mounts.
function ProfileForm({ user, updateProfile, notify }) {
  const sid = user.studentId || user.roll || '';

  const form = useForm({
    initialValues: {
      name: user.name, studentId: sid,
      dept: DEPARTMENTS.includes(user.dept) ? user.dept : DEPARTMENTS[0],
      year: YEARS.includes(user.year) ? user.year : YEARS[0],
      phone: user.phone || '',
    },
    schema,
    onSubmit: (v) => { updateProfile(v); notify('Profile updated successfully!'); },
  });
  const f = (name) => ({ name, value: form.values[name], onChange: form.handleChange, onBlur: form.handleBlur, error: form.errors[name] });

  return (
    <div className="search-card">
      <h2 style={{ fontSize: '1.25rem', marginBottom: '14px' }}>Update University Profile</h2>
      <FormError id="profile-error" message={form.submitError} />
      <form onSubmit={form.handleSubmit} noValidate>
        <div className="form-row">
          <FormInput id="edit-name" type="text" label="Full Name" {...f('name')} />
          <div className="form-group"><label className="form-label" htmlFor="edit-email">University Email</label>
            <input type="email" id="edit-email" className="form-control" value={user.email} readOnly style={{ background: 'var(--surface-hover)' }} /></div>
        </div>
        <div className="form-row">
          <FormInput id="edit-roll" type="text" label="Student ID" {...f('studentId')} />
          <FormSelect id="edit-dept" label="Department" options={DEPARTMENTS} {...f('dept')} />
        </div>
        <div className="form-row">
          <FormSelect id="edit-year" label="Year" options={YEARS} {...f('year')} />
          <FormInput id="edit-phone" type="tel" label="Phone Number" placeholder="98xxxxxxxx" {...f('phone')} />
        </div>
        <SubmitButton loading={form.submitting} loadingText="Saving..."><i className="fa-solid fa-floppy-disk"></i> Save Details</SubmitButton>
      </form>
    </div>
  );
}

export default function Profile({ app }) {
  const navigate = useNavigate();
  const { user, logout, updateProfile, notify, openModal } = app;

  if (!user) {
    return (
      <main id="view-profile" className="view-section active">
        <div className="container">
          <div className="guest-prompt">
            <i className="fa-solid fa-user-lock"></i>
            <h3>Sign in to view your profile</h3>
            <p>Log in with your Chitkara University email to see your commuter pass and update your details, or create a new account.</p>
            <div className="guest-btns"><button className="btn btn-primary" onClick={() => openModal('login')}>Login</button><button className="btn btn-secondary" onClick={() => openModal('signup')}>Sign Up</button></div>
          </div>
        </div>
      </main>
    );
  }

  const handleSignOut = () => { logout(); notify('Signed out successfully'); navigate('/'); };

  return (
    <main id="view-profile" className="view-section active">
      <div className="container">
        <div id="profile-authed" className="profile-layout">
          <aside>
            <div className="id-card">
              <div className="id-card-top">CHITKARA UNIVERSITY &bull; COMMUTER PASS</div>
              <div className="id-card-body">
                <div className="id-avatar" id="prof-avatar">{initials(user.name)}</div>
                <h3 id="prof-name-display" style={{ fontSize: '1.15rem' }}>{user.name}</h3>
                <p id="prof-roll-display" style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '10px' }}>ID: {user.studentId || user.roll || '-'}</p>
                <span className="badge badge-success"><i className="fa-solid fa-circle-check"></i> Verified Student</span>
                <div style={{ marginTop: '14px', fontSize: '0.8rem', textAlign: 'left', borderTop: '1px dashed var(--border)', paddingTop: '10px' }}>
                  <div style={{ marginBottom: '3px', wordBreak: 'break-all' }}><strong>Email:</strong> <span id="prof-email-display">{user.email}</span></div>
                  <div style={{ marginBottom: '3px' }}><strong>Dept:</strong> <span id="prof-dept-display">{user.dept || '-'}</span></div>
                  <div style={{ marginBottom: '3px' }}><strong>Year:</strong> <span id="prof-year-display">{user.year || '-'}</span></div>
                  <div style={{ marginBottom: '3px' }}><strong>Phone:</strong> <span id="prof-phone-display">{user.phone || '-'}</span></div>
                  <div><strong>Rating:</strong> ★ 4.9 (Verified)</div>
                </div>
                <button className="btn btn-secondary btn-block" style={{ marginTop: '16px' }} onClick={handleSignOut}><i className="fa-solid fa-right-from-bracket"></i> Sign Out</button>
              </div>
            </div>
          </aside>
          <ProfileForm user={user} updateProfile={updateProfile} notify={notify} />
        </div>
      </div>
    </main>
  );
}
