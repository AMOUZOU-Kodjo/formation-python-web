export default function ProgressBar({ value, max = 100, label, color = "bg-primary", height = "h-2" }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div>
      {label && (
        <div className="flex justify-between text-xs text-base-content/50 mb-1">
          <span>{label}</span>
          <span>{pct}%</span>
        </div>
      )}
      <progress className={`progress progress-primary w-full ${height}`} value={value} max={max}></progress>
    </div>
  )
}
