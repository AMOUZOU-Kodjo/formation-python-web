import { Helmet } from 'react-helmet-async'
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

  return (<>
    <Helmet>
      <title>Mon Attestation | Formation Python</title>
      <meta name="description" content="Attestation de réussite de la formation Python complète — 36 modules validés." />
    </Helmet>
    <div className="max-w-4xl mx-auto py-32">
      {isPreview && (
        <div className="alert alert-info mb-6 no-print shadow-lg">
          <span>👁️ Aperçu de l'attestation pour <strong>{name}</strong> {targetEmail && `(${targetEmail})`}</span>
          <Link to="/admin/students" className="btn btn-sm btn-ghost">← Retour</Link>
        </div>
      )}

      {!allDone && !isPreview && (
        <div className="alert alert-warning mb-6 no-print shadow-lg max-w-lg mx-auto">
          <span>🔒 Complétez les <strong>{stats.total}</strong> modules pour débloquer le téléchargement.</span>
          <Link to="/curriculum" className="btn btn-sm btn-ghost">Continuer</Link>
        </div>
      )}

      <div className="text-center mb-6 no-print">
        {allDone && !isPreview && (
          <button onClick={() => window.print()} className="btn btn-lg gap-2 text-white"
                  style={{background: '#306998'}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M5 2.75C5 1.784 5.784 1 6.75 1h6.5c.966 0 1.75.784 1.75 1.75v3.552c.377.046.738.128 1.08.245a5.25 5.25 0 013.22 4.725H20v-2a.75.75 0 00-.75-.75h-1.25V7.974A.75.75 0 0017.25 7h-1.578a2.75 2.75 0 00-2.084-.878H6.412A2.75 2.75 0 004.328 7H2.75a.75.75 0 00-.75.75V10.5H.75a.75.75 0 000 1.5h1.25v3.8A2.75 2.75 0 004.75 18.5h10.5a2.75 2.75 0 002.75-2.75v-3.8h1.25a.75.75 0 000-1.5h-1.25V9.25a.75.75 0 00-.75-.75h-1.155A3.74 3.74 0 0018 11.25v4.5a.75.75 0 01-.75.75H2.75a.75.75 0 01-.75-.75v-4.5A3.74 3.74 0 014.905 8.5H4.25a.75.75 0 00-.75.75V12a.75.75 0 01-1.5 0V9.25a2.25 2.25 0 012.25-2.25h.75a3.74 3.74 0 012.905-1.378h6.19A3.74 3.74 0 0117 7h.75a2.25 2.25 0 012.25 2.25v3.75a.75.75 0 01-.75.75h-1.25v.75A3.74 3.74 0 0115.25 18H4.75A3.74 3.74 0 011 14.25z" />
            </svg>
            Imprimer / Télécharger PDF
          </button>
        )}
        <Link to={isPreview ? "/admin/students" : "/profile"} className="btn btn-ghost btn-lg ml-3">← Retour</Link>
      </div>

      <div className="relative">
        {!allDone && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 rounded-2xl backdrop-blur-[2px] no-print">
            <div className="text-center">
              <span className="text-5xl block mb-3">🔒</span>
              <p className="text-lg font-bold text-gray-700">Attestation verrouillée</p>
              <p className="text-sm text-gray-500 mt-1">{stats.completed}/{stats.total} modules complétés</p>
              <progress className="progress progress-primary w-48 mt-3" value={stats.completed} max={stats.total} />
            </div>
          </div>
        )}
        <div id="certificate" className="relative bg-white overflow-hidden">
            {/* Bordures */}
            <div className="border-[12px] border-[#306998] m-3">
              <div className="border-[3px] border-[#FFE873] m-1">
                <div className="border border-gray-200 m-1 p-8 md:p-12 text-center relative">

                  {/* Filigrane */}
                  <img src="/images/python-logo.png" alt=""
                       className="absolute opacity-[0.04] pointer-events-none"
                       style={{width: '500px', top: '50%', left: '50%', transform: 'translate(-50%,-50%)'}} />

                  {/* En-tête */}
                  <div className="flex justify-between items-start mb-6">
                    <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest">Certificat n° {id}</p>
                    <img src="/images/python-logo.png" alt="Python" className="h-10 md:h-14 w-auto" />
                  </div>

                  {/* Titre */}
                  <p className="text-[10px] md:text-sm uppercase tracking-widest text-gray-400 mb-1">
                    Attestation de réussite
                  </p>
                  <h1 className="text-xl md:text-3xl font-bold text-[#1E1E1E] mb-1">
                    ATTESTATION DE RÉUSSITE
                  </h1>
                  <p className="text-xs md:text-base text-gray-500 mb-4">
                    Cette attestation professionnelle est décernée à :
                  </p>

                  {/* Nom */}
                  <p className="text-2xl md:text-4xl font-bold text-[#306998] my-4 uppercase">
                    {name}
                  </p>
                  <div className="w-48 h-[3px] bg-[#FFE873] mx-auto mb-4" />

                  {/* Corps */}
                  <p className="text-xs md:text-base text-gray-600 mb-1">
                    Pour avoir suivi avec succès et validé l'ensemble des modules requis de la formation :
                  </p>
                  <p className="text-sm md:text-xl font-semibold text-gray-800 italic mb-3">
                    « Formation Complète Python — Du débutant à l'expert »
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
                    Variables, types, structures de contrôle, fonctions, POO, héritage, décorateurs,
                    async/await, bases de données, API REST, data science, visualisation et projet final.
                  </p>

                  {/* Statistiques */}
                  <div className="flex justify-center gap-4 md:gap-12 my-6 md:my-8">
                    <div className="text-center">
                      <p className="text-xl md:text-3xl font-bold text-[#306998]">{stats.total}</p>
                      <p className="text-[10px] md:text-xs text-gray-500">Modules complétés</p>
                    </div>
                    <div className="w-px bg-gray-200" />
                    <div className="text-center">
                      <p className="text-xl md:text-3xl font-bold text-[#306998]">90+</p>
                      <p className="text-[10px] md:text-xs text-gray-500">Heures de formation</p>
                    </div>
                    <div className="w-px bg-gray-200" />
                    <div className="text-center">
                      <p className="text-xl md:text-3xl font-bold text-[#306998]">4</p>
                      <p className="text-[10px] md:text-xs text-gray-500">Parties couvertes</p>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-gray-500">
                    Délivré le <strong>{dateStr}</strong>
                  </p>

                  {/* Signature */}
                  <div className="flex justify-between items-end mt-8 md:mt-10">
                    <div className="text-left">
                      <div className="w-32 md:w-44 h-0.5 bg-gray-300 mb-1" />
                      <p className="text-[10px] md:text-xs text-gray-400">Signature du formateur</p>
                    </div>
                    <div className="text-right flex flex-col items-center gap-1">
                      <img src="/images/210192671.png" alt="Formateur"
                           className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-[#306998]" />
                      <p className="text-[10px] md:text-xs text-gray-400">Le Formateur</p>
                      <p className="text-[9px] md:text-[10px] text-gray-400">Python Expert — Formation Complète</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-4 no-print">
            <p className="text-xs text-base-content/40">
              Ce certificat est généré automatiquement et atteste de la complétion des 36 modules de la formation.
            </p>
          </div>
        </div>
    </div>
    </>
  )
}
