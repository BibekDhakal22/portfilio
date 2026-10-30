import React, { useState } from 'react';
import { SKILL_CATEGORIES, SKILLS_LIST } from '../data/portfolioData';
import { Code, Layers, Server, Database, Sparkles, Search, CheckCircle, SlidersHorizontal, ArrowUpRight } from 'lucide-react';
import { playHoverSound, playClickSound } from '../utils/soundEffects';

const LEVEL_FILTERS = [
  { id: 'all', label: 'All Levels' },
  { id: 'mastered', label: 'Expert', min: 90 },
  { id: 'advanced', label: 'Advanced', min: 80 },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Filter skills by category, level & search query
  const filteredSkills = SKILLS_LIST.filter((skill) => {
    const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
    
    let matchesLevel = true;
    if (levelFilter === 'mastered') matchesLevel = skill.level >= 90;
    else if (levelFilter === 'advanced') matchesLevel = skill.level >= 80;

    const matchesSearch =
      searchQuery.trim() === '' ||
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (skill.projects && skill.projects.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesLevel && matchesSearch;
  });

  return (
    <section id="skills" className="section-padding skills-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="sec-number-wrap">
            <span className="sec-num">02</span>
            <span className="sec-tag">COMPETENCIES & TOOLKIT</span>
          </div>
          <h2 className="sec-title">
            Skills & <em>Technologies</em>
          </h2>
          <p className="sec-subtitle">
            Battle-tested technical competencies spanning frontend design systems, backend architectures, AI models, and databases.
          </p>
          <div className="sec-divider" />
        </div>

        {/* Filter Toolbar: Category Tabs + Search + Level Filter */}
        <div className="skills-toolbar">
          <div className="skills-category-tabs">
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  playClickSound();
                  setActiveCategory(cat.id);
                }}
                className={`skill-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onMouseEnter={playHoverSound}
              >
                <span>{cat.name}</span>
                <span className="cat-count">
                  {cat.id === 'all'
                    ? SKILLS_LIST.length
                    : SKILLS_LIST.filter((s) => s.category === cat.id).length}
                </span>
              </button>
            ))}
          </div>

          <div className="skills-filter-row">
            {/* Level Quick Filter */}
            <div className="skills-level-group">
              {LEVEL_FILTERS.map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => {
                    playClickSound();
                    setLevelFilter(lvl.id);
                  }}
                  className={`skill-lvl-btn ${levelFilter === lvl.id ? 'active' : ''}`}
                  onMouseEnter={playHoverSound}
                >
                  {lvl.label}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="skills-search-box">
              <Search size={14} className="search-icon" />
              <input
                type="text"
                placeholder="Search tech or project..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="skills-search-input"
              />
              {searchQuery && (
                <button
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="skills-grid">
          {filteredSkills.map((skill) => {
            const isSelected = selectedSkill?.name === skill.name;
            return (
              <div
                key={skill.name}
                className={`sk-card spotlight-card ${isSelected ? 'selected' : ''}`}
                onMouseEnter={playHoverSound}
                onClick={() => {
                  playClickSound();
                  setSelectedSkill(isSelected ? null : skill);
                }}
              >
                <div className="sk-top-row">
                  <div className="sk-icon-wrap">
                    <span className="sk-symbol">&lt;/&gt;</span>
                  </div>
                  <div className="sk-meta">
                    <h3 className="sk-name">{skill.name}</h3>
                    <span className="sk-cat-tag">{skill.category}</span>
                  </div>
                  <div className="sk-level-badge">
                    <span className="sk-level-tag">
                      {skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : 'Proficient'}
                    </span>
                  </div>
                </div>

                <p className="sk-desc">{skill.description}</p>

                {/* Connected Projects */}
                {skill.projects && (
                  <div className="sk-projects-row">
                    <span className="sk-applied-label">Applied in:</span>
                    <div className="sk-pill-group">
                      {skill.projects.map((proj) => (
                        <a
                          key={proj}
                          href="#projects"
                          className="sk-proj-pill"
                          onClick={(e) => {
                            e.stopPropagation();
                            playClickSound();
                          }}
                          title={`View ${proj} in Projects`}
                        >
                          <span>{proj}</span>
                          <ArrowUpRight size={10} className="pill-arrow" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredSkills.length === 0 && (
          <div className="skills-empty-state">
            <p>No technologies matched your filter criteria.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setLevelFilter('all');
                setSearchQuery('');
              }}
              className="btn-reset-filters"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
