import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { MODULES, PARTS } from '../data/modules'
import { useProgress } from '../hooks/useProgress'
import { useAuth } from '../contexts/AuthContext'

export default function Curriculum() {
  const { user } = useAuth()
  const { getModuleProgress, getOverallProgress } = useProgress(user)
  const overall = getOverallProgress(MODULES.length)

  return (<>
    <Helmet>
      <title>Programme Pédagogique | Formation Python</title>
      <meta name="description" content="Découvrez le programme complet des 36 modules de la formation Python : variables, POO, async, data science, API REST et projet final." />
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
              📚 Programme complet
            </span>
          </h1>
          <p className="text-base-content/60 max-w-xl mx-auto">
            36 modules répartis en 4 parties — du débutant à l'expert
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Modules', value: MODULES.length, icon: '📚', grad: 'from-violet-500 to-purple-600' },
          { label: 'Parties', value: PARTS.length, icon: '📂', grad: 'from-sky-500 to-blue-600' },
          { label: 'Complétés', value: user ? overall.completed : '—', icon: '✅', grad: 'from-emerald-500 to-green-600' },
          { label: 'Progression', value: user ? `${overall.percentage}%` : '—', icon: '📊', grad: 'from-amber-500 to-orange-600' },
        ].map(s => (
          <div key={s.label} className="stat bg-base-200 border border-base-300 rounded-xl py-3 text-center">
            <div className="text-xl">{s.icon}</div>
            <div className={`text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${s.grad}`}>
              {s.value}
            </div>
            <div className="text-xs text-base-content/50">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Parts */}
      <div className="space-y-6">
        {PARTS.map(part => {
          const mods = MODULES.filter(m => m.part === part.id)
          const done = user ? mods.filter(m => getModuleProgress(m.id).completed).length : 0
          return (
            <div key={part.id} className="card bg-base-200 border border-base-300 overflow-hidden hover:border-primary/30 transition-all duration-300">
              <div className="card-body p-0">
                {/* Part header */}
                <div className="flex items-center gap-4 px-5 pt-5 pb-3">
                  <div className="w-1 h-10 rounded-full shrink-0" style={{ background: part.color }} />
                  <div className="flex-1">
                    <div className="text-xs text-base-content/40 font-medium tracking-wide uppercase">Partie {part.id}</div>
                    <h2 className="text-xl font-bold">{part.title}</h2>
                    <p className="text-sm text-base-content/50">{part.desc}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-lg font-bold" style={{ color: part.color }}>{done}/{mods.length}</div>
                    <div className="text-xs text-base-content/40">modules</div>
                  </div>
                </div>

                {/* Part progress bar */}
                <div className="px-5 pb-3">
                  <progress className="progress w-full h-1.5" style={{ background: '#333' }} value={done} max={mods.length} />
                </div>

                {/* Module list */}
                <div className="divide-y divide-base-300 border-t border-base-300">
                  {mods.map(m => {
                    const p = user ? getModuleProgress(m.id) : { completed: false }
                    return (
                      <Link key={m.id} to={`/module/${m.id}`} className="flex items-center gap-4 px-5 py-3 no-underline hover:bg-base-300/50 transition-colors group">
                        <span className="text-2xl w-8 text-center shrink-0">{m.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="badge badge-xs" style={{ background: part.color, color: 'white', border: 'none' }}>
                              {m.id.split('-')[0]}
                            </span>
                            <span className="text-xs text-base-content/40">{m.duration}</span>
                            {p.completed && <span className="badge badge-xs badge-success gap-0.5">✓</span>}
                          </div>
                          <h3 className="font-semibold text-sm mt-0.5 group-hover:text-primary transition-colors">{m.title}</h3>
                          <p className="text-xs text-base-content/50 mt-0.5 line-clamp-1">{m.desc}</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-base-content/20 shrink-0 group-hover:text-primary transition-colors" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
    </>
  )
}
