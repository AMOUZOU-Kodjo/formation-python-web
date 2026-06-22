import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function AdminRoute({ children }) {
  const { user, loading, isAdmin, isConfigured } = useAuth()

  if (!isConfigured) return (
    <div className="hero min-h-60">
      <div className="hero-content text-center">
        <p className="text-base-content/60">Supabase non configuré.</p>
      </div>
    </div>
  )

  if (loading) return (
    <div className="flex justify-center py-20">
      <span className="loading loading-spinner loading-lg text-primary" />
    </div>
  )

  if (!user) return <Navigate to="/login" replace />
  if (!isAdmin) return (
    <div className="hero min-h-60">
      <div className="hero-content text-center">
        <div>
          <span className="text-5xl block mb-4">🔒</span>
          <h2 className="text-2xl font-bold mb-2">Accès restreint</h2>
          <p className="text-base-content/60 mb-4">Seul l'administrateur peut accéder à cette page.</p>
          <a href="/" className="btn btn-primary btn-sm">Retour à l'accueil</a>
        </div>
      </div>
    </div>
  )

  return children
}
