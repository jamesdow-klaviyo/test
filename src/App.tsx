import { createBrowserRouter, Link, RouterProvider, useParams, Outlet, useLocation } from 'react-router-dom'
import { useMemo, useState, useRef, useEffect, useCallback, createContext, useContext } from 'react'
import { List, LayoutGrid, FolderOpen, ChevronRight, ChevronDown, Home } from 'lucide-react'
import {
  getProjectRoutes,
  getChildProjects,
  getChildFolders,
  getBreadcrumb,
  formatSegmentTitle,
  isFolderPrefix,
  type ProjectMeta,
} from './registry'

const base = import.meta.env.BASE_URL
const INITIAL_VISIBLE = 12
const LOAD_MORE = 12

type SortKey = 'name-asc' | 'name-desc'
type ViewMode = 'list' | 'tile'

type BrowseFilterContext = {
  search: string
  setSearch: (s: string) => void
  sort: SortKey
  setSort: (s: SortKey) => void
  viewMode: ViewMode
  setViewMode: (v: ViewMode) => void
}

const BrowseFilterContext = createContext<BrowseFilterContext | null>(null)

function useBrowseFilter(): BrowseFilterContext {
  const ctx = useContext(BrowseFilterContext)
  if (!ctx) throw new Error('useBrowseFilter must be used inside BrowseLayout')
  return ctx
}

function FilterBar() {
  const { search, setSearch, sort, setSort, viewMode, setViewMode } = useBrowseFilter()
  return (
    <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
      <input
        type="search"
        placeholder="Search…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="home-input-glow h-10 flex-1 min-w-[200px] rounded-lg border border-white/[0.08] bg-[var(--klaviyo-bg-elevated)] px-3 text-neutral-100 placeholder-neutral-500 focus:border-[var(--klaviyo-burnt-sienna)] focus:outline-none focus:ring-1 focus:ring-[var(--klaviyo-burnt-sienna)]/50"
        aria-label="Search"
      />
      <div className="relative flex items-center">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="home-select h-10 appearance-none rounded-lg border border-white/[0.08] bg-[var(--klaviyo-bg-elevated)] pl-3 pr-9 text-neutral-100 focus:border-[var(--klaviyo-burnt-sienna)] focus:outline-none focus:ring-1 focus:ring-[var(--klaviyo-burnt-sienna)]/50"
          aria-label="Sort by name"
        >
          <option value="name-asc">Name (A–Z)</option>
          <option value="name-desc">Name (Z–A)</option>
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 h-4 w-4 shrink-0 text-neutral-400" strokeWidth={2} aria-hidden />
      </div>
      <div className="home-view-toggle-wrap relative flex rounded-lg border border-white/[0.08] bg-[var(--klaviyo-bg-elevated)] p-0.5">
        <span
          className="home-view-toggle-pill absolute left-0.5 top-0.5 bottom-0.5 w-[calc(50%-4px)] rounded-md bg-[var(--klaviyo-burnt-sienna)]"
          style={{ marginLeft: viewMode === 'tile' ? 'calc(50% + 2px)' : '0' }}
          aria-hidden
        />
        <button
          type="button"
          onClick={() => setViewMode('list')}
          className="relative z-10 flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-neutral-400 transition-colors hover:text-neutral-200 data-[active]:text-white"
          data-active={viewMode === 'list' || undefined}
          aria-label="List view"
          aria-pressed={viewMode === 'list'}
        >
          <List className="h-4 w-4 shrink-0" strokeWidth={2} />
          <span className="sr-only sm:not-sr-only sm:inline">List</span>
        </button>
        <button
          type="button"
          onClick={() => setViewMode('tile')}
          className="relative z-10 flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-neutral-400 transition-colors hover:text-neutral-200 data-[active]:text-white"
          data-active={viewMode === 'tile' || undefined}
          aria-label="Tile view"
          aria-pressed={viewMode === 'tile'}
        >
          <LayoutGrid className="h-4 w-4 shrink-0" strokeWidth={2} />
          <span className="sr-only sm:not-sr-only sm:inline">Tile</span>
        </button>
      </div>
    </div>
  )
}

