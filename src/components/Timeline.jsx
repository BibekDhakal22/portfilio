import React, { useState } from 'react';
import { TIMELINE_JOURNEY } from '../data/portfolioData';
import { Calendar, MapPin, Award, ChevronRight, Sparkles } from 'lucide-react';
import { playHoverSound, playClickSound } from '../utils/soundEffects';

export default function Timeline() {
  const [activeStep, setActiveStep] = useState(TIMELINE_JOURNEY.length - 1);

  return (
    <section id="journey" className="section-padding timeline-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="sec-number-wrap">
            <span className="sec-num">04</span>
            <span className="sec-tag">CHRONOLOGY</span>
          </div>
          <h2 className="sec-title">
            Engineering <em>Journey</em>
          </h2>
          <div className="sec-divider" />
        </div>

        {/* Timeline Container */}
        <div className="timeline-wrapper">
          <div className="timeline-central-line" />

          {TIMELINE_JOURNEY.map((item, index) => {
            const isEven = index % 2 === 1;
            const isActive = activeStep === index;
            const isLatest = index === TIMELINE_JOURNEY.length - 1;

            return (
              <div
                key={item.year}
                className={`timeline-item ${isEven ? 'even' : 'odd'} ${isActive ? 'active' : ''}`}
                onMouseEnter={playHoverSound}
                onClick={() => {
                  playClickSound();
                  setActiveStep(index);
                }}
              >
                {/* Content Card */}
                <div className="timeline-card">
                  <div className="tl-card-header">
                    <div className="tl-year-badge">
                      <Calendar size={12} />
                      <span>{item.year}</span>
                    </div>
                    {item.badge && <span className="tl-category-tag">{item.badge}</span>}
                  </div>

                  <h3 className="tl-card-title">{item.title}</h3>

                  <div className="tl-location-row">
                    <MapPin size={12} />
                    <span>{item.location}</span>
                  </div>

                  <p className="tl-card-desc">{item.description}</p>

                  {/* Skills Gained */}
                  {item.skillsGained && (
                    <div className="tl-skills-row">
                      <span className="tl-skills-label">Milestones:</span>
                      <div className="tl-skills-pills">
                        {item.skillsGained.map((skill) => (
                          <span key={skill} className="tl-skill-tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Timeline Center Node */}
                <div className="timeline-node-wrap">
                  <div className={`timeline-node-dot ${isLatest ? 'latest' : ''}`}>
                    {isLatest && <span className="node-ping" />}
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="timeline-spacer" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
