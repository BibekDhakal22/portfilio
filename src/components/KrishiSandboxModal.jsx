import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, Send, Sparkles, Bot, User, CloudRain, Sun, Thermometer, ShieldAlert, 
  CheckCircle2, RefreshCw, Layers, Cpu, ArrowRight, Languages, Zap
} from 'lucide-react';
import { playClickSound, playSuccessSound } from '../utils/soundEffects';

const SAMPLE_QUESTIONS = [
  {
    label: "🌾 धानमा खैरो थोपा रोग (Rice Blast)",
    lang: "ne",
    query: "धानको पातमा खैरो थोपा रोग (Rice Blast) देखियो, यसको घरेलु वा प्राविधिक उपचार के हो?",
    response: `**कृषि सहायक (LLaMA 3.3 AI + Groq):**\n\nधानको पातमा खैरो वा लाम्चो थोपा देखिनु **'ब्लास्ट रोग' (Rice Blast - Pyricularia oryzae)** को प्रमुख लक्षण हो।\n\n**तत्काल चाल्नुपर्ने कदमहरू:**\n1. **रासायनिक उपचार:** ट्राईसाइक्लाजोल (Tricyclazole 75% WP) १ ग्राम प्रति लिटर पानीमा घोलेर छर्कनुहोस्।\n2. **जैविक/घरेलु उपचार:** गाईको गहुँत (१० भाग पानीमा १ भाग गहुँत) मिसाएर छर्किँदा ढुसीको फैलावट रोक्न सकिन्छ।\n3. **सावधानी:** युरिया मलको अत्यधिक प्रयोग तुरुन्त रोक्नुहोस्, यसले रोग बढाउँछ। खेतमा पानीको उचित निकास व्यवस्था गर्नुहोस्।\n\n*सिफारिस: काठमाडौं उपत्यका र तराई दुवै क्षेत्रका लागि परीक्षण गरिएको।*`
  },
  {
    label: "🌦️ Weather & Irrigation Check",
    lang: "en",
    query: "What is today's irrigation recommendation for Kathmandu based on current weather?",
    response: `**Krishi Sahayak Real-Time Advisory:**\n\n📍 **Location:** Kathmandu Valley (27.7172° N, 85.3240° E)\n🌡️ **Temperature:** 24°C | 💧 **Humidity:** 68% | 🌧️ **Precipitation Probability:** 15%\n\n**Irrigation Decision:**\n• **Status:** Optimal for light drip irrigation or furrow wetting.\n• **Advisory:** Soil moisture remains moderate. Avoid heavy flooding of root crops today, as scattered evening cloud cover is forecasted by OpenWeatherMap API.\n• **Pest Alert:** Moderate humidity provides breeding ground for aphids in vegetable gardens. Monitor underside of leaves.`
  },
  {
    label: "🍅 Tomato Blight Remedies",
    lang: "en",
    query: "My tomato plants have dark water-soaked patches on leaves. How do I treat tomato late blight?",
    response: `**Krishi Sahayak Diagnostic Engine:**\n\nIdentified: **Late Blight (*Phytophthora infestans*)**\n\n**Action Plan:**\n1. **Immediate Sanitation:** Prune and safely burn/dispose of infected lower foliage. Do not compost.\n2. **Organic Treatment:** Spray copper oxychloride (2g/L of water) early morning.\n3. **Air Circulation:** Stake up indeterminate tomato vines to keep foliage off moist soil.\n4. **Preventive Foliar:** Avoid overhead sprinkler watering; water directly at the root zone.`
  },
  {
    label: "⚡ Groq + LLaMA 3.3 Technical Flow",
    lang: "en",
    query: "How does Bibek's architecture connect LLaMA 3.3 via Groq for sub-second Nepali responses?",
    response: `**System Architecture Deep Dive:**\n\n1. **Prompt Sanitization:** Client sends bilingual query via React SPA to Python Flask backend.\n2. **Context Enrichment:** Backend injects Nepali agricultural taxonomy + real-time OpenWeatherMap JSON payload.\n3. **Groq LPU Acceleration:** Query streams to Groq cloud running **LLaMA 3.3 70B Versatile** at ~320 tokens/sec, achieving TTFT (Time to First Token) < 260ms.\n4. **De-tokenization & Caching:** Result is parsed for botanical accuracy and cached in MySQL for recurrent farmer queries.`
  }
];

