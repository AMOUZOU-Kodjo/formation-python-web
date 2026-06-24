import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Signup() {
  const { signUp, isConfigured } = useAuth()
  const nav = useNavigate()
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await signUp(email, password, displayName)
    if (error) setError(error.message)
    else setSuccess(true)
    setLoading(false)
  }

  if (!isConfigured) {
    return (
      <div className="hero min-h-[calc(100vh-10rem)]">
        <div className="hero-content text-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">🔧 Configuration requise</h2>
            <p className="text-base-content/60 mb-4">Configure Supabase dans .env</p>
            <Link to="/" className="btn btn-primary btn-sm">Retour</Link>
          </div>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="hero min-h-[calc(100vh-10rem)]">
        <div className="hero-content text-center">
          <div>
            <div className="text-5xl mb-4">📧</div>
            <h2 className="text-2xl font-bold mb-2">Inscription réussie !</h2>
            <p className="text-base-content/60 mb-4">Vérifie tes emails pour confirmer ton compte.</p>
            <Link to="/login" className="btn btn-primary">Se connecter</Link>
          </div>
        </div>
      </div>
    )
  }

  return (<>
    <Helmet>
      <title>Inscription | Formation Python</title>
      <meta name="description" content="Inscrivez-vous pour suivre la formation Python complète de 36 modules avec suivi de progression." />
    </Helmet>
    <div className="hero min-h-[calc(100vh-10rem)]">
      <div className="hero-content w-full max-w-sm">
        <div className="card bg-base-200 border border-base-300 w-full">
          <div className="card-body">
            <h2 className="card-title text-2xl justify-center mb-2">📝 Inscription</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="floating-label">
                <span>Nom d'affichage</span>
                <input type="text" className="input input-bordered w-full" value={displayName} onChange={e => setDisplayName(e.target.value)} required />
              </label>
              <label className="floating-label">
                <span>Email</span>
                <input type="email" className="input input-bordered w-full" value={email} onChange={e => setEmail(e.target.value)} required />
              </label>
              <label className="floating-label">
                <span>Mot de passe (6+ caractères)</span>
                <input type="password" className="input input-bordered w-full" value={password} onChange={e => setPassword(e.target.value)} minLength={6} required />
              </label>
              {error && <div className="alert alert-error text-sm py-2">{error}</div>}
              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? <span className="loading loading-spinner"></span> : 'Créer mon compte'}
              </button>
            </form>
            <p className="text-center text-sm text-base-content/50 mt-4">
              Déjà un compte ? <Link to="/login" className="link link-primary">Se connecter</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
