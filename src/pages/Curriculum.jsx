import { Link } from 'react-router-dom'
import { MODULES, PARTS } from '../data/modules'
import { useProgress } from '../hooks/useProgress'
import { useAuth } from '../contexts/AuthContext'

export default function Curriculum() {
  const { user } = useAuth()
  const { getModuleProgress } = useProgress(user)

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-1">📚 Programme complet</h1>
      <p className="text-base-content/60 mb-8">36 modules répartis en 4 parties — du débutant à l'expert</p>

      <div className="space-y-8">
        {PARTS.map(part => {
          const mods = MODULES.filter(m => m.part === part.id)
          return (
            <div key={part.id}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-7 rounded" style={{ background: part.color }} />
                <div>
                  <h2 className="text-xl font-bold">Partie {part.id} : {part.title}</h2>
                  <p className="text-sm text-base-content/50">{part.desc}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {mods.map((m, idx) => {
                  const p = getModuleProgress(m.id)
                  return (
                    <Link key={m.id} to={`/module/${m.id}`} className="no-underline">
                      <div className="card bg-base-200 border border-base-300 hover:border-primary/50 transition-all hover:bg-base-100 cursor-pointer">
                        <div className="card-body p-4">
                          <div className="flex items-center gap-4">
                            <span className="text-3xl w-10 text-center shrink-0">{m.icon}</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="badge badge-sm" style={{ background: part.color, color: 'white', border: 'none' }}>
                                  Module {m.id.split('-')[0]}
                                </span>
                                <span className="text-xs text-base-content/40">{m.duration}</span>
                                {p.completed && <span className="badge badge-sm badge-success gap-1">✓ Fini</span>}
                              </div>
                              <h3 className="font-semibold text-base mt-1">{m.title}</h3>
                              <p className="text-sm text-base-content/60 mt-0.5 line-clamp-2">{m.desc}</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/30 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