const SCANNER_SAMPLES = [
  {
    id: 'blast',
    name: 'Rice Leaf Blast (धान ब्लास्ट)',
    crop: 'Paddy / धान',
    accuracy: '94.6%',
    severity: 'Medium',
    status: 'Infected',
    color: '#ef4444',
    advice: 'Spray Tricyclazole 75% WP (1g/L). Withhold excess nitrogen fertilizer.',
    sampleImage: '/projects/krishi-sahayak.jpg'
  },
  {
    id: 'healthy',
    name: 'Healthy Maize Foliage (स्वस्थ मकै)',
    crop: 'Maize / मकै',
    accuracy: '98.2%',
    severity: 'None',
    status: 'Healthy',
    color: '#10b981',
    advice: 'Optimal nitrogen & chlorophyll levels. Maintain regular watering cycle.',
    sampleImage: '/projects/krishi-sahayak.jpg'
  },
  {
    id: 'blight',
    name: 'Early Blight Foliage (गोलभेडा डढुवा)',
    crop: 'Tomato / गोलभेडा',
    accuracy: '91.8%',
    severity: 'High',
    status: 'Infected',
    color: '#f59e0b',
    advice: 'Isolate affected rows. Apply Mancozeb 75 WP (2.5g/L) immediately.',
    sampleImage: '/projects/krishi-sahayak.jpg'
  }
];

