import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
function Nav() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('auth_user');
      setUser(raw ? JSON.parse(raw) : null);
    } catch { setUser(null); }
  }, []);

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setUser(null);
    setOpen(false);
    setUserMenuOpen(false);
  };

  // Close user dropdown on outside click
  useEffect(() => {
    function onDocClick(e) {
      if (!userMenuRef.current) return;
      if (!userMenuRef.current.contains(e.target)) setUserMenuOpen(false);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const displayName = (() => {
    if (!user) return '';
    const base = (user.name || user.email || '').trim();
    if (!base) return '';
    return base.charAt(0).toUpperCase() + base.slice(1);
  })();

  const initial = (() => {
    if (!user) return 'U';
    const fromName = (user.name || '').trim();
    const fromEmail = (user.email || '').trim();
    const base = fromName || fromEmail;
    return (base[0] || 'U').toUpperCase();
  })();

  return (
    <nav className="nav">
      <div className="logo-container">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <img 
            src="/ERER.png" 
            alt="Moize Gaming Logo" 
          />
          <h2>Shadow Vortex</h2>
        </Link>
      </div>

      <button
        className="menu-toggle"
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={`nav-links${open ? ' open' : ''}`}>
        <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
        <li><Link to="/about" onClick={() => setOpen(false)}>About</Link></li>
        <li><Link to="/products" onClick={() => setOpen(false)}>Products</Link></li>
        <li><Link to="/contact" onClick={() => setOpen(false)}>Contact</Link></li>
        {!user ? (
          <>
            <li>
              <Link className="btn btn-outline" to="/signin" onClick={() => setOpen(false)}>Sign In</Link>
            </li>
            <li>
              <Link className="btn btn-primary" to="/signup" onClick={() => setOpen(false)}>Sign Up</Link>
            </li>
          </>
        ) : (
          <li className="user-menu" ref={userMenuRef}>
            <button
              className={`user-trigger${userMenuOpen ? ' active' : ''}`}
              onClick={() => setUserMenuOpen(v => !v)}
              aria-haspopup="menu"
              aria-expanded={userMenuOpen}
            >
              {user?.avatarUrl ? (
                <img className="avatar-img" src={user.avatarUrl} alt={displayName} />
              ) : (
                <span className="avatar" aria-hidden>{initial}</span>
              )}
              <span className="user-name">{displayName}</span>
              <svg className="chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            {userMenuOpen && (
              <div className="user-dropdown" role="menu">
                <Link to="/profile" className="dropdown-item" role="menuitem" onClick={() => setUserMenuOpen(false)}>Profile</Link>
                <button className="dropdown-item danger" role="menuitem" onClick={logout}>Logout</button>
              </div>
            )}
          </li>
        )}
      </ul>
      
    </nav>
  );
}

export default Nav;