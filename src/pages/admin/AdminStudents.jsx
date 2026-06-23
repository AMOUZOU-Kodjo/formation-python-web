import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { MODULES } from '../../data/modules'

export default function AdminStudents() {
  const [students, setStudents] = useState([])
  const [progressMap, setProgressMap] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('course_progress').select('*'),
    ]).then(([profilesRes, progressRes]) => {
      if (profilesRes.data) setStudents(profilesRes.data)
      if (progressRes.data) {
        const map = {}
        progressRes.data.forEach(p => {
          if (!map[p.user_id]) map[p.user_id] = []
          map[p.user_id].push(p)
        })
        setProgressMap(map)
      }
      setLoading(false)
    })
  }, [])

  if (loading) return (
    <div className="flex justify-center py-20">
      <span className="loading loading-spinner loading-lg text-primary" />
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto">
      <Link to="/admin" className="link link-primary text-sm no-underline mb-4 inline-block">← Retour</Link>
      <h1 className="text-3xl font-extrabold mb-1">👥 Étudiants</h1>
      <p className="text-base-content/60 mb-6">{students.length} étudiant(s) inscrit(s)</p>

      <div className="overflow-x-auto">
        <table className="table table-sm">
          <thead>
            <tr className="text-base-content/50 text-xs uppercase tracking-wide">
              <th>Étudiant</th>
              <th>Email</th>
              <th>Progression</th>
              <th>Quiz</th>
              <th>Attestation</th>
              <th>Inscrit le</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => {
              const prog = progressMap[s.id] || []
              const completed = prog.filter(p => p.completed).length
              const quizCount = prog.filter(p => p.quiz_score !== null).length
              const pct = Math.round((completed / MODULES.length) * 100)
              return (
                <tr key={s.id} className="hover:bg-base-300/50 transition-colors">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-primary text-neutral-content w-8 rounded-full text-xs font-bold">
                          {(s.display_name || s.email || '?').charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <span className="font-medium">{s.display_name || '—'}</span>
                    </div>
                  </td>
                  <td className="text-sm text-base-content/60">{s.email}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <progress className="progress progress-primary w-20 h-2" value={completed} max={MODULES.length} />
                      <span className="text-xs font-medium">{completed}/{MODULES.length}</span>
                      <span className={`text-xs font-bold ${pct >= 80 ? 'text-success' : pct >= 40 ? 'text-warning' : 'text-error'}`}>
                        {pct}%
                      </span>
                    </div>
                  </td>
                  <td className="text-sm">{quizCount}</td>
                  <td>
                    {completed === MODULES.length ? (
                      <Link to={`/certificate?userId=${s.id}`} className="btn btn-success btn-xs gap-1">
                        🏆 Voir
                      </Link>
                    ) : (
                      <span className="text-xs text-base-content/30">—</span>
                    )}
                  </td>
                  <td className="text-xs text-base-content/40">{new Date(s.created_at).toLocaleDateString('fr-FR')}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {students.length === 0 && (
        <div className="card bg-base-200 border border-base-300">
          <div className="card-body items-center text-center py-10">
            <span className="text-5xl mb-4">👥</span>
            <h3 className="text-lg font-bold mb-1">Aucun étudiant</h3>
            <p className="text-sm text-base-content/50">Les étudiants inscrits apparaîtront ici.</p>
          </div>
        </div>
      )}
    </div>
  )
}
