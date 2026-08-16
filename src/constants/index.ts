export const PHOTO_MODE = "photo";

/** A technology or topic chip rendered beside a skill, project or timeline entry. */
export interface Tag {
  label: string;
}

/** lucide-react export names. Consumers map these to components via a lookup. */
export type SkillIconName = "Monitor" | "Server" | "Code2" | "Wrench" | "Network" | "FileText";
export type SocialIconName = "Github" | "Linkedin" | "Facebook" | "Instagram";
export type ContactIconName = "Mail" | SocialIconName;

/** The vocabulary of project categories. The Projects filter bar derives its
 *  buttons from the projects that actually exist, not from this union. */
export type ProjectCategory = "Tool" | "API" | "Social" | "Frontend";

export interface Skill {
  id: number;
  title: string;
  icon: SkillIconName;
  description: string;
  tags: Tag[];
}

export interface Project {
  id: number;
  /** Zero-padded display index, e.g. "01". Kept in sync with id. */
  num: string;
  title: string;
  description: string;
  longDescription: string;
  tags: Tag[];
  category: ProjectCategory;
  /** Shown as a chip, and as the fallback when liveUrl is absent. */
  status?: string;
  /** Absent for projects with no public deployment. */
  liveUrl?: string;
  /** Absent for projects with no public repository. */
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

// Single chip style for every tag, category and skill card. Colour is not a
// data concern -- this resolves to tokens so the palette can move without
// touching content. The old per-item bgColor strings smuggled Tailwind classes
// into the data layer and all pointed at the same deleted blue.
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
  // Hero-only paragraph. Deliberately separate from bio[] so the landing page
  // leads with the work instead of education history, and so the About page
  // can carry the biography without the two drifting into paraphrases of
  // each other.
  intro:
    "I build full-stack web applications — the interface people use and the systems behind it. What interests me most is the part nobody sees: authentication, data modeling, and APIs that still behave when the input is wrong.",
  // Rendered only on the About page. The schools and dates live in TIMELINE
  // ids 4 and 5, so this no longer repeats them.
  bio: [
    "I'm a Bachelor of Information Technology student at Texas College of Management and IT in Kathmandu, originally from Damak, Jhapa — a move that traded a small-town pace for a city with a lot more going on.",
    "I currently focus on frontend web development with React, Vite, and Tailwind CSS while actively learning backend development with Node.js, Express, Prisma, and PostgreSQL by building real projects from scratch. My technical foundation also includes Java, C++, Python, and a strong curiosity for how systems work under the hood.",
    "Beyond code, I study networking, cybersecurity fundamentals, and IT infrastructure as part of my degree. I am actively looking for internship and junior developer opportunities where I can contribute real value from day one and keep growing through real-world collaboration."
  ]
};

// Footer prose. Previously inlined in Footer.tsx, which put user-facing copy
// outside the one file that is supposed to hold it.
export const FOOTER_COPY = {
  blurb:
    "Building things that live on the internet. Focused on polished web interfaces while steadily growing my backend development skills.",
  navHeading: "Navigation",
  connectHeading: "Connect",
  connectBlurb:
    "Open to internship and junior developer opportunities. Available for collaboration and project discussions.",
  rights: "All rights reserved.",
  credit: "Designed and developed by Arman Khan."
};

// Home-page content. These three arrays used to live as module-local consts
// inside Home.tsx, which put content outside the one file that holds it.
export const HOME_PAGE = {
  badge: "shipping full-stack apps from schema to interface",
  skillsEyebrow: "What I do",
  skillsHeading: "Skills and expertise",
  skillsCta: "Full skills breakdown",
  workEyebrow: "Featured work",
  workHeading: "Things I have built",
  workCta: "All projects",
  ctaEyebrow: "Let us work together",
  ctaHeading: "Have a project in mind?",
  ctaBody: "Open to internship and junior developer roles. Let us build something great together.",
  ctaResponse: "Responds within 24 hours",
  viewProjects: "View Projects",
  contactMe: "Contact Me",
  locationNote: "Based in Kathmandu, Nepal"
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
  heading: "Let's Connect",
  availableLabel: "Available",
  intro:
    "Whether you have a job opportunity, a project to collaborate on, or just want to say hi — my inbox is always open.",
  getInTouchHeading: "Get in touch",
  availabilityHeading: "Currently Available",
  availabilityBody:
    "Open to internship and junior developer positions. I bring energy, curiosity, and a genuine drive to ship great software.",
  gmailCta: "Open Gmail directly"
};

