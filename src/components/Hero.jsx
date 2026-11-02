import React, { useState } from 'react';
import { ArrowDown, Terminal, ExternalLink, MapPin, Sparkles, Play, Award, ArrowUpRight } from 'lucide-react';
import { Github } from './Icons';
import ThreeCanvas from './ThreeCanvas';
import KrishiSandboxModal from './KrishiSandboxModal';

export default function Hero({ theme }) {
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);

  const techStack = [
    'React 19',
    'Next.js',
    'Python Flask',
    'LLaMA 3.3',
    'C# .NET Core',
    'MySQL',
    'Three.js',
  ];

  return (
    <>
      <section id="hero" className="hero-section">
        {/* Ambient subtle glow background */}
        <div className="hero-ambient-glow orb-1" />
        <div className="hero-ambient-glow orb-2" />

        <div className="hero-container">
          {/* Left Content Column */}
          <div className="hero-content">
            {/* Status and Location Badges */}
            <div className="hero-status-pill">
              <span className="status-ping-dot" />
              <span className="status-label">Available for Software Engineering Roles</span>
              <span className="status-sep">/</span>
              <span className="status-location">Kathmandu, Nepal</span>
            </div>

            {/* Main Display Typography */}
            <h1 className="hero-title">
              Software Developer crafting <span className="hero-gradient-text">resilient web systems</span> and AI applications.
            </h1>

            {/* Professional Narrative */}
            <p className="hero-summary">
              I am <strong>Bibek Dhakal</strong>, a Bachelor of Computer Applications (BCA) graduate from Tribhuvan University. 
              I engineer high-performance frontend architectures with <strong>React 19 & Next.js</strong>, scalable backends in <strong>Python Flask & C# .NET</strong>, 
              and intelligent bilingual AI systems powered by <strong>LLaMA 3.3 via Groq</strong>.
            </p>

            {/* Action CTAs */}
            <div className="hero-cta-group">
              <a href="#projects" className="btn-primary-solid">
                <span>Explore Featured Work</span>
                <ArrowUpRight size={15} />
              </a>

              {/* Try Krishi Sahayak AI Live simulator */}
              <button
                className="btn-live-ai-interactive"
                onClick={() => setIsSandboxOpen(true)}
                title="Launch live interactive Krishi Sahayak AI simulation"
              >
                <Sparkles size={14} className="text-accent" />
                <span>Try Krishi AI Live</span>
              </button>

              <a
                href="https://github.com/BibekDhakal22"
                target="_blank"
                rel="noreferrer"
                className="btn-outline-glass"
              >
                <Github size={15} />
                <span>GitHub</span>
                <ExternalLink size={12} className="btn-external-icon" />
              </a>

              <a href="#terminal" className="btn-terminal-clean">
                <Terminal size={14} />
                <span>CLI</span>
              </a>
            </div>

            {/* Core Competencies Row */}
            <div className="hero-tech-strip">
              <span className="tech-strip-label">Primary Stack:</span>
              <div className="tech-strip-items">
                {techStack.map((tech) => (
                  <span key={tech} className="tech-strip-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Bibek Dhakal Developer Portrait (In Place of Shape) */}
          <div className="hero-portrait-column">
            <div className="hero-portrait-wrapper">
              {/* Backlight Ambient Glow */}
              <div className="portrait-ambient-glow" />

              {/* Technical Blueprint Corner HUD Crosshairs */}
              <span className="hud-corner hud-tl" aria-hidden="true">+</span>
              <span className="hud-corner hud-tr" aria-hidden="true">+</span>
              <span className="hud-corner hud-bl" aria-hidden="true">+</span>
              <span className="hud-corner hud-br" aria-hidden="true">+</span>

              {/* Shaped Portrait Frame */}
              <div className="portrait-frame">
                <img
                  src="/bibek-dhakal.jpg"
                  alt="Bibek Dhakal — Software Developer & Frontend Specialist"
                  className="portrait-image"
                  loading="eager"
                  draggable={false}
                />
                {/* Subtle lighting vignette overlay */}
                <div className="portrait-gradient-overlay" />
              </div>

              {/* Top Floating Glass Badge */}
              <div className="portrait-floating-chip chip-top">
                <Sparkles size={13} className="text-accent" />
                <span>BCA Graduate · TU</span>
              </div>

              {/* Bottom Floating Glass Badge */}
              <div className="portrait-floating-chip chip-bottom">
                <span className="status-ping-dot" />
                <span>Available for SWE Roles</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Hint */}
        <a href="#about" className="hero-scroll-hint">
          <span className="scroll-hint-label">Scroll to explore credentials</span>
          <ArrowDown size={14} className="scroll-down-arrow" />
        </a>
      </section>

      {/* Krishi Sahayak Live Simulation Modal */}
      <KrishiSandboxModal
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
      />
    </>
  );
}
