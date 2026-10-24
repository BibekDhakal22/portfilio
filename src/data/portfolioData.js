export const PERSONAL_INFO = {
  name: "Bibek Dhakal",
  shortName: "Bibek",
  role: "Software Developer & Frontend Specialist",
  location: "Kathmandu, Nepal",
  timezone: "UTC+5:45 (NPT)",
  status: "Available for Opportunities",
  degree: "BCA Graduate · Tribhuvan University",
  email: "dhakalbibek36@gmail.com",
  phone: "+977 9848706173",
  whatsappUrl: "https://wa.me/9779848706173",
  resumeUrl: "#contact", // or link to direct download
  bioParagraphs: [
    "I am a passionate Software and Frontend Developer based in Kathmandu, Nepal, with a deep appreciation for fluid user experiences, performant architecture, and modern visual design.",
    "Graduating with a Bachelor of Computer Applications (BCA) from Tribhuvan University, I have architected real-world systems ranging from AI-powered bilingual agricultural assistants using LLaMA 3.3 to scalable alumni analytics platforms and enterprise-grade RESTful APIs in C# and ASP.NET Core.",
    "My core strength lies in combining modern React and JavaScript engineering with solid backend foundations (Flask, Node.js, PHP, MySQL), crafting software that is both visually captivating and mathematically resilient."
  ],
  stats: [
    { value: "13+", label: "Repositories on GitHub", suffix: "+" },
    { value: "6", label: "Featured Projects", suffix: "" },
    { value: "10+", label: "Mastered Tech Stacks", suffix: "+" },
    { value: "TU", label: "BCA Degree Graduate", suffix: "" }
  ],
  socials: [
    { name: "GitHub", url: "https://github.com/BibekDhakal22", icon: "Github", handle: "BibekDhakal22" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/bibek-dhakal-057b04261/", icon: "Linkedin", handle: "bibek-dhakal" },
    { name: "WhatsApp", url: "https://wa.me/9779848706173", icon: "MessageSquare", handle: "+977 9848706173", color: "#25d366" },
    { name: "Facebook", url: "https://www.facebook.com/dhakalbibek36", icon: "Share2", handle: "dhakalbibek36" },
    { name: "Dev.to", url: "https://dev.to/bibek_dhakal_ee845150e2d6", icon: "BookOpen", handle: "bibek_dhakal" },
    { name: "Stack Overflow", url: "https://stackoverflow.com/users/31329560/bibek-dhakal", icon: "Code2", handle: "bibek-dhakal" }
  ]
};

export const SKILL_CATEGORIES = [
  { id: "all", name: "All Technologies" },
  { id: "frontend", name: "Frontend & UI" },
  { id: "backend", name: "Backend & APIs" },
  { id: "database", name: "Databases & Storage" },
  { id: "languages", name: "Languages" },
  { id: "tools", name: "Tools & DevOps" }
];

export const SKILLS_LIST = [
  // Frontend
  { name: "React.js", category: "frontend", level: 92, icon: "React", description: "Hooks, Context, State Management, Custom Hook Design, Performance Optimization", projects: ["Krishi Sahayak", "Alumni Tracker React", "Interactive 3D Portfolio"] },
  { name: "Next.js", category: "frontend", level: 85, icon: "Globe", description: "SSR, SSG, App Router, Server Actions, Dynamic SEO optimization", projects: ["Krishi Sahayak", "Interactive 3D Portfolio"] },
  { name: "JavaScript (ES6+)", category: "frontend", level: 90, icon: "Code", description: "Async/Await, Closures, DOM manipulation, Web APIs, Canvas, Event-driven architecture", projects: ["All Projects"] },
  { name: "Tailwind CSS & Vanilla CSS", category: "frontend", level: 88, icon: "Palette", description: "Modern responsive layouts, flexbox, grid, keyframe micro-animations, glassmorphism", projects: ["Krishi Sahayak", "Alumni Tracker React"] },
  { name: "Redux & State", category: "frontend", level: 82, icon: "Layers", description: "Redux Toolkit, slice management, async thunks, centralized global states", projects: ["Alumni Tracker React"] },
  { name: "HTML5 & Accessibility", category: "frontend", level: 95, icon: "Layout", description: "Semantic markup, ARIA roles, SEO optimization, high Lighthouse audits", projects: ["All Projects"] },

  // Backend
  { name: "Python & Flask", category: "backend", level: 84, icon: "Server", description: "REST API routing, blueprints, SQLAlchemy ORM, Groq LLM API integration, JSON endpoints", projects: ["Krishi Sahayak", "Alumni Tracker System"] },
  { name: "ASP.NET Core & C#", category: "backend", level: 80, icon: "Cpu", description: "Controller architecture, Dependency Injection, Entity Framework, OpenAPI/Swagger", projects: ["ASP.NET Web API"] },
  { name: "Node.js & Express", category: "backend", level: 78, icon: "Terminal", description: "Event loop, asynchronous middleware, JWT authentication, modular routers", projects: ["Full-Stack Lab Projects"] },
  { name: "PHP", category: "backend", level: 80, icon: "FileCode", description: "Server-side scripting, procedural & OOP PHP, session management, secure data handling", projects: ["Alumni Tracker System", "Student Portal"] },

  // Databases
  { name: "MySQL", category: "database", level: 86, icon: "Database", description: "Relational schema design, complex joins, indexing, query optimization, foreign constraints", projects: ["Krishi Sahayak", "Student Management System"] },
  { name: "PostgreSQL", category: "database", level: 78, icon: "Database", description: "ACID compliance, schema migrations, spatial data basics, connection pooling", projects: ["Backend Services"] },
  { name: "SQLite", category: "database", level: 88, icon: "HardDrive", description: "Embedded lightweight datastores, zero-configuration local deployment", projects: ["Alumni Tracker System"] },

  // Languages
  { name: "Java", category: "languages", level: 85, icon: "Coffee", description: "OOP design principles, inheritance, multithreading, collections, Swing & GUI frameworks", projects: ["Student Management System"] },
  { name: "C#", category: "languages", level: 82, icon: "Hash", description: "LINQ, strong typing, asynchronous tasks, modern C# 10+ syntax", projects: ["ASP.NET Web API"] },
  { name: "C / C++", category: "languages", level: 76, icon: "Binary", description: "Memory management, pointers, algorithmic problem solving, data structures", projects: ["Academic Core Algorithms"] },

  // Tools & AI
  { name: "LLaMA 3.3 & Groq API", category: "tools", level: 86, icon: "Sparkles", description: "Prompt engineering, bilingual translation, conversational context streaming, AI assistance", projects: ["Krishi Sahayak"] },
  { name: "Git & GitHub", category: "tools", level: 90, icon: "GitBranch", description: "Branching strategies, PR workflows, merge conflict resolution, CI/CD basics", projects: ["All Repositories"] },
  { name: "Figma & UI Design", category: "tools", level: 80, icon: "PenTool", description: "Wireframing, high-fidelity interactive prototyping, design systems, vector assets", projects: ["UI/UX Mockups"] },
  { name: "Three.js & WebGL", category: "tools", level: 75, icon: "Box", description: "3D scene graphs, particle geometries, buffer attributes, interactive raycasting", projects: ["Interactive 3D Portfolio"] }
];

export const PROJECTS_LIST = [
  {
    id: "krishi-sahayak",
    title: "Krishi Sahayak (कृषि सहायक)",
    subtitle: "AI-Powered Smart Agriculture Assistant for Nepali Farmers",
    category: "ai",
    categoryLabel: "AI & Full-Stack",
    badge: "Featured · AI Innovation",
    year: "2024",
    image: "/projects/krishi-sahayak.jpg",
    hasInteractiveDemo: true,
    stats: { users: "Active Users in Nepal", speed: "<280ms AI Latency", model: "LLaMA 3.3 via Groq" },
    github: "https://github.com/BibekDhakal22/krishi_sahayak",
    demoUrl: null,
    summary: "A revolutionary AI assistant providing bilingual (Nepali & English) crop disease diagnostics, weather-informed advisory, and pest management for farmers across Nepal.",
    problem: "Farmers in rural Nepal face severe challenges with localized crop diagnostics, unpredictable monsoon conditions, and language barriers when searching for agricultural solutions.",
    solution: "Engineered a low-latency AI chatbot leveraging LLaMA 3.3 via the ultra-fast Groq API, coupled with real-time OpenWeatherMap data and a customized Nepali agricultural knowledge base.",
    highlights: [
      "Bilingual conversational interface supporting authentic Devanagari Nepali and English.",
      "Instant weather integration providing real-time rainfall probabilities and temperature-sensitive irrigation advice.",
      "Pest diagnostic engine mapping crop symptoms to eco-friendly, locally available treatments.",
      "High-speed inference via Groq cloud, ensuring responses within milliseconds even on mobile 3G/4G connections."
    ],
    tech: ["React.js", "Python Flask", "LLaMA 3.3", "Groq API", "MySQL", "OpenWeatherMap", "CSS3 Glassmorphism"],
    architecture: "React SPA Frontend <--> Flask REST API <--> Groq AI Cloud & OpenWeatherMap API <--> MySQL Relational Store"
  },
  {
    id: "alumni-tracker",
    title: "Alumni Tracker Platform",
    subtitle: "Comprehensive Alumni Analytics, Networking & Reporting Hub",
    category: "fullstack",
    categoryLabel: "Full-Stack System",
    badge: "Final Year Capstone",
    year: "2024",
    image: "/projects/alumni-tracker.jpg",
    hasInteractiveDemo: false,
    stats: { records: "10,000+ Profiles", speed: "Instant PDF Export", db: "Optimized Relational" },
    github: "https://github.com/BibekDhakal22/alumni-tracker",
    demoUrl: null,
    summary: "An enterprise-grade administrative and alumni portal equipped with interactive Chart.js analytics, instant PDF report generation, CSV data pipelines, and notice dispatching.",
    problem: "Universities and colleges struggle to track graduate career progression, maintain updated alumni records, and generate accredited reports for institutional audits.",
    solution: "Constructed a centralized web application that allows alumni to update employment trajectories while providing administrators with live demographic dashboards and automated report exports.",
    highlights: [
      "Dynamic interactive charts displaying employment distribution across tech, banking, and government sectors.",
      "Automated one-click PDF generation for accreditation records and official administrative reviews.",
      "Robust data import/export engine supporting high-volume CSV rosters without UI locking.",
      "Role-based access control safeguarding sensitive alumni contact details."
    ],
    tech: ["Python Flask", "SQLite / MySQL", "Chart.js", "JavaScript", "HTML5", "CSS3", "ReportLab PDF"],
    architecture: "Modular Flask Controllers <--> Jinja/Vanilla JS Client <--> SQLite Database <--> Export Engine (PDF & CSV)"
  },
  {
    id: "alumni-tracker-frontend",
    title: "Alumni Tracker — React Redesign",
    subtitle: "High-Performance Single Page Application Rebuild",
    category: "frontend",
    categoryLabel: "Frontend Architecture",
    badge: "Modern UI / UX",
    year: "2024",
    image: "/projects/alumni-tracker.jpg",
    hasInteractiveDemo: false,
    stats: { score: "99 Lighthouse Score", bundle: "<120KB Gzipped", reactivity: "Optimistic UI" },
    github: "https://github.com/BibekDhakal22/alumni-tracker-frontend",
    demoUrl: null,
    summary: "A modern React overhaul of the Alumni Tracker user interface featuring modular component architecture, reactive state management, and fluid animations.",
    problem: "Traditional multi-page architecture created page reloads and clunky user journeys during large roster searches.",
    solution: "Rebuilt the entire client as a client-side Single Page Application (SPA) with optimistic UI updates, responsive search filters, and smooth card transitions.",
    highlights: [
      "Component-driven design system with reusable modals, search bars, and tabular views.",
      "Instant client-side fuzzy search and multi-criteria filtering across thousands of alumni profiles.",
      "Mobile-first responsive design tested across iOS, Android, and high-DPI desktop viewports.",
      "Optimized bundle size and lightning-fast sub-second initial load."
    ],
    tech: ["React.js", "JavaScript (ES6+)", "Vite", "Vanilla CSS Modules", "React Router", "Lucide Icons"],
    architecture: "React Component Hierarchy with Custom Hooks & Context API for Centralized Client State"
  },
  {
    id: "aspnet-web-api",
    title: "ASP.NET Core Enterprise Web API",
    subtitle: "Scalable RESTful Backend Architecture in C#",
    category: "backend",
    categoryLabel: "Enterprise API",
    badge: "Backend Engineering",
    year: "2023",
    image: "/projects/aspnet-api.jpg",
    hasInteractiveDemo: false,
    stats: { doc: "OpenAPI / Swagger", pattern: "Unit of Work / Repo", async: "100% Async Tasks" },
    github: "https://github.com/BibekDhakal22/ASP.NET_Web_API",
    demoUrl: null,
    summary: "A robust, production-ready RESTful Web API designed using C# and ASP.NET Core, incorporating clean architecture patterns, repository abstraction, and complete Swagger documentation.",
    problem: "Developing scalable backend services requires strict separation of concerns, reliable error handling, and standardized HTTP contract design.",
    solution: "Implemented an API adopting the repository pattern with dependency injection, model validation, asynchronous controller actions, and automated OpenAPI documentation.",
    highlights: [
      "Full CRUD operations implemented with asynchronous Task-based programming (`async`/`await`).",
      "Repository and Unit-of-Work patterns isolating business logic from data persistence.",
      "Built-in Swagger / OpenAPI UI enabling interactive endpoint testing and contract verification.",
      "Centralized error-handling middleware providing consistent JSON error payloads."
    ],
    tech: ["C#", "ASP.NET Core", "Entity Framework", "RESTful API", "Swagger / OpenAPI", "SQL Server"],
    architecture: "Controllers -> Service Layer -> Repository Abstraction -> Entity Framework Core -> Relational DB"
  },
  {
    id: "student-management-system",
    title: "Student Management System",
    subtitle: "Desktop Academic Management Application in Java",
    category: "desktop",
    categoryLabel: "Desktop & OOP",
    badge: "OOP Systems",
    year: "2022",
    image: "/projects/aspnet-api.jpg",
    hasInteractiveDemo: false,
    stats: { paradigm: "Pure OOP MVC", connectivity: "JDBC / MySQL", features: "GPA & Billing" },
    github: "https://github.com/BibekDhakal22/Student_Managment_System",
    demoUrl: null,
    summary: "A desktop software suite built in Java demonstrating strict Object-Oriented Programming (OOP) paradigms, relational database connectivity, and automated grading calculation.",
    problem: "Educational departments needed an offline-first, reliable desktop tool for managing student records, grade calculations, and course enrollments.",
    solution: "Engineered a Java application with clean GUI views, JDBC connectivity, input sanitization, and automated GPA calculations.",
    highlights: [
      "Pure OOP implementation applying inheritance, encapsulation, polymorphism, and abstraction.",
      "Direct JDBC integration with MySQL for reliable transaction management.",
      "Automated grade calculation and transcript generation module.",
      "Intuitive navigation designed for administrative staff without steep learning curves."
    ],
    tech: ["Java", "JDBC", "MySQL", "OOP Design Patterns", "Desktop GUI"],
    architecture: "MVC Architecture with Java Swing UI, Business Logic Controller, and JDBC Data Access Layer"
  },
  {
    id: "interactive-3d-portfolio",
    title: "Interactive 3D Engineering Portfolio",
    subtitle: "Next-Generation Web Presence with Three.js & Web Audio",
    category: "frontend",
    categoryLabel: "Creative Frontend",
    badge: "Featured · Latest",
    year: "2026",
    image: "/projects/portfolio-3d.jpg",
    hasInteractiveDemo: false,
    stats: { fps: "60 FPS WebGL", audio: "Custom Web Audio Synthesizer", particles: "1,800 Active Geometries" },
    github: "https://github.com/BibekDhakal22/portfilio",
    demoUrl: "#",
    summary: "An ultra-modern, highly interactive portfolio crafted in React and Three.js, featuring real-time 3D particle morphing, custom Web Audio synthesis, interactive CLI terminal, and luxury glassmorphism.",
    problem: "Standard static portfolio pages fail to showcase the depth of creative frontend engineering, 3D graphics handling, and interactive micro-interactions.",
    solution: "Engineered a responsive React application blending Three.js 3D WebGL particle simulations, custom synthesized audio feedback, an interactive developer CLI sandbox, and refined design tokens.",
    highlights: [
      "Real-time Three.js 3D canvas with 6 morphing geometric particle models and mouse-reactive physics.",
      "Integrated Web Audio API synthesizer for futuristic haptic audio feedback.",
      "Interactive Developer Terminal CLI supporting live commands (`help`, `skills`, `projects`, `matrix`, `ai`).",
      "Dynamic dual-theme architecture (Dark Cyber Luxury & Light Alabaster Champagne)."
    ],
    tech: ["React 19", "Three.js", "Vite", "Web Audio API", "Vanilla CSS", "Canvas Confetti", "Lucide React"],
    architecture: "React 19 Component System with Three.js WebGL Engine, Web Audio Hooks & Responsive Design Tokens"
  }
];

export const TIMELINE_JOURNEY = [
  {
    year: "2021",
    title: "BCA Enrollment — Tribhuvan University",
    location: "Kathmandu, Nepal",
    badge: "Academic Foundation",
    description: "Commenced Bachelor of Computer Applications at Tribhuvan University. Built a rock-solid foundation in procedural C, Object-Oriented C++, discrete mathematics, data structures, and computer organization.",
    skillsGained: ["C/C++", "Data Structures", "Algorithms", "Relational Algebra"]
  },
  {
    year: "2022",
    title: "First Full-Stack Systems & OOP Mastery",
    location: "Kathmandu, Nepal",
    badge: "Software Engineering",
    description: "Constructed the Java Student Management System utilizing pure OOP principles and JDBC. Dove into web fundamentals (HTML5, CSS3, JavaScript, PHP, and MySQL), building end-to-end relational web portals.",
    skillsGained: ["Java", "JDBC", "PHP", "MySQL", "DOM Manipulation"]
  },
  {
    year: "2023",
    title: "React Ecosystem & Enterprise Backends",
    location: "Kathmandu, Nepal",
    badge: "Architecture & Modern Web",
    description: "Immersed in modern JavaScript engineering, mastering React.js, Redux, component lifecycles, and Tailwind CSS. Built high-throughput backend APIs with C# and ASP.NET Core, mastering REST architectural patterns.",
    skillsGained: ["React.js", "Redux Toolkit", "C#", "ASP.NET Core", "REST APIs"]
  },
  {
    year: "2024",
    title: "AI Integration & BCA Capstone Milestone",
    location: "Kathmandu, Nepal",
    badge: "Graduation & Innovation",
    description: "Engineered Krishi Sahayak — integrating LLaMA 3.3 via Groq for rural agriculture, and delivered the full-stack Alumni Tracker with interactive data visualization. Successfully completed the BCA program with high distinction.",
    skillsGained: ["LLaMA 3.3", "Groq AI Cloud", "Flask", "Chart.js", "Prompt Engineering"]
  },
  {
    year: "2025 — 2026",
    title: "Professional Engineering & Open to Impact",
    location: "Kathmandu, Nepal & Remote",
    badge: "Active Career",
    description: "Engineering advanced React applications, 3D WebGL graphics, and scalable full-stack platforms. Actively seeking frontend and full-stack software engineering opportunities, product collaborations, and freelance projects.",
    skillsGained: ["Three.js", "Next.js", "Cloud Deployment", "Micro-Interactions", "Clean Architecture"]
  }
];

export const TERMINAL_COMMANDS_HELP = [
  { cmd: "help", desc: "List all interactive CLI commands" },
  { cmd: "about", desc: "Print executive overview about Bibek" },
  { cmd: "skills", desc: "Render technical skill competencies" },
  { cmd: "projects", desc: "List featured engineering projects" },
  { cmd: "contact", desc: "Display verified contact channels & links" },
  { cmd: "education", desc: "View degree & academic credentials" },
  { cmd: "matrix", desc: "Activate cyberpunk digital rain simulation" },
  { cmd: "clear", desc: "Clear terminal history" }
];
