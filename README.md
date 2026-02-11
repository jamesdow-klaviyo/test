# Ascent Spark

**Vite**, **React**, **TypeScript**. Homepage lists all **projects** from a single folder; fork, enable GitHub Pages once, then run and deploy with no config.

---

## Fork & run (quick start)

1. **Fork** this repo, then **clone your fork** and go into the folder.
2. **One-time: enable GitHub Pages**  
   In your fork: **Settings → Pages** → **Source**: “Deploy from a branch” → **Branch**: `gh-pages` → **Folder**: `/ (root)` → **Save**.
3. **Install and run:**
   ```bash
   npm install
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173). The homepage lists all projects; each is a route (e.g. `/todo`) with optional sub-routes.

Your live site will be at **`https://<your-username>.github.io/<repo-name>/`** (use the trailing slash). Base path and deploys use your repo name from `git remote` — no configuration needed.

---

## Deploy to GitHub Pages

| Command | What it does |
|--------|----------------|
| `npm run deploy` | Build once and push `dist` to the `gh-pages` branch. |
| `npm run watch:push` | Watch for file changes; after ~8s idle, build, deploy to `gh-pages`, and commit + push source. |
| `npm run dev:all` | Run **Vite dev** (instant HMR) and **watch:push** in one terminal. |

Both use your fork’s repo name automatically. After deploy, allow 30–90 seconds for the live URL to update.

**If changes don’t show:** (1) **Settings → Pages** → branch **gh-pages**. (2) Use the URL with a **trailing slash**. (3) Hard refresh or incognito.

---

## Projects

Each project is a **React route** under **`projects/`** (project root). Add a folder (e.g. `projects/my-app/`) with an **`index.tsx`** that exports:

- **`default`** – The layout component (use `<Outlet />` for sub-routes and `<Link>` for nav).
- **`routes`** (optional) – Array of `{ path, Component }` for sub-routes (e.g. `{ path: 'step1', Component: Step1 }`). Use `path: '/'` (or `''`) for the index view.
- **`title`** (optional) – Display name on the homepage (defaults to the folder name).
- **`description`** (optional) – Short blurb shown under the link on the homepage.

The homepage list is built from the folder names in `projects/` at build time. Sub-routes give you in-project navigation (e.g. `/todo/...`).

### Project folder structure

Projects are **standalone**: keep each one’s code and assets inside its own folder. Use **`projects/todo/`** as the template: copy it and rename to start a new project.

```
projects/
  todo/                 # template project — copy this folder
    index.tsx           # layout + optional routes; can import local CSS
    index.css           # optional: Tailwind + theme for this project only
    components/         # optional: project-specific components
      button.tsx
      card.tsx
      ...
    lib/                # optional: helpers (e.g. utils.ts for cn())
      utils.ts
```

Only **`index.tsx`** is required. Everything else (CSS, `components/`, `lib/`) is optional and scoped to that project.

### How to create a new project

1. **Add a folder** under `projects/`, e.g. `projects/my-thing/`.

2. **Add `index.tsx`** that exports at least the layout:
   ```tsx
   export default function MyThing() {
     return (
       <div>
         <h1>My thing</h1>
         <Link to="/">← All projects</Link>
       </div>
     )
   }
   ```
   The new route will be **`/my-thing`** (from the folder name). It appears on the homepage list automatically.

3. **(Optional) Add sub-routes** by exporting `routes` and using `<Outlet />` in the layout:
   ```tsx
   import { Link, Outlet } from 'react-router-dom'

   export default function MyThing() {
     return (
       <div>
         <nav><Link to=".">Home</Link> <Link to="step1">Step 1</Link></nav>
         <Outlet />
       </div>
     )
   }
   export const routes = [
     { path: '/', Component: () => <div>Index</div> },
     { path: 'step1', Component: () => <div>Step 1</div> },
   ]
   ```

4. **(Optional)** Export `title` and/or `description` for the homepage list (e.g. `export const title = 'My Thing'`).
5. **(Optional)** For project-only styles or components, add `index.css`, `components/`, or `lib/` inside the same folder and import them from `index.tsx`. The **`projects/todo/`** project is the reference template.

---

## Other commands

```bash
npm run dev:all    # Vite dev + watch:push in one terminal (HMR + auto-deploy)
npm run build      # production build
npm run preview    # serve production build locally
npm run lint       # ESLint
```

---

## Deploy via GitHub Actions (optional)

Set **Settings → Pages** → **Source** to **GitHub Actions** to deploy on every push to `main`. The included workflow builds and deploys; no need to run `deploy` or `watch:push` yourself.

---

**Too many open files when running `watch:push`?** Run `ulimit -n 10240` and try again.
