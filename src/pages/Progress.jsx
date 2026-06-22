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

  return (
    <div className="max-w-8xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">📊 Ma progression</h1>
          <p className="text-base-content/60">Suivez votre avancement dans la formation</p>
        </div>
        <button onClick={resetProgress} className="btn btn-outline btn-error btn-sm">Réinitialiser</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Complétés', value: `${overall.completed}/${overall.total}`, color: 'text-success' },
          { label: 'Progression', value: `${overall.percentage}%`, color: 'text-primary' },
          { label: 'Quiz réussis', value: withQuiz.length, color: 'text-warning' },
          { label: 'Restants', value: overall.total - overall.completed, color: 'text-error' },
        ].map(s => (
          <div key={s.label} className="stat bg-base-200 rounded-xl border border-base-300">
            <div className={`stat-value ${s.color}`}>{s.value}</div>
            <div className="stat-desc">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mb-10">
        <div className="flex justify-between text-sm mb-2">
          <span>Progression globale</span>
          <span>{overall.percentage}%</span>
        </div>
        <progress className="progress progress-primary w-full h-4" value={overall.completed} max={overall.total}></progress>
      </div>

      <div className="space-y-6">
        {PARTS.map(part => {
          const mods = MODULES.filter(m => m.part === part.id)
          const done = mods.filter(m => getModuleProgress(m.id).completed).length
          return (
            <div key={part.id} className="card bg-base-200 border border-base-300">
              <div className="card-body p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-5 rounded" style={{ background: part.color }} />
                    <span className="font-semibold">Partie {part.id} : {part.title}</span>
                  </div>
                  <span className="text-sm text-base-content/50">{done}/{mods.length}</span>
                </div>
                <progress className="progress w-full" style={{ background: '#333' }} value={done} max={mods.length}></progress>
                <div className="flex flex-wrap gap-2 mt-3">
                  {mods.map(m => {
                    const p = getModuleProgress(m.id)
                    return (
                      <Link key={m.id} to={`/module/${m.id}`} className={`badge gap-1 py-2.5 px-3 no-underline ${p.completed ? 'badge-success' : 'badge-outline'}`}>
                        {m.icon} {m.short} {p.completed ? ' ✓' : ''}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {completedModules.length > 0 && (
        <div className="card bg-base-200 border border-base-300 mt-8">
          <div className="card-body">
            <h3 className="card-title text-lg">🏆 Modules terminés ({completedModules.length})</h3>
            <div className="space-y-2">
              {completedModules.map(m => {
                const p = getModuleProgress(m.id)
                return (
                  <div key={m.id} className="flex items-center gap-2 text-sm">
                    <span className="text-success">✓</span>
                    <span>{m.icon}</span>
                    <Link to={`/module/${m.id}`} className="link link-hover">{m.title}</Link>
                    {p.quizScore !== null && (
                      <span className={`badge badge-sm ${p.quizScore >= 80 ? 'badge-success' : 'badge-warning'}`}>
                        Quiz: {p.quizScore}%
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
