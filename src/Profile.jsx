import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('auth_user');
      const token = localStorage.getItem('auth_token');
      if (!raw || !token) {
        navigate('/signin');
        return;
      }
      setUser(JSON.parse(raw));
    } catch {
      navigate('/signin');
    }
  }, [navigate]);

  const displayName = useMemo(() => {
    if (!user) return '';
    const base = (user.name || user.email || '').trim();
    if (!base) return '';
    return base.charAt(0).toUpperCase() + base.slice(1);
  }, [user]);

  const initial = useMemo(() => {
    if (!user) return 'U';
    const fromName = (user.name || '').trim();
    const fromEmail = (user.email || '').trim();
    const base = fromName || fromEmail;
    return (base[0] || 'U').toUpperCase();
  }, [user]);

  function logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    navigate('/signin');
  }

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-loading">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '107px' }}>
    <div className="profile-page" style={{ paddingTop: '120px' }}>
      <div className="profile-card">
        <div className="profile-header">
          {user?.avatarUrl ? (
            <img className="profile-avatar-img" src={user.avatarUrl} alt={displayName} />
          ) : (
            <div className="profile-avatar" aria-hidden>{initial}</div>
          )}
          <div className="profile-title">
            <h2>{displayName}</h2>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="profile-section">
          <h3>Account</h3>
          <div className="kv">
            <span className="k">Name</span>
            <span className="v">{displayName}</span>
          </div>
          <div className="kv">
            <span className="k">Email</span>
            <span className="v">{user.email}</span>
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn-outline" onClick={() => navigate('/')}>Back to Home</button>
          <button className="btn-primary" onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
    </div>
  );
}
