/**
 * The route table, and the single source of truth for per-route metadata.
 *
 * PageMeta writes these into the document from an effect, which covers
 * client-side navigation. That effect cannot run during prerendering, so
 * scripts/prerender.mjs reads the same table and bakes the values straight
 * into each route's static HTML. Both paths therefore agree by construction.
 */

export type RouteMeta = {
  path: string;
  /** The <title> tag, i.e. the browser tab. Keep these short. */
  title: string;
  /**
   * og:title and twitter:title. Link previews have room for context that a tab
   * label does not, so this is allowed to be longer and more descriptive.
   * Defaults to `title` when a route has nothing extra to add.
   */
  shareTitle?: string;
  description: string;
  /** Written to dist as <file>; Vercel's cleanUrls serves it at `path`. */
  file: string | null;
};

const SITE_DESCRIPTION =
  'I build full-stack web applications with React, Node.js, and PostgreSQL. IT student at Texas College of Management and IT, Kathmandu, Nepal.';

export const ROUTES: RouteMeta[] = [
  {
    path: '/',
    title: 'Arman Khan',
    shareTitle: 'Arman Khan — Building Full-Stack Web Applications | React, Node.js, PostgreSQL',
    description: SITE_DESCRIPTION,
    file: 'index.html',
  },
  {
    path: '/about',
    title: 'About | Arman Khan',
    description:
      'Arman Khan builds full-stack web applications with React, Node.js, and PostgreSQL. IT student from Damak, Jhapa, now based in Kathmandu, Nepal.',
    file: 'about.html',
  },
  {
    path: '/projects',
    title: 'Projects | Arman Khan',
    description:
      'Explore deployed React projects by Arman Khan, including API apps, frontend builds, tools, and full-stack experiments focused on practical problem solving.',
    file: 'projects.html',
  },
  {
    path: '/contact',
    title: 'Contact | Arman Khan',
    description:
      'Get in touch with Arman Khan for internship opportunities, junior developer roles, collaborations, or project discussions.',
    file: 'contact.html',
  },
  {
    path: '/404',
    title: 'Page Not Found | Arman Khan',
    description: 'That page does not exist. Head back to the homepage to keep browsing.',
    file: '404.html',
  },
];

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