export const CONTACT_FORM_COPY = {
  heading: "Send a message",
  nameLabel: "Full Name",
  namePlaceholder: "Arman Khan",
  emailLabel: "Email Address",
  emailPlaceholder: "you@example.com",
  subjectLabel: "Subject",
  subjectPlaceholder: "Internship opportunity / Project collaboration",
  messageLabel: "Message",
  messagePlaceholder: "Tell me about the opportunity, project, or just say hello...",
  submit: "Send Message",
  submitting: "Sending...",
  responseNote: "Typical response time: within 24 hours",
  successHeading: "Message sent!",
  successBody: "Thanks for reaching out. I'll get back to you within 24 hours.",
  unconfigured: "Contact form is not configured."
};

export const ABOUT_PAGE = {
  eyebrow: "Who I am",
  heading: "About Me",
  intro:
    "I build full-stack web applications with React, Node.js, and PostgreSQL. Originally from Damak, Jhapa, now studying IT and building software in Kathmandu, Nepal.",
  storyEyebrow: "My story",
  storyHeading: "Background and Motivation",
  skillsEyebrow: "Technical skills",
  skillsHeading: "Technical Expertise",
  skillsAside: "Technologies I've worked with professionally and in personal projects.",
  journeyEyebrow: "Journey",
  journeyHeading: "Experience and Education",
  journeyAside: "My path through academia and hands-on development.",
  infoHeading: "Personal Info",
  ctaContact: "Let's Connect",
  ctaProjects: "View My Projects",
  values: [
    { title: "Goal-Oriented", desc: "I ship products, not just code." },
    { title: "Fundamentals First", desc: "CS fundamentals meet modern stacks." },
    { title: "Team Player", desc: "Communication is a core skill." }
  ]
};

export const PROJECTS_PAGE = {
  eyebrow: "My work",
  heading: "Projects",
  intro:
    "Real applications I've designed, built, and deployed. Every project represents a problem I found interesting and a skill I wanted to sharpen.",
  // The portfolio card at the foot of the list -- this site, described as one
  // of the projects. Kept out of PROJECTS so it never lands in the filters.
  selfLabel: "Portfolio",
  selfTitle: "This Portfolio Website",
  selfDescription:
    "Built from scratch with React 19, Vite 7, and Tailwind CSS v4. Prerendered to static HTML per route, with a dark design system and no client-side framework overhead on first paint.",
  selfTechs: ["React 19", "Vite 7", "Tailwind CSS v4", "React Router v7", "Motion for React"],
  selfRepo: "https://github.com/armancore/portfolio"
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

export const CONTACT_LINKS: ContactLink[] = [
  {
    label: "contact@armankhan.com.np",
    sublabel: "Fastest response",
    href: "mailto:contact@armankhan.com.np",
    iconName: "Mail"
  },
  {
    label: "github.com/armancore",
    sublabel: "Code & projects",
    href: "https://github.com/armancore",
    iconName: "Github"
  },
  {
    label: "linkedin.com/in/techiee-arman",
    sublabel: "Professional profile",
    href: "https://www.linkedin.com/in/techiee-arman/",
    iconName: "Linkedin"
  },
  {
    label: "facebook.com/techiee.arman",
    sublabel: "Social",
    href: "https://www.facebook.com/techiee.arman",
    iconName: "Facebook"
  },
  {
    label: "instagram.com/techiee.arman",
    sublabel: "Social",
    href: "https://www.instagram.com/techiee.arman",
    iconName: "Instagram"
  }
];
