import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MODULES } from '../data/modules'
import { useProgress } from '../hooks/useProgress'
import { useAuth } from '../contexts/AuthContext'

const NAV = [
  { path: '/', label: 'Accueil', icon: '🏠' },
  { path: '/curriculum', label: 'Programme', icon: '📚' },
  { path: '/progress', label: 'Progression', icon: '📊' },
]

export default function Layout({ children }) {
  const [sidebar, setSidebar] = useState(false)
  const { pathname } = useLocation()
  const { user, signOut, isConfigured } = useAuth()
  const { getOverallProgress, syncing } = useProgress(user)
  const stats = getOverallProgress(MODULES.length)

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
                    <div className="avatar placeholder">
                      <div className="bg-primary text-neutral-content w-7 rounded-full text-xs font-bold">
                        {user.email?.charAt(0).toUpperCase()}
                      </div>
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
                      <li className="menu-title"><span>{user.email?.split('@')[0]}</span></li>
                      <li><Link to="/profile" onClick={() => setSidebar(false)}>👤 Profil</Link></li>
                      <li><Link to="/progress" onClick={() => setSidebar(false)}>📊 Progression</Link></li>
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
          </ul>

          {isConfigured && (
            <div className="px-3 py-1">
              <div className="divider my-1 text-xs text-base-content/30">COMPTE</div>
              {user ? (
                <div className="flex items-center gap-2 px-2 py-1.5">
                  <div className="avatar placeholder">
                    <div className="bg-primary text-neutral-content w-7 rounded-full text-xs font-bold">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{user.email}</p>
                    <Link to="/profile" className="text-xs link link-primary" onClick={() => setSidebar(false)}>Profil</Link>
                  </div>
                  <button onClick={signOut} className="btn btn-ghost btn-xs">🚪</button>
                </div>
              ) : (
                <div className="flex gap-1 px-2 py-1">
                  <Link to="/login" className="btn btn-primary btn-xs flex-1" onClick={() => setSidebar(false)}>Connexion</Link>
                  <Link to="/signup" className="btn btn-outline btn-xs flex-1" onClick={() => setSidebar(false)}>Inscription</Link>
                </div>
              )}
            </div>
          )}

          <div className="divider my-1 mx-4 text-xs text-base-content/30">MODULES</div>

          <ul className="menu menu-sm p-2 gap-0.5 flex-1 overflow-y-auto">
            {MODULES.map(m => (
              <li key={m.id}>
                <Link to={`/module/${m.id}`} onClick={() => setSidebar(false)}
                  className={`${pathname.includes(m.id) ? 'active text-primary' : ''} gap-2`}>
                  <span className="text-base">{m.icon}</span>
                  <span className="truncate">{m.short}</span>
                </Link>
              </li>
            ))}
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
