# Arman Khan — Portfolio

> Built with React 19 + Vite 7 + Tailwind CSS v4

---

## ══════════════════════════════════════
## GUIDE 1: COMPLETE SETUP (STEP BY STEP)
## ══════════════════════════════════════

### Step 1: Prerequisites Check

Make sure you have Node.js v20 or higher installed:

```bash
node --version
# Should output: v20.x.x or higher
```

If Node.js is not installed, download it from: https://nodejs.org

Also verify npm is available:
```bash
npm --version
# Should output: 10.x.x or higher
```

---

### Step 2: Create a New Vite + React Project

```bash
npm create vite@latest portfolio -- --template react
cd portfolio
```

---

### Step 3: Install All Dependencies

```bash
# Runtime dependencies
npm install react-router-dom lucide-react

# Dev dependencies
npm install -D tailwindcss @tailwindcss/vite
```

Your final package.json dependencies should match exactly:
```json
{
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router-dom": "^7.1.0",
    "lucide-react": "^0.400.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.0",
    "vite": "^7.0.0",
    "tailwindcss": "^4.1.0",
    "@tailwindcss/vite": "^4.1.0"
  }
}
```

---

### Step 4: Clean Up Default Vite Files

Delete these files that came with the default Vite template (they will be replaced):

```bash
# On Mac/Linux:
rm src/App.css
rm src/assets/react.svg

# On Windows (Command Prompt):
del src\App.css
del src\assets\react.svg
```

---

### Step 5: Create the Full Folder Structure

Run these commands from inside the `portfolio/` folder:

```bash
# On Mac/Linux:
mkdir -p src/constants
mkdir -p src/hooks
mkdir -p src/components/ui
mkdir -p src/components/layout
mkdir -p src/components/sections
mkdir -p src/pages
mkdir -p src/assets
mkdir -p public
mkdir -p .github/workflows

# On Windows (Command Prompt):
mkdir src\constants
mkdir src\hooks
mkdir src\components\ui
mkdir src\components\layout
mkdir src\components\sections
mkdir src\pages
mkdir src\assets
mkdir .github\workflows
```

---

### Step 6: Copy All Files

Copy each file from this project into the corresponding paths. 
Create them in this recommended order (config first, then source):

**Configuration files (root level):**
1. `package.json` — replace the existing one
2. `vite.config.js` — replace the existing one
3. `index.html` — replace the existing one
4. `.gitignore` — replace the existing one

**Styles:**
5. `src/index.css` — REPLACE the existing one entirely

**App entry:**
6. `src/main.jsx` — replace existing
7. `src/App.jsx` — replace existing

**Data & constants:**
8. `src/constants/index.js` — create new

**Hooks:**
9. `src/hooks/useReveal.js`
10. `src/hooks/useScrolled.js`
11. `src/hooks/useActiveSection.js`

**UI Components:**
12. `src/components/ui/Button.jsx`
13. `src/components/ui/Badge.jsx`
14. `src/components/ui/SectionLabel.jsx`
15. `src/components/ui/GlowLine.jsx`
16. `src/components/ui/RevealWrapper.jsx`
17. `src/components/ui/ProfilePhoto.jsx`

**Layout Components:**
18. `src/components/layout/Navbar.jsx`
19. `src/components/layout/Footer.jsx`

**Section Components:**
20. `src/components/sections/HeroCard.jsx`
21. `src/components/sections/HeroSection.jsx`
22. `src/components/sections/SkillsOverview.jsx`
23. `src/components/sections/ProjectCard.jsx`
24. `src/components/sections/FeaturedProjects.jsx`
25. `src/components/sections/ContactCTA.jsx`
26. `src/components/sections/AboutBio.jsx`
27. `src/components/sections/SkillsGrid.jsx`
28. `src/components/sections/Timeline.jsx`
29. `src/components/sections/ProjectsGrid.jsx`
30. `src/components/sections/ContactInfo.jsx`
31. `src/components/sections/ContactForm.jsx`

