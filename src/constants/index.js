export const PHOTO_MODE = "photo"; // Change to "photo" after adding profile.jpg

export const PERSONAL_INFO = {
  name: "Arman Khan",
  role: "IT Student & Full-Stack Developer",
  tagline: "Building things that live on the internet.",
  email: "arman.techiee@gmail.com",
  phone: "+977 9826999632",
  location: "Tinkune, Kathmandu, Nepal",
  institution: "Texas College of Management and IT",
  degree: "Bachelor of Information Technology",
  status: "Open to Opportunities",
  responseTime: "Within 24 hours",
  bio: [
    "I am a Bachelor of Information Technology student at Texas College of Management and IT, Kathmandu. I specialize in full-stack web development with the MERN stack — building real, deployed applications from scratch.",
    "My technical foundation spans multiple paradigms: object-oriented programming with Java and C++, data science workflows with Python, and modern web development with React, Node.js, and MongoDB. I believe in learning by building — every project I ship teaches me something a classroom cannot.",
    "Beyond code, I study network architecture, cybersecurity fundamentals, and IT infrastructure as part of my degree. I am actively looking for internship and junior developer opportunities where I can contribute real value from day one."
  ]
};

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Contact", path: "/contact" }
];

export const SOCIAL_LINKS = [
  { label: "GitHub", url: "https://github.com/Arman-techiee", icon: "Github" },
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
    title: "Backend Development",
    icon: "⚙️",
    description: "Designing and building scalable server-side applications and APIs.",
    tags: [
      { label: "Node.js", color: "purple" },
      { label: "Express.js", color: "purple" },
      { label: "MongoDB", color: "purple" },
      { label: "Mongoose", color: "purple" },
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
    liveUrl: "https://www.armankhan.com.np/#/projects",
    githubUrl: "https://github.com/Arman-techiee",
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
    liveUrl: "https://www.armankhan.com.np/#/projects",
    githubUrl: "https://github.com/Arman-techiee",
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
    githubUrl: "https://github.com/Arman-techiee/VibeTyper.git",
    featured: true
  },
  {
    id: 4,
    num: "04",
    title: "Nepal News Aggregator",
    description: "Nepal-focused news aggregator using NewsAPI.org with skeleton loading states and a fully responsive card layout.",
    longDescription: "A Nepal-centric news aggregation platform powered by NewsAPI.org. Features real-time headline fetching with intelligent skeleton loading states, category-based filtering, and a responsive card grid layout. Built with React and Axios, styled with Tailwind CSS.",
    tags: [
      { label: "React", color: "blue" },
      { label: "NewsAPI", color: "teal" },
      { label: "Axios", color: "blue" },
      { label: "Tailwind CSS", color: "purple" }
    ],
    category: "API",
    liveUrl: "https://www.armankhan.com.np/#/projects",
    githubUrl: "https://github.com/Arman-techiee",
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
      { label: "MongoDB", color: "purple" }
    ],
    category: "Tool",
    liveUrl: "https://expense-tracker-arman.vercel.app/",
    githubUrl: "https://github.com/Arman-techiee/expense-tracker",
    featured: false
  },
  {
    id: 6,
    num: "06",
    title: "Online Student Learning & Management Platform",
    description: "A full-stack platform in progress for students and educational institutes to manage learning materials, academic workflows, communication, and institutional operations in one place.",
    longDescription: "An online student learning and management platform currently under development for students and educational institutes. The product is being designed to support learning resources, institute management workflows, and a streamlined digital experience for academic collaboration.",
    tags: [
      { label: "React", color: "blue" },
      { label: "Node.js", color: "teal" },
      { label: "Express.js", color: "orange" },
      { label: "MongoDB", color: "purple" },
      { label: "EdTech", color: "blue" }
    ],
    category: "Tool",
    liveUrl: null,
    githubUrl: null,
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
    githubUrl: "https://github.com/Arman-techiee/ecommerce.git",
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
    githubUrl: "https://github.com/Arman-techiee/ArticleHub.git",
    featured: false
  }
];

export const TIMELINE = [
  {
    id: 1,
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
    id: 2,
    year: "2025–Present",
    title: "Full-Stack Developer",
    org: "Self-directed / Personal Projects",
    description: "Built and deployed 6 production web applications. Mastered React, API integration, authentication systems, and CI/CD pipelines with GitHub Actions.",
    tags: [
      { label: "React", color: "blue" },
      { label: "MERN Stack", color: "purple" },
      { label: "GitHub Actions", color: "teal" },
      { label: "API Integration", color: "orange" }
    ]
  },
  {
    id: 3,
    year: "2026–Present",
    title: "MERN Stack Deep Dive",
    org: "Self-Study",
    description: "Completed comprehensive MERN stack training covering MongoDB, Express, React, and Node.js with real project implementation and deployment.",
    tags: [
      { label: "MongoDB", color: "teal" },
      { label: "Express.js", color: "orange" },
      { label: "Node.js", color: "teal" },
      { label: "React", color: "blue" }
    ]
  }
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
    label: "+977 9826999632",
    sublabel: "Calls & WhatsApp",
    href: "tel:+9779826999632",
    iconName: "Phone",
    bgColor: "bg-[var(--accent3-glow)] border-accent3/20 text-accent3"
  },
  {
    label: "github.com/Arman-techiee",
    sublabel: "Code & projects",
    href: "https://github.com/Arman-techiee",
    iconName: "Github",
    bgColor: "bg-white/5 border-white/10 text-text-primary"
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
