import React, { useState } from 'react';
import { PROJECTS_LIST } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import KrishiSandboxModal from './KrishiSandboxModal';
import { 
  ExternalLink, ArrowUpRight, Sparkles, Filter, Code, Eye, 
  LayoutGrid, List, Play, Cpu, Layers 
} from 'lucide-react';
import { Github } from './Icons';
import { playHoverSound, playClickSound } from '../utils/soundEffects';

const PROJECT_CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'ai', label: 'AI & Full-Stack' },
  { id: 'frontend', label: 'Frontend & UI' },
  { id: 'backend', label: 'Enterprise APIs' },
  { id: 'desktop', label: 'Desktop & Systems' },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [selectedProject, setSelectedProject] = useState(null);
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  const filteredProjects = PROJECTS_LIST.filter((proj) => {
    const matchesCategory =
      activeCategory === 'all' ||
      (activeCategory === 'ai' && (proj.category === 'ai' || proj.category === 'fullstack')) ||
      proj.category === activeCategory;

    const matchesSearch =
      searchFilter.trim() === '' ||
      proj.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      proj.summary.toLowerCase().includes(searchFilter.toLowerCase()) ||
      proj.tech.some((t) => t.toLowerCase().includes(searchFilter.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // 3D Card Tilt handler
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    card.style.setProperty('--glare-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--glare-y', `${(y / rect.height) * 100}%`);
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
  };

  return (
    <section id="projects" className="section-padding projects-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="sec-number-wrap">
            <span className="sec-num">03</span>
            <span className="sec-tag">CURATED PORTFOLIO</span>
          </div>
          <div className="sec-title-row">
            <div>
              <h2 className="sec-title">
                Featured <em>Engineering Work</em>
              </h2>
              <p className="sec-subtitle">
                Scalable architectures, intelligent AI models, and high-performance interactive interfaces.
              </p>
            </div>

            {/* Quick Live Interactive Simulation Banner Button */}
            <button
              className="btn-live-simulation-banner"
              onClick={() => {
                playClickSound();
                setIsSandboxOpen(true);
              }}
              onMouseEnter={playHoverSound}
              title="Launch interactive Krishi Sahayak AI sandbox simulation"
            >
              <span className="pulse-beacon" />
              <Sparkles size={16} className="text-gold" />
              <span>Try Krishi Sahayak AI Live</span>
            </button>
          </div>
          <div className="sec-divider" />
        </div>

        {/* Filter Toolbar & View Switcher */}
        <div className="projects-filter-bar">
          <div className="proj-filter-tabs">
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  playClickSound();
                  setActiveCategory(cat.id);
                }}
                className={`proj-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onMouseEnter={playHoverSound}
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="proj-toolbar-right">
            {/* View Mode Toggle */}
            <div className="view-mode-toggle">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => {
                  playClickSound();
                  setViewMode('grid');
                }}
                title="Showcase Cards Grid"
              >
                <LayoutGrid size={15} />
                <span>Showcase</span>
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => {
                  playClickSound();
                  setViewMode('list');
                }}
                title="Architectural Index List"
              >
                <List size={15} />
                <span>Index</span>
              </button>
            </div>

            <div className="proj-status-count">
              <span>{filteredProjects.length} Systems</span>
            </div>
          </div>
        </div>

        {/* SHOWCASE GRID VIEW */}
        {viewMode === 'grid' && (
          <div className="projects-showcase-grid">
            {filteredProjects.map((project, index) => {
              const projectNum = String(index + 1).padStart(2, '0');
              const isKrishi = project.id === 'krishi-sahayak';

              return (
                <div
                  key={project.id}
                  className="proj-showcase-card spotlight-card"
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  onMouseEnter={playHoverSound}
                  onClick={() => {
                    playClickSound();
                    setSelectedProject(project);
                  }}
                >
                  <div className="card-glare" />

                  {/* Card Media Preview */}
                  <div className="proj-media-wrap">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="proj-preview-image"
                        loading="lazy"
                      />
                    ) : (
                      <div className="proj-preview-placeholder">
                        <Cpu size={36} />
                      </div>
                    )}
                    <div className="proj-media-overlay" />

                    {/* Floating Badges */}
                    <div className="proj-media-badges">
                      <span className="media-cat-badge">{project.categoryLabel}</span>
                      {project.badge && <span className="media-highlight-badge">{project.badge}</span>}
                    </div>

                    {/* Quick Action Overlay on Hover */}
                    <div className="proj-media-actions" onClick={(e) => e.stopPropagation()}>
                      {isKrishi && (
                        <button
                          className="media-action-pill ai-btn"
                          onClick={() => {
                            playClickSound();
                            setIsSandboxOpen(true);
                          }}
                        >
                          <Play size={13} fill="currentColor" />
                          <span>Run Live AI Demo</span>
                        </button>
                      )}
                      <button
                        className="media-action-pill"
                        onClick={() => {
                          playClickSound();
                          setSelectedProject(project);
                        }}
                      >
                        <Eye size={13} />
                        <span>System Deep Dive</span>
                      </button>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="media-action-icon"
                          title="View GitHub Repository"
                          onClick={playClickSound}
                        >
                          <Github size={15} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="proj-card-content">
                    <div className="proj-card-header-row">
                      <span className="card-proj-num">#{projectNum}</span>
                      <span className="card-proj-year">{project.year}</span>
                    </div>

                    <h3 className="card-proj-title">{project.title}</h3>
                    <p className="card-proj-subtitle">{project.subtitle}</p>
                    <p className="card-proj-summary">{project.summary}</p>

                    {/* Quick Metric Pills */}
                    {project.stats && (
                      <div className="proj-stats-strip">
                        {Object.entries(project.stats).map(([k, v]) => (
                          <div key={k} className="stat-pill-item">
                            <span className="stat-pill-val">{v}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Tags */}
                    <div className="proj-tags-list">
                      {project.tech.slice(0, 5).map((tag) => (
                        <span key={tag} className="proj-tag">
                          {tag}
                        </span>
                      ))}
                      {project.tech.length > 5 && (
                        <span className="proj-tag more-tag">+{project.tech.length - 5}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* LIST / ARCHITECTURAL INDEX VIEW */}
        {viewMode === 'list' && (
          <div className="projects-list-container">
            {filteredProjects.map((project, index) => {
              const projectNum = String(index + 1).padStart(2, '0');
              const isKrishi = project.id === 'krishi-sahayak';

              return (
                <div
                  key={project.id}
                  className="proj-card spotlight-card"
                  onMouseEnter={playHoverSound}
                  onClick={() => {
                    playClickSound();
                    setSelectedProject(project);
                  }}
                >
                  <div className="proj-card-glow" />

                  {/* Left: Project Number */}
                  <div className="proj-num-col">
                    <span className="proj-big-num">{projectNum}</span>
                  </div>

                  {/* Middle: Info */}
                  <div className="proj-body-col">
                    <div className="proj-badge-row">
                      {project.badge && <span className="proj-badge">{project.badge}</span>}
                      <span className="proj-year-tag">{project.year}</span>
                      <span className="proj-cat-tag">{project.categoryLabel}</span>
                    </div>

                    <h3 className="proj-title">{project.title}</h3>
                    <p className="proj-subtitle">{project.subtitle}</p>
                    <p className="proj-desc-text">{project.summary}</p>

                    {/* Tech stack pills */}
                    <div className="proj-tags-list">
                      {project.tech.map((tag) => (
                        <span key={tag} className="proj-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="proj-actions-col" onClick={(e) => e.stopPropagation()}>
                    {isKrishi && (
                      <button
                        className="btn-deep-dive btn-ai-sandbox"
                        onClick={() => {
                          playClickSound();
                          setIsSandboxOpen(true);
                        }}
                        title="Run Live AI Simulation"
                      >
                        <Sparkles size={14} className="text-gold" />
                        <span>Live AI Demo</span>
                      </button>
                    )}

                    <button
                      className="btn-deep-dive"
                      onClick={() => {
                        playClickSound();
                        setSelectedProject(project);
                      }}
                      title="View System Architecture & Problem Statement"
                    >
                      <Eye size={14} />
                      <span>Deep Dive</span>
                    </button>

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="proj-github-icon"
                        title="View GitHub Repository"
                        onClick={playClickSound}
                      >
                        <Github size={18} />
                        <ArrowUpRight size={12} className="arr-corner" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Deep Dive Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Live Interactive Krishi Sahayak Sandbox Modal */}
      <KrishiSandboxModal
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
      />
    </section>
  );
}
