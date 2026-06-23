import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { MODULES } from '../data/modules'
import { useProgress } from '../hooks/useProgress'
import { supabase } from '../lib/supabase'

function certId(userId, date) {
  const hash = userId?.slice(0, 8).toUpperCase() || 'XXXX'
  const d = date || new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  return `FP-${hash}-${y}${m}`
}

export default function Certificate() {
  const { user, isAdmin, isConfigured } = useAuth()
  const [searchParams] = useSearchParams()
  const visitUserId = searchParams.get('userId')

  const targetUser = visitUserId && isAdmin ? { id: visitUserId } : user
  const { getModuleProgress, getOverallProgress } = useProgress(targetUser)
  const stats = getOverallProgress(MODULES.length)
  const allDone = stats.completed === stats.total

  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [targetEmail, setTargetEmail] = useState('')

  useEffect(() => {
    if (!targetUser?.id || !isConfigured) { setLoading(false); return }
    supabase.from('profiles').select('*').eq('id', targetUser.id).single()
      .then(({ data }) => {
        if (data) setProfile(data)
        setLoading(false)
      })
    if (visitUserId) {
      supabase.auth.admin.getUserById(visitUserId).then(({ data }) => {
        if (data?.user) setTargetEmail(data.user.email)
      }).catch(() => {})
    }
  }, [targetUser?.id])

  const name = profile?.display_name || targetEmail?.split('@')[0] || 'Apprenant'
  const completedDates = MODULES
    .map(m => getModuleProgress(m.id).completedAt)
    .filter(Boolean)
    .sort()
  const lastDate = completedDates[completedDates.length - 1]
  const completionDate = lastDate ? new Date(lastDate) : new Date()
  const dateStr = completionDate.toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
  const id = certId(targetUser?.id, completionDate)

  const isPreview = !!visitUserId && isAdmin

  if (loading) return (
    <div className="flex justify-center py-32">
      <span className="loading loading-spinner loading-lg text-primary" />
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto py-32">
      {isPreview && (
        <div className="alert alert-info mb-6 no-print shadow-lg">
          <span>👁️ Aperçu de l'attestation pour <strong>{name}</strong> {targetEmail && `(${targetEmail})`}</span>
          <Link to="/admin/students" className="btn btn-sm btn-ghost">← Retour</Link>
        </div>
      )}

      {!allDone ? (
        <div className="card bg-base-200 border border-base-300 max-w-lg mx-auto text-center">
          <div className="card-body">
            <span className="text-5xl mb-2">🔒</span>
            <h2 className="text-2xl font-bold">Formation non terminée</h2>
            <p className="text-base-content/60 mt-2">
              {isPreview ? (
                <>Cet étudiant n'a pas encore complété tous les modules.</>
              ) : (
                <>Vous devez compléter les <strong>{stats.total}</strong> modules pour obtenir votre attestation.</>
              )}
              <br />Progression : <strong>{stats.completed}/{stats.total}</strong> ({stats.percentage}%)
            </p>
            <progress className="progress progress-primary w-full mt-4" value={stats.completed} max={stats.total} />
            {!isPreview && <Link to="/curriculum" className="btn btn-primary mt-6">Continuer la formation</Link>}
          </div>
        </div>
      ) : (
        <>
          <div className="text-center mb-6 no-print">
            {!isPreview && (
              <button onClick={() => window.print()} className="btn btn-primary btn-lg gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M5 2.75C5 1.784 5.784 1 6.75 1h6.5c.966 0 1.75.784 1.75 1.75v3.552c.377.046.738.128 1.08.245a5.25 5.25 0 013.22 4.725H20v-2a.75.75 0 00-.75-.75h-1.25V7.974A.75.75 0 0017.25 7h-1.578a2.75 2.75 0 00-2.084-.878H6.412A2.75 2.75 0 004.328 7H2.75a.75.75 0 00-.75.75V10.5H.75a.75.75 0 000 1.5h1.25v3.8A2.75 2.75 0 004.75 18.5h10.5a2.75 2.75 0 002.75-2.75v-3.8h1.25a.75.75 0 000-1.5h-1.25V9.25a.75.75 0 00-.75-.75h-1.155A3.74 3.74 0 0018 11.25v4.5a.75.75 0 01-.75.75H2.75a.75.75 0 01-.75-.75v-4.5A3.74 3.74 0 014.905 8.5H4.25a.75.75 0 00-.75.75V12a.75.75 0 01-1.5 0V9.25a2.25 2.25 0 012.25-2.25h.75a3.74 3.74 0 012.905-1.378h6.19A3.74 3.74 0 0117 7h.75a2.25 2.25 0 012.25 2.25v3.75a.75.75 0 01-.75.75h-1.25v.75A3.74 3.74 0 0115.25 18H4.75A3.74 3.74 0 011 14.25z" />
                </svg>
                Imprimer / Télécharger PDF
              </button>
            )}
            <Link to={isPreview ? "/admin/students" : "/profile"} className="btn btn-ghost btn-lg ml-3">← Retour</Link>
          </div>

          <div id="certificate" className="bg-white text-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
            <div className="h-2 bg-gradient-to-r from-purple-600 via-green-500 to-purple-600" />

            <div className="px-12 py-10 text-center">
              <div className="flex justify-between items-start mb-8">
                <div className="text-left">
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Certificat n° {id}</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl">🐍</span>
                </div>
              </div>

              <div className="border-2 border-gray-200 rounded-xl p-8 mb-8">
                <p className="text-sm uppercase tracking-widest text-gray-400 mb-2">Attestation de fin de formation</p>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">FORMATION COMPLÈTE PYTHON</h1>
                <p className="text-gray-500 text-sm mb-6">Du débutant à l'expert — 36 modules</p>

                <div className="w-24 h-0.5 bg-purple-600 mx-auto mb-6" />

                <p className="text-gray-600 text-lg mb-2">Je soussigné, formateur, certifie que</p>
                <p className="text-4xl font-bold text-purple-700 my-4">{name}</p>
                <p className="text-gray-600 text-lg mb-2">a complété avec succès l'intégralité de la formation</p>
                <p className="text-xl font-semibold text-gray-800 mb-6">« Programmation Python — Du débutant à l'expert »</p>

                <div className="flex justify-center gap-8 my-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    <p className="text-xs text-gray-500">Modules complétés</p>
                  </div>
                  <div className="w-px bg-gray-200" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">90+</p>
                    <p className="text-xs text-gray-500">Heures de formation</p>
                  </div>
                  <div className="w-px bg-gray-200" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">4</p>
                    <p className="text-xs text-gray-500">Parties couvertes</p>
                  </div>
                </div>

                <p className="text-gray-500 text-sm mt-4">
                  Délivré le <strong>{dateStr}</strong>
                </p>
              </div>

              <div className="flex justify-between items-end mt-8">
                <div className="text-left">
                  <div className="w-48 h-0.5 bg-gray-300 mb-1" />
                  <p className="text-xs text-gray-400">Signature du formateur</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Formation Python</p>
                  <p className="text-xs text-gray-400">{new Date().getFullYear()}</p>
                </div>
              </div>
            </div>

            <div className="h-2 bg-gradient-to-r from-purple-600 via-green-500 to-purple-600" />
          </div>

          <div className="text-center mt-4 no-print">
            <p className="text-xs text-base-content/40">
              Ce certificat est généré automatiquement et atteste de la complétion des 36 modules de la formation.
            </p>
          </div>
        </>
      )}
    </div>
  )
}
