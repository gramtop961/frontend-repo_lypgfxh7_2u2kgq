import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Advertise() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ ad_type: 'business', heading: '', content: '', designers: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const load = () => {
    fetch(`${API}/ads`).then(r => r.json()).then(d => setItems(d.items || []))
  }

  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    setError(''); setSuccess('')
    const payload = {
      ad_type: form.ad_type,
      heading: form.heading,
      content: form.content,
      designers: form.ad_type === 'business' ? form.designers.split(',').map(x => x.trim()).filter(Boolean) : []
    }
    const res = await fetch(`${API}/ads`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    if (res.ok) {
      setSuccess('Ad submitted!'); setForm({ ad_type: 'business', heading: '', content: '', designers: '' }); load()
    } else {
      const err = await res.json().catch(() => ({}))
      setError(err.detail || 'Failed to submit ad')
    }
  }

  return (
    <section id="advertise" className="py-16 bg-slate-950 text-white border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">Promote yourself</h2>
          <p className="text-slate-400 mb-6">Businesses and freelancers can feature their posts on the landing page. Business ads must include the designers responsible in the heading.</p>

          <form onSubmit={submit} className="space-y-3">
            <div className="flex gap-4">
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="radio" name="type" checked={form.ad_type==='business'} onChange={() => setForm(v=>({...v, ad_type: 'business'}))} />
                Business
              </label>
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="radio" name="type" checked={form.ad_type==='freelancer'} onChange={() => setForm(v=>({...v, ad_type: 'freelancer'}))} />
                Freelancer
              </label>
            </div>
            <input value={form.heading} onChange={(e)=>setForm(v=>({...v, heading:e.target.value}))} placeholder="Ad heading" className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm" required />
            {form.ad_type==='business' && (
              <input value={form.designers} onChange={(e)=>setForm(v=>({...v, designers:e.target.value}))} placeholder="Designers (comma separated)" className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm" />
            )}
            <textarea value={form.content} onChange={(e)=>setForm(v=>({...v, content:e.target.value}))} placeholder="Ad content" rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm" />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            {success && <p className="text-green-400 text-sm">{success}</p>}
            <button className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-500">Submit Ad</button>
          </form>
        </div>

        <div>
          <h3 className="font-medium mb-4">Recent ads</h3>
          <div className="space-y-3">
            {items.map(ad => (
              <div key={ad._id} className="border border-slate-800 rounded-lg p-4 bg-slate-900/60">
                <div className="text-xs text-slate-400 uppercase">{ad.ad_type}</div>
                <div className="mt-1 font-semibold">{ad.heading}</div>
                <div className="mt-2 text-sm text-slate-300">{ad.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Advertise