**Pages:**
32. `src/pages/Home.jsx`
33. `src/pages/About.jsx`
34. `src/pages/Projects.jsx`
35. `src/pages/Contact.jsx`

**GitHub Actions:**
36. `.github/workflows/deploy.yml`

---

### Step 7: Run the Development Server

```bash
npm run dev
```

Open your browser at: **http://localhost:5173**

---

### Step 8: Verify Everything is Working ✅

Check each item in this list:

- ✅ Dark background (#080B14) loads correctly
- ✅ Navbar visible at top with Home / About / Projects / Contact links
- ✅ "Arman." logo with blue dot visible top-left
- ✅ All 4 pages navigate without errors (click each nav link)
- ✅ Syne font loads for headings (thick, geometric style)
- ✅ DM Sans loads for body text (clean, lightweight)
- ✅ JetBrains Mono loads for badges and code elements
- ✅ Hover effects work on buttons and cards
- ✅ Mobile menu opens when viewport < 768px (hamburger icon)
- ✅ Scroll reveal animations trigger as you scroll down
- ✅ "AK" placeholder shows in Hero card and About page
- ✅ Contact form validates and shows success state
- ✅ Project filter buttons work on /projects page

---

### Troubleshooting

**"Cannot find module tailwindcss" or similar:**
```bash
npm install
# or force reinstall:
rm -rf node_modules package-lock.json
npm install
```

**Colors / dark theme not applying:**
- Open `src/index.css` and confirm `@import "tailwindcss";` is the FIRST line
- Confirm `@theme { ... }` block exists with all color tokens
- Restart dev server: Ctrl+C then `npm run dev`

**Fonts not loading (seeing fallback fonts):**
- Check internet connection — Google Fonts requires network access
- Verify the `<link>` tag exists in `index.html` inside `<head>`

**Blank white page:**
- Open browser DevTools (F12) → Console tab
- Look for red error messages
- Most common cause: incorrect import path in one of the files
- Check that all folders were created with correct names (case-sensitive on Mac/Linux)

**Tailwind utility classes not working:**
- Ensure `@tailwindcss/vite` is in devDependencies
- Ensure `vite.config.js` imports and uses `tailwindcss()` plugin
- Make sure there is NO `tailwind.config.js` file (not needed in v4)

---

## ══════════════════════════════════════════════
## GUIDE 2: ADDING YOUR PROFILE PHOTO (EXACT STEPS)
## ══════════════════════════════════════════════

### Step 1: Prepare Your Photo

- **Recommended size:** Square photo, minimum 400×400 pixels
- **Best formats:** `.jpg` or `.webp` (smaller file size, faster load)
- **Ideal content:** Head and shoulders shot, centered face
- **Rename your file to:** `profile.jpg`

> Tip: If your photo is not square, crop it to square first using any photo editor, phone camera crop tool, or a free online tool like squoosh.app.

---

### Step 2: Place the File

Navigate to your project's assets folder and drop your photo there:

```
portfolio/
└── src/
    └── assets/
        └── profile.jpg   ← Put your photo here
```

The exact file path should be: `portfolio/src/assets/profile.jpg`

**On Mac/Linux (terminal):**
```bash
cp /path/to/your/photo.jpg src/assets/profile.jpg
```

**On Windows (File Explorer):**
- Open `portfolio\src\assets\` in File Explorer
- Copy and paste your renamed `profile.jpg` into this folder

---

### Step 3: Enable Photo Mode

Open the constants file:
```
src/constants/index.js
```

Find this line near the top:
```js
export const PHOTO_MODE = "placeholder";
```

Change it to:
```js
export const PHOTO_MODE = "photo";
```

Save the file.

---

### Step 4: Verify in Browser

If the dev server is already running (`npm run dev`), it will **hot-reload automatically** — no restart needed.

You should see your photo appear in:
- The **Hero card** on the right side of the homepage
- The **About page** next to your bio

**If the photo looks stretched or cropped oddly:**
The component uses `object-cover` which fills the circle/square area. For best results, ensure your source photo is roughly square. Landscape or portrait photos will be center-cropped.

---

### Step 5: Optimize Your Photo (Recommended)

Large images slow down page loads. For a production portfolio, compress your photo:

1. Go to **https://squoosh.app** (free, in-browser)
2. Upload your `profile.jpg`
3. Select format: **WebP** or **MozJPEG**
4. Set quality to **80%** — usually reduces size by 60–80% with no visible quality loss
5. Target file size: **under 200KB** is ideal, under 100KB is excellent
6. Download the compressed file
7. Replace `src/assets/profile.jpg` with the compressed version

---

## ══════════════════════════════════════════════════
## GUIDE 3: DEPLOYING TO GITHUB PAGES (STEP BY STEP)
## ══════════════════════════════════════════════════

### Step 1: Create a GitHub Repository

1. Go to **https://github.com** and sign in
2. Click the **+** icon (top right) → **New repository**
3. Fill in:
   - **Repository name:** `portfolio` (or any name you prefer)
   - **Visibility:** Public ← required for free GitHub Pages
   - **DO NOT** check "Add a README file"
   - **DO NOT** check "Add .gitignore"
   - **DO NOT** choose a license
4. Click **Create repository**
5. Copy the repository URL shown (e.g., `https://github.com/Arman-techiee/portfolio.git`)

---

### Step 2: Connect Your Local Project to GitHub

Run these commands from inside your `portfolio/` folder:

```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/Arman-techiee/portfolio.git
git push -u origin main
```

> Replace `Arman-techiee/portfolio.git` with your actual GitHub username and repo name.

If prompted for credentials, use your GitHub username and a **Personal Access Token** (not your password). Generate one at: GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic).

