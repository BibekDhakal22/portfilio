import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import InteractiveTerminal from './components/InteractiveTerminal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AmbientBackground from './components/AmbientBackground';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('bibek_portfolio_theme') || 'dark';
  });
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('bibek_portfolio_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      setScrollPercent(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-root">
      {/* Subtle Ambient Particle Mesh */}
      <AmbientBackground />

      {/* Scroll Progress Bar at very top */}
      <div
        className="global-scroll-progress"
        style={{ width: `${scrollPercent}%` }}
      />

      {/* Sticky Glass Navbar */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Main Sections */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <InteractiveTerminal />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
