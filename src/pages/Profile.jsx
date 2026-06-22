import { useAuth } from '../contexts/AuthContext'
import { MODULES } from '../data/modules'
import { useProgress } from '../hooks/useProgress'
import { Link } from 'react-router-dom'

export default function Profile() {
  const { user, signOut, isConfigured } = useAuth()
  const { getOverallProgress } = useProgress(user)
  const stats = getOverallProgress(MODULES.length)

  if (!isConfigured) {
    return (
      <div className="hero min-h-60">
        <div className="hero-content text-center">
          <p className="text-base-content/60">Mode local — pas de compte utilisateur.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card bg-base-200 border border-base-300">
        <div className="card-body items-center text-center p-8">
          <div className="avatar placeholder mb-4">
            <div className="bg-primary text-neutral-content w-20 rounded-full">
              <span className="text-3xl">{user?.email?.charAt(0).toUpperCase() || '?'}</span>
            </div>
          </div>
          <h2 className="card-title text-2xl">{user?.user_metadata?.display_name || user?.email?.split('@')[0]}</h2>
          <p className="text-base-content/60">{user?.email}</p>

          <div className="grid grid-cols-3 gap-4 my-6 w-full max-w-sm">
            <div className="stat px-2 py-3 bg-base-300 rounded-xl">
              <div className="stat-title text-xs">Modules</div>
              <div className="stat-value text-lg text-primary">{stats.completed}/{stats.total}</div>
            </div>
            <div className="stat px-2 py-3 bg-base-300 rounded-xl">
              <div className="stat-title text-xs">Progression</div>
              <div className="stat-value text-lg text-success">{stats.percentage}%</div>
            </div>
            <div className="stat px-2 py-3 bg-base-300 rounded-xl">
              <div className="stat-title text-xs">Membre</div>
              <div className="stat-value text-lg" style={{ fontSize: 14 }}>
                {new Date(user?.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Link to="/progress" className="btn btn-primary btn-sm">📊 Voir ma progression</Link>
            <button onClick={signOut} className="btn btn-outline btn-error btn-sm">Déconnexion</button>
          </div>
        </div>
      </div>
    </div>
  )
}
