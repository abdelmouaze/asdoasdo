import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If already logged in, redirect
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
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Login failed');
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
        <h2 className="auth-title">Sign In</h2>
        <p className="auth-sub">Welcome back. Please enter your credentials.</p>
        {err && <p className="auth-error">{err}</p>}
        <form className="auth-form" onSubmit={onSubmit}>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" />
          </label>
          <label>
            Password
            <input name="password" type="password" value={form.password} onChange={onChange} placeholder="••••••••" />
          </label>
          <div className="auth-actions">
            <button className="btn-primary" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
            <span className="small">No account? <Link className="auth-link" to="/signup">Sign Up</Link></span>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}