export default function KrishiSandboxModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'scanner' | 'arch'
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'नमस्ते! म कृषि सहायक (Krishi Sahayak AI) हुँ। म किसानहरूलाई बालीनालीका रोग, मौसम र उपचारबारे नेपाली र अंग्रेजीमा तत्काल सहयोग गर्दछु।\n\nHello! I am Krishi Sahayak AI assistant powered by LLaMA 3.3 on Groq. Ask any agricultural question or pick a quick topic below!'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedScan, setSelectedScan] = useState(SCANNER_SAMPLES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSendMessage = (customText) => {
    const textToSend = customText || inputVal;
    if (!textToSend.trim() || isTyping) return;

    playClickSound();
    const userMsg = { sender: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputVal('');

    // Find matching sample or generate intelligent answer
    const matched = SAMPLE_QUESTIONS.find(
      (q) => q.query.toLowerCase() === textToSend.toLowerCase()
    );

    setIsTyping(true);

    setTimeout(() => {
      let botResponse = '';
      if (matched) {
        botResponse = matched.response;
      } else {
        botResponse = `**कृषि सहायक (LLaMA 3.3 AI via Groq Cloud):**\n\nतपाईंको प्रश्न: "${textToSend}"\n\n✅ **AI विश्लेषण:** तपाईंले सोध्नुभएको बाली/रोग सम्बन्धी जानकारी हाम्रो डाटाबेसमा प्रशोधन गरियो।\n• **सिफारिस:** प्राङ्गारिक मलको प्रयोग बढाउनुहोस् र माटोको चिस्यान ६०-७०% कायम राख्नुहोस्।\n• **कीरा नियन्त्रण:** नीमको पातको झोल वा जैविक विषादी प्रयोग गर्नुहोस्।\n\n*(This is a live interactive simulation of Bibek Dhakal's LLaMA 3.3 Groq integration)*`;
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
      setIsTyping(false);
      playSuccessSound();
    }, 700);
  };

  const handleTriggerScan = (sample) => {
    setSelectedScan(sample);
    setIsScanning(true);
    playClickSound();
    setTimeout(() => {
      setIsScanning(false);
      playSuccessSound();
    }, 850);
  };

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container krishi-sandbox-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sandbox-header">
          <div className="sandbox-brand">
            <div className="sandbox-icon-leaf">
              <Sparkles size={18} />
            </div>
            <div>
              <div className="sandbox-title-row">
                <h3 className="sandbox-title">Krishi Sahayak (कृषि सहायक)</h3>
                <span className="sandbox-live-pill">
                  <span className="pulse-dot" /> LIVE SIMULATION
                </span>
              </div>
              <p className="sandbox-desc">
                Bilingual AI Agriculture Assistant · LLaMA 3.3 via Groq · OpenWeatherMap
              </p>
            </div>
          </div>

          <div className="sandbox-header-actions">
            <div className="sandbox-model-badge">
              <Zap size={13} className="text-yellow" />
              <span>Groq LPU (~320 T/s)</span>
            </div>
            <button className="modal-close-btn" onClick={onClose} aria-label="Close Sandbox">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="sandbox-tabs-nav">
          <button
            className={`sandbox-tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => {
              playClickSound();
              setActiveTab('chat');
            }}
          >
            <Bot size={15} />
            <span>Bilingual AI Chat (नेपाली / EN)</span>
          </button>

          <button
            className={`sandbox-tab-btn ${activeTab === 'scanner' ? 'active' : ''}`}
            onClick={() => {
              playClickSound();
              setActiveTab('scanner');
            }}
          >
            <ShieldAlert size={15} />
            <span>Plant Disease Scanner</span>
          </button>

          <button
            className={`sandbox-tab-btn ${activeTab === 'arch' ? 'active' : ''}`}
            onClick={() => {
              playClickSound();
              setActiveTab('arch');
            }}
          >
            <Layers size={15} />
            <span>System Pipeline</span>
          </button>
        </div>

        {/* TAB 1: BILINGUAL AI CHAT */}
        {activeTab === 'chat' && (
          <div className="sandbox-chat-body">
            {/* Quick Prompt Chips */}
            <div className="sandbox-prompt-chips">
              <span className="chips-label">Try quick prompts:</span>
              <div className="chips-scroller">
                {SAMPLE_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    className="sandbox-chip"
                    onClick={() => handleSendMessage(q.query)}
                    disabled={isTyping}
                  >
                    <span>{q.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages Log */}
            <div className="sandbox-messages-pane">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`sandbox-msg-row ${m.sender === 'user' ? 'user-msg' : 'bot-msg'}`}
                >
                  <div className="msg-avatar">
                    {m.sender === 'user' ? <User size={15} /> : <Bot size={15} />}
                  </div>
                  <div className="msg-bubble">
                    <pre className="msg-text-render">{m.text}</pre>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="sandbox-msg-row bot-msg">
                  <div className="msg-avatar">
                    <Bot size={15} />
                  </div>
                  <div className="msg-bubble typing-bubble">
                    <div className="typing-dots">
                      <span /><span /><span />
                    </div>
                    <span className="typing-notice">LLaMA 3.3 inferencing on Groq Cloud...</span>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Input Bar */}
            <form
              className="sandbox-input-bar"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <input
                type="text"
                placeholder="Ask Krishi Sahayak in Nepali (धान, गहुँ, मल) or English..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="sandbox-text-input"
                disabled={isTyping}
              />
              <button
                type="submit"
                className="sandbox-send-btn"
                disabled={!inputVal.trim() || isTyping}
              >
                <Send size={16} />
                <span>Send</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: PLANT DISEASE SCANNER */}
        {activeTab === 'scanner' && (
          <div className="sandbox-scanner-body">
            <div className="scanner-selector-col">
              <span className="sub-title">Select Sample Crop Specimen:</span>
              <div className="sample-list">
                {SCANNER_SAMPLES.map((s) => (
                  <button
                    key={s.id}
                    className={`sample-item-btn ${selectedScan.id === s.id ? 'active' : ''}`}
                    onClick={() => handleTriggerScan(s)}
                  >
                    <div className="sample-item-top">
                      <span className="sample-name">{s.name}</span>
                      <span
                        className="sample-status-pill"
                        style={{ color: s.color, borderColor: s.color }}
                      >
                        {s.status}
                      </span>
                    </div>
                    <span className="sample-crop">{s.crop}</span>
                  </button>
                ))}
              </div>

              <div className="weather-hud-box">
                <div className="hud-header">
                  <Sun size={15} className="text-yellow" />
                  <span>Kathmandu Sensor Readings</span>
                </div>
                <div className="hud-grid">
                  <div>
                    <span className="hud-num">24°C</span>
                    <span className="hud-lbl">Air Temp</span>
                  </div>
                  <div>
                    <span className="hud-num">68%</span>
                    <span className="hud-lbl">Humidity</span>
                  </div>
                  <div>
                    <span className="hud-num">10%</span>
                    <span className="hud-lbl">Rain Chance</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="scanner-display-col">
              <div className="scanner-viewfinder">
                <img
                  src={selectedScan.sampleImage}
                  alt={selectedScan.name}
                  className="scanner-image"
                />
                <div className="viewfinder-grid-overlay" />
                <div className={`viewfinder-scan-line ${isScanning ? 'scanning' : ''}`} />

                <div className="viewfinder-tag">
                  <span className="tag-dot" style={{ backgroundColor: selectedScan.color }} />
                  <span>AI Scanner Active: {selectedScan.name}</span>
                </div>
              </div>

              {/* Diagnosis Output Card */}
              <div className="diagnosis-card">
                <div className="diag-header">
                  <div>
                    <span className="diag-label">DIAGNOSTIC REPORT</span>
                    <h4 className="diag-title">{selectedScan.name}</h4>
                  </div>
                  <div className="diag-metric">
                    <span className="diag-pct">{isScanning ? '...' : selectedScan.accuracy}</span>
                    <span className="diag-acc-lbl">Confidence</span>
                  </div>
                </div>

                <div className="diag-detail-row">
                  <span className="detail-tag">Severity: <strong>{selectedScan.severity}</strong></span>
                  <span className="detail-tag">Crop: <strong>{selectedScan.crop}</strong></span>
                  <span className="detail-tag">Status: <strong style={{ color: selectedScan.color }}>{selectedScan.status}</strong></span>
                </div>

                <div className="diag-recommendation">
                  <strong>Treatment & Advisory (सिफारिस):</strong>
                  <p>{isScanning ? 'Analyzing leaf texture, chlorosis patterns, and fungal morphology...' : selectedScan.advice}</p>
                </div>

                <button
                  className="rescan-btn"
                  onClick={() => handleTriggerScan(selectedScan)}
                  disabled={isScanning}
                >
                  <RefreshCw size={14} className={isScanning ? 'spin' : ''} />
                  <span>{isScanning ? 'Scanning Specimen...' : 'Re-Run Computer Vision Scan'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SYSTEM ARCHITECTURE */}
        {activeTab === 'arch' && (
          <div className="sandbox-arch-body">
            <h4 className="arch-heading">Krishi Sahayak End-to-End Execution Flow</h4>
            <div className="arch-cards-flow">
              <div className="arch-step-card">
                <div className="step-num">01</div>
                <h5>React SPA Interface</h5>
                <p>Captures farmer voice / text in Devanagari or English with responsive mobile-first UI.</p>
              </div>
              <div className="arch-flow-arrow">→</div>

              <div className="arch-step-card">
                <div className="step-num">02</div>
                <h5>Python Flask API</h5>
                <p>Authenticates session, queries OpenWeatherMap for geolocated climate, structures prompts.</p>
              </div>
              <div className="arch-flow-arrow">→</div>

              <div className="arch-step-card highlight">
                <div className="step-num">03</div>
                <h5>Groq Cloud (LLaMA 3.3)</h5>
                <p>Ultra-fast LPU inference generates contextualized agricultural diagnosis in &lt;280ms.</p>
              </div>
              <div className="arch-flow-arrow">→</div>

              <div className="arch-step-card">
                <div className="step-num">04</div>
                <h5>MySQL Store & Export</h5>
                <p>Persists crop history, feedback telemetry, and updates pest alerts across regions.</p>
              </div>
            </div>

            <div className="arch-metrics-box">
              <div className="metric-box-item">
                <span className="item-title">&lt; 280ms</span>
                <span className="item-sub">Time to First Token</span>
              </div>
              <div className="metric-box-item">
                <span className="item-title">Bilingual</span>
                <span className="item-sub">Devanagari & English</span>
              </div>
              <div className="metric-box-item">
                <span className="item-title">70B Params</span>
                <span className="item-sub">LLaMA 3.3 Versatile</span>
              </div>
              <div className="metric-box-item">
                <span className="item-title">Real-Time</span>
                <span className="item-sub">Monsoon Weather Sync</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
