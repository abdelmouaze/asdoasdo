import React from 'react';
import ThemeToggle from './ThemeToggle';
import './Nav.css';

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h1>Your Brand</h1>
      </div>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <ThemeToggle />
        <a href="">gj</a>
      </div>
    </nav>
  );
};

export default Nav;