import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink, Cpu, CheckCircle2, Layers, AlertCircle, Play, Sparkles } from 'lucide-react';
import { Github } from './Icons';
import { playClickSound } from '../utils/soundEffects';
import KrishiSandboxModal from './KrishiSandboxModal';

export default function ProjectModal({ project, onClose }) {
  const [showSandbox, setShowSandbox] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !showSandbox) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, showSandbox]);

  if (!project) return null;

  const isKrishi = project.id === 'krishi-sahayak';

  return (
    <>
      {createPortal(
        <div className="modal-backdrop" onClick={onClose}>
          <div className="modal-container project-deep-dive-modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="modal-header">
              <div className="modal-badge-row">
                <span className="modal-badge">{project.badge || project.categoryLabel}</span>
                <span className="modal-year">{project.year}</span>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => {
                  playClickSound();
                  onClose();
                }}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Project Banner Image if present */}
            {project.image && (
              <div className="modal-hero-image-wrap">
                <img
                  src={project.image}
                  alt={project.title}
                  className="modal-hero-img"
                />
                <div className="modal-hero-overlay">
                  {isKrishi && (
                    <button
                      className="modal-live-demo-banner-btn"
                      onClick={() => {
                        playClickSound();
                        setShowSandbox(true);
                      }}
                    >
                      <Play size={14} fill="currentColor" />
                      <span>Launch Krishi Sahayak Live AI Simulation</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Modal Title */}
            <div className="modal-title-wrap">
              <h2 className="modal-title">{project.title}</h2>
              <p className="modal-subtitle">{project.subtitle}</p>
            </div>

            {/* Quick Metrics Bar */}
            {project.stats && (
              <div className="modal-stats-bar">
                {Object.entries(project.stats).map(([k, v]) => (
                  <div key={k} className="modal-stat-card">
                    <span className="stat-key">{k.toUpperCase()}</span>
                    <span className="stat-val">{v}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Modal Body */}
            <div className="modal-body">
              {/* Problem & Solution Comparison */}
              <div className="problem-solution-grid">
                <div className="ps-card problem-card">
                  <div className="ps-header">
                    <AlertCircle size={16} className="ps-icon-red" />
                    <h4>The Challenge & Context</h4>
                  </div>
                  <p>{project.problem}</p>
                </div>

                <div className="ps-card solution-card">
                  <div className="ps-header">
                    <CheckCircle2 size={16} className="ps-icon-green" />
                    <h4>Architectural Solution</h4>
                  </div>
                  <p>{project.solution}</p>
                </div>
              </div>

              {/* Key Engineering Highlights */}
              {project.highlights && (
                <div className="modal-highlights-section">
                  <h4 className="section-subheading">
                    <Cpu size={16} />
                    <span>Key Technical Highlights & Implementation</span>
                  </h4>
                  <ul className="modal-highlight-list">
                    {project.highlights.map((item, idx) => (
                      <li key={idx} className="highlight-list-item">
                        <span className="item-bullet">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Architecture Pipeline */}
              {project.architecture && (
                <div className="modal-arch-box">
                  <h4 className="section-subheading">
                    <Layers size={16} />
                    <span>System Architecture Flow</span>
                  </h4>
                  <div className="arch-flow-diagram">
                    <code>{project.architecture}</code>
                  </div>
                </div>
              )}

              {/* Technology Stack Pills */}
              <div className="modal-tech-section">
                <h4 className="section-subheading">Technology Stack & Libraries</h4>
                <div className="modal-tech-pills">
                  {project.tech.map((t) => (
                    <span key={t} className="tech-pill-large">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer / Actions */}
            <div className="modal-footer">
              {isKrishi && (
                <button
                  className="modal-action-btn primary"
                  onClick={() => {
                    playClickSound();
                    setShowSandbox(true);
                  }}
                >
                  <Sparkles size={16} className="text-gold" />
                  <span>Try Live AI Assistant</span>
                </button>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className={`modal-action-btn ${isKrishi ? 'secondary' : 'primary'}`}
                  onClick={playClickSound}
                >
                  <Github size={16} />
                  <span>Inspect Source Code on GitHub</span>
                  <ExternalLink size={14} />
                </a>
              )}

              <button
                className="modal-action-btn dismiss"
                onClick={() => {
                  playClickSound();
                  onClose();
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Embedded Live Sandbox if requested */}
      {showSandbox && (
        <KrishiSandboxModal
          isOpen={showSandbox}
          onClose={() => setShowSandbox(false)}
        />
      )}
    </>
  );
}
