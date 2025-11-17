import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Forum() {
  const [threads, setThreads] = useState([])
  const [active, setActive] = useState(null)
  const [posts, setPosts] = useState([])
  const [threadForm, setThreadForm] = useState({ title: '', content: '', author_type: 'guest', author_name: '', tags: '' })
  const [postContent, setPostContent] = useState('')

  const loadThreads = () => {
    fetch(`${API}/forum/threads`).then(r=>r.json()).then(d=>setThreads(d.items || []))
  }
  useEffect(() => { loadThreads() }, [])

  useEffect(() => {
    if (!active) return
    fetch(`${API}/forum/posts?thread_id=${active}`).then(r=>r.json()).then(d=>setPosts(d.items || []))
  }, [active])

  const createThread = async (e) => {
    e.preventDefault()
    const payload = { ...threadForm, tags: threadForm.tags.split(',').map(t=>t.trim()).filter(Boolean) }
    const res = await fetch(`${API}/forum/threads`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    if (res.ok) { setThreadForm({ title: '', content: '', author_type: 'guest', author_name: '', tags: '' }); loadThreads() }
  }

  const submitPost = async (e) => {
    e.preventDefault()
    if (!active) return
    const payload = { thread_id: active, content: postContent, author_name: 'Anonymous' }
    const res = await fetch(`${API}/forum/posts`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    if (res.ok) { setPostContent(''); fetch(`${API}/forum/posts?thread_id=${active}`).then(r=>r.json()).then(d=>setPosts(d.items || [])) }
  }

  return (
    <section className="py-16 bg-slate-950 text-white border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Community forum</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              {threads.map(t => (
                <button key={t._id} onClick={()=>setActive(t._id)} className={`w-full text-left p-4 rounded-lg border ${active===t._id? 'border-blue-600 bg-slate-900': 'border-slate-800 bg-slate-900/50'}`}>
                  <div className="font-medium">{t.title}</div>
                  <div className="text-xs text-slate-400">{(t.tags || []).join(', ')}</div>
                </button>
              ))}
            </div>

            <div className="rounded-lg border border-slate-800 p-4 bg-slate-900/60">
              <h3 className="font-medium mb-2">Start a thread</h3>
              <form onSubmit={createThread} className="space-y-2">
                <input value={threadForm.title} onChange={(e)=>setThreadForm(v=>({...v, title:e.target.value}))} placeholder="Title" className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm" required />
                <textarea value={threadForm.content} onChange={(e)=>setThreadForm(v=>({...v, content:e.target.value}))} placeholder="Content" rows={3} className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm" />
                <div className="flex gap-2">
                  <input value={threadForm.author_name} onChange={(e)=>setThreadForm(v=>({...v, author_name:e.target.value}))} placeholder="Your name" className="flex-1 bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm" />
                  <select value={threadForm.author_type} onChange={(e)=>setThreadForm(v=>({...v, author_type:e.target.value}))} className="bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm">
                    <option value="guest">Guest</option>
                    <option value="freelancer">Freelancer</option>
                    <option value="business">Business</option>
                  </select>
                </div>
                <input value={threadForm.tags} onChange={(e)=>setThreadForm(v=>({...v, tags:e.target.value}))} placeholder="Tags (comma separated)" className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm" />
                <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500">Create</button>
              </form>
            </div>
          </div>

          {active && (
            <div className="mt-10">
              <h3 className="font-semibold mb-3">Posts</h3>
              <div className="space-y-3">
                {posts.map(p => (
                  <div key={p._id} className="rounded-lg border border-slate-800 p-4 bg-slate-900/60">
                    <div className="text-xs text-slate-400">{p.author_name}</div>
                    <div className="mt-1 text-sm text-slate-200">{p.content}</div>
                  </div>
                ))}
              </div>
              <form onSubmit={submitPost} className="mt-3 flex gap-2">
                <input value={postContent} onChange={(e)=>setPostContent(e.target.value)} placeholder="Write a reply" className="flex-1 bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm" />
                <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500">Send</button>
              </form>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-lg border border-slate-800 p-4 bg-slate-900/60">
            <h3 className="font-medium mb-2">How it works</h3>
            <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
              <li>Browse the roster and pick specialists</li>
              <li>Submit a reservation request</li>
              <li>Promote your brand with ads</li>
              <li>Discuss technical topics in the forum</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Forum
