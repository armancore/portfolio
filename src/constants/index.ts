export const PHOTO_MODE = "photo";

export const THEME_COLORS = {
  accent: "var(--color-accent)",
  accent2: "var(--color-accent2)",
  accent3: "var(--color-accent3)",
  textPrimary: "var(--color-text-primary)",
  textSecondary: "var(--color-text-secondary)",
  textMuted: "var(--color-text-muted)",
};

// Single accent style for every tag, category chip and skill card. The five
// former ACCENT_MAP keys and four CATEGORY_ACCENTS keys all resolved to the
// same electric blue, so the per-item colour fields were pure indirection.
export const ACCENT = {
  bg: "rgba(46,143,255,0.10)",
  border: "rgba(46,143,255,0.24)",
  text: "var(--color-accent)",
  glow: "rgba(46,143,255,0.24)",
};

export const PERSONAL_INFO = {
  name: "Arman Khan",
  role: "Building full-stack web applications with React, Node.js, and PostgreSQL",
  context: "IT student at Texas College of Management and IT, Kathmandu",
  tagline: "Building things that live on the internet.",
  email: "contact@armankhan.com.np",
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
      { label: "React 19" },
      { label: "Vite" },
      { label: "Tailwind CSS v4" },
      { label: "JavaScript ES2024" },
      { label: "HTML5/CSS3" },
      { label: "Responsive Design" }
    ]
  },
  {
    id: 2,
    title: "Backend Development",
    icon: "⚙️",
    description: "Building REST APIs with token-based auth, relational schemas, and request validation.",
    tags: [
      { label: "Node.js" },
      { label: "Express.js" },
      { label: "Prisma 7" },
      { label: "PostgreSQL" },
      { label: "REST APIs" },
      { label: "JWT Auth" }
    ]
  },
  {
    id: 3,
    title: "Programming Languages",
    icon: "🔤",
    description: "Multi-paradigm development across systems and application languages.",
    tags: [
      { label: "C++ (OOP)" },
      { label: "Java (OOP)" },
      { label: "Python" },
      { label: "JavaScript" }
    ]
  },
  {
    id: 4,
    title: "Dev Tools & Workflow",
    icon: "🛠️",
    description: "Efficient development workflows with modern tooling and CI/CD.",
    tags: [
      { label: "Git" },
      { label: "GitHub" },
      { label: "GitHub Actions" },
      { label: "Vite" },
      { label: "npm" },
      { label: "ESLint" }
    ]
  },
  {
    id: 5,
    title: "Networking & Systems",
    icon: "🌐",
    description: "IT infrastructure fundamentals, networking protocols, and security.",
    tags: [
      { label: "TCP/IP" },
      { label: "DNS/DHCP" },
      { label: "Linux basics" },
      { label: "Cybersecurity" },
      { label: "Cloud intro" }
    ]
  },
  {
    id: 6,
    title: "Research & Documentation",
    icon: "📚",
    description: "Technical writing, data analysis, and academic research methodology.",
    tags: [
      { label: "Academic writing" },
      { label: "Data analysis" },
      { label: "Technical docs" },
      { label: "Literature review" }
    ]
  }
];

