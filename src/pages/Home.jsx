import { Link } from 'react-router-dom'
import { MODULES, PARTS } from '../data/modules'

export default function Home() {
  return (
    <div className="max-w-8xl mx-auto">
      <div className="hero py-12">
        <div className="hero-content text-center">
          <div>
            <span className="text-6xl mb-4 block">🐍</span>
            <h1 className="text-4xl md:text-5xl font-extrabold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-green-400">
                Formation Python
              </span>
            </h1>
            <p className="text-lg text-base-content/60 mt-2 max-w-xl mx-auto">
              Du débutant à l'expert — 36 modules progressifs
            </p>
            <Link to="/curriculum" className="btn btn-primary mt-6 gap-2">
              Voir le programme complet →
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { value: MODULES.length, label: 'Modules', color: 'text-violet-500' },
          { value: PARTS.length, label: 'Parties', color: 'text-green-500' },
          { value: '36+', label: "Heures d'apprentissage", color: 'text-orange-500' },
          { value: '100%', label: 'Pratique', color: 'text-blue-500' },
        ].map(s => (
          <div key={s.label} className="stat bg-base-200 rounded-xl border border-base-300">
            <div className={`stat-value ${s.color}`}>{s.value}</div>
            <div className="stat-desc">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">📚 Parcours complet</h2>
        {PARTS.map(part => {
          const mods = MODULES.filter(m => m.part === part.id)
          return (
            <div key={part.id} className="card bg-base-200 border border-base-300">
              <div className="card-body p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-6 rounded" style={{ background: part.color }} />
                  <div>
                    <h3 className="card-title text-lg">Partie {part.id} : {part.title}</h3>
                    <p className="text-sm text-base-content/50">{part.desc} — {mods.length} modules</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {mods.map(m => (
                    <Link key={m.id} to={`/module/${m.id}`} className="badge badge-outline gap-1 py-3 px-3 hover:badge-primary transition-colors no-underline">
                      {m.icon} {m.short}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
