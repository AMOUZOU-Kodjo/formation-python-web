import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getModule, MODULES, QUIZZES, EXERCISES } from '../data/modules'
import { useProgress } from '../hooks/useProgress'
import { useAuth } from '../contexts/AuthContext'

export default function ModulePage() {
  const { moduleId } = useParams()
  const { user } = useAuth()
  const mod = getModule(moduleId)
  const { getModuleProgress, markCompleted, getOverallProgress } = useProgress(user)
  const progress = getModuleProgress(moduleId)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const overall = getOverallProgress(MODULES.length)

  const idx = MODULES.findIndex(m => m.id === moduleId)
  const prev = idx > 0 ? MODULES[idx - 1] : null
  const next = idx < MODULES.length - 1 ? MODULES[idx + 1] : null
  const hasQuiz = !!QUIZZES[moduleId]
  const hasExercise = !!EXERCISES[moduleId]

  useEffect(() => {
    setLoading(true)
    fetch(`/cours/${moduleId}.md`)
      .then(r => r.ok ? r.text() : '# Contenu non disponible')
      .then(t => { setContent(t); setLoading(false) })
      .catch(() => { setContent('# Erreur de chargement'); setLoading(false) })
  }, [moduleId])

  if (!mod) return (
    <div className="hero min-h-60"><div className="hero-content text-center"><p className="text-base-content/60">Module introuvable</p></div></div>
  )

  const MarkdownComponents = {
    code({ node, inline, className, children, ...props }) {
      const lang = /language-(\w+)/.exec(className || '')
      const isPy = !inline && lang?.[1] === 'python'
      if (!inline && isPy) {
        return (
          <div className="mockup-code my-4 text-sm">
            <div className="px-4 pb-1 pt-2 text-xs text-base-content/40 border-b border-base-300">python</div>
            <pre className="px-4 py-3 overflow-x-auto"><code>{String(children).replace(/\n$/, '')}</code></pre>
          </div>
        )
      }
      if (!inline) {
        return (
          <pre className="bg-base-300 p-3 rounded-xl overflow-x-auto text-sm my-2 border border-base-200">
            <code>{String(children).replace(/\n$/, '')}</code>
          </pre>
        )
      }
      return <code className="bg-base-300 px-1.5 py-0.5 rounded text-sm text-secondary">{children}</code>
    },
    h1: ({ children }) => <h1 className="text-2xl font-bold mt-8 mb-4 pb-2 border-b border-base-300">{children}</h1>,
    h2: ({ children }) => <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">{children}</h2>,
    h3: ({ children }) => <h3 className="text-lg font-semibold mt-5 mb-2 text-base-content/80">{children}</h3>,
    p: ({ children }) => <p className="leading-relaxed my-2 text-base-content/80">{children}</p>,
    ul: ({ children }) => <ul className="list-disc list-inside space-y-1 my-2 text-base-content/80">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 my-2 text-base-content/80">{children}</ol>,
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    strong: ({ children }) => <strong className="text-base-content font-bold">{children}</strong>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-base-content/60 bg-base-300/50 py-2 pr-2 rounded-r-xl">{children}</blockquote>,
    table: ({ children }) => <div className="overflow-x-auto my-4"><table className="table table-sm table-zebra">{children}</table></div>,
    hr: () => <hr className="my-8 border-base-300" />,
    a: ({ href, children }) => <a href={href} className="link link-primary" target="_blank" rel="noopener noreferrer">{children}</a>,
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <Link to="/curriculum" className="link link-primary text-sm no-underline">← Retour au programme</Link>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <span className="text-5xl">{mod.icon}</span>
        <div>
          <div className="text-sm text-base-content/40 mb-1">Module {mod.id.split('-')[0]} • {mod.duration}</div>
          <h1 className="text-3xl font-bold">{mod.title}</h1>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <div className="badge badge-primary gap-1">Partie {mod.part}</div>
        <div className="badge badge-outline gap-1">{mod.duration}</div>
        {progress.completed && <div className="badge badge-success gap-1">✓ Complété</div>}
      </div>

      <progress className="progress progress-primary w-full mb-6" value={overall.completed} max={overall.total}></progress>

      <div className="flex flex-wrap gap-3 mb-6">
        {hasQuiz && (
          <Link to={`/quiz/${moduleId}`} className="btn btn-primary btn-sm gap-1">
            📝 Quiz
          </Link>
        )}
        {hasExercise && (
          <Link to={`/exercise/${moduleId}`} className="btn btn-outline btn-sm gap-1">
            💻 Exercice
          </Link>
        )}
      </div>

      <div className="card bg-base-200 border border-base-300">
        <div className="card-body p-6 md:p-8 text-base leading-relaxed">
          {loading ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={MarkdownComponents}>{content}</ReactMarkdown>
          )}
        </div>
      </div>

      {!progress.completed && (
        <div className="text-center my-8">
          <button onClick={() => markCompleted(moduleId)} className="btn btn-success btn-lg gap-2">
            ✅ Marquer comme terminé
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mt-8 pt-4 border-t border-base-300">
        {prev ? (
          <Link to={`/module/${prev.id}`} className="link link-primary no-underline gap-1 flex items-center">← {prev.short}</Link>
        ) : <div />}
        {next ? (
          <Link to={`/module/${next.id}`} className="link link-primary no-underline gap-1 flex items-center">{next.short} →</Link>
        ) : <div />}
      </div>
    </div>
  )
}
