import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getModule, EXERCISES } from '../data/modules'
import { useAuth } from '../contexts/AuthContext'
import { useProgress } from '../hooks/useProgress'
import CodeEditor from '../components/CodeEditor'

function simulatePython(code, inputs) {
  const lines = code.split('\n')
  let inputIndex = 0
  const inputValues = inputs.split('\n').map(s => s.trim())
  const replaced = lines.map(line => {
    if (!line.includes('input(')) return line
    const val = inputValues[inputIndex] || ''
    inputIndex++
    const match = line.match(/input\(([^)]*)\)/)
    if (match) return line.replace(match[0], `'${val}'`)
    return line
  })
  const hasPrint = replaced.some(l => l.includes('print('))
  if (hasPrint) {
    const out = replaced.map(l => {
      const pm = l.match(/print\(['"](.*?)['"]\)/)
      if (pm) return pm[1]
      const pv = l.match(/print\((\w+)\)/)
      if (pv) return `[${pv[1]}]`
      return null
    }).filter(Boolean).join('\n')
    return { code: replaced.join('\n'), output: out || '> Exécutée', inputCount: inputIndex }
  }
  return { code: replaced.join('\n'), output: inputIndex > 0 ? '> Exécutée' : undefined, inputCount: inputIndex }
}

export default function Exercise() {
  const { moduleId } = useParams()
  const { user } = useAuth()
  const { markExerciseCompleted, getModuleProgress } = useProgress(user)
  const mod = getModule(moduleId)
  const exercise = EXERCISES[moduleId]
  const [code, setCode] = useState(exercise?.starterCode || '# Aucun exercice disponible')
  const [inputs, setInputs] = useState('')
  const [output, setOutput] = useState('')
  const [running, setRunning] = useState(false)
  const progress = getModuleProgress(moduleId)

  if (!mod || !exercise) {
    return (
      <div className="hero min-h-60">
        <div className="hero-content text-center">
          <div>
            <h2 className="text-xl font-bold">Aucun exercice pour ce module</h2>
            <Link to={`/module/${moduleId}`} className="link link-primary">Retour au cours</Link>
          </div>
        </div>
      </div>
    )
  }

  const runCode = () => {
    setRunning(true)
    setTimeout(() => {
      if (code.includes('input(')) {
        const result = simulatePython(code, inputs)
        let out = result.output || ''
        setOutput(out)
      } else if (code.includes('print(')) {
        setOutput('> Exécutée')
      } else {
        setOutput('> Code correct')
      }
      setRunning(false)
    }, 400)
  }

  return (<>
    <Helmet>
      <title>Exercice : {mod?.title || 'Module'} | Formation Python</title>
      <meta name="description" content={`Exercice pratique du module ${moduleId} — Formation Python.`} />
    </Helmet>
    <div className="max-w-6xl mx-auto">
      <Link to={`/module/${moduleId}`} className="link link-primary text-sm no-underline">← Retour au cours</Link>
      <div className="flex items-center justify-between mt-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold">💻 Exercice : {mod.title}</h1>
          {progress.exerciseCompleted && (
            <span className="badge badge-success mt-1">✓ Complété</span>
          )}
        </div>
      </div>

      <div className="alert alert-info mb-6">
        <span>📋 {exercise.instruction}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold">Éditeur Python</span>
            <div className="flex gap-2">
              <button onClick={() => setCode(exercise.starterCode)} className="btn btn-ghost btn-xs">Réinitialiser</button>
              <button onClick={() => setCode(exercise.solution)} className="btn btn-ghost btn-xs text-warning">Solution</button>
            </div>
          </div>
          <CodeEditor value={code} onChange={setCode} />

          {code.includes('input(') && (
            <div>
              <label className="text-xs font-semibold text-base-content/50 mb-1 block">
                📥 Entrées pour input() — une valeur par ligne
              </label>
              <textarea
                className="textarea textarea-bordered w-full font-mono text-sm"
                rows={3}
                placeholder={`Saisis les valeurs ici...\nPar exemple :\nAlice\n25`}
                value={inputs}
                onChange={e => setInputs(e.target.value)}
              />
            </div>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold">Sortie</span>
            <div className="flex gap-2">
              {!progress.exerciseCompleted && (
                <button onClick={() => markExerciseCompleted(moduleId)} className="btn btn-success btn-xs">
                  ✅ Marquer fait
                </button>
              )}
              <button onClick={runCode} disabled={running} className={`btn btn-sm ${running ? 'btn-disabled' : 'btn-success'}`}>
                {running ? <><span className="loading loading-spinner loading-xs"></span> Exécution...</> : '▶ Exécuter'}
              </button>
            </div>
          </div>
          <pre className={`bg-base-300 border border-base-200 rounded-xl p-4 min-h-64 text-sm font-mono overflow-auto whitespace-pre-wrap ${output.includes('⚠️') ? 'text-warning' : output.includes('📥') ? 'text-info' : 'text-success'}`}>
            {output || 'Cliquez sur Exécuter pour voir le résultat'}
          </pre>
        </div>
      </div>

      <div className="join w-full">
        <Link to={`/quiz/${moduleId}`} className="join-item btn btn-outline btn-sm gap-1">📝 Quiz du module</Link>
        <Link to={`/module/${moduleId}`} className="join-item btn btn-outline btn-sm gap-1">📖 Retour au cours</Link>
        <a href={`https://www.google.com/search?q=python+${encodeURIComponent(mod.title.split(' - ')[0])}+exercice`}
           target="_blank" rel="noopener noreferrer"
           className="join-item btn btn-ghost btn-sm gap-1 ml-auto">
          🔍 Aide en ligne
        </a>
      </div>
    </div>
    </>
  )
}
