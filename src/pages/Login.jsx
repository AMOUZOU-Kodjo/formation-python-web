import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const { signIn, isConfigured } = useAuth()
  const nav = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await signIn(email, password)
    if (error) setError(error.message)
    else nav(from, { replace: true })
    setLoading(false)
  }

  if (!isConfigured) {
    return (
      <div className="hero min-h-60">
        <div className="hero-content text-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">🔧 Configuration requise</h2>
            <p className="text-base-content/60 mb-4">Ajoute un fichier <code className="bg-base-300 px-2 py-0.5 rounded">.env</code> avec les clés Supabase.</p>
            <pre className="mockup-code text-left max-w-md mx-auto">
              <code className="px-4">VITE_SUPABASE_URL=votre-url</code>
              <code className="px-4">VITE_SUPABASE_ANON_KEY=votre-cle</code>
            </pre>
            <Link to="/" className="btn btn-primary btn-sm mt-4">Retour à l'accueil</Link>
          </div>
        </div>
      </div>
    )
  }

  return (<>
    <Helmet>
      <title>Connexion | Formation Python</title>
      <meta name="description" content="Connectez-vous à votre compte pour accéder à la formation Python complète." />
    </Helmet>
    <div className="hero min-h-80">
      <div className="hero-content w-full max-w-sm">
        <div className="card bg-base-200 border border-base-300 w-full">
          <div className="card-body">
            <h2 className="card-title text-2xl justify-center mb-2">🔐 Connexion</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="floating-label">
                <span>Email</span>
                <input type="email" className="input input-bordered w-full" value={email} onChange={e => setEmail(e.target.value)} required />
              </label>
              <label className="floating-label">
                <span>Mot de passe</span>
                <input type="password" className="input input-bordered w-full" value={password} onChange={e => setPassword(e.target.value)} required />
              </label>
              {error && <div className="alert alert-error text-sm py-2">{error}</div>}
              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? <span className="loading loading-spinner"></span> : 'Se connecter'}
              </button>
            </form>
            <p className="text-center text-sm text-base-content/50 mt-4">
              Pas encore de compte ? <Link to="/signup" className="link link-primary">S'inscrire</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
