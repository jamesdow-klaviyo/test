import type { ComponentType } from 'react'
import type { RouteObject } from 'react-router-dom'

type ProjectModule = {
  default: ComponentType
  routes?: { path: string; Component: ComponentType }[]
}

const modules = import.meta.glob<ProjectModule>('../projects/*/index.tsx', { eager: true })

export const projectNames = Object.keys(modules)
  .map((k) => k.replace('../projects/', '').replace('/index.tsx', ''))
  .sort()

export function getProjectRoutes(): RouteObject[] {
  const list: RouteObject[] = []

  for (const name of projectNames) {
    const key = `../projects/${name}/index.tsx`
    const mod = modules[key] as ProjectModule | undefined
    if (!mod?.default) continue
    const Layout = mod.default
    const childRoutes = mod.routes ?? [{ path: '/', Component: () => null }]
    list.push({
      path: name,
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
