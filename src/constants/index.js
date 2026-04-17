export const PHOTO_MODE = "photo";

export const THEME_COLORS = {
  accent: "var(--color-accent)",
  accent2: "var(--color-accent2)",
  accent3: "var(--color-accent3)",
  textPrimary: "var(--color-text-primary)",
  textSecondary: "var(--color-text-secondary)",
  textMuted: "var(--color-text-muted)",
};

export const ACCENT_MAP = {
  blue: {
    bg: "color-mix(in srgb, var(--color-accent) 10%, transparent)",
    border: "color-mix(in srgb, var(--color-accent) 22%, transparent)",
    text: "var(--color-accent)",
    glow: "color-mix(in srgb, var(--color-accent) 12%, transparent)",
  },
  purple: {
    bg: "color-mix(in srgb, var(--color-accent3) 10%, transparent)",
    border: "color-mix(in srgb, var(--color-accent3) 22%, transparent)",
    text: "var(--color-accent3)",
    glow: "color-mix(in srgb, var(--color-accent3) 12%, transparent)",
  },
  teal: {
    bg: "color-mix(in srgb, var(--color-accent2) 10%, transparent)",
    border: "color-mix(in srgb, var(--color-accent2) 22%, transparent)",
    text: "var(--color-accent2)",
    glow: "color-mix(in srgb, var(--color-accent2) 10%, transparent)",
  },
  orange: {
    bg: "rgba(249,115,22,0.1)",
    border: "rgba(249,115,22,0.22)",
    text: "#F97316",
    glow: "rgba(249,115,22,0.1)",
  },
  pink: {
    bg: "rgba(236,72,153,0.1)",
    border: "rgba(236,72,153,0.22)",
    text: "#EC4899",
    glow: "rgba(236,72,153,0.1)",
  },
};

export const CATEGORY_ACCENTS = {
  API: { bg: "color-mix(in srgb, var(--color-accent2) 9%, transparent)", border: "color-mix(in srgb, var(--color-accent2) 20%, transparent)", text: "var(--color-accent2)" },
  Tool: { bg: "rgba(249,115,22,0.09)", border: "rgba(249,115,22,0.2)", text: "#F97316" },
  Frontend: { bg: "color-mix(in srgb, var(--color-accent) 9%, transparent)", border: "color-mix(in srgb, var(--color-accent) 20%, transparent)", text: "var(--color-accent)" },
  Social: { bg: "rgba(236,72,153,0.09)", border: "rgba(236,72,153,0.2)", text: "#EC4899" },
};

export const PERSONAL_INFO = {
  name: "Arman Khan",
  role: "IT Student | Learning Frontend & Backend",
  tagline: "Building things that live on the internet.",
  email: "arman.techiee@gmail.com",
  location: "Tinkune, Kathmandu, Nepal",
  hometown: "Damak, Jhapa, Nepal",
  institution: "Texas College of Management and IT",
  degree: "Bachelor of Information Technology",
  status: "Open to Opportunities",
  responseTime: "Within 24 hours",
  bio: [
    "I'm a Bachelor of Information Technology student at Texas College of Management and IT, Kathmandu, originally from Damak, Jhapa. Before stepping into the world of software and technology, I completed my Secondary education at Brighter Star English School and my Intermediate level at Damak Multiple Campus.",
    "I currently focus on frontend web development with React, Vite, and Tailwind CSS while actively learning backend development with Node.js, Express, Prisma, and PostgreSQL by building real projects from scratch. My technical foundation also includes Java, C++, Python, and a strong curiosity for how systems work under the hood.",
    "Beyond code, I study networking, cybersecurity fundamentals, and IT infrastructure as part of my degree. I am actively looking for internship and junior developer opportunities where I can contribute real value from day one and keep growing through real-world collaboration."
  ]
};

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Contact", path: "/contact" }
];

