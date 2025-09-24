import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
function Nav() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

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
  };
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
          <>
            <li style={{ pointerEvents: 'none', opacity: .9 }}>
              {user.name || user.email}
            </li>
            <li>
              <button className="btn btn-outline" onClick={logout}>Logout</button>
            </li>
          </>
        )}
      </ul>
      
    </nav>
  );
}

export default Nav;