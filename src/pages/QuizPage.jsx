import { Helmet } from 'react-helmet-async'
import { useParams, Link } from 'react-router-dom'
import { getModule, QUIZZES } from '../data/modules'
import { useProgress } from '../hooks/useProgress'
import { useAuth } from '../contexts/AuthContext'
import Quiz from '../components/Quiz'

export default function QuizPage() {
  const { moduleId } = useParams()
  const { user } = useAuth()
  const mod = getModule(moduleId)
  const questions = QUIZZES[moduleId]
  const { markQuizScore, getModuleProgress } = useProgress(user)
  const progress = getModuleProgress(moduleId)

  if (!mod || !questions) {
    return (
      <div className="hero min-h-60">
        <div className="hero-content text-center">
          <div>
            <h2 className="text-xl font-bold">Aucun quiz pour ce module</h2>
            <Link to={`/module/${moduleId}`} className="link link-primary">Retour au cours</Link>
          </div>
        </div>
      </div>
    )
  }

  return (<>
    <Helmet>
      <title>Quiz : {mod?.title || 'Module'} | Formation Python</title>
      <meta name="description" content={`Quiz du module ${moduleId} — Testez vos connaissances Python.`} />
    </Helmet>
    <div className="max-w-8xl mx-auto">
      <Link to={`/module/${moduleId}`} className="link link-primary text-sm no-underline">← Retour au cours</Link>
      <h1 className="text-2xl font-bold mt-3 mb-1">📝 Quiz : {mod.title}</h1>
      <p className="text-base-content/60 mb-6">{questions.length} questions • Validez vos connaissances</p>

      {progress.quizScore !== null && (
        <div className="alert alert-success mb-6">
          <span>✓ Dernier score : {progress.quizScore}%</span>
        </div>
      )}

      <Quiz questions={questions} onComplete={(score) => markQuizScore(moduleId, score)} />
    </div>
    </>
  )
}
