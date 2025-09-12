import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <button 
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? '☀' : '☾'}
    </button>
  );
};

export default ThemeToggle;