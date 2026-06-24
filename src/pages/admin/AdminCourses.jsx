import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MODULES, PARTS } from '../../data/modules'
import { supabase } from '../../lib/supabase'

export default function AdminCourses() {
  const [title, setTitle] = useState('')
  const [short, setShort] = useState('')
  const [part, setPart] = useState(1)
  const [duration, setDuration] = useState('2h')
  const [desc, setDesc] = useState('')
  const [icon, setIcon] = useState('📘')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const handleAdd = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    const id = `${String(MODULES.length + 1).padStart(2, '0')}-${short.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`
    const { error } = await supabase.from('modules').insert({
      id, title, short, part, duration, "desc": desc, icon,
      color: ['#4CAF50', '#FF9800', '#9C27B0', '#D32F2F'][part - 1],
    })
    if (error) setMsg(`Erreur : ${error.message}`)
    else {
      setMsg(`✅ Module ajouté : ${title} (${id}). Ajoute le fichier public/cours/${id}.md`)
      setTitle(''); setShort(''); setDesc(''); setIcon('📘')
    }
    setSaving(false)
  }

  const modsByPart = {}
  PARTS.forEach(p => { modsByPart[p.id] = MODULES.filter(m => m.part === p.id) })

  return (<>
    <Helmet>
      <title>Gestion des Modules — Admin | Formation Python</title>
      <meta name="description" content="Administration des modules et contenu de la formation Python." />
    </Helmet>
    <div className="max-w-6xl mx-auto">
      <Link to="/admin" className="link link-primary text-sm no-underline mb-4 inline-block">← Retour</Link>
      <h1 className="text-3xl font-extrabold mb-1">📚 Gestion des cours</h1>
      <p className="text-base-content/60 mb-8">{MODULES.length} modules actuellement</p>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Module list */}
        <div className="lg:col-span-3 space-y-4">
          <h2 className="font-bold text-lg">Modules existants</h2>
          {PARTS.map(part => (
            <div key={part.id} className="card bg-base-200 border border-base-300">
              <div className="card-body p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-5 rounded" style={{ background: part.color }} />
                  <span className="font-semibold text-sm">Partie {part.id} : {part.title}</span>
                  <span className="text-xs text-base-content/40">({modsByPart[part.id].length})</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {modsByPart[part.id].map(m => (
                    <span key={m.id} className="badge badge-sm badge-outline gap-1 py-2">
                      {m.icon} {m.short}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add form */}
        <div className="lg:col-span-2">
          <div className="card bg-base-200 border border-base-300 sticky top-4">
            <div className="card-body p-5">
              <h2 className="font-bold text-lg mb-3">➕ Ajouter un module</h2>
              <form onSubmit={handleAdd} className="space-y-3">
                <label className="floating-label">
                  <span>Titre complet</span>
                  <input type="text" className="input input-bordered w-full" value={title} onChange={e => setTitle(e.target.value)} required />
                </label>
                <label className="floating-label">
                  <span>Nom court</span>
                  <input type="text" className="input input-bordered w-full" value={short} onChange={e => setShort(e.target.value)} required placeholder="ex: Fonctions" />
                </label>
                <div className="flex gap-2">
                  <label className="floating-label flex-1">
                    <span>Partie</span>
                    <select className="select select-bordered w-full" value={part} onChange={e => setPart(Number(e.target.value))}>
                      {PARTS.map(p => <option key={p.id} value={p.id}>Partie {p.id}</option>)}
                    </select>
                  </label>
                  <label className="floating-label w-24">
                    <span>Durée</span>
                    <input type="text" className="input input-bordered w-full" value={duration} onChange={e => setDuration(e.target.value)} />
                  </label>
                </div>
                <label className="floating-label">
                  <span>Icône</span>
                  <input type="text" className="input input-bordered w-full" value={icon} onChange={e => setIcon(e.target.value)} />
                </label>
                <label className="floating-label">
                  <span>Description</span>
                  <textarea className="textarea textarea-bordered w-full" rows={3} value={desc} onChange={e => setDesc(e.target.value)} required />
                </label>
                {msg && <div className={`alert text-sm py-2 ${msg.startsWith('✅') ? 'alert-success' : 'alert-error'}`}>{msg}</div>}
                <button type="submit" className="btn btn-primary w-full" disabled={saving}>
                  {saving ? <span className="loading loading-spinner loading-sm" /> : '➕ Ajouter le module'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
