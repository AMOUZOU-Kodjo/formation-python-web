import { useState, useCallback, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const STORAGE_KEY = 'formation-python-progress'

function loadLocal() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : {}
  } catch {
    return {}
  }
}

function saveLocal(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function useProgress(user = null) {
  const [progress, setProgress] = useState(loadLocal)
  const [syncing, setSyncing] = useState(false)

  useEffect(() => {
    if (!user || !isSupabaseConfigured()) return
    loadFromSupabase(user.id)
  }, [user?.id])

  async function loadFromSupabase(userId) {
    setSyncing(true)
    const { data } = await supabase
      .from('course_progress')
      .select('*')
      .eq('user_id', userId)
    if (data && data.length > 0) {
      const merged = { ...loadLocal() }
      data.forEach(row => {
        merged[row.module_id] = {
          completed: row.completed || false,
          completedAt: row.completed_at,
          quizScore: row.quiz_score,
          quizCompletedAt: row.quiz_completed_at,
          exerciseCompleted: row.exercise_completed || false,
          exerciseCompletedAt: row.exercise_completed_at,
        }
      })
      setProgress(merged)
      saveLocal(merged)
    }
    setSyncing(false)
  }

  async function syncToSupabase(moduleId, updates) {
    if (!user || !isSupabaseConfigured()) return
    const existing = progress[moduleId] || {}
    await supabase.from('course_progress').upsert({
      user_id: user.id,
      module_id: moduleId,
      completed: updates.completed ?? existing.completed ?? false,
      completed_at: updates.completedAt ?? existing.completedAt ?? null,
      quiz_score: updates.quizScore ?? existing.quizScore ?? null,
      quiz_completed_at: updates.quizCompletedAt ?? existing.quizCompletedAt ?? null,
      exercise_completed: updates.exerciseCompleted ?? existing.exerciseCompleted ?? false,
      exercise_completed_at: updates.exerciseCompletedAt ?? existing.exerciseCompletedAt ?? null,
    }, { onConflict: 'user_id,module_id' })
  }

  const markCompleted = useCallback((moduleId) => {
    const now = new Date().toISOString()
    setProgress(prev => {
      const next = { ...prev, [moduleId]: { ...prev[moduleId], completed: true, completedAt: now } }
      saveLocal(next)
      syncToSupabase(moduleId, { completed: true, completedAt: now })
      return next
    })
  }, [user])

  const markQuizScore = useCallback((moduleId, score) => {
    const now = new Date().toISOString()
    setProgress(prev => {
      const next = { ...prev, [moduleId]: { ...prev[moduleId], quizScore: score, quizCompletedAt: now } }
      saveLocal(next)
      syncToSupabase(moduleId, { quizScore: score, quizCompletedAt: now })
      return next
    })
  }, [user])

  const markExerciseCompleted = useCallback((moduleId) => {
    const now = new Date().toISOString()
    setProgress(prev => {
      const next = { ...prev, [moduleId]: { ...prev[moduleId], exerciseCompleted: true, exerciseCompletedAt: now } }
      saveLocal(next)
      syncToSupabase(moduleId, { exerciseCompleted: true, exerciseCompletedAt: now })
      return next
    })
  }, [user])

  const getModuleProgress = useCallback((moduleId) => {
    return progress[moduleId] || { completed: false, quizScore: null, exerciseCompleted: false }
  }, [progress])

  const getOverallProgress = useCallback((total) => {
    const completed = Object.values(progress).filter(p => p.completed).length
    return { completed, total, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 }
  }, [progress])

  const resetProgress = useCallback(async () => {
    localStorage.removeItem(STORAGE_KEY)
    setProgress({})
    if (user && isSupabaseConfigured()) {
      await supabase.from('course_progress').delete().eq('user_id', user.id)
    }
  }, [user])

  return {
    progress, syncing, markCompleted, markQuizScore, markExerciseCompleted,
    getModuleProgress, getOverallProgress, resetProgress
  }
}
