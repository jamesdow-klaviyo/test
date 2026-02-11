# IBM.com Homepage (React + Carbon)

A recreation of the IBM.com homepage built with **Vite**, **React**, and the **Carbon Design System** (`@carbon/react`).

## Setup

```bash
cd ~/Desktop/ibm-homepage
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

**Twingate / remote access:** If the Network URL (e.g. `http://100.96.0.2:5173/`) doesn’t work, see [docs/TWINGATE-OPTIONS.md](docs/TWINGATE-OPTIONS.md) for options (Resource + Connector, tunnel, same LAN, firewall).

## GitHub Pages

**Live URL:** [https://jamesdow-klaviyo.github.io/test/](https://jamesdow-klaviyo.github.io/test/) (include the trailing slash).

You can deploy in two ways:

- **From GitHub Actions (default):** In **Settings → Pages**, set **Source** to **GitHub Actions**. Each push to `main` builds and deploys.
- **From your machine (local build):** Build locally and push the `dist` folder to the `gh-pages` branch. In **Settings → Pages**, set **Source** to **Deploy from a branch**, branch **gh-pages** / **(root)**. Then run:
  ```bash
  npm run deploy
  ```
  This builds with the correct base path and publishes `dist` to `gh-pages`. No CI needed.

### Auto-sync (watch + push)

For quick prototype iteration, you can run a watcher that commits and pushes changes after you edit files (debounced ~8s), so each push triggers a gh-pages deploy:

```bash
npm run watch:push
```

Leave it running in a separate terminal. Edit files as usual; after a short pause it will `git add -A`, commit with message `chore: auto sync`, and push to `main`. Requires the repo to be a git clone with `origin` set and push access. If you see “too many open files”, run `ulimit -n 10240` and try again.

## Build

```bash
npm run build
npm run preview   # preview production build
```

## What's included

- **Header** – Carbon UI Shell header with IBM logo, nav (Products, Solutions, Services, Industries, Support), search and menu actions
- **Hero** – “Lead in the AI-first future” hero with primary/secondary CTAs
- **Recommended for you** – Card grid (Canada’s AI moment, Airbus, Quantum safe, Courses)
- **Case studies** – “Smarter business. Real impact.” (Ferrari, US Open, Avid Solutions)
- **Promo strip** – SPSS Statistics offer
- **Enterprise technology** – Grid of offerings (AI agents, Data for AI, Automation, Hybrid cloud, etc.)
- **Inside IBM** – Our company, Our innovations, Our people
- **Stay connected** – Latest News list
- **Footer** – Links and copyright

All sections use Carbon’s Grid, typography, and buttons where applicable, with custom SCSS for IBM.com-style layout and visuals.