function BrowseLayout() {
  const location = useLocation()
  const prefix = location.pathname === '/' || location.pathname === '' ? '' : location.pathname.replace(/^\//, '')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortKey>('name-asc')
  const [viewMode, setViewMode] = useState<ViewMode>('tile')
  const value = useMemo(
    () => ({ search, setSearch, sort, setSort, viewMode, setViewMode }),
    [search, sort, viewMode]
  )
  return (
    <main className="home-page-bg min-h-screen text-neutral-100">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 text-center">
        <BrowseFilterContext.Provider value={value}>
          <h1 className="mb-2 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            <span className="home-title-wrap">
              <span className="home-title-gradient">Ascent Spark</span>
            </span>
          </h1>
          <p className="mb-10 text-neutral-400">
            Projects and folders in <code className="rounded bg-[var(--klaviyo-bg-elevated)] px-1.5 py-0.5 font-mono text-sm text-neutral-300">projects/</code>. Open a folder or a project.
          </p>
          <FilterBar />
          <div className="mb-6 min-h-5">
            {prefix !== '' && <Breadcrumb prefix={prefix} />}
          </div>
          <Outlet />
        </BrowseFilterContext.Provider>
      </div>
    </main>
  )
}

type BrowseItem = { type: 'folder'; path: string; name: string } | { type: 'project'; meta: ProjectMeta }

function BrowseContent({ prefix }: { prefix: string }) {
  const { search, sort, viewMode } = useBrowseFilter()
  const folders = useMemo(() => getChildFolders(prefix), [prefix])
  const projects = useMemo(() => getChildProjects(prefix), [prefix])
  const items: BrowseItem[] = useMemo(() => {
    const list: BrowseItem[] = folders.map((name) => ({ type: 'folder', path: prefix ? `${prefix}/${name}` : name, name }))
    list.push(...projects.map((meta): BrowseItem => ({ type: 'project', meta })))
    const q = search.trim().toLowerCase()
    const filtered = q
      ? list.filter((item) => {
          if (item.type === 'folder') return item.name.toLowerCase().includes(q)
          return (
            (item.meta.name ?? '').toLowerCase().includes(q) ||
            (item.meta.title ?? '').toLowerCase().includes(q) ||
            (item.meta.description ?? '').toLowerCase().includes(q)
          )
        })
      : list
    const asc = sort === 'name-asc'
    filtered.sort((a, b) => {
      const nameA = a.type === 'folder' ? a.name : a.meta.name ?? ''
      const nameB = b.type === 'folder' ? b.name : b.meta.name ?? ''
      const cmp = nameA.localeCompare(nameB, undefined, { sensitivity: 'base' })
      return asc ? cmp : -cmp
    })
    return filtered
  }, [prefix, folders, projects, search, sort])

  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE)
  const visible = useMemo(() => items.slice(0, visibleCount), [items, visibleCount])
  const hasMore = visible.length < items.length
  const sentinelRef = useRef<HTMLDivElement>(null)
  const loadMore = useCallback(() => setVisibleCount((n) => Math.min(n + LOAD_MORE, items.length)), [items.length])
  useEffect(() => setVisibleCount(INITIAL_VISIBLE), [search, sort, prefix])
  useEffect(() => {
    if (!hasMore || !sentinelRef.current) return
    const obs = new IntersectionObserver((entries) => { if (entries[0]?.isIntersecting) loadMore() }, { rootMargin: '200px', threshold: 0 })
    obs.observe(sentinelRef.current)
    return () => obs.disconnect()
  }, [hasMore, loadMore])

  if (items.length === 0) {
    return (
      <p className="rounded-xl border border-white/[0.08] bg-[var(--klaviyo-bg-elevated)] p-6 text-neutral-400">
        {prefix ? 'Nothing in this folder.' : 'No projects yet. Add a folder under projects/ with an index.tsx.'}
      </p>
    )
  }

  const tileThumbHeight = 'h-36'
  const listContent = (
    <ul className={viewMode === 'list' ? 'flex flex-col gap-2' : 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'}>
      {visible.map((item) => {
        if (item.type === 'folder') {
          return (
            <li key={`folder-${item.path}`} className={viewMode === 'tile' ? 'flex' : undefined}>
              <Link
                to={prefix ? `/${item.path}` : `/${item.path}`}
                className="home-card-glow group flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[var(--klaviyo-bg-elevated)] hover:border-[var(--klaviyo-burnt-sienna)]/30 hover:bg-white/[0.06]"
              >
                <div className={`flex w-full shrink-0 items-center justify-center overflow-hidden bg-white/[0.06] transition-colors group-hover:bg-white/[0.08] ${viewMode === 'tile' ? tileThumbHeight : 'min-h-[6rem]'}`}>
                  <FolderOpen className="h-14 w-14 shrink-0 text-neutral-500 group-hover:text-[var(--klaviyo-burnt-sienna)]/80" strokeWidth={1.5} />
                </div>
                <div className="flex h-16 shrink-0 flex-col justify-center overflow-hidden p-4 text-left">
                  <span className="truncate font-semibold text-white">{formatSegmentTitle(item.name)}</span>
                </div>
              </Link>
            </li>
          )
        }
        const { path, name, title: projectTitle, description, preview } = item.meta
        const linkClass = 'home-card-glow group flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[var(--klaviyo-bg-elevated)] hover:border-[var(--klaviyo-burnt-sienna)]/30 hover:bg-white/[0.06]'
        if (viewMode === 'list') {
          return (
            <li key={path}>
              <Link to={`/${path}`} className={linkClass + ' flex items-stretch gap-0 overflow-hidden'}>
                {preview != null ? (
                  <span className="flex min-h-full w-24 shrink-0 overflow-hidden sm:basis-40">
                    <img src={preview} alt="" className="h-full min-h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]" />
                  </span>
                ) : (
                  <div className="min-h-full w-24 shrink-0 bg-white/[0.06] sm:w-40" aria-hidden />
                )}
                <div className="min-w-0 flex-1 p-4 text-left">
                  <span className="block font-semibold text-white">{projectTitle ?? name}</span>
                  {description != null && <p className="mt-0.5 truncate text-sm text-neutral-400">{description}</p>}
                </div>
              </Link>
            </li>
          )
        }
        return (
          <li key={path} className={viewMode === 'tile' ? 'flex' : undefined}>
            <Link to={`/${path}`} className={linkClass}>
              {preview != null ? (
                <div className={`w-full shrink-0 overflow-hidden bg-white/[0.06] ${tileThumbHeight}`}>
                  <img src={preview} alt="" className="h-full w-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.02]" />
                </div>
              ) : (
                <div className={`w-full shrink-0 bg-white/[0.06] ${tileThumbHeight}`} aria-hidden />
              )}
              <div className="flex h-16 shrink-0 flex-col justify-center overflow-hidden p-4 text-left">
                <span className="truncate font-semibold text-white">{projectTitle ?? name}</span>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )

  return (
    <>
      {listContent}
      <div ref={sentinelRef} className="h-4" aria-hidden />
    </>
  )
}

function Breadcrumb({ prefix }: { prefix: string }) {
  const breadcrumb = useMemo(() => getBreadcrumb(prefix), [prefix])
  return (
    <nav className="flex flex-wrap items-center justify-start gap-1.5 text-sm text-neutral-400" aria-label="Breadcrumb">
      {breadcrumb.map((item, i) => (
        <span key={item.path} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="h-4 w-4 rotate-180 shrink-0" aria-hidden />}
          {i === breadcrumb.length - 1 ? (
            item.path === '' ? (
              <span className="inline-flex text-white" aria-label="Home">
                <Home className="h-4 w-4 shrink-0" strokeWidth={2} />
              </span>
            ) : (
              <span className="text-white">{item.title}</span>
            )
          ) : (
            <Link to={item.path === '' ? '/' : `/${item.path}`} className="hover:text-neutral-200 inline-flex items-center" aria-label={item.path === '' ? 'Home' : undefined}>
              {item.path === '' ? <Home className="h-4 w-4 shrink-0" strokeWidth={2} /> : item.title}
            </Link>
          )}
        </span>
      ))}
    </nav>
  )
}

function HomePage() {
  return <BrowseContent prefix="" />
}

function FolderPage() {
  const params = useParams()
  const path = (params['*'] ?? '').trim()
  if (!path || !isFolderPrefix(path)) {
    return (
      <div className="text-center">
        <p className="mb-6 text-neutral-400">Not found.</p>
        <Link to="/" className="text-[var(--klaviyo-burnt-sienna)] hover:underline">← All</Link>
      </div>
    )
  }
  return <BrowseContent prefix={path} />
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
        className="home-back-link rounded-lg bg-[var(--klaviyo-burnt-sienna)] px-4 py-2 font-medium text-white hover:opacity-90"
      >
        Back to home
      </Link>
    </main>
  )
}

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <BrowseLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: '*', element: <FolderPage /> },
      ],
    },
    ...getProjectRoutes(),
    { path: '*', element: <NotFoundPage /> },
  ],
  { basename: base.replace(/\/$/, '') || '/' }
)

export default function App() {
  return <RouterProvider router={router} />
}
