'use client';

import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  if (!mounted) return null;

  return (
    <label className="swap swap-rotate">
      <input 
        type="checkbox" 
        className="theme-controller" 
        checked={theme === 'dark'}
        onChange={toggleTheme}
      />
      <FiSun className="swap-off fill-current w-6 h-6" />
      <FiMoon className="swap-on fill-current w-6 h-6" />
    </label>
  );
}
