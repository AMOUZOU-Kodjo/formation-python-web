import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const ADMIN_EMAIL = 'phipsipy@gmail.com'
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const isAdmin = user?.email === ADMIN_EMAIL

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false)
      return
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription?.unsubscribe()
  }, [])

  const signUp = useCallback(async (email, password, displayName) => {
    if (!isSupabaseConfigured()) return { error: new Error('Supabase non configuré. Configure .env') }
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (!error && data.user) {
      await supabase.from('profiles').upsert({ id: data.user.id, display_name: displayName, email })
    }
    return { data, error }
  }, [])

  const signIn = useCallback(async (email, password) => {
    if (!isSupabaseConfigured()) return { error: new Error('Supabase non configuré. Configure .env') }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error }
  }, [])

  const signOut = useCallback(async () => {
    if (!isSupabaseConfigured()) return
    await supabase.auth.signOut()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut, isAdmin, isConfigured: isSupabaseConfigured() }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth doit être utilisé dans AuthProvider')
  return ctx
}
