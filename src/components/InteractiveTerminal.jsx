import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Maximize2, Minimize2, Play, Sparkles, RefreshCw, Sun, CloudRain } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS_LIST, SKILLS_LIST } from '../data/portfolioData';
import { playClickSound, playSuccessSound } from '../utils/soundEffects';
import KrishiSandboxModal from './KrishiSandboxModal';

const QUOTES = [
  '"Simplicity is prerequisite for reliability." — Edsger W. Dijkstra',
  '"First, solve the problem. Then, write the code." — John Johnson',
  '"Make it work, make it right, make it fast." — Kent Beck',
  '"Code is like humor. When you have to explain it, it’s bad." — Cory House',
  '"Talk is cheap. Show me the code." — Linus Torvalds',
];

export default function InteractiveTerminal() {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: 'Bibek Dhakal CLI Environment v2.5.0 (x86_64-pc-nepal)\nType "help" to display available commands or click the shortcut chips below.\nTry "ai" to launch the Krishi Sahayak AI sandbox.',
    },
  ]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);
  const matrixCanvasRef = useRef(null);

  // Auto-scroll terminal on updates
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Execute terminal command
  const executeCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Add to command history
    setCmdHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    const newHistory = [...history, { type: 'user', text: `$ ${rawCmd}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `AVAILABLE COMMANDS:
  help       - Display this assistance guide
  ai         - Launch live Krishi Sahayak AI Simulation
  about      - Executive summary & engineering background
  skills     - Technical competencies breakdown
  projects   - Curated list of featured software projects
  weather    - Live simulated Kathmandu weather telemetry
  stats      - Key engineering metrics & GitHub statistics
  quote      - Random engineering philosophy quote
  contact    - Reach Bibek via email, phone, and socials
  education  - Academic credentials & BCA degree details
  matrix     - Toggle cyberpunk digital rain effect
  clear      - Clear terminal window history`,
        });
        playClickSound();
        break;

      case 'ai':
      case 'krishi':
      case 'sandbox':
        newHistory.push({
          type: 'output',
          text: `INITIALIZING AI SANDBOX: Launching Krishi Sahayak (LLaMA 3.3 via Groq) simulation modal...`,
        });
        setIsSandboxOpen(true);
        playSuccessSound();
        break;

      case 'weather':
        newHistory.push({
          type: 'output',
          text: `KATHMANDU VALLEY TELEMETRY (OpenWeatherMap API):
  ┌──────────────────────────────────────────────┐
  │ 📍 Coordinates: 27.7172° N, 85.3240° E (NPT) │
  │ 🌡️ Temperature: 24.2°C (Feels like 25.0°C)   │
  │ 💧 Humidity:    68% Relative Humidity        │
  │ 🌧️ Rain Chance: 12% Scattered Light Cloud    │
  │ 🌾 Crop Status: Optimal for Paddy Irrigation │
  └──────────────────────────────────────────────┘`,
        });
        playSuccessSound();
        break;

      case 'stats':
        newHistory.push({
          type: 'output',
          text: `BIBEK DHAKAL ENGINEERING METRICS:
• GitHub Repos:       13+ Public Repositories
• Mastered Stacks:    10+ (React, Next, Flask, C#, MySQL, Three.js)
• Signature Capstone: Krishi Sahayak AI & Alumni Tracker
• Degree:             BCA (Tribhuvan University)
• AI Inference:       LLaMA 3.3 70B on Groq LPUs (<280ms)`,
        });
        playSuccessSound();
        break;

      case 'quote':
        const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
        newHistory.push({
          type: 'output',
          text: randomQuote,
        });
        playClickSound();
        break;

      case 'about':
        newHistory.push({
          type: 'output',
          text: `NAME: ${PERSONAL_INFO.name}
ROLE: ${PERSONAL_INFO.role}
LOCATION: ${PERSONAL_INFO.location}
DEGREE: ${PERSONAL_INFO.degree}
STATUS: ${PERSONAL_INFO.status}

SUMMARY:
Passionate Software and Frontend Developer with a BCA degree from Tribhuvan University.
Specialized in React, Next.js, AI integration (LLaMA 3.3 via Groq), Python Flask, and C# .NET.`,
        });
        playClickSound();
        break;

      case 'skills':
        const frontendSkills = SKILLS_LIST.filter((s) => s.category === 'frontend').map((s) => s.name).join(', ');
        const backendSkills = SKILLS_LIST.filter((s) => s.category === 'backend').map((s) => s.name).join(', ');
        const dbSkills = SKILLS_LIST.filter((s) => s.category === 'database').map((s) => s.name).join(', ');
        const langSkills = SKILLS_LIST.filter((s) => s.category === 'languages').map((s) => s.name).join(', ');

        newHistory.push({
          type: 'output',
          text: `SKILL MATRIX:
• FRONTEND:   ${frontendSkills}
• BACKEND:    ${backendSkills}
• DATABASES:  ${dbSkills}
• LANGUAGES:  ${langSkills}
• AI & TOOLS: LLaMA 3.3, Groq API, Git, Figma, Three.js`,
        });
        playClickSound();
        break;

      case 'projects':
        const projText = PROJECTS_LIST.map(
          (p, idx) => `[0${idx + 1}] ${p.title} (${p.categoryLabel})\n     Stack: ${p.tech.slice(0, 4).join(', ')}\n     GitHub: ${p.github}`
        ).join('\n\n');

        newHistory.push({
          type: 'output',
          text: `FEATURED ENGINEERING PROJECTS:\n\n${projText}`,
        });
        playClickSound();
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `CONTACT CHANNELS:
• Email:      ${PERSONAL_INFO.email}
• WhatsApp:   ${PERSONAL_INFO.phone} (${PERSONAL_INFO.whatsappUrl})
• GitHub:     https://github.com/BibekDhakal22
• LinkedIn:   https://www.linkedin.com/in/bibek-dhakal-057b04261/
• Location:   ${PERSONAL_INFO.location}`,
        });
        playClickSound();
        break;

      case 'education':
        newHistory.push({
          type: 'output',
          text: `ACADEMIC CREDENTIALS:
• Degree:     Bachelor of Computer Applications (BCA)
• University: Tribhuvan University (TU), Nepal
• Highlights: Software Engineering, Data Structures, Relational DBs, AI Capstone
• Status:     Graduated with distinction`,
        });
        playClickSound();
        break;

      case 'matrix':
        setIsMatrixActive((prev) => !prev);
        newHistory.push({
          type: 'output',
          text: isMatrixActive ? 'Matrix simulation terminated.' : 'Matrix digital rain initiated. Enjoy the cyberspace.',
        });
        playSuccessSound();
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'sudo':
      case 'sudo hire':
        newHistory.push({
          type: 'output',
          text: `PERMISSION GRANTED: You are now authorized to hire Bibek Dhakal! Forwarding inquiries to ${PERSONAL_INFO.email}`,
        });
        playSuccessSound();
        break;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not recognized: "${cmd}". Type "help" or click one of the quick chips below.`,
        });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  // Keyboard navigation for history
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = historyIndex + 1 < cmdHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  // Matrix Digital Rain effect
  useEffect(() => {
    if (!isMatrixActive) return;
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    const characters = '0123456789ABCDEF@#$%&*+<>~=BIBEKDHAKAL';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    let animId;
    const draw = () => {
      ctx.fillStyle = 'rgba(7, 7, 13, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff66';
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMatrixActive]);

  const quickCommands = ['ai', 'skills', 'projects', 'weather', 'stats', 'quote', 'contact', 'matrix', 'clear'];

  return (
    <section id="terminal" className="section-padding terminal-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="sec-number-wrap">
            <span className="sec-num">05</span>
            <span className="sec-tag">DEVELOPER INTERFACE</span>
          </div>
          <h2 className="sec-title">
            Interactive <em>CLI Sandbox</em>
          </h2>
          <p className="sec-subtitle">
            An interactive command-line interface directly in your browser. Type commands or click shortcut chips to inspect system architecture.
          </p>
          <div className="sec-divider" />
        </div>

        {/* Terminal Window Box */}
        <div className="terminal-window spotlight-card" onClick={() => inputRef.current?.focus()}>
          {/* Matrix canvas background if active */}
          {isMatrixActive && <canvas ref={matrixCanvasRef} className="matrix-canvas" />}

          {/* Terminal Title Bar */}
          <div className="terminal-titlebar">
            <div className="terminal-dots">
              <span className="dot dot-close" />
              <span className="dot dot-minimize" />
              <span className="dot dot-maximize" />
            </div>
            <div className="terminal-title">
              <TerminalIcon size={13} className="term-icon" />
              <span>bibek@dhakal-dev:~ (bash)</span>
            </div>
            <div className="terminal-bar-right">
              <span className="term-badge">Live Interactive CLI</span>
            </div>
          </div>

          {/* Quick Command Chips */}
          <div className="terminal-chips-bar" onClick={(e) => e.stopPropagation()}>
            <span className="chips-label">Quick Commands:</span>
            <div className="chips-row">
              {quickCommands.map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => executeCommand(cmd)}
                  className={`term-chip ${cmd === 'ai' ? 'term-chip-highlight' : ''}`}
                >
                  {cmd === 'ai' && <Sparkles size={11} className="mr-1 text-gold" />}
                  ${cmd}
                </button>
              ))}
            </div>
          </div>

          {/* Terminal Body */}
          <div className="terminal-body">
            {history.map((item, idx) => (
              <div key={idx} className={`term-line term-${item.type}`}>
                <pre>{item.text}</pre>
              </div>
            ))}

            {/* Live Prompt Input Line */}
            <div className="term-input-row">
              <span className="term-prompt">
                <span className="prompt-user">bibek</span>
                <span className="prompt-at">@</span>
                <span className="prompt-host">dhakal-dev</span>
                <span className="prompt-colon">:</span>
                <span className="prompt-dir">~</span>
                <span className="prompt-sign">$</span>
              </span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                className="term-input"
                autoComplete="off"
                spellCheck="false"
                placeholder="Type command here (e.g. ai, weather, skills)..."
              />
            </div>
            <div ref={terminalEndRef} />
          </div>
        </div>
      </div>

      {/* Embedded Live Sandbox if triggered via CLI */}
      <KrishiSandboxModal
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
      />
    </section>
  );
}
