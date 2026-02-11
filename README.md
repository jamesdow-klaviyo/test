# Vite + React → GitHub Pages

Minimal starter: **Vite**, **React**, **TypeScript**. Homepage lists all **prototypes** from a single folder; fork, enable GitHub Pages once, then run and deploy with no config.

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
4. Open [http://localhost:5173](http://localhost:5173). The homepage lists all prototypes; each is a route (e.g. `/example`) with optional sub-routes.

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

## Prototypes

Each prototype is a **React route** under **`prototypes/`** (project root). Add a folder (e.g. `prototypes/my-app/`) with an **`index.tsx`** that exports:

- **`default`** – The layout component (use `<Outlet />` for sub-routes and `<Link>` for nav).
- **`routes`** (optional) – Array of `{ path, Component }` for sub-routes (e.g. `{ path: 'step1', Component: Step1 }`). Use `path: '/'` (or `''`) for the index view.

The homepage list is built from the folder names in `prototypes/` at build time. Sub-routes give you in-prototype navigation (e.g. `/example/step1`). See `prototypes/example/index.tsx` for the pattern.

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
