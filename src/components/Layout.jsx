import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MODULES } from '../data/modules'
import { useProgress } from '../hooks/useProgress'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

const NAV = [
  { path: '/', label: 'Accueil', icon: '🏠' },
  { path: '/curriculum', label: 'Programme', icon: '📚' },
  { path: '/progress', label: 'Progression', icon: '📊' },
]

export default function Layout({ children }) {
  const [sidebar, setSidebar] = useState(false)
  const [selectedPart, setSelectedPart] = useState(null)
  const { pathname } = useLocation()
  const { user, signOut, isConfigured, isAdmin } = useAuth()
  const { getOverallProgress, syncing, getModuleProgress } = useProgress(user)
  const stats = getOverallProgress(MODULES.length)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    if (!user?.id || !isConfigured) { setProfile(null); return }
    supabase.from('profiles').select('display_name, avatar_url').eq('id', user.id).single()
      .then(({ data }) => setProfile(data))
  }, [user?.id])

  const displayName = profile?.display_name || user?.email?.split('@')[0] || ''
  const avatarUrl = profile?.avatar_url

  const filteredModules = selectedPart
    ? MODULES.filter(m => m.part === selectedPart)
    : MODULES

  const partLabel = selectedPart
    ? `Partie ${selectedPart}`
    : 'Tous les modules'

  return (
    <div className="drawer lg:drawer-open">
      <input id="drawer" type="checkbox" className="drawer-toggle" checked={sidebar} onChange={() => setSidebar(!sidebar)} />

      <div className="drawer-content flex flex-col min-h-screen bg-base-300">
        <div className="navbar bg-base-100 border-b border-base-200 lg:hidden sticky top-0 z-30">
          <div className="flex-none">
            <label htmlFor="drawer" className="btn btn-square btn-ghost" onClick={() => setSidebar(!sidebar)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
          </div>
          <div className="flex-1">
            <Link to="/" className="text-lg font-bold text-primary">🐍 Formation Python</Link>
          </div>
          <div className="flex-none gap-1">
            {isConfigured && (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-sm btn-circle">
                  {user ? (
                    <div className="avatar">
                      {avatarUrl ? (
                        <div className="w-7 rounded-full">
                          <img src={avatarUrl} alt="" className="object-cover" />
                        </div>
                      ) : (
                        <div className="bg-primary text-neutral-content w-7 rounded-full text-xs font-bold">
                          {displayName.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
                    </svg>
                  )}
                </label>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box border border-base-300 w-44 shadow-lg">
                  {user ? (
                    <>
                      <li className="menu-title"><span>{displayName}</span></li>
                      <li><Link to="/profile" onClick={() => setSidebar(false)}>👤 Profil</Link></li>
                      <li><Link to="/progress" onClick={() => setSidebar(false)}>📊 Progression</Link></li>
                      {isAdmin && <li><Link to="/admin" onClick={() => setSidebar(false)}>⚙️ Admin</Link></li>}
                      <li><button onClick={signOut}>🚪 Déconnexion</button></li>
                    </>
                  ) : (
                    <>
                      <li><Link to="/login" onClick={() => setSidebar(false)}>🔐 Connexion</Link></li>
                      <li><Link to="/signup" onClick={() => setSidebar(false)}>📝 Inscription</Link></li>
                    </>
                  )}
                </ul>
              </div>
            )}
            <Link to="/progress" className="btn btn-ghost btn-sm gap-1">
              <span className="text-xs">{stats.percentage}%</span>
              <progress className="progress progress-primary w-12" value={stats.completed} max={stats.total}></progress>
              {syncing && <span className="loading loading-spinner loading-xs"></span>}
            </Link>
          </div>
        </div>

        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>

        <footer className="footer footer-center bg-base-200 border-t border-base-300 p-4 text-sm text-base-content/50">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4">
            <span>© {new Date().getFullYear()} Formation Python</span>
            <span className="hidden sm:inline">·</span>
            <span>Du débutant à l'expert — 36 modules</span>
            <span className="hidden sm:inline">·</span>
            <a href="https://github.com/AMOUZOU-Kodjo/formation-python-web" target="_blank" rel="noopener noreferrer" className="link link-hover">GitHub</a>
          </div>
        </footer>
      </div>

      <div className="drawer-side z-40">
        <label htmlFor="drawer" className="drawer-overlay" onClick={() => setSidebar(false)}></label>
        <aside className="bg-base-200 border-r border-base-300 w-72 min-h-full flex flex-col">
          <div className="p-4 border-b border-base-300">
            <Link to="/" onClick={() => setSidebar(false)} className="no-underline">
              <h1 className="text-xl font-bold text-primary">🐍 Formation Python</h1>
              <p className="text-xs text-base-content/50 mt-0.5">Du débutant à l'expert</p>
            </Link>
          </div>

          <ul className="menu menu-sm p-2 gap-0.5">
            {NAV.map(item => (
              <li key={item.path}>
                <Link to={item.path} onClick={() => setSidebar(false)}
                  className={`${pathname === item.path ? 'active text-primary' : ''}`}>
                  {item.icon} {item.label}
                </Link>
              </li>
            ))}
            {isAdmin && (
              <li>
                <Link to="/admin" onClick={() => setSidebar(false)}
                  className={`${pathname.startsWith('/admin') ? 'active text-primary' : ''}`}>
                  ⚙️ Admin
                </Link>
              </li>
            )}
          </ul>

          {isConfigured && (user ? (
            <div className="mx-2 my-2 p-3 bg-base-300 rounded-xl border border-base-300">
              <Link to="/profile" onClick={() => setSidebar(false)} className="no-underline">
                  <div className="flex items-center gap-3 mb-2">
                   <div className="avatar">
                     {avatarUrl ? (
                       <div className="w-10 rounded-full ring-2 ring-base-200">
                         <img src={avatarUrl} alt="" className="object-cover" />
                       </div>
                     ) : (
                       <div className="bg-primary text-neutral-content w-10 rounded-full text-base font-bold ring-2 ring-base-200">
                         {displayName.charAt(0).toUpperCase()}
                       </div>
                     )}
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="font-semibold text-sm truncate text-base-content">{displayName}</p>
                     <p className="text-xs text-base-content/40 truncate">{user.email}</p>
                   </div>
                 </div>
              </Link>
              <div className="flex items-center justify-between text-xs text-base-content/50 px-1 mb-2">
                <span>{stats.completed}/{stats.total} modules</span>
                <span>{stats.percentage}%</span>
              </div>
              <progress className="progress progress-primary w-full h-1.5 mb-3" value={stats.completed} max={stats.total} />
              <div className="flex gap-1">
                <Link to="/profile" onClick={() => setSidebar(false)} className="btn btn-primary btn-xs flex-1">Profil</Link>
                <button onClick={signOut} className="btn btn-ghost btn-xs text-error">Déconnexion</button>
              </div>
            </div>
          ) : (
            <div className="mx-2 my-2 p-3 bg-base-300 rounded-xl border border-base-300">
              <p className="text-xs font-semibold text-base-content/50 mb-2">Compte</p>
              <Link to="/login" onClick={() => setSidebar(false)} className="btn btn-primary btn-sm w-full mb-1.5">🔐 Connexion</Link>
              <Link to="/signup" onClick={() => setSidebar(false)} className="btn btn-outline btn-sm w-full">📝 Inscription</Link>
            </div>
          ))}

          <div className="divider my-1 mx-4 text-xs text-base-content/30">MODULES</div>

          <div className="flex gap-1 px-2 py-1 flex-wrap">
            <button onClick={() => setSelectedPart(null)}
              className={`btn btn-xs ${selectedPart === null ? 'btn-primary' : 'btn-ghost'}`}>
              Tous
            </button>
            {[1, 2, 3, 4].map(p => (
              <button key={p} onClick={() => setSelectedPart(p)}
                className={`btn btn-xs ${selectedPart === p ? 'btn-primary' : 'btn-ghost'}`}>
                {p}
              </button>
            ))}
          </div>

          <p className="text-xs text-base-content/30 px-4 pb-1">{partLabel} ({filteredModules.length})</p>

          <ul className="menu menu-sm p-2 gap-0.5 flex-1 overflow-y-auto">
            {filteredModules.map(m => {
              const p = getModuleProgress(m.id)
              return (
                <li key={m.id}>
                  <Link to={`/module/${m.id}`} onClick={() => setSidebar(false)}
                    className={`${pathname.includes(m.id) ? 'active text-primary' : ''} gap-2 ${p.completed ? 'opacity-60' : ''}`}>
                    <span className="text-base">{m.icon}</span>
                    <span className="truncate flex-1">{m.short}</span>
                    {p.completed && <span className="text-xs text-success">✓</span>}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="p-3 border-t border-base-300">
            <div className="flex items-center gap-2 text-xs text-base-content/50">
              <progress className="progress progress-primary w-full" value={stats.completed} max={stats.total}></progress>
              <span className="whitespace-nowrap">{stats.percentage}%</span>
              {syncing && <span className="loading loading-spinner loading-xs"></span>}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