---

### Step 3: Verify the Workflow File Exists

The deployment workflow should already be in your project at:
```
.github/workflows/deploy.yml
```

This file tells GitHub Actions to automatically build and deploy your site every time you push to `main`.

---

### Step 4: Enable GitHub Pages in Repository Settings

1. Go to your repository on GitHub
2. Click **Settings** tab (top navigation)
3. Scroll down to **Pages** section in the left sidebar
4. Under **Build and deployment** → **Source**, select: **GitHub Actions**
5. Click **Save**

---

### Step 5: Trigger the First Deployment

The deployment will start automatically after Step 2's push. To verify or manually trigger:

```bash
# Make any small change (or just re-push):
git add .
git commit -m "Add deployment workflow"
git push origin main
```

Then watch the deployment:
1. Go to your repository on GitHub
2. Click the **Actions** tab
3. You'll see "Deploy to GitHub Pages" workflow running
4. Green checkmark = success (takes 2–3 minutes)
5. Red X = failure (click it to see error logs)

---

### Step 6: Access Your Live Site

Once deployment succeeds, your site is live at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

Example: `https://Arman-techiee.github.io/portfolio/`

> The URL will also be shown in the Actions tab after a successful deployment.

---

### Step 7: Using a Custom Domain (e.g., armankhan.com.np)

If you have a custom domain:

**Step 7a:** Create a file called `CNAME` (no extension) inside the `public/` folder:
```
public/CNAME
```
Contents of the file (just your domain, nothing else):
```
armankhan.com.np
```

**Step 7b:** Configure your DNS records with your domain provider:
- Add an **A record** pointing to GitHub Pages IPs:
  ```
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
  ```
- OR add a **CNAME record**: `www` → `Arman-techiee.github.io`

**Step 7c:** In GitHub repository Settings → Pages, enter your custom domain and enable **Enforce HTTPS**.

DNS changes can take up to 24 hours to propagate.

---

### Step 8: Making Future Updates

Every time you update your portfolio:

```bash
# Make your changes to files
git add .
git commit -m "Update: [describe what you changed]"
git push origin main
```

GitHub Actions will automatically detect the push and redeploy. Your live site will update within 2–3 minutes. No manual steps needed.

---

## Quick Reference

| Command | Purpose |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Build production files to `dist/` |
| `npm run preview` | Preview production build locally |
| `git push origin main` | Deploy to GitHub Pages |

---

*Portfolio by Arman Khan — arman.techiee@gmail.com*
