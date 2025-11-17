import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Roster() {
  const [skill, setSkill] = useState('')
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch(`${API}/freelancers${skill ? `?skill=${encodeURIComponent(skill)}` : ''}`)
      .then(r => r.json())
      .then(d => setItems(d.items || []))
      .catch(() => setItems([]))
  }, [skill])

  return (
    <section id="freelancers" className="py-16 bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Featured freelancers</h2>
            <p className="text-slate-400">Search by skill and browse portfolios</p>
          </div>
          <input
            value={skill}
            onChange={e => setSkill(e.target.value)}
            placeholder="Filter by skill (e.g., frontend)"
            className="bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((f) => (
            <div key={f._id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center text-sm">
                  {f.name?.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{f.name}</p>
                  <p className="text-xs text-slate-400">{(f.skills || []).join(', ')}</p>
                </div>
              </div>
              {f.bio && <p className="mt-3 text-sm text-slate-300 line-clamp-3">{f.bio}</p>}
              {typeof f.hourly_rate === 'number' && (
                <p className="mt-2 text-sm text-slate-400">${'{'}f.hourly_rate{'}'} / hr</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Roster
