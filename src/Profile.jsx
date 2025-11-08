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

  const flagEmoji = (code) => (code||'').toUpperCase().replace(/./g, c => String.fromCodePoint(127397 + c.charCodeAt(0)));

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-loading">Loading profile...</div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '107px' }}>
      <div className="profile-page">
        
        {/* Cover Section */}
        <div className="profile-cover">
          {user.coverImage ? (
            <img src={user.coverImage} alt="Profile cover" />
          ) : (
            <div className="profile-cover-placeholder" />
          )}

          {/* Hero Section */}
          <div className="profile-hero">
            {/* Edit Profile Button */}
            <button className="edit-profile-btn" onClick={() => navigate('/edit-profile')}>
              <span>⚙️</span>
              Modifier le profil
            </button>

            <div className="profile-avatar">
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt={displayName} />
              ) : (
                <div className="profile-avatar-placeholder">{initial}</div>
              )}
            </div>

            <div className="profile-hero-meta">
              <h2>{displayName}</h2>
              <div className="profile-hero-sub">
                {user.city || 'Europe'} {user.country ? <span className="profile-flag">{flagEmoji(user.country)}</span> : '🌍'}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="profile-statsbar">
          <div className="profile-statitem">
            <div className="icon">👤</div>
            <div className="statinfo">
              <div className="statlabel">Propriétaire</div>
              <div className="statvalue">—</div>
            </div>
          </div>
          <div className="profile-statitem">
            <div className="icon">📅</div>
            <div className="statinfo">
              <div className="statlabel">Membre depuis</div>
              <div className="statvalue">01/10/2025</div>
            </div>
          </div>
          <div className="profile-statitem">
            <div className="icon">🏆</div>
            <div className="statinfo">
              <div className="statlabel">Victoires</div>
              <div className="statvalue">0</div>
            </div>
          </div>
          <div className="profile-statitem">
            <div className="icon">🎮</div>
            <div className="statinfo">
              <div className="statlabel">Total de rounds</div>
              <div className="statvalue">0</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
