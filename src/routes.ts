import { PROJECTS } from './constants';

export type RouteMeta = {
  path: string;
  title: string;
  shareTitle?: string;
  description: string;
  file: string | null;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
};

const PERSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Arman Khan',
  url: 'https://armankhan.com.np/',
  jobTitle: 'IT Student',
  description:
    'IT student from Nepal building full-stack web applications with React, Node.js, and PostgreSQL.',
};

const SITE_DESCRIPTION =
  'I build full-stack web applications with React, Node.js, and PostgreSQL. IT student at Texas College of Management and IT, Kathmandu, Nepal.';

const PAGE_ROUTES: RouteMeta[] = [
  {
    path: '/',
    title: 'Arman Khan — Full-Stack Web Developer in Kathmandu',
    shareTitle: 'Arman Khan — Building Full-Stack Web Applications | React, Node.js, PostgreSQL',
    description: SITE_DESCRIPTION,
    file: 'index.html',
    jsonLd: PERSON_LD,
  },
  {
    path: '/about',
    title: 'About | Arman Khan',
    shareTitle: 'Arman Khan — full-stack developer and IT student in Kathmandu',
    description:
      'Arman Khan builds full-stack web applications with React, Node.js, and PostgreSQL. IT student from Damak, Jhapa, now based in Kathmandu, Nepal.',
    file: 'about.html',
    jsonLd: PERSON_LD,
  },
  {
    path: '/projects',
    title: 'Projects | Arman Khan',
    shareTitle: 'Projects by Arman Khan — full-stack, API and tooling builds in React and Node.js',
    description:
      'Explore deployed React projects by Arman Khan, including API apps, frontend builds, tools, and full-stack experiments focused on practical problem solving.',
    file: 'projects.html',
    jsonLd: PERSON_LD,
  },
  {
    path: '/contact',
    title: 'Contact | Arman Khan',
    shareTitle: 'Contact Arman Khan — open to internships and junior developer roles',
    description:
      'Get in touch with Arman Khan for internship opportunities, junior developer roles, collaborations, or project discussions.',
    file: 'contact.html',
    jsonLd: PERSON_LD,
  },
  {
    path: '/404',
    title: 'Page Not Found | Arman Khan',
    description: 'That page does not exist. Head back to the homepage to keep browsing.',
    file: '404.html',
    noindex: true,
  },
];

const APPLICATION_CATEGORY: Record<string, string> = {
  'full-stack': 'WebApplication',
  API: 'WebApplication',
  tooling: 'DeveloperApplication',
};

export const PROJECT_ROUTES: RouteMeta[] = PROJECTS.filter((p) => p.slug).map((p) => ({
  path: `/projects/${p.slug}`,
  title: `${p.title} | Arman Khan`,
  shareTitle: `${p.title} — ${p.type} project by Arman Khan`,
  description: p.description,
  file: `projects/${p.slug}.html`,
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: p.title,
    description: p.description,
    url: `https://armankhan.com.np/projects/${p.slug}`,
    applicationCategory: APPLICATION_CATEGORY[p.type] ?? 'WebApplication',
    author: { '@type': 'Person', name: 'Arman Khan' },
    ...(p.githubUrl ? { codeRepository: p.githubUrl } : {}),
  },
}));

export const ROUTES: RouteMeta[] = [...PAGE_ROUTES, ...PROJECT_ROUTES];

const BY_PATH = new Map(ROUTES.map((r) => [r.path, r]));

export const routeMeta = (path: string): Required<Pick<RouteMeta, 'title' | 'shareTitle' | 'description'>> => {
  const match = BY_PATH.get(path);
  if (!match) throw new Error(`No route metadata registered for "${path}"`);
  return {
    title: match.title,
    shareTitle: match.shareTitle ?? match.title,
    description: match.description,
  };
};

export const SITE_ORIGIN = 'https://armankhan.com.np';
