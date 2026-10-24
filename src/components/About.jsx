import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Award, GraduationCap, Code2, Cpu, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { playHoverSound, playClickSound } from '../utils/soundEffects';

export default function About() {
  const coreStrengths = [
    { title: 'Frontend Architecture', desc: 'Expertise in React 19, Next.js, state management, and modern component design.' },
    { title: 'AI & LLM Integration', desc: 'Hands-on experience deploying LLaMA 3.3 via Groq for low-latency conversational AI.' },
    { title: 'Full-Stack Systems', desc: 'Proven backend development with Python Flask, C# ASP.NET Core, and relational databases.' },
    { title: 'Design & Interaction', desc: 'Crafting pixel-perfect layouts, responsive interfaces, and 60fps micro-animations.' },
  ];

  return (
    <section id="about" className="section-padding about-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="sec-number-wrap">
            <span className="sec-num">01</span>
            <span className="sec-tag">BACKGROUND & PHILOSOPHY</span>
          </div>
          <h2 className="sec-title">
            About <em>Me</em>
          </h2>
          <div className="sec-divider" />
        </div>

        <div className="about-grid">
          {/* Left Column: Narrative & Credentials */}
          <div className="about-narrative">
            <div className="education-card spotlight-card">
              <div className="edu-icon-wrap">
                <GraduationCap size={24} />
              </div>
              <div className="edu-info">
                <span className="edu-degree">Bachelor of Computer Applications (BCA)</span>
                <span className="edu-school">Tribhuvan University · Nepal</span>
                <span className="edu-status">Completed with distinction · Focused on Full-Stack & AI</span>
              </div>
            </div>

            <div className="about-paragraphs">
              {PERSONAL_INFO.bioParagraphs.map((para, idx) => (
                <p key={idx} className="about-para">
                  {para}
                </p>
              ))}
            </div>

            {/* Core Strengths Grid */}
            <div className="strengths-grid">
              {coreStrengths.map((item, idx) => (
                <div key={idx} className="strength-item spotlight-card">
                  <div className="strength-check">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h4 className="strength-title">{item.title}</h4>
                    <p className="strength-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CV / Action Button */}
            <div className="about-action-row">
              <a
                href="#contact"
                className="btn-download-cv"
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
              >
                <FileText size={16} />
                <span>Contact For Full CV / Resume</span>
              </a>
              <span className="cv-note">Direct PDF available on verified inquiry</span>
            </div>
          </div>

          {/* Right Column: Statistics & Philosophy */}
          <div className="about-stats-column">
            {/* 4-Stat Grid */}
            <div className="stats-metric-grid">
              {PERSONAL_INFO.stats.map((stat, idx) => (
                <div key={idx} className="stat-card spotlight-card" onMouseEnter={playHoverSound}>
                  <div className="stat-glow" />
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Philosophy Card */}
            <div className="philosophy-card spotlight-card">
              <div className="philo-header">
                <Sparkles size={18} className="philo-sparkle" />
                <span className="philo-badge">Engineering Philosophy</span>
              </div>
              <blockquote className="philo-quote">
                "Great software is where mathematical rigor meets visual elegance. A user shouldn't just run an application—they should enjoy every millisecond of using it."
              </blockquote>
              <div className="philo-author">
                <span className="author-name">Bibek Dhakal</span>
                <span className="author-role">Software Developer · Kathmandu</span>
              </div>
            </div>

            {/* Quick Skills pill cloud */}
            <div className="about-pill-cloud spotlight-card">
              <span className="pill-cloud-title">Primary Arsenal:</span>
              <div className="pills-wrapper">
                {['React.js', 'Next.js', 'Python Flask', 'C# .NET', 'LLaMA 3.3', 'MySQL', 'Three.js', 'Tailwind CSS'].map((pill) => (
                  <span key={pill} className="mini-tech-pill">
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