export const SOCIAL_LINKS = [
  { label: "GitHub", url: "https://github.com/armancore", icon: "Github" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/techiee-arman/", icon: "Linkedin" },
  { label: "Facebook", url: "https://www.facebook.com/techiee.arman", icon: "Facebook" },
  { label: "Instagram", url: "https://www.instagram.com/techiee.arman", icon: "Instagram" }
];

export const SKILLS = [
  {
    id: 1,
    title: "Frontend Development",
    icon: "💻",
    description: "Building responsive, performant user interfaces with modern frameworks.",
    tags: [
      { label: "React 19", color: "blue" },
      { label: "Vite", color: "blue" },
      { label: "Tailwind CSS v4", color: "blue" },
      { label: "JavaScript ES2024", color: "blue" },
      { label: "HTML5/CSS3", color: "blue" },
      { label: "Responsive Design", color: "blue" }
    ],
    accentColor: "blue"
  },
  {
    id: 2,
    title: "Backend Foundations",
    icon: "⚙️",
    description: "Learning to build secure backend systems and APIs through hands-on projects.",
    tags: [
      { label: "Node.js", color: "purple" },
      { label: "Express.js", color: "purple" },
      { label: "Prisma 7", color: "purple" },
      { label: "PostgreSQL", color: "purple" },
      { label: "REST APIs", color: "purple" },
      { label: "JWT Auth", color: "purple" }
    ],
    accentColor: "purple"
  },
  {
    id: 3,
    title: "Programming Languages",
    icon: "🔤",
    description: "Multi-paradigm development across systems and application languages.",
    tags: [
      { label: "C++ (OOP)", color: "orange" },
      { label: "Java (OOP)", color: "orange" },
      { label: "Python", color: "orange" },
      { label: "JavaScript", color: "orange" }
    ],
    accentColor: "orange"
  },
  {
    id: 4,
    title: "Dev Tools & Workflow",
    icon: "🛠️",
    description: "Efficient development workflows with modern tooling and CI/CD.",
    tags: [
      { label: "Git", color: "teal" },
      { label: "GitHub", color: "teal" },
      { label: "GitHub Actions", color: "teal" },
      { label: "Vite", color: "teal" },
      { label: "npm", color: "teal" },
      { label: "ESLint", color: "teal" }
    ],
    accentColor: "teal"
  },
  {
    id: 5,
    title: "Networking & Systems",
    icon: "🌐",
    description: "IT infrastructure fundamentals, networking protocols, and security.",
    tags: [
      { label: "TCP/IP", color: "pink" },
      { label: "DNS/DHCP", color: "pink" },
      { label: "Linux basics", color: "pink" },
      { label: "Cybersecurity", color: "pink" },
      { label: "Cloud intro", color: "pink" }
    ],
    accentColor: "pink"
  },
  {
    id: 6,
    title: "Research & Documentation",
    icon: "📚",
    description: "Technical writing, data analysis, and academic research methodology.",
    tags: [
      { label: "Academic writing", color: "blue" },
      { label: "Data analysis", color: "blue" },
      { label: "Technical docs", color: "blue" },
      { label: "Literature review", color: "blue" }
    ],
    accentColor: "blue"
  }
];

export const PROJECTS = [
  {
    id: 1,
    num: "01",
    title: "Weather Intelligence Platform",
    description: "Real-time weather data with comprehensive metrics including temperature, humidity, UV index, and air quality. Features search history and multi-location forecasts.",
    longDescription: "A comprehensive weather application integrating WeatherAPI.com to deliver real-time meteorological data. Built with React and Axios, featuring dynamic search with history tracking, detailed forecasts including UV index and air quality metrics, and a fully responsive layout powered by Tailwind CSS.",
    tags: [
      { label: "React", color: "blue" },
      { label: "Axios", color: "blue" },
      { label: "WeatherAPI", color: "teal" },
      { label: "Tailwind CSS", color: "purple" }
    ],
    category: "API",
    liveUrl: "https://weather-app-arman.vercel.app/",
    githubUrl: "https://github.com/armancore/Weather-App.git",
    featured: true
  },
  {
    id: 2,
    num: "02",
    title: "Movie Rating & Discovery App",
    description: "TMDB-powered movie discovery with a personal 5-star rating system, watchlist management, favorites collection, and advanced search filtering.",
    longDescription: "A feature-rich movie discovery platform leveraging the TMDB API. Users can search across thousands of films, apply personal 5-star ratings, manage watchlists and favorites, and explore advanced filters. Built with React and styled with Tailwind CSS for a cinematic browsing experience.",
    tags: [
      { label: "React", color: "blue" },
      { label: "TMDB API", color: "orange" },
      { label: "Tailwind CSS", color: "purple" }
    ],
    category: "API",
    liveUrl: "https://cinevault-arman.vercel.app/",
    githubUrl: "https://github.com/armancore/movie-app.git",
    featured: false
  },
  {
    id: 3,
    num: "03",
    title: "Professional Typing Test",
    description: "WPM and accuracy tracking tool with configurable test durations from 30 seconds to 5 minutes, performance analytics, and history tracking.",
    longDescription: "A polished typing speed assessment tool built entirely with React Hooks. Features configurable test durations, real-time WPM calculation, accuracy tracking, and a performance history dashboard. No external dependencies — pure React state management for a snappy, responsive experience.",
    tags: [
      { label: "React", color: "blue" },
      { label: "React Hooks", color: "blue" },
      { label: "Tailwind CSS", color: "purple" }
    ],
    category: "Tool",
    liveUrl: "https://vibe-typer.vercel.app/",
    githubUrl: "https://github.com/armancore/VibeTyper.git",
    featured: true
  },
  {
    id: 4,
    num: "04",
    title: "Nepal News Aggregator",
    description: "Nepal-focused news app powered by TheNewsAPI with category-based browsing, fresh headline discovery, and a responsive card layout for smooth reading across devices.",
    longDescription: "Nepal Patra is a Nepal-centric news application built with React that uses TheNewsAPI to fetch and display current headlines in a clean, mobile-friendly interface. It focuses on easy category exploration, fast headline browsing, and a responsive card-based layout that keeps the reading experience simple and accessible.",
    tags: [
      { label: "React", color: "blue" },
      { label: "TheNewsAPI", color: "teal" },
      { label: "Axios", color: "blue" },
      { label: "Tailwind CSS", color: "purple" }
    ],
    category: "API",
    liveUrl: "https://nepal-patra.vercel.app/",
    githubUrl: "https://github.com/armancore/Nepal-Patra.git",
    featured: false
  },
  {
    id: 5,
    num: "05",
    title: "Professional Expense Tracker",
    description: "Full-stack expense tracking application for recording transactions, organizing spending, and monitoring personal finances with a clean professional workflow.",
    longDescription: "A professional expense tracker built with React and Node.js for managing day-to-day finances in one place. It focuses on practical expense logging, category-based organization, and a streamlined dashboard experience that makes it easier to understand spending patterns over time.",
    tags: [
      { label: "React", color: "blue" },
      { label: "Node.js", color: "teal" },
      { label: "Express.js", color: "orange" },
      { label: "API Design", color: "purple" }
    ],
    category: "Tool",
    liveUrl: "https://expense-tracker-arman.vercel.app/",
    githubUrl: "https://github.com/armancore/expense-tracker",
    featured: false
  },
  {
    id: 6,
    num: "06",
    title: "TriLearn",
    description: "A full-stack student learning and management platform with three access levels for administrators, instructors, and students.",
    longDescription: "TriLearn is a student learning and management platform I am currently building for schools and colleges. It supports three core roles, administrators, instructors, and students, with a modern full-stack architecture using React, Vite, Node.js, Express, PostgreSQL, Prisma, JWT auth, Zod validation, and GitHub Actions for CI.",
    tags: [
      { label: "React", color: "blue" },
      { label: "Node.js", color: "teal" },
      { label: "Express", color: "orange" },
      { label: "PostgreSQL", color: "purple" },
      { label: "Prisma", color: "purple" },
      { label: "JWT Auth", color: "teal" },
      { label: "EdTech", color: "blue" }
    ],
    category: "Tool",
    status: "In Progress",
    liveUrl: null,
    githubUrl: "https://github.com/armancore/TriLearn.git",
    featured: false
  },
  {
    id: 7,
    num: "07",
    title: "Ecommerce Store Template",
    description: "A frontend ecommerce template for modern online stores, built with React and Vite with responsive layouts, storefront UI sections, and reusable shopping experience components.",
    longDescription: "A basic frontend ecommerce store template built as a foundation for future online shop projects. It focuses on clean storefront presentation, responsive product browsing layouts, and reusable UI patterns for building modern ecommerce experiences with React and Vite.",
    tags: [
      { label: "React", color: "blue" },
      { label: "Vite", color: "blue" },
      { label: "JavaScript", color: "orange" },
      { label: "Responsive UI", color: "blue" },
      { label: "Ecommerce", color: "purple" }
    ],
    category: "Frontend",
    liveUrl: "https://ecommerce-arman.vercel.app/",
    githubUrl: "https://github.com/armancore/ecommerce.git",
    featured: false
  },
  {
    id: 8,
    num: "08",
    title: "ArticleHub",
    description: "A blog and article posting platform built with Flask, Jinja, HTML, CSS, and JavaScript for publishing and browsing written content through a clean web interface.",
    longDescription: "ArticleHub is a content publishing web application built with Flask and server-rendered Jinja templates. It focuses on article and blog posting workflows, combining Python on the backend with HTML, CSS, and JavaScript on the frontend to deliver a straightforward reading and publishing experience.",
    tags: [
      { label: "Flask", color: "teal" },
      { label: "Jinja", color: "orange" },
      { label: "HTML/CSS", color: "blue" },
      { label: "JavaScript", color: "orange" },
      { label: "Python", color: "purple" }
    ],
    category: "Social",
    liveUrl: "https://arman45678.pythonanywhere.com/",
    githubUrl: "https://github.com/armancore/ArticleHub.git",
    featured: false
  },
  {
    id: 9,
    num: "09",
    title: "TaskFlow Kanban Manager",
    description: "A simple Kanban-style task management app with drag-and-drop task movement across columns and priority-based organization for a smooth planning workflow.",
    longDescription: "TaskFlow is a task management application built with React, Vite, and Tailwind CSS. It uses a Kanban-style board layout to organize tasks visually and supports drag-and-drop interactions so tasks can be moved between workflow stages while keeping priority-focused planning simple and intuitive.",
    tags: [
      { label: "React", color: "blue" },
      { label: "Vite", color: "blue" },
      { label: "Tailwind CSS", color: "purple" },
      { label: "Kanban", color: "teal" },
      { label: "Drag & Drop", color: "orange" }
    ],
    category: "Tool",
    liveUrl: "https://taskflow-arman.vercel.app/",
    githubUrl: "https://github.com/armancore/task-manager.git",
    featured: false
  }
];

export const TIMELINE = [
  {
    id: 1,
    year: "2026–Present",
    title: "Modern Backend Systems",
    org: "Self-Study",
    description: "Currently building TriLearn, a student learning and management platform with separate administration, instructor, and student roles using React, Node.js, Express, PostgreSQL, Prisma, and JWT-based authentication.",
    tags: [
      { label: "Prisma", color: "teal" },
      { label: "Express", color: "orange" },
      { label: "Node.js", color: "teal" },
      { label: "PostgreSQL", color: "purple" },
      { label: "React", color: "blue" }
    ]
  },
  {
    id: 2,
    year: "2025–Present",
    title: "Frontend and Backend Learner",
    org: "Self-directed / Personal Projects",
    description: "Built and deployed production web applications while strengthening frontend architecture, API integration, authentication systems, and modern deployment workflows.",
    tags: [
      { label: "React", color: "blue" },
      { label: "Prisma", color: "purple" },
      { label: "PostgreSQL", color: "purple" },
      { label: "GitHub Actions", color: "teal" },
      { label: "API Integration", color: "orange" }
    ]
  },
  {
    id: 3,
    year: "2024–Present",
    title: "Bachelor of Information Technology",
    org: "Texas College of Management and IT",
    description: "Studying software engineering, networking, cybersecurity, databases, and research methodology. Building a strong theoretical foundation alongside hands-on project work.",
    tags: [
      { label: "Software Engineering", color: "blue" },
      { label: "Networking", color: "teal" },
      { label: "Cybersecurity", color: "pink" },
      { label: "Databases", color: "purple" }
    ]
  },
  {
    id: 4,
    year: "2022–2024",
    title: "+2 Science",
    org: "Damak Multiple Campus",
    description: "Completed my higher secondary science background with a focus on analytical thinking, academic discipline, and a stronger foundation for future IT studies.",
    tags: [
      { label: "Science", color: "orange" },
      { label: "Higher Secondary", color: "blue" },
      { label: "Academic Foundation", color: "teal" }
    ]
  },
  {
    id: 5,
    year: "Up to SEE",
    title: "Secondary Education Examination",
    org: "Brighter Star English School",
    description: "Completed my SEE and built the study habits, curiosity, and confidence that later pushed me toward technology and software development.",
    tags: [
      { label: "SEE", color: "purple" },
      { label: "School Education", color: "blue" },
      { label: "Early Foundation", color: "pink" }
    ]
  },
];

export const CONTACT_LINKS = [
  {
    label: "arman.techiee@gmail.com",
    sublabel: "Fastest response",
    href: "mailto:arman.techiee@gmail.com",
    iconName: "Mail",
    bgColor: "bg-[var(--accent-glow)] border-accent/20 text-accent"
  },
  {
    label: "github.com/armancore",
    sublabel: "Code & projects",
    href: "https://github.com/armancore",
    iconName: "Github",
    bgColor: "bg-white/5 border-white/10 text-text-primary"
  },
  {
    label: "linkedin.com/in/techiee-arman",
    sublabel: "Professional profile",
    href: "https://www.linkedin.com/in/techiee-arman/",
    iconName: "Linkedin",
    bgColor: "bg-sky-500/10 border-sky-500/20 text-sky-400"
  },
  {
    label: "facebook.com/techiee.arman",
    sublabel: "Social",
    href: "https://www.facebook.com/techiee.arman",
    iconName: "Facebook",
    bgColor: "bg-[var(--accent2-glow)] border-accent2/20 text-accent2"
  },
  {
    label: "instagram.com/techiee.arman",
    sublabel: "Social",
    href: "https://www.instagram.com/techiee.arman",
    iconName: "Instagram",
    bgColor: "bg-pink-500/10 border-pink-500/20 text-pink-400"
  }
];
