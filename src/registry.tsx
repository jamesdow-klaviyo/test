import type { ComponentType } from 'react'
import type { RouteObject } from 'react-router-dom'

type ProjectModule = {
  default: ComponentType
  routes?: { path: string; Component: ComponentType }[]
  title?: string
  description?: string
}

// Projects at any depth: projects/x/index.tsx (uncategorized) or projects/cat/proj/index.tsx (categorized)
const modules = import.meta.glob<ProjectModule>('../projects/**/index.tsx', { eager: true })

const previewGlob = import.meta.glob<string | { default: string }>(
  '../projects/**/preview.{png,jpg,jpeg,webp}',
  { eager: true, query: '?url', import: 'default' }
)

export const UNCATEGORIZED_SLUG = 'uncategorized'

type ParsedProject = { category: string | null; name: string; path: string }

function parseProjectKey(key: string): ParsedProject | null {
  const normalized = key.replace('../projects/', '').replace('/index.tsx', '')
  const parts = normalized.split('/')
  if (parts.length === 1) {
    return { category: null, name: parts[0], path: parts[0] }
  }
  if (parts.length === 2) {
    return { category: parts[0], name: parts[1], path: `${parts[0]}/${parts[1]}` }
  }
  // Deeper nesting: treat first segment as category, rest as project path (e.g. cat/a/b → category cat, name a/b)
  const category = parts[0]
  const name = parts.slice(1).join('/')
  return { category, name, path: `${category}/${name}` }
}

const parsedProjects = Object.keys(modules)
  .map((k) => parseProjectKey(k))
  .filter((p): p is ParsedProject => p != null)
  .sort((a, b) => a.path.localeCompare(b.path))

export const projectNames: string[] = parsedProjects.map((p) => p.path)

/** Unique category slugs for the dashboard. Includes UNCATEGORIZED_SLUG for top-level projects. */
export const categorySlugs: string[] = (() => {
  const cats = new Set<string>()
  for (const p of parsedProjects) {
    cats.add(p.category ?? UNCATEGORIZED_SLUG)
  }
  return [...cats].sort((a, b) => (a === UNCATEGORIZED_SLUG ? 1 : b === UNCATEGORIZED_SLUG ? -1 : a.localeCompare(b)))
})()

function getPreviewUrl(path: string): string | undefined {
  const key = Object.keys(previewGlob).find(
    (k) => k.replace('../projects/', '').replace(/\/preview\.(png|jpg|jpeg|webp)$/, '') === path
  )
  if (!key) return undefined
  const v = previewGlob[key]
  return typeof v === 'string' ? v : (v as { default?: string })?.default
}

export type ProjectMeta = {
  name: string
  path: string
  category: string | null
  categorySlug: string
  title?: string
  description?: string
  preview?: string
}

export const projectMeta: ProjectMeta[] = parsedProjects.map((p) => {
  const key = `../projects/${p.path}/index.tsx`
  const mod = modules[key] as ProjectModule | undefined
  return {
    name: p.name,
    path: p.path,
    category: p.category,
    categorySlug: p.category ?? UNCATEGORIZED_SLUG,
    title: mod?.title,
    description: mod?.description,
    preview: getPreviewUrl(p.path),
  }
})

export function getProjectsByCategory(categorySlug: string): ProjectMeta[] {
  return projectMeta.filter((p) => p.categorySlug === categorySlug)
}

export function formatCategoryTitle(slug: string): string {
  if (slug === UNCATEGORIZED_SLUG) return 'Uncategorized'
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export function isCategorySlug(slug: string): boolean {
  return categorySlugs.includes(slug) && slug !== UNCATEGORIZED_SLUG
}

export function getProjectByPath(path: string): ProjectMeta | undefined {
  return projectMeta.find((p) => p.path === path)
}

export function getProjectRoutes(): RouteObject[] {
  const list: RouteObject[] = []

  for (const p of parsedProjects) {
    const key = `../projects/${p.path}/index.tsx`
    const mod = modules[key] as ProjectModule | undefined
    if (!mod?.default) continue
    const Layout = mod.default
    const childRoutes = mod.routes ?? [{ path: '/', Component: () => null }]
    list.push({
      path: p.path,
      element: <Layout />,
      children: childRoutes.map((r) => {
        const isIndex = r.path === '/' || r.path === ''
        return {
          index: isIndex,
          ...(isIndex ? {} : { path: r.path }),
          element: <r.Component />,
        }
      }),
    })
  }
  return list
}