export const PROJECTS = [
  {
    id: 1,
    num: "01",
    title: "TriLearn",
    description: "A full-stack student learning and management platform with three access levels for administrators, instructors, and students.",
    longDescription: "TriLearn is a student learning and management platform I am currently building for schools and colleges. It supports three core roles, administrators, instructors, and students, with a modern full-stack architecture using React, Vite, Node.js, Express, PostgreSQL, Prisma, JWT auth, Zod validation, and GitHub Actions for CI.",
    tags: [
      { label: "React" },
      { label: "Node.js" },
      { label: "Express" },
      { label: "PostgreSQL" },
      { label: "Prisma" },
      { label: "JWT Auth" },
      { label: "EdTech" }
    ],
    category: "Tool",
    status: "Featured Build",
    liveUrl: "https://trilearn-arman.vercel.app/",
    githubUrl: "https://github.com/armancore/TriLearn.git",
    featured: true
  },
  {
    id: 2,
    num: "02",
    title: "Weather Intelligence Platform",
    description: "Real-time weather data with comprehensive metrics including temperature, humidity, UV index, and air quality. Features search history and multi-location forecasts.",
    longDescription: "A comprehensive weather application integrating WeatherAPI.com to deliver real-time meteorological data. Built with React and Axios, featuring dynamic search with history tracking, detailed forecasts including UV index and air quality metrics, and a fully responsive layout powered by Tailwind CSS.",
    tags: [
      { label: "React" },
      { label: "Axios" },
      { label: "WeatherAPI" },
      { label: "Tailwind CSS" }
    ],
    category: "API",
    liveUrl: "https://weather-app-arman.vercel.app/",
    githubUrl: "https://github.com/armancore/Weather-App.git",
    featured: false
  },
  {
    id: 3,
    num: "03",
    title: "Movie Rating & Discovery App",
    description: "TMDB-powered movie discovery with a personal 5-star rating system, watchlist management, favorites collection, and advanced search filtering.",
    longDescription: "A feature-rich movie discovery platform leveraging the TMDB API. Users can search across thousands of films, apply personal 5-star ratings, manage watchlists and favorites, and explore advanced filters. Built with React and styled with Tailwind CSS for a cinematic browsing experience.",
    tags: [
      { label: "React" },
      { label: "TMDB API" },
      { label: "Tailwind CSS" }
    ],
    category: "API",
    liveUrl: "https://cinevault-arman.vercel.app/",
    githubUrl: "https://github.com/armancore/movie-app.git",
    featured: false
  },
  {
    id: 4,
    num: "04",
    title: "Professional Typing Test",
    description: "WPM and accuracy tracking tool with configurable test durations from 30 seconds to 5 minutes, performance analytics, and history tracking.",
    longDescription: "A polished typing speed assessment tool built entirely with React Hooks. Features configurable test durations, real-time WPM calculation, accuracy tracking, and a performance history dashboard. No external dependencies — pure React state management for a snappy, responsive experience.",
    tags: [
      { label: "React" },
      { label: "React Hooks" },
      { label: "Tailwind CSS" }
    ],
    category: "Tool",
    liveUrl: "https://vibe-typer.vercel.app/",
    githubUrl: "https://github.com/armancore/VibeTyper.git",
    featured: false
  },
  {
    id: 5,
    num: "05",
    title: "Nepal Patra",
    description: "A Nepal-first news reader, built because general aggregators surface almost nothing from Nepal unless you go looking for it by name.",
    longDescription: "General news aggregators rank on global popularity, so Nepali headlines rarely surface on their own — you have to already know what to search for. Nepal Patra inverts that default: it opens on Nepal, pulls current headlines through TheNewsAPI, and sorts them by category so the country's news is the feed itself rather than a search result. Built with React and Axios, with a responsive card layout that stays readable on small screens.",
    tags: [
      { label: "React" },
      { label: "TheNewsAPI" },
      { label: "Axios" },
      { label: "Tailwind CSS" }
    ],
    category: "API",
    liveUrl: "https://nepal-patra.vercel.app/",
    githubUrl: "https://github.com/armancore/Nepal-Patra.git",
    featured: false
  },
  {
    id: 6,
    num: "06",
    title: "Professional Expense Tracker",
    description: "Full-stack expense tracking application for recording transactions, organizing spending, and monitoring personal finances with a clean professional workflow.",
    longDescription: "A professional expense tracker built with React and Node.js for managing day-to-day finances in one place. It focuses on practical expense logging, category-based organization, and a streamlined dashboard experience that makes it easier to understand spending patterns over time.",
    tags: [
      { label: "React" },
      { label: "Node.js" },
      { label: "Express.js" },
      { label: "API Design" }
    ],
    category: "Tool",
    liveUrl: "https://expense-tracker-arman.vercel.app/",
    githubUrl: "https://github.com/armancore/expense-tracker",
    featured: false
  },
  {
    id: 7,
    num: "07",
    title: "ArticleHub",
    description: "A blog and article posting platform built with Flask, Jinja, HTML, CSS, and JavaScript for publishing and browsing written content through a clean web interface.",
    longDescription: "ArticleHub is a content publishing web application built with Flask and server-rendered Jinja templates. It focuses on article and blog posting workflows, combining Python on the backend with HTML, CSS, and JavaScript on the frontend to deliver a straightforward reading and publishing experience.",
    tags: [
      { label: "Flask" },
      { label: "Jinja" },
      { label: "HTML/CSS" },
      { label: "JavaScript" },
      { label: "Python" }
    ],
    category: "Social",
    liveUrl: "https://arman45678.pythonanywhere.com/",
    githubUrl: "https://github.com/armancore/ArticleHub.git",
    featured: false
  },
  {
    id: 8,
    num: "08",
    title: "TaskFlow Kanban Manager",
    description: "A simple Kanban-style task management app with drag-and-drop task movement across columns and priority-based organization for a smooth planning workflow.",
    longDescription: "TaskFlow is a task management application built with React, Vite, and Tailwind CSS. It uses a Kanban-style board layout to organize tasks visually and supports drag-and-drop interactions so tasks can be moved between workflow stages while keeping priority-focused planning simple and intuitive.",
    tags: [
      { label: "React" },
      { label: "Vite" },
      { label: "Tailwind CSS" },
      { label: "Kanban" },
      { label: "Drag & Drop" }
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
      { label: "Prisma" },
      { label: "Express" },
      { label: "Node.js" },
      { label: "PostgreSQL" },
      { label: "React" }
    ]
  },
  {
    id: 2,
    year: "2025–Present",
    title: "Full-Stack Project Development",
    org: "Self-directed / Personal Projects",
    description: "Built and deployed production web applications while strengthening frontend architecture, API integration, authentication systems, and modern deployment workflows.",
    tags: [
      { label: "React" },
      { label: "Prisma" },
      { label: "PostgreSQL" },
      { label: "GitHub Actions" },
      { label: "API Integration" }
    ]
  },
  {
    id: 3,
    year: "2024–Present",
    title: "Bachelor of Information Technology",
    org: "Texas College of Management and IT",
    description: "Studying software engineering, networking, cybersecurity, databases, and research methodology. Building a strong theoretical foundation alongside hands-on project work.",
    tags: [
      { label: "Software Engineering" },
      { label: "Networking" },
      { label: "Cybersecurity" },
      { label: "Databases" }
    ]
  },
  {
    id: 4,
    year: "2022–2024",
    title: "+2 Science",
    org: "Damak Multiple Campus",
    description: "Completed my higher secondary science background with a focus on analytical thinking, academic discipline, and a stronger foundation for future IT studies.",
    tags: [
      { label: "Science" },
      { label: "Higher Secondary" },
      { label: "Academic Foundation" }
    ]
  },
  {
    id: 5,
    year: "Up to SEE",
    title: "Secondary Education Examination",
    org: "Brighter Star English School",
    description: "Completed my SEE and built the study habits, curiosity, and confidence that later pushed me toward technology and software development.",
    tags: [
      { label: "SEE" },
      { label: "School Education" },
      { label: "Early Foundation" }
    ]
  },
];

export const CONTACT_LINKS = [
  {
    label: "contact@armankhan.com.np",
    sublabel: "Fastest response",
    href: "mailto:contact@armankhan.com.np",
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
