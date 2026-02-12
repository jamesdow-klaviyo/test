import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom'
import { useMemo, useState, useRef, useEffect, useCallback } from 'react'
import { getProjectRoutes, projectMeta, type ProjectMeta } from './registry'

const base = import.meta.env.BASE_URL
const INITIAL_VISIBLE = 12
const LOAD_MORE = 12

type SortKey = 'name-asc' | 'name-desc' | 'title-asc' | 'title-desc'
type ViewMode = 'list' | 'tile'

function filterAndSort(
  list: ProjectMeta[],
  search: string,
  sort: SortKey
): ProjectMeta[] {
  const q = search.trim().toLowerCase()
  const out = q
    ? list.filter(
        (p) =>
          (p.name ?? '').toLowerCase().includes(q) ||
          (p.title ?? '').toLowerCase().includes(q) ||
          (p.description ?? '').toLowerCase().includes(q)
      )
    : [...list]

  const [field, asc] = sort.startsWith('name')
    ? ['name' as const, sort === 'name-asc']
    : ['title' as const, sort === 'title-asc']
  out.sort((a, b) => {
    const aVal = (field === 'name' ? a.name : a.title ?? a.name) ?? ''
    const bVal = (field === 'name' ? b.name : b.title ?? b.name) ?? ''
    const cmp = aVal.localeCompare(bVal, undefined, { sensitivity: 'base' })
    return asc ? cmp : -cmp
  })
  return out
}

function HomePage() {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortKey>('title-asc')
  const [viewMode, setViewMode] = useState<ViewMode>('tile')
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(
    () => filterAndSort(projectMeta, search, sort),
    [search, sort]
  )
  const visible = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount]
  )
  const hasMore = visible.length < filtered.length

  const loadMore = useCallback(() => {
    setVisibleCount((n) => Math.min(n + LOAD_MORE, filtered.length))
  }, [filtered.length])

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE)
  }, [search, sort])

  useEffect(() => {
    if (!hasMore || !sentinelRef.current) return
    const el = sentinelRef.current
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore()
      },
      { rootMargin: '200px', threshold: 0 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [hasMore, loadMore, visible.length])

  return (
    <main className="home-page-bg min-h-screen text-neutral-100">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="home-title-glow mb-2 text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
          Projects
        </h1>
        <p className="mb-10 text-neutral-400">
          Add a folder under <code className="rounded bg-[var(--klaviyo-bg-elevated)] px-1.5 py-0.5 font-mono text-sm text-neutral-300">projects/</code> with an <code className="rounded bg-[var(--klaviyo-bg-elevated)] px-1.5 py-0.5 font-mono text-sm text-neutral-300">index.tsx</code> to add one.
        </p>

        {projectMeta.length === 0 ? (
          <p className="rounded-xl border border-white/[0.08] bg-[var(--klaviyo-bg-elevated)] p-6 text-neutral-400">
            No projects yet. Add <code className="font-mono">projects/my-name/index.tsx</code> (export default + optional <code className="font-mono">routes</code>).
          </p>
        ) : (
          <>
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <input
                type="search"
                placeholder="Search projects…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 flex-1 min-w-[200px] rounded-lg border border-white/[0.08] bg-[var(--klaviyo-bg-elevated)] px-3 text-neutral-100 placeholder-neutral-500 focus:border-[var(--klaviyo-burnt-sienna)] focus:outline-none focus:ring-1 focus:ring-[var(--klaviyo-burnt-sienna)]/50"
                aria-label="Search projects"
              />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="h-10 rounded-lg border border-white/[0.08] bg-[var(--klaviyo-bg-elevated)] px-3 text-neutral-100 focus:border-[var(--klaviyo-burnt-sienna)] focus:outline-none focus:ring-1 focus:ring-[var(--klaviyo-burnt-sienna)]/50"
                aria-label="Sort by"
              >
                <option value="title-asc">Title A–Z</option>
                <option value="title-desc">Title Z–A</option>
                <option value="name-asc">Name A–Z</option>
                <option value="name-desc">Name Z–A</option>
              </select>
              <div className="flex rounded-lg border border-white/[0.08] bg-[var(--klaviyo-bg-elevated)] p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    viewMode === 'list'
                      ? 'bg-[var(--klaviyo-burnt-sienna)] text-white'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                  aria-label="List view"
                  aria-pressed={viewMode === 'list'}
                >
                  List
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('tile')}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    viewMode === 'tile'
                      ? 'bg-[var(--klaviyo-burnt-sienna)] text-white'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                  aria-label="Tile view"
                  aria-pressed={viewMode === 'tile'}
                >
                  Tile
                </button>
              </div>
            </div>

            {filtered.length === 0 ? (
              <p className="text-neutral-500">No projects match your search.</p>
            ) : viewMode === 'list' ? (
              <ul className="flex flex-col gap-2">
                {visible.map(({ name, title, description, preview }) => (
                  <li key={name}>
                    <Link
                      to={name}
                      className="flex items-center gap-4 rounded-xl border border-white/[0.08] bg-[var(--klaviyo-bg-elevated)] p-4 transition-colors hover:border-[var(--klaviyo-burnt-sienna)]/30 hover:bg-white/[0.06]"
                    >
                      {preview != null ? (
                        <img
                          src={preview}
                          alt=""
                          className="h-14 w-24 shrink-0 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="h-14 w-24 shrink-0 rounded-lg bg-white/[0.06]" aria-hidden />
                      )}
                      <div className="min-w-0 flex-1">
                        <span className="block font-semibold text-white">
                          {title ?? name}
                        </span>
                        {description != null && (
                          <p className="mt-0.5 truncate text-sm text-neutral-400">
                            {description}
                          </p>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map(({ name, title, description, preview }) => (
                  <li key={name}>
                    <Link
                      to={name}
                      className="group flex flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[var(--klaviyo-bg-elevated)] transition-colors hover:border-[var(--klaviyo-burnt-sienna)]/30 hover:bg-white/[0.06]"
                    >
                      {preview != null ? (
                        <img
                          src={preview}
                          alt=""
                          className="aspect-video w-full object-cover transition-transform group-hover:scale-[1.02]"
                        />
                      ) : (
                        <div className="aspect-video w-full bg-white/[0.06]" aria-hidden />
                      )}
                      <div className="flex flex-1 flex-col p-4">
                        <span className="font-semibold text-white">
                          {title ?? name}
                        </span>
                        {description != null && (
                          <p className="mt-1 line-clamp-2 text-sm text-neutral-400">
                            {description}
                          </p>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <div ref={sentinelRef} className="h-4" aria-hidden />
          </>
        )}
      </div>
    </main>
  )
}

function NotFoundPage() {
  return (
    <main className="home-page-bg-subtle flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="home-title-glow mb-4 text-6xl font-bold text-white sm:text-8xl">
        404
      </h1>
      <p className="mb-6 text-neutral-400">Page not found.</p>
      <Link
        to="/"
        className="rounded-lg bg-[var(--klaviyo-burnt-sienna)] px-4 py-2 font-medium text-white transition-colors hover:opacity-90"
      >
        Back to home
      </Link>
    </main>
  )
}

const router = createBrowserRouter(
  [
    { path: '/', element: <HomePage /> },
    ...getProjectRoutes(),
    { path: '*', element: <NotFoundPage /> },
  ],
  { basename: base.replace(/\/$/, '') || '/' }
)

export default function App() {
  return <RouterProvider router={router} />
}
