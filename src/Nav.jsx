import { useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './components/ThemeToggle';
import './Nav.css';
function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="nav">
      <div className="logo-container">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <img 
            src="/Abdo.png" 
            alt="Moize Gaming Logo" 
          />
          <h2>Moize Gaming</h2>
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
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      
    </nav>
  );
}

export default Nav;