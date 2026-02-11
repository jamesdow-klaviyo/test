import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom'
import { getProjectRoutes, projectMeta } from './registry'

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
      <h1>Projects</h1>
      <p style={{ color: '#666', marginBottom: '1.5rem' }}>
        Each link is a React route. Add a folder under <code>projects/</code> (project root) with an <code>index.tsx</code> to add one.
      </p>
      {projectMeta.length === 0 ? (
        <p>No projects yet. Add <code>projects/my-name/index.tsx</code> (export default + optional <code>routes</code>).</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {projectMeta.map(({ name, title, description, preview }) => (
            <li key={name} style={{ marginBottom: '1.5rem' }}>
              <Link
                to={name}
                style={{
                  color: '#0066cc',
                  fontWeight: 500,
                  display: 'block',
                  textDecoration: 'none',
                }}
              >
                {preview != null && (
                  <img
                    src={preview}
                    alt=""
                    style={{
                      width: '100%',
                      maxWidth: '20rem',
                      height: 'auto',
                      marginBottom: '0.5rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #e5e5e5',
                      display: 'block',
                    }}
                  />
                )}
                {title ?? name}
              </Link>
              {description != null && (
                <p style={{ margin: '0.25rem 0 0', color: '#666', fontSize: '0.9rem' }}>{description}</p>
              )}
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
    ...getProjectRoutes(),
    { path: '*', element: <NotFoundPage /> },
  ],
  { basename: base.replace(/\/$/, '') || '/' }
)

export default function App() {
  return <RouterProvider router={router} />
}
