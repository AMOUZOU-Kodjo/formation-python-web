import { Helmet } from 'react-helmet-async'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { MODULES } from '../../data/modules'

export default function AdminDashboard() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('profiles').select('*').then(({ data }) => {
      if (data) setStudents(data)
      setLoading(false)
    })
  }, [])

  const stats = [
    { label: 'Étudiants', value: students.length, icon: '👥', grad: 'from-violet-500 to-purple-600' },
    { label: 'Modules', value: MODULES.length, icon: '📚', grad: 'from-sky-500 to-blue-600' },
    { label: 'Progression moyenne', value: '—', icon: '📊', grad: 'from-emerald-500 to-green-600' },
    { label: 'Quiz soumis', value: '—', icon: '📝', grad: 'from-amber-500 to-orange-600' },
  ]

  return (<>
    <Helmet>
      <title>Tableau de Bord Admin | Formation Python</title>
      <meta name="description" content="Panneau d'administration de la formation Python." />
    </Helmet>
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-1">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-emerald-400">
          ⚙️ Administration
        </span>
      </h1>
      <p className="text-base-content/60 mb-8">Gestion de la plateforme Formation Python</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {stats.map(s => (
          <div key={s.label} className="stat bg-base-200 border border-base-300 rounded-xl py-3 text-center">
            <div className="text-xl mb-0.5">{s.icon}</div>
            <div className={`text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${s.grad}`}>
              {loading ? <span className="loading loading-spinner loading-sm" /> : s.value}
            </div>
            <div className="text-xs text-base-content/50">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link to="/admin/students" className="card bg-base-200 border border-base-300 hover:border-primary/40 transition-all no-underline group">
          <div className="card-body p-6">
            <div className="flex items-center gap-4">
              <span className="text-4xl">👥</span>
              <div>
                <h3 className="text-lg font-bold group-hover:text-primary transition-colors">Étudiants</h3>
                <p className="text-sm text-base-content/50">Voir tous les étudiants et leur progression</p>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/admin/courses" className="card bg-base-200 border border-base-300 hover:border-primary/40 transition-all no-underline group">
          <div className="card-body p-6">
            <div className="flex items-center gap-4">
              <span className="text-4xl">📚</span>
              <div>
                <h3 className="text-lg font-bold group-hover:text-primary transition-colors">Cours</h3>
                <p className="text-sm text-base-content/50">Ajouter et gérer les modules de formation</p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {students.length > 0 && (
        <div className="card bg-base-200 border border-base-300 mt-8">
          <div className="card-body p-5">
            <h3 className="font-bold mb-3">👥 Derniers inscrits</h3>
            <div className="space-y-2">
              {students.slice(-5).reverse().map(s => (
                <div key={s.id} className="flex items-center gap-3 text-sm px-2 py-1.5 rounded-lg bg-base-300/50">
                  <div className="avatar placeholder">
                    <div className="bg-primary text-neutral-content w-7 rounded-full text-xs font-bold">
                      {(s.display_name || s.email || '?').charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <span className="font-medium">{s.display_name || s.email?.split('@')[0]}</span>
                  <span className="text-base-content/40 text-xs">{s.email}</span>
                  <span className="ml-auto text-xs text-base-content/30">
                    {new Date(s.created_at).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  )
}
