import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { MODULES } from '../data/modules'
import { useProgress } from '../hooks/useProgress'
import { supabase } from '../lib/supabase'

export default function Profile() {
  const { user, signOut, isConfigured } = useAuth()
  const { getOverallProgress, getModuleProgress } = useProgress(user)
  const stats = getOverallProgress(MODULES.length)

  const [profile, setProfile] = useState(null)
  const [editing, setEditing] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef(null)

  const completedModules = MODULES.filter(m => getModuleProgress(m.id).completed)
  const withQuiz = MODULES.filter(m => getModuleProgress(m.id).quizScore !== null)
  const withExercise = MODULES.filter(m => getModuleProgress(m.id).exerciseCompleted)

  useEffect(() => {
    if (!user || !isConfigured) return
    supabase.from('profiles').select('*').eq('id', user.id).single()
      .then(({ data }) => {
        if (data) { setProfile(data); setDisplayName(data.display_name || '') }
      })
  }, [user])

  async function handleSave() {
    setSaving(true)
    await supabase.from('profiles').update({ display_name: displayName }).eq('id', user.id)
    setProfile(p => ({ ...p, display_name: displayName }))
    setSaving(false)
    setEditing(false)
  }

  async function handleUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const ext = file.name.split('.').pop()
    const path = `${user.id}/avatar.${ext}`
    await supabase.storage.from('avatars').upload(path, file, { upsert: true })
    const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path)
    await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', user.id)
    setProfile(p => ({ ...p, avatar_url: publicUrl }))
    setUploading(false)
  }

  if (!isConfigured) {
    return (
      <div className="hero min-h-60">
        <div className="hero-content text-center">
          <p className="text-base-content/60">Mode local — pas de compte utilisateur.</p>
        </div>
      </div>
    )
  }

  const initial = (profile?.display_name || user?.email || '?').charAt(0).toUpperCase()

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card bg-base-200 border border-base-300 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary to-secondary opacity-80" />

        <div className="px-6 pb-6 relative">
          <div className="flex flex-col items-center gap-4 -mt-12 mb-4">
            <div className="relative group">
              <div className="avatar">
                <div className="w-24 h-24 rounded-full ring-4 ring-base-200 overflow-hidden bg-base-300">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="avatar" className="object-cover w-full h-full" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-primary text-neutral-content text-3xl font-bold">
                      {initial}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                className="btn btn-primary btn-xs btn-circle absolute bottom-0 right-0 shadow-lg"
                disabled={uploading}
              >
                {uploading ? <span className="loading loading-spinner loading-xs" /> :
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M9.97 1.78a.75.75 0 011.06 0l3 3a.75.75 0 01-1.06 1.06l-1.72-1.72V10.5a.75.75 0 01-1.5 0V4.12L7.03 5.84a.75.75 0 11-1.06-1.06l3-3z" />
                    <path fillRule="evenodd" d="M5.5 9.75a.75.75 0 01.75.75v3.75a.75.75 0 00.75.75h6.5a.75.75 0 00.75-.75V10.5a.75.75 0 011.5 0v3.75a2.25 2.25 0 01-2.25 2.25h-6.5A2.25 2.25 0 014.75 14.25V10.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                  </svg>
                }
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
            </div>

            <div className="text-center flex-1 min-w-0">
              {editing ? (
                <div className="flex items-center justify-center gap-2 mt-2">
                  <input
                    type="text"
                    className="input input-bordered input-sm w-48"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    autoFocus
                  />
                  <button className="btn btn-primary btn-xs" onClick={handleSave} disabled={saving}>
                    {saving ? <span className="loading loading-spinner loading-xs" /> : '✓'}
                  </button>
                  <button className="btn btn-ghost btn-xs" onClick={() => { setEditing(false); setDisplayName(profile?.display_name || '') }}>
                    ✕
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 mt-2">
                  <h2 className="text-xl font-bold">{profile?.display_name || user?.email?.split('@')[0]}</h2>
                  <button onClick={() => setEditing(true)} className="btn btn-ghost btn-xs text-base-content/40 hover:text-base-content">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                      <path d="M3.83 16.17a.75.75 0 01-.75-.75v-1.5a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5H4.58v1a.75.75 0 01-.75.75z" />
                    </svg>
                  </button>
                </div>
              )}
              <p className="text-sm text-base-content/50">{user?.email}</p>
              <p className="text-xs text-base-content/40 mt-0.5">
                Membre depuis {new Date(user?.created_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="stat px-3 py-3 bg-base-300 rounded-xl">
              <div className="stat-title text-xs">Modules</div>
              <div className="stat-value text-lg text-primary">{stats.completed}/{stats.total}</div>
              <div className="stat-desc text-xs">{stats.percentage}% complétés</div>
            </div>
            <div className="stat px-3 py-3 bg-base-300 rounded-xl">
              <div className="stat-title text-xs">Quiz</div>
              <div className="stat-value text-lg text-warning">{withQuiz.length}</div>
              <div className="stat-desc text-xs">tentatives</div>
            </div>
            <div className="stat px-3 py-3 bg-base-300 rounded-xl">
              <div className="stat-title text-xs">Exercices</div>
              <div className="stat-value text-lg text-success">{withExercise.length}</div>
              <div className="stat-desc text-xs">réalisés</div>
            </div>
          </div>

          <progress className="progress progress-primary w-full mb-6" value={stats.completed} max={stats.total} />

          <div className="flex flex-wrap justify-center gap-2">
            <Link to="/progress" className="btn btn-primary btn-sm">📊 Progression détaillée</Link>
            <Link to="/curriculum" className="btn btn-outline btn-sm">📚 Continuer la formation</Link>
            <button onClick={signOut} className="btn btn-ghost btn-sm text-error">Déconnexion</button>
          </div>
        </div>
      </div>

      {completedModules.length > 0 && (
        <div className="card bg-base-200 border border-base-300 mt-4">
          <div className="card-body p-5">
            <h3 className="font-semibold mb-3">🏆 Derniers modules complétés</h3>
            <div className="space-y-2">
              {completedModules.slice(-5).reverse().map(m => {
                const p = getModuleProgress(m.id)
                return (
                  <div key={m.id} className="flex items-center gap-3 text-sm">
                    <span className="text-success">✓</span>
                    <span>{m.icon}</span>
                    <Link to={`/module/${m.id}`} className="link link-hover flex-1 truncate">{m.short}</Link>
                    {p.quizScore !== null && (
                      <span className={`badge badge-sm ${p.quizScore >= 80 ? 'badge-success' : 'badge-warning'}`}>
                        {p.quizScore}%
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
