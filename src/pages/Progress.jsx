import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { MODULES, PARTS } from '../data/modules'
import { useProgress } from '../hooks/useProgress'
import { useAuth } from '../contexts/AuthContext'

export default function Progress() {
  const { user } = useAuth()
  const { getModuleProgress, getOverallProgress, resetProgress, syncing } = useProgress(user)
  const overall = getOverallProgress(MODULES.length)
  const completedModules = MODULES.filter(m => getModuleProgress(m.id).completed)
  const withQuiz = MODULES.filter(m => getModuleProgress(m.id).quizScore !== null)
  const withExercise = MODULES.filter(m => getModuleProgress(m.id).exerciseCompleted)
  const remaining = overall.total - overall.completed

  const pct = overall.percentage
  const ringColor = pct >= 80 ? 'stroke-success' : pct >= 40 ? 'stroke-warning' : 'stroke-error'

  return (<>
    <Helmet>
      <title>Ma Progression | Formation Python</title>
      <meta name="description" content="Suivez votre progression dans la formation Python : modules complétés, quiz réussis, exercices validés." />
    </Helmet>
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-base-200 to-base-300 border border-base-300 mb-8 px-6 md:px-12 py-10 text-center">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary rounded-full blur-3xl" />
        </div>
        <div className="relative">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-emerald-400">
              📊 Ma progression
            </span>
          </h1>
          <p className="text-base-content/60">Suis ton avancement dans la formation</p>
        </div>
      </section>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Complétés', value: `${overall.completed}/${overall.total}`, icon: '✅', grad: 'from-emerald-500 to-green-600' },
          { label: 'Progression', value: `${overall.percentage}%`, icon: '📈', grad: 'from-violet-500 to-purple-600' },
          { label: 'Quiz', value: withQuiz.length, icon: '📝', grad: 'from-amber-500 to-orange-600' },
          { label: 'Exercices', value: withExercise.length, icon: '💻', grad: 'from-sky-500 to-blue-600' },
        ].map(s => (
          <div key={s.label} className="stat bg-base-200 border border-base-300 rounded-xl py-3 text-center">
            <div className="text-xl mb-0.5">{s.icon}</div>
            <div className={`text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${s.grad}`}>{s.value}</div>
            <div className="text-xs text-base-content/50">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Global progress */}
      <div className="card bg-base-200 border border-base-300 mb-8">
        <div className="card-body p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Progression globale</span>
            <div className="flex items-center gap-2">
              {syncing && <span className="loading loading-spinner loading-xs text-primary" />}
              <span className="text-sm font-bold text-primary">{overall.percentage}%</span>
              <button onClick={resetProgress} className="btn btn-ghost btn-xs text-error opacity-50 hover:opacity-100" title="Réinitialiser">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.388A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          <progress className="progress progress-primary w-full h-3" value={overall.completed} max={overall.total} />
          <div className="flex justify-between text-xs text-base-content/40 mt-1.5">
            <span>{overall.completed} terminés</span>
            <span>{remaining} restants</span>
          </div>
        </div>
      </div>

      {/* Per-part breakdown */}
      <div className="space-y-4 mb-8">
        <h2 className="text-lg font-bold">Détail par partie</h2>
        {PARTS.map(part => {
          const mods = MODULES.filter(m => m.part === part.id)
          const done = mods.filter(m => getModuleProgress(m.id).completed).length
          const pct = Math.round((done / mods.length) * 100)
          return (
            <div key={part.id} className="card bg-base-200 border border-base-300 hover:border-primary/30 transition-all">
              <div className="card-body p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 rounded-full shrink-0" style={{ background: part.color }} />
                    <div>
                      <span className="font-semibold text-sm">Partie {part.id} : {part.title}</span>
                      <span className="text-xs text-base-content/50 ml-2">{done}/{mods.length}</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold" style={{ color: part.color }}>{pct}%</span>
                </div>
                <progress className="progress w-full h-2" style={{ background: '#333' }} value={done} max={mods.length} />
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {mods.map(m => {
                    const p = getModuleProgress(m.id)
                    return (
                      <Link key={m.id} to={`/module/${m.id}`}
                        className={`badge badge-sm gap-1 py-2 no-underline transition-all ${
                          p.completed
                            ? 'badge-success text-white'
                            : p.quizScore !== null
                              ? 'badge-warning'
                              : 'badge-outline hover:badge-primary'
                        }`}>
                        {m.icon} {m.short}
                        {p.completed && ' ✓'}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Completed modules */}
      {completedModules.length > 0 && (
        <div className="card bg-base-200 border border-base-300">
          <div className="card-body p-5">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              🏆 Modules terminés
              <span className="badge badge-sm badge-success">{completedModules.length}</span>
            </h3>
            <div className="grid gap-2">
              {completedModules.slice().reverse().map(m => {
                const p = getModuleProgress(m.id)
                return (
                  <Link key={m.id} to={`/module/${m.id}`}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-300/70 transition-colors no-underline group">
                    <span className="text-success shrink-0">✓</span>
                    <span className="text-lg shrink-0">{m.icon}</span>
                    <span className="flex-1 text-sm font-medium group-hover:text-primary transition-colors truncate">{m.title}</span>
                    {p.quizScore !== null && (
                      <span className={`badge badge-xs ${p.quizScore >= 80 ? 'badge-success' : 'badge-warning'}`}>
                        {p.quizScore}%
                      </span>
                    )}
                    {p.completedAt && (
                      <span className="text-xs text-base-content/30 hidden md:inline">
                        {new Date(p.completedAt).toLocaleDateString('fr-FR')}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!completedModules.length && (
        <div className="card bg-base-200 border border-base-300">
          <div className="card-body items-center text-center py-10">
            <span className="text-5xl mb-4">🚀</span>
            <h3 className="text-lg font-bold mb-1">Aucun module complété</h3>
            <p className="text-sm text-base-content/50 mb-4">Commence par explorer le programme et suis les modules.</p>
            <Link to="/curriculum" className="btn btn-primary btn-sm">📚 Voir le programme</Link>
          </div>
        </div>
      )}
    </div>
    </>
  )
}
