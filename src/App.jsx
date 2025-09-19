import React, { useState, useEffect, lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import { getBoxes } from './services/api'

const BoxForm = lazy(() => import('./components/BoxForm'))
const BoxList = lazy(() => import('./components/BoxList'))

export default function App() {
  const [route, setRoute] = useState('form')
  const [boxes, setBoxes] = useState([])

  useEffect(() => {
    fetchBoxes()
  }, [])

  async function fetchBoxes() {
    const res = await getBoxes()
    setBoxes(res)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar route={route} setRoute={setRoute} />

      <main className="container flex-1">
        <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>}>
          {route === 'form' ? (
            <BoxForm onSaved={fetchBoxes} />
          ) : (
            <BoxList boxes={boxes} refresh={fetchBoxes} />
          )}
        </Suspense>
      </main>

      <footer style={{ textAlign: 'center', padding: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
        Shipping Box — from India
      </footer>
    </div>
  )
}
