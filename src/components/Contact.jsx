import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Phone, MapPin, Copy, Check, Send, Sparkles, MessageSquare, ArrowUpRight, Share2, BookOpen, Code2, Zap } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playHoverSound, playClickSound, playSuccessSound } from '../utils/soundEffects';

const INQUIRY_PRESETS = [
  {
    label: "💼 Full-Time Role",
    type: "Full-time Opportunity",
    template: "Hi Bibek,\n\nWe reviewed your portfolio and were really impressed by your full-stack engineering and AI integration work (especially Krishi Sahayak). We'd love to discuss a Software Developer / Frontend Specialist opportunity with our team.\n\nBest regards,"
  },
  {
    label: "🤝 Freelance / Contract",
    type: "Freelance Project",
    template: "Hi Bibek,\n\nI have a project involving modern web architecture and interactive UI/UX that I'd like to collaborate on. Are you currently available for freelance or contract engagements?\n\nLooking forward to hearing from you,"
  },
  {
    label: "🤖 AI & LLM Solution",
    type: "AI & Full-Stack Collaboration",
    template: "Hi Bibek,\n\nI saw your implementation of LLaMA 3.3 via Groq API and would love to explore an AI-powered conversational or computer vision solution for our organization.\n\nRegards,"
  },
  {
    label: "☕ Coffee Chat",
    type: "General Inquiry / Coffee Chat",
    template: "Hi Bibek,\n\nLove your work! I’d love to connect, talk tech, and exchange insights about React, 3D WebGL, and the software ecosystem in Nepal.\n\nCheers,"
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Full-time Opportunity',
    message: '',
  });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    playSuccessSound();
    setTimeout(() => setCopied(false), 2500);
  };

  const applyPreset = (preset) => {
    playClickSound();
    setFormData((prev) => ({
      ...prev,
      inquiryType: preset.type,
      message: preset.template
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Trigger celebratory confetti explosion
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.65 },
      colors: ['#d4af37', '#f5df88', '#38bdf8', '#10b981', '#ffffff'],
    });

    playSuccessSound();
    setSubmitted(true);

    // Form reset after delay
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', inquiryType: 'Full-time Opportunity', message: '' });
    }, 6000);
  };

  return (
    <section id="contact" className="section-padding contact-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="sec-number-wrap justify-center">
            <span className="sec-num">06</span>
            <span className="sec-tag">INITIATE COLLABORATION</span>
          </div>
          <h2 className="sec-title">
            Let's Build Something <em>Remarkable</em>
          </h2>
          <p className="contact-lead-text">
            Have an open role, an exciting product idea, or need an AI-driven full-stack system? 
            My inbox is open and I'm ready to create exceptional software with you.
          </p>
          <div className="sec-divider mx-auto" />
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Channels & Socials */}
          <div className="contact-info-col">
            {/* Quick Email Card */}
            <div className="contact-card email-card spotlight-card">
              <div className="card-icon-wrap">
                <Mail size={22} />
              </div>
              <div className="card-content">
                <span className="card-label">Official Correspondence</span>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="contact-direct-link"
                  onMouseEnter={playHoverSound}
                  onClick={playClickSound}
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>
              <button
                className={`copy-btn ${copied ? 'copied' : ''}`}
                onClick={handleCopyEmail}
                title="Copy email to clipboard"
                aria-label="Copy Email"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            {/* Direct WhatsApp Card */}
            <div className="contact-card whatsapp-card spotlight-card">
              <div className="card-icon-wrap wa-icon">
                <MessageSquare size={22} />
              </div>
              <div className="card-content">
                <span className="card-label">Direct WhatsApp / Mobile</span>
                <a
                  href={PERSONAL_INFO.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-direct-link"
                  onMouseEnter={playHoverSound}
                  onClick={playClickSound}
                >
                  {PERSONAL_INFO.phone}
                </a>
              </div>
              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="wa-link-btn"
                title="Open WhatsApp conversation"
              >
                <span>Chat</span>
                <ArrowUpRight size={13} />
              </a>
            </div>

            {/* Location & Status Card */}
            <div className="contact-card location-card spotlight-card">
              <div className="card-icon-wrap">
                <MapPin size={22} />
              </div>
              <div className="card-content">
                <span className="card-label">Current Base & Timezone</span>
                <span className="location-val">Kathmandu, Nepal · UTC+5:45 (NPT)</span>
                <span className="location-sub">Open to Remote, Hybrid & Relocation Opportunities</span>
              </div>
            </div>

            {/* Social Links Network */}
            <div className="socials-network-box spotlight-card">
              <span className="socials-label">Connect Across the Web</span>
              <div className="socials-grid">
                {PERSONAL_INFO.socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="social-pill-link"
                    onMouseEnter={playHoverSound}
                    onClick={playClickSound}
                  >
                    <span>{s.name}</span>
                    <ArrowUpRight size={12} className="social-arr" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form with Presets */}
          <div className="contact-form-col spotlight-card">
            {submitted ? (
              <div className="form-success-state">
                <div className="success-icon-wrap">
                  <Check size={36} />
                </div>
                <h3>Message Sent Successfully!</h3>
                <p>
                  Thank you for reaching out, {formData.name || 'there'}. I have received your message and will review it promptly within 24 hours.
                </p>
                <button
                  className="btn-send-another"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                {/* One-Click Quick Inquire Presets */}
                <div className="form-presets-bar">
                  <span className="presets-title">Quick Inquire Presets:</span>
                  <div className="presets-row">
                    {INQUIRY_PRESETS.map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => applyPreset(p)}
                        className={`preset-chip ${formData.inquiryType === p.type ? 'active' : ''}`}
                        title="Click to pre-fill message template"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-field">
                    <label htmlFor="name" className="field-label">
                      Your Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="e.g. Alex Henderson"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="email" className="field-label">
                      Your Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="inquiryType" className="field-label">
                    Nature of Inquiry
                  </label>
                  <select
                    id="inquiryType"
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="form-select"
                  >
                    <option value="Full-time Opportunity">Full-time Software Engineering Role</option>
                    <option value="Freelance Project">Freelance / Contract Project</option>
                    <option value="AI & Full-Stack Collaboration">AI & Full-Stack Collaboration</option>
                    <option value="General Inquiry / Coffee Chat">General Inquiry / Coffee Chat</option>
                  </select>
                </div>

                <div className="form-field">
                  <div className="field-label-row">
                    <label htmlFor="message" className="field-label">
                      Message *
                    </label>
                    <span className="char-count">{formData.message.length} characters</span>
                  </div>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="Describe your project, team, or opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-submit-message"
                  onMouseEnter={playHoverSound}
                  onClick={playClickSound}
                >
                  <Send size={16} />
                  <span>Send Message Directly</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
