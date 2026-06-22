import { useState } from 'react'

export default function Quiz({ questions, onComplete }) {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleAnswer = (qIdx, cIdx) => {
    if (submitted) return
    setAnswers(prev => ({ ...prev, [qIdx]: cIdx }))
  }

  const handleSubmit = () => {
    const correct = questions.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0)
    const score = Math.round((correct / questions.length) * 100)
    setSubmitted(true)
    onComplete?.(score)
  }

  const score = submitted
    ? Math.round((questions.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0) / questions.length) * 100)
    : null

  return (
    <div>
      {questions.map((q, qi) => (
        <div key={qi} className="card bg-base-200 border border-base-300 mb-4">
          <div className="card-body p-5">
            <p className="font-semibold mb-3">{qi + 1}. {q.q}</p>
            <div className="space-y-2">
              {q.choices.map((c, ci) => {
                const sel = answers[qi] === ci
                const correct = qi in answers && ci === q.correct
                const wrong = sel && ci !== q.correct
                let cls = 'border border-base-300'
                if (submitted) {
                  if (correct) cls = 'border border-success bg-success/10'
                  else if (wrong) cls = 'border border-error bg-error/10'
                  else cls = 'border border-base-300 opacity-60'
                } else if (sel) {
                  cls = 'border border-primary bg-primary/10'
                }
                return (
                  <div key={ci} onClick={() => handleAnswer(qi, ci)}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${cls} ${submitted ? 'cursor-default' : 'hover:border-primary/50'}`}>
                    <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 ${sel ? 'border-primary bg-primary text-white' : 'border-base-content/30'}`}>
                      {String.fromCharCode(65 + ci)}
                    </div>
                    <span>{c}</span>
                    {submitted && correct && <span className="text-success ml-auto">✓</span>}
                    {submitted && wrong && <span className="text-error ml-auto">✗</span>}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      ))}

      {!submitted ? (
        <button onClick={handleSubmit} className="btn btn-primary gap-2">
          Vérifier mes réponses
        </button>
      ) : (
        <div className="card bg-base-200 border border-base-300 mt-6">
          <div className="card-body items-center text-center py-8">
            <div className={`text-5xl font-black ${score >= 80 ? 'text-success' : score >= 50 ? 'text-warning' : 'text-error'}`}>
              {score}%
            </div>
            <p className="text-base-content/60 mt-2">
              {score === 100 ? '🎉 Parfait !' : score >= 80 ? '🌟 Très bien !' : score >= 50 ? '📖 Continuez à réviser.' : '🔄 Revoyez le cours.'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
