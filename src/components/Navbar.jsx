import React from 'react'

export default function Navbar({...props}) {
    const { route, setRoute } = props;
  return (
    <nav className="navbar">
      <div className="font-bold text-lg">Shipping Box</div>
      <div>
        <button
          onClick={() => setRoute('form')}
          className="btn"
          style={route === 'form' ? { background: '#1d4ed8' } : {}}
        >
          Add Box
        </button>
        <button
          onClick={() => setRoute('list')}
          className="btn"
          style={route === 'list' ? { background: '#1d4ed8' } : {}}
        >
          List Boxes
        </button>
      </div>
    </nav>
  )
}
