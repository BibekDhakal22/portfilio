import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight, Terminal } from 'lucide-react';

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Work', href: '#projects' },
    { label: 'Journey', href: '#journey' },
    { label: 'CLI', href: '#terminal', isSpecial: true },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Brand Logo */}
          <a href="#" className="navbar-logo">
            <span className="logo-box">BD</span>
            <div className="logo-text">
              <span className="logo-name">Bibek Dhakal</span>
              <span className="logo-role">Software Developer</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="navbar-desktop-nav">
            <ul className="nav-list">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`nav-link ${item.isSpecial ? 'nav-link-special' : ''}`}
                  >
                    {item.isSpecial && <Terminal size={13} className="inline-icon" />}
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Controls & Actions */}
          <div className="navbar-actions">
            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="ctrl-icon-btn"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={16} className="sun-icon" /> : <Moon size={16} className="moon-icon" />}
            </button>

            {/* Quick Contact CTA */}
            <a href="#contact" className="nav-cta-btn">
              <span>Get in Touch</span>
              <ArrowUpRight size={14} />
            </a>

            {/* Mobile Menu Hamburger */}
            <button
              className="mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)}>
        <div className="mobile-nav-panel" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-nav-header">
            <div className="navbar-logo">
              <span className="logo-box">BD</span>
              <div className="logo-text">
                <span className="logo-name">Bibek Dhakal</span>
              </div>
            </div>
            <button
              className="mobile-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <ul className="mobile-nav-list">
            {navLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mobile-nav-footer">
            <a
              href="#contact"
              className="mobile-cta-btn"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get in Touch
            </a>
            <div className="mobile-socials-row">
              <a href="https://github.com/BibekDhakal22" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/bibek-dhakal-057b04261/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://wa.me/9779848706173" target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
