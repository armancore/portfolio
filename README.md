# Arman Khan Portfolio

Personal portfolio website for Arman Khan, an IT student and full-stack developer based in Kathmandu, Nepal. The site highlights featured projects, technical skills, education, and contact options in a polished single-page-style experience across multiple routes.

Live site: [www.armankhan.com.np](https://www.armankhan.com.np)

## Overview

This project is built with React and Vite and deployed through GitHub Pages. It uses a custom dark visual system, animated reveal effects, hash-based routing, and centralized content configuration so portfolio details can be updated from one place.

## Features

- Landing page with hero section, featured work, skill highlights, and CTA blocks
- Dedicated About, Projects, and Contact pages
- Responsive layout for desktop and mobile
- Hash routing for static hosting compatibility
- Scroll-reveal interactions and animated UI accents
- Centralized portfolio data in `src/constants/index.js`
- Contact form that validates input and opens the user's email client with a prefilled message
- GitHub Pages deployment workflow with custom domain support

## Tech Stack

- React 19
- Vite 7
- React Router 7
- Tailwind CSS v4
- Lucide React
- GitHub Actions
- GitHub Pages

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```text
.
|-- public/
|-- src/
|   |-- assets/
|   |-- components/
|   |   |-- layout/
|   |   |-- sections/
|   |   `-- ui/
|   |-- constants/
|   |-- hooks/
|   |-- pages/
|   |-- App.jsx
|   |-- index.css
|   `-- main.jsx
|-- .github/workflows/
|-- index.html
|-- package.json
`-- vite.config.js
```

## Customization

Most portfolio content lives in `src/constants/index.js`. Update this file to change:

- personal information
- social links
- skills
- projects
- timeline entries
- contact links

Profile image:

- Place your image at `src/assets/profile.jpg`
- `PHOTO_MODE` is already set to `"photo"`, so the real image is used when that file exists

## Routing and Hosting Notes

- The app uses `HashRouter`, which keeps routing compatible with static hosting.
- The repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.
- The custom domain is configured through `public/CNAME`.

## Deployment

Pushes to `main` trigger the GitHub Pages deployment workflow automatically. The site is built with `npm ci` and `npm run build`, then deployed from the generated `dist/` output.

## Contact

- Email: [arman.techiee@gmail.com](mailto:arman.techiee@gmail.com)
- GitHub: [Arman-techiee](https://github.com/Arman-techiee)
- Facebook: [techiee.arman](https://www.facebook.com/techiee.arman)
- Instagram: [techiee.arman](https://www.instagram.com/techiee.arman)

## License

This project is for personal portfolio use unless a separate license is added.
