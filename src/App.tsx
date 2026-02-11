import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom'
import { getPrototypeRoutes, prototypeNames } from './registry'

const base = import.meta.env.BASE_URL

function NotFoundPage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '40rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', margin: 0, color: '#666' }}>404</h1>
      <p style={{ color: '#666', marginBottom: '1.5rem' }}>Page not found.</p>
      <Link to="/" style={{ color: '#0066cc' }}>Back to home</Link>
    </main>
  )
}

function HomePage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '40rem' }}>
      <h1>Prototypes</h1>
      <p style={{ color: '#666', marginBottom: '1.5rem' }}>
        Each link is a React route. Add a folder under <code>prototypes/</code> (project root) with an <code>index.tsx</code> to add one.
      </p>
      {prototypeNames.length === 0 ? (
        <p>No prototypes yet. Add <code>prototypes/my-name/index.tsx</code> (export default + optional <code>routes</code>).</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {prototypeNames.map((name) => (
            <li key={name} style={{ marginBottom: '0.5rem' }}>
              <Link to={name} style={{ color: '#0066cc' }}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

const router = createBrowserRouter(
  [
    { path: '/', element: <HomePage /> },
    ...getPrototypeRoutes(),
    { path: '*', element: <NotFoundPage /> },
  ],
  { basename: base.replace(/\/$/, '') || '/' }
)

export default function App() {
  return <RouterProvider router={router} />
}
