import { Link, Outlet, useLocation } from 'react-router-dom'

function Overview() {
  return (
    <div>
      <h2>Overview</h2>
      <p>This is the example prototype. Use the links above to try sub-routes.</p>
    </div>
  )
}

function Step1() {
  return <div><h2>Step 1</h2><p>First step of the flow.</p></div>
}

function Step2() {
  return <div><h2>Step 2</h2><p>Second step.</p></div>
}

export default function ExamplePrototype() {
  const location = useLocation()
  const isOverview = !location.pathname.match(/\/step\d$/)

  return (
    <div style={{ padding: '1.5rem', fontFamily: 'system-ui, sans-serif' }}>
      <nav style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
        <Link to="." style={{ color: isOverview ? '#000' : '#0066cc' }}>Overview</Link>
        <Link to="step1" style={{ color: location.pathname.includes('step1') ? '#000' : '#0066cc' }}>Step 1</Link>
        <Link to="step2" style={{ color: location.pathname.includes('step2') ? '#000' : '#0066cc' }}>Step 2</Link>
        <Link to="/" style={{ marginLeft: 'auto', color: '#666' }}>← All projects</Link>
      </nav>
      <Outlet />
    </div>
  )
}

export const routes = [
  { path: '/', Component: Overview },
  { path: 'step1', Component: Step1 },
  { path: 'step2', Component: Step2 },
]
