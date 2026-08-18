export const PHOTO_MODE = "photo";

export interface Tag {
  label: string;
}

export type SkillIconName = "Monitor" | "Server" | "Code2" | "Wrench" | "Network" | "FileText";
export type SocialIconName = "Github" | "Linkedin" | "Facebook" | "Instagram";
export type ContactIconName = "Mail" | SocialIconName;

export type ProjectType = "full-stack" | "API" | "tooling";

export type ProjectStatus = "live" | "in-progress" | "archived";

export interface Skill {
  id: number;
  title: string;
  icon: SkillIconName;
  description: string;
  tags: Tag[];
}

export interface Project {
  id: number;
  num: string;
  slug?: string;
  title: string;
  description: string;
  longDescription: string;
  tags: Tag[];
  type: ProjectType;
  status: ProjectStatus;
  badge?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface TimelineEntry {
  id: number;
  year: string;
  title: string;
  org: string;
  description: string;
  tags: Tag[];
}

export interface NavLink {
  label: string;
  path: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: SocialIconName;
}

export interface ContactLink {
  label: string;
  sublabel: string;
  href: string;
  iconName: ContactIconName;
}

export const ACCENT = {
  bg: "var(--color-panel-2)",
  border: "var(--color-rule)",
  text: "var(--color-chalk-2)",
};

export const PERSONAL_INFO = {
  name: "Arman Khan",
  role: "Building full-stack web applications",
  context: "IT student in Kathmandu",
  tagline: "Building things that live on the internet.",
  email: "contact@armankhan.com.np",
  location: "Tinkune, Kathmandu, Nepal",
  hometown: "Damak, Jhapa, Nepal",
  institution: "Texas College of Management and IT",
  degree: "Bachelor of Information Technology",
  status: "Open to Opportunities",
  responseTime: "Within 24 hours",
  intro:
    "I build full-stack web applications — the interface people use and the systems behind it. The interesting part is making both hold up when someone uses them in a way you didn't plan for.",
  bio: [
    "I'm a Bachelor of Information Technology student at Texas College of Management and IT in Kathmandu, originally from Damak, Jhapa — a move that traded a small-town pace for a city with a lot more going on.",
    "I currently focus on frontend web development with React, Vite, and Tailwind CSS while actively learning backend development with Node.js, Express, Prisma, and PostgreSQL by building real projects from scratch. My technical foundation also includes Java, C++, Python, and a strong curiosity for how systems work under the hood.",
    "Beyond code, I study networking, cybersecurity fundamentals, and IT infrastructure as part of my degree. I am actively looking for internship and junior developer opportunities where I can contribute real value from day one and keep growing through real-world collaboration."
  ]
};

export const FOOTER_COPY = {
  blurb:
    "Full-stack web applications — the interface people use, and the authentication, data models and APIs behind it.",
  navLabel: "Footer navigation",
  socialLabel: "Social profiles"
};

export const NAV_COPY = {
  wordmark: "Arman",
  cta: "Hire Me",
  primaryLabel: "Primary",
  mobileLabel: "Site",
  openMenu: "Open menu",
  closeMenu: "Close menu"
};

export interface HeroRow {
  id: string;
  label: string;
  value: string;
  ry: number;
  href?: string;
}

export const HERO_XRAY = {
  photoAlt: "Arman Khan",

  rows: [
    { id: "name", label: "NAME", value: "Arman Khan", ry: 8 },
    { id: "edu", label: "EDU", value: "Bachelor of (Hons.) in Information Technology", ry: 24 },
    { id: "focus", label: "FOCUS", value: "the part nobody sees: logins, data, APIs", ry: 40 },
    { id: "tz", label: "TZ", value: "UTC+05:45 — the world's only 45-minute timezone", ry: 57 },
    { id: "status", label: "STATUS", value: "open to internships · replies within 24 hours", ry: 73 },
    {
      id: "contact",
      label: "CONTACT",
      value: PERSONAL_INFO.email,
      href: `mailto:${PERSONAL_INFO.email}`,
      ry: 89
    }
  ] satisfies HeroRow[],

  pauseLabel: "Pause the hero animation",
  playLabel: "Play the hero animation"
};

export const HOME_PAGE = {
  skillsEyebrow: "What I do",
  skillsHeading: "Skills and expertise",
  skillsCta: "Full skills breakdown",
  workEyebrow: "Featured work",
  workHeading: "Things I have built",
  workCta: "All projects",
  ctaEyebrow: "Let us work together",
  ctaHeading: "Have a project in mind?",
  ctaBody: "Open to internship and junior developer roles. Let us build something great together.",
  ctaAction: "Get in touch",
  viewProjects: "View Projects",
  contactMe: "Contact Me"
};

export const TECH_STACK: { icon: string; label: string }[] = [
  { icon: "Atom", label: "React" },
  { icon: "Hexagon", label: "Node.js" },
  { icon: "Database", label: "PostgreSQL" },
  { icon: "Triangle", label: "Prisma" },
  { icon: "Server", label: "Express" },
  { icon: "GitBranch", label: "Git" }
];

export const BENTO_SKILLS: { icon: string; title: string; desc: string }[] = [
  { icon: "Layers", title: "Frontend", desc: "React, Tailwind, Vite pixel-perfect UIs" },
  { icon: "Cpu", title: "Backend", desc: "Node.js, Express, Prisma, PostgreSQL" },
  { icon: "Globe", title: "Networking", desc: "TCP/IP, DNS, Linux, Cybersecurity" },
  { icon: "Code2", title: "Languages", desc: "C++, Java, Python, JavaScript" }
];

export const CONTACT_PAGE = {
  eyebrow: "Contact",
  heading: "Get in touch",
  intro:
    "The form goes straight to my inbox and I reply within a day. If you'd rather email me directly, the address is on the right.",
  directHeading: "Direct",
  alsoOn: "Also on"
};

export const CONTACT_FORM_COPY = {
  heading: "Send a message",
  nameLabel: "Full name",
  namePlaceholder: "Your name",
  emailLabel: "Email address",
  emailPlaceholder: "you@example.com",
  subjectLabel: "Subject",
  subjectPlaceholder: "Internship, project, or something else",
  messageLabel: "Message",
  messagePlaceholder: "Tell me about the opportunity, project, or just say hello",
  submit: "Send message",
  submitting: "Sending...",
  responseNote: "Typical response time: within 24 hours",

  successHeading: "Message sent",
  successBody: "Thanks for reaching out. I'll get back to you within 24 hours.",
  sendAnother: "Send another",

  errorHeading: "Message not sent",
  errorBody:
    "Something went wrong on the way to my inbox. Try again, or email me directly at",
  retry: "Try again",

  unconfiguredHeading: "Form unavailable",
  unconfiguredBody: "The contact form is not configured right now. Email me directly at"
};

export const ABOUT_PAGE = {
  eyebrow: "Who I am",
  heading: "About",
  intro:
    "I'm Arman Khan, from Damak and now building software in Kathmandu. Full-stack web applications — React, Node.js, PostgreSQL. The interface people use, and the systems behind it.",

  storyEyebrow: "How I got here",
  storyHeading: "From +2 Science to the invisible half",
  storyEmphasisIndex: 2,
  storyEmphasisMarker: "01 — the week that changed how I build",
  story: [
    "I finished +2 Science at Damak Multiple Campus, then moved to Kathmandu in 2024 for a Bachelor of (Hons.) in Information Technology at Texas College of Management and IT. My degree covers software engineering, networking, cybersecurity, databases and research methodology, and I've kept the networking and security side alongside the web work rather than dropping it.",
    "I started on the frontend with React, Vite and Tailwind, shipped my first project in 2025, and went full-stack that December — Node, Express, Prisma, PostgreSQL — by building real projects rather than following tutorials. Eight are live now. The largest is TriLearn, a student learning platform with separate admin, instructor and student roles, which sounded simple until I had to decide what each of them was allowed to do.",
    "One bug there took me a week to find. My password reset let anyone reset anyone's password, because the reset token wasn't tied to the account that requested it. Nothing crashed and no test failed. It worked exactly as written, and what was written was wrong. Deployment taught me the same lesson from the other side: code that runs on my machine is not the same as code that runs.",
    "That's why I care about the invisible half — authentication, data modelling, APIs that hold up when the input is wrong. The interface is what people see; the reasons it doesn't break are what interest me."
  ],

  skillsEyebrow: "What I work with",
  skillsHeading: "The stack, in full",
  skillsAside: "The fuller breakdown behind the four areas on the home page.",

  workEyebrow: "How I work",
  workHeading: "Three things I hold to",
  values: [
    { title: "Goal-oriented", desc: "I ship products, not just code." },
    { title: "Fundamentals first", desc: "CS fundamentals meet modern stacks." },
    { title: "Team player", desc: "Communication is a core skill." }
  ],

  aheadEyebrow: "Where I'm going",
  aheadHeading: "The backend half, seriously",
  ahead:
    "I'm working toward a full-stack role, with the backend as the half I want to get seriously good at. I'm looking for an internship or junior position where someone more experienced reviews my work — I've learned more from one broken thing than from any tutorial.",

  timelineLabel: "Timeline",
  timeline: [
    { year: "2022", label: "+2 Science, Damak" },
    { year: "2024", label: "BIT, Kathmandu" },
    { year: "2025", label: "First shipped project" },
    { year: "Dec 2025", label: "Full Stack Started" },
    { year: "2026", label: "Backend systems", now: true }
  ],

  ctaEyebrow: "Next",
  ctaHeading: "Tell me what you're building",
  ctaContact: "Get in touch",
  ctaProjects: "See the projects"
};

export const PROJECTS_PAGE = {
  eyebrow: "My work",
  heading: "Projects",
  intro:
    "Real applications I've designed, built, and deployed. Every project represents a problem I found interesting and a skill I wanted to sharpen.",

  viewLive: "Live demo",
  viewPending: "Live demo coming soon",

  typeAxisLabel: "Type",
  stackAxisLabel: "Stack",
  statusAxisLabel: "Status",
  resetLabel: "Reset",
  countSuffix: "shown",

  emptyHeading: "No match",
  emptyBody: "Nothing matches every filter at once. Loosen one, or reset."
};

export const PROJECT_DETAIL = {
  back: "All projects",
  typeLabel: "Type",
  statusLabel: "Status",
  stackLabel: "Stack",
  viewLive: "Live demo",
  viewSource: "Source",
  notDeployed: "Not deployed yet"
};

export const NOT_FOUND_COPY = {
  label: "404",
  heading: "Page not found",
  body: "The page you tried to open does not exist or the link is no longer valid.",
  cta: "Back to home"
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Contact", path: "/contact" }
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", url: "https://github.com/armancore", icon: "Github" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/techiee-arman/", icon: "Linkedin" },
  { label: "Facebook", url: "https://www.facebook.com/techiee.arman", icon: "Facebook" },
  { label: "Instagram", url: "https://www.instagram.com/techiee.arman", icon: "Instagram" }
];

export const SKILLS: Skill[] = [
  {
    id: 1,
    title: "Frontend Development",
    icon: "Monitor",
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
    icon: "Server",
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
    icon: "Code2",
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
    icon: "Wrench",
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
    icon: "Network",
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
    icon: "FileText",
    description: "Technical writing, data analysis, and academic research methodology.",
    tags: [
      { label: "Academic writing" },
      { label: "Data analysis" },
      { label: "Technical docs" },
      { label: "Literature review" }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    num: "01",
    slug: "trilearn",
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
    type: "full-stack",
    status: "live",
    badge: "Featured Build",
    liveUrl: "https://trilearn-arman.vercel.app/",
    githubUrl: "https://github.com/armancore/TriLearn.git",
    featured: true
  },
  {
    id: 2,
    num: "02",
    slug: "weather-intelligence-platform",
    title: "Weather Intelligence Platform",
    description: "Real-time weather data with comprehensive metrics including temperature, humidity, UV index, and air quality. Features search history and multi-location forecasts.",
    longDescription: "A comprehensive weather application integrating WeatherAPI.com to deliver real-time meteorological data. Built with React and Axios, featuring dynamic search with history tracking, detailed forecasts including UV index and air quality metrics, and a fully responsive layout powered by Tailwind CSS.",
    tags: [
      { label: "React" },
      { label: "Axios" },
      { label: "WeatherAPI" },
      { label: "Tailwind CSS" }
    ],
    type: "API",
    status: "live",
    liveUrl: "https://weather-app-arman.vercel.app/",
    githubUrl: "https://github.com/armancore/Weather-App.git",
    featured: false
  },
  {
    id: 3,
    num: "03",
    slug: "movie-rating-discovery-app",
    title: "Movie Rating & Discovery App",
    description: "TMDB-powered movie discovery with a personal 5-star rating system, watchlist management, favorites collection, and advanced search filtering.",
    longDescription: "A feature-rich movie discovery platform leveraging the TMDB API. Users can search across thousands of films, apply personal 5-star ratings, manage watchlists and favorites, and explore advanced filters. Built with React and styled with Tailwind CSS for a cinematic browsing experience.",
    tags: [
      { label: "React" },
      { label: "TMDB API" },
      { label: "Tailwind CSS" }
    ],
    type: "API",
    status: "live",
    liveUrl: "https://cinevault-arman.vercel.app/",
    githubUrl: "https://github.com/armancore/movie-app.git",
    featured: false
  },
  {
    id: 4,
    num: "04",
    slug: "typing-test",
    title: "Professional Typing Test",
    description: "WPM and accuracy tracking tool with configurable test durations from 30 seconds to 5 minutes, performance analytics, and history tracking.",
    longDescription: "A polished typing speed assessment tool built entirely with React Hooks. Features configurable test durations, real-time WPM calculation, accuracy tracking, and a performance history dashboard. No external dependencies — pure React state management for a snappy, responsive experience.",
    tags: [
      { label: "React" },
      { label: "React Hooks" },
      { label: "Tailwind CSS" }
    ],
    type: "tooling",
    status: "live",
    liveUrl: "https://vibe-typer.vercel.app/",
    githubUrl: "https://github.com/armancore/VibeTyper.git",
    featured: false
  },
  {
    id: 5,
    num: "05",
    slug: "nepal-patra",
    title: "Nepal Patra",
    description: "A Nepal-first news reader, built because general aggregators surface almost nothing from Nepal unless you go looking for it by name.",
    longDescription: "General news aggregators rank on global popularity, so Nepali headlines rarely surface on their own — you have to already know what to search for. Nepal Patra inverts that default: it opens on Nepal, pulls current headlines through TheNewsAPI, and sorts them by category so the country's news is the feed itself rather than a search result. Built with React and Axios, with a responsive card layout that stays readable on small screens.",
    tags: [
      { label: "React" },
      { label: "TheNewsAPI" },
      { label: "Axios" },
      { label: "Tailwind CSS" }
    ],
    type: "API",
    status: "live",
    liveUrl: "https://nepal-patra.vercel.app/",
    githubUrl: "https://github.com/armancore/Nepal-Patra.git",
    featured: false
  },
  {
    id: 6,
    num: "06",
    slug: "expense-tracker",
    title: "Professional Expense Tracker",
    description: "Full-stack expense tracking application for recording transactions, organizing spending, and monitoring personal finances with a clean professional workflow.",
    longDescription: "A professional expense tracker built with React and Node.js for managing day-to-day finances in one place. It focuses on practical expense logging, category-based organization, and a streamlined dashboard experience that makes it easier to understand spending patterns over time.",
    tags: [
      { label: "React" },
      { label: "Node.js" },
      { label: "local storage" },
    ],
    type: "tooling",
    status: "live",
    liveUrl: "https://expense-tracker-arman.vercel.app/",
    githubUrl: "https://github.com/armancore/expense-tracker",
    featured: false
  },
  {
    id: 7,
    num: "07",
    slug: "articlehub",
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
    type: "full-stack",
    status: "live",
    liveUrl: "https://arman45678.pythonanywhere.com/",
    githubUrl: "https://github.com/armancore/ArticleHub.git",
    featured: false
  },
  {
    id: 8,
    num: "08",
    slug: "taskflow-kanban-manager",
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
    type: "tooling",
    status: "live",
    liveUrl: "https://taskflow-arman.vercel.app/",
    githubUrl: "https://github.com/armancore/task-manager.git",
    featured: false
  }
,
  {
    id: 9,
    num: "09",
    title: "This Portfolio Website",
    description:
      "The site you are reading. Prerendered to static HTML per route, so every page is readable before any JavaScript runs.",
    longDescription:
      "Built from scratch with React 19, Vite 7 and Tailwind CSS v4. Every route is prerendered to static HTML through a custom SSR pass, so the content is present at first paint rather than after hydration. Dark-only design system driven entirely by design tokens, with a single motion curve across the site.",
    tags: [
      { label: "React 19" },
      { label: "Vite 7" },
      { label: "Tailwind CSS v4" },
      { label: "React Router v7" },
      { label: "Motion" }
    ],
    type: "tooling",
    status: "live",
    liveUrl: "https://armankhan.com.np",
    githubUrl: "https://github.com/armancore/portfolio",
    featured: false
  }
,
  {
    id: 10,
    num: "10",
    slug: "sajilo-bus-ticketing",
    title: "Sajilo Bus Ticketing System",
    description:
      "A bus ticketing system with a Django backend and a React frontend. Currently in development.",
    longDescription:
      "A bus ticketing system, currently in development. Django on the backend, React on the frontend. Not yet deployed.",
    tags: [{ label: "Django" }, { label: "React" }, { label: "Python" }],
    type: "full-stack",
    status: "in-progress",
    githubUrl: "https://github.com/armancore/bus_ticket",
    featured: false
  }
];

export const TIMELINE: TimelineEntry[] = [
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
    year: "Dec 2025–Present",
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

export const CONTACT_LINKS: ContactLink[] = [
  {
    label: PERSONAL_INFO.email,
    sublabel: "Fastest response",
    href: `mailto:${PERSONAL_INFO.email}`,
    iconName: "Mail"
  },
  {
    label: "github.com/armancore",
    sublabel: "Code and commits",
    href: "https://github.com/armancore",
    iconName: "Github"
  },
  {
    label: "linkedin.com/in/techiee-arman",
    sublabel: "Work history",
    href: "https://www.linkedin.com/in/techiee-arman/",
    iconName: "Linkedin"
  }
];

export const CONTACT_SECONDARY: { label: string; href: string }[] = [
  { label: "Facebook", href: "https://www.facebook.com/techiee.arman" },
  { label: "Instagram", href: "https://www.instagram.com/techiee.arman" }
];
