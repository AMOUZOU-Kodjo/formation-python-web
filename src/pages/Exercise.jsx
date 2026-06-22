import { useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getModule, EXERCISES } from '../data/modules'
import CodeEditor from '../components/CodeEditor'

export default function Exercise() {
  const { moduleId } = useParams()
  const mod = getModule(moduleId)
  const exercise = EXERCISES[moduleId]
  const [code, setCode] = useState(exercise?.starterCode || '# Aucun exercice disponible')
  const [output, setOutput] = useState('')
  const [running, setRunning] = useState(false)

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
    setOutput('Exécution...')
    setTimeout(() => {
      const hasInput = code.includes('input(')
      const hasPrint = code.includes('print')
      setOutput(hasInput
        ? '⚠️ input() non disponible en navigateur.\nUtilise des valeurs en dur pour tester.'
        : hasPrint
          ? '> Exécuté avec succès (simulation)\n> Installe Python en local : python exercice.py'
          : '> Code correct\n> Aucune sortie print() détectée')
      setRunning(false)
    }, 600)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Link to={`/module/${moduleId}`} className="link link-primary text-sm no-underline">← Retour au cours</Link>
      <h1 className="text-2xl font-bold mt-3 mb-6">💻 Exercice : {mod.title}</h1>

      <div className="alert alert-info mb-6">
        <span>📋 {exercise.instruction}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold">Éditeur Python</span>
            <div className="flex gap-2">
              <button onClick={() => setCode(exercise.starterCode)} className="btn btn-ghost btn-xs">Réinitialiser</button>
              <button onClick={() => setCode(exercise.solution)} className="btn btn-ghost btn-xs text-warning">Solution</button>
            </div>
          </div>
          <CodeEditor value={code} onChange={setCode} />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold">Sortie</span>
            <button onClick={runCode} disabled={running} className={`btn btn-sm ${running ? 'btn-disabled' : 'btn-success'}`}>
              {running ? <><span className="loading loading-spinner loading-xs"></span> Exécution...</> : '▶ Exécuter'}
            </button>
          </div>
          <pre className={`bg-base-300 border border-base-200 rounded-xl p-4 min-h-64 text-sm font-mono overflow-auto ${output.includes('⚠️') ? 'text-warning' : 'text-success'}`}>
            {output || 'Cliquez sur Exécuter pour voir le résultat'}
          </pre>
        </div>
      </div>

      <div className="alert bg-base-200 border border-base-300 text-sm">
        <span>💡 Copie le code dans un fichier <code className="bg-base-300 px-1 rounded">.py</code> et lance <code className="bg-base-300 px-1 rounded">python fichier.py</code> pour exécuter en local.</span>
      </div>
    </div>
  )
}
