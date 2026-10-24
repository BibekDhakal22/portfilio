import React, { useState, useEffect } from 'react';
import { ArrowUp, Heart, Code2 } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/soundEffects';

export default function Footer() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="portfolio-footer">
      <div className="footer-top-line" />
      <div className="section-container footer-container">
        <div className="footer-brand-col">
          <div className="footer-logo">
            <span className="logo-box">BD</span>
            <div className="logo-details">
              <span className="name">Bibek Dhakal</span>
              <span className="sub">Software & Frontend Developer</span>
            </div>
          </div>
          <p className="footer-bio">
            Engineering resilient full-stack systems and captivating user interfaces with React, Three.js, and modern AI.
          </p>
        </div>

        <div className="footer-nav-col">
          <span className="footer-nav-title">Navigation</span>
          <ul className="footer-links">
            <li><a href="#about" onMouseEnter={playHoverSound}>About</a></li>
            <li><a href="#skills" onMouseEnter={playHoverSound}>Skills & Tools</a></li>
            <li><a href="#projects" onMouseEnter={playHoverSound}>Selected Work</a></li>
            <li><a href="#journey" onMouseEnter={playHoverSound}>Chronology</a></li>
            <li><a href="#terminal" onMouseEnter={playHoverSound}>CLI Sandbox</a></li>
            <li><a href="#contact" onMouseEnter={playHoverSound}>Collaboration</a></li>
          </ul>
        </div>

        <div className="footer-scroll-col">
          <button
            onClick={scrollToTop}
            className="scroll-to-top-btn"
            title="Return to peak of document"
            aria-label="Scroll to top"
            onMouseEnter={playHoverSound}
          >
            <svg className="progress-ring" width="52" height="52">
              <circle
                className="progress-ring-bg"
                stroke="rgba(212, 175, 55, 0.15)"
                strokeWidth="2"
                fill="transparent"
                r="22"
                cx="26"
                cy="26"
              />
              <circle
                className="progress-ring-circle"
                stroke="var(--gold)"
                strokeWidth="2"
                strokeDasharray={`${2 * Math.PI * 22}`}
                strokeDashoffset={`${2 * Math.PI * 22 * (1 - scrollProgress / 100)}`}
                strokeLinecap="round"
                fill="transparent"
                r="22"
                cx="26"
                cy="26"
              />
            </svg>
            <ArrowUp size={16} className="arrow-icon" />
          </button>
          <span className="scroll-top-label">Peak</span>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="section-container bottom-bar-inner">
          <span>© {new Date().getFullYear()} Bibek Dhakal · All rights reserved.</span>
          <span className="crafted-tag">
            Engineered with React 19, Three.js & Precision in Kathmandu, Nepal
          </span>
        </div>
      </div>
    </footer>
  );
}
