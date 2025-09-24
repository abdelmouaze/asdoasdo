import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('auth_token')) {
      navigate('/');
    }
  }, [navigate]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    setErr('');
    if (!form.email || !form.password) {
      setErr('Email and password are required');
      return;
    }
    if (form.password !== form.confirm) {
      setErr('Passwords do not match');
      return;
    }
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password, name: form.name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Registration failed');
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('auth_user', JSON.stringify(data.user));
      navigate('/');
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ paddingTop: '107px' }}>
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-sub">Join Shadow Vortex to get the best experience.</p>
        {err && <p className="auth-error">{err}</p>}
        <form className="auth-form" onSubmit={onSubmit}>
          <label>
            Name
            <input name="name" value={form.name} onChange={onChange} placeholder="Your name" />
          </label>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" />
          </label>
          <label>
            Password
            <input name="password" type="password" value={form.password} onChange={onChange} placeholder="••••••••" />
          </label>
          <label>
            Confirm Password
            <input name="confirm" type="password" value={form.confirm} onChange={onChange} placeholder="••••••••" />
          </label>
          <div className="auth-actions">
            <button className="btn-primary" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Sign Up'}</button>
            <span className="small">Already have an account? <Link className="auth-link" to="/signin">Sign In</Link></span>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}
