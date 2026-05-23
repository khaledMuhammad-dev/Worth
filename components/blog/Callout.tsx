interface CalloutProps {
  type?: 'info' | 'warning' | 'tip'
  children: React.ReactNode
}

const styles = {
  info: { bg: 'bg-sky-50', border: 'border-sky-400', icon: 'ℹ️' },
  warning: { bg: 'bg-amber-50', border: 'border-amber-400', icon: '⚠️' },
  tip: { bg: 'bg-orange-50', border: 'border-primary', icon: '💡' },
} as const

export default function Callout({ type = 'info', children }: CalloutProps) {
  const style = styles[type]

  return (
    <div className={`my-6 flex gap-3 rounded-xl border-s-4 p-4 ${style.bg} ${style.border}`}>
      <span className="shrink-0 text-xl">{style.icon}</span>
      <div className="text-sm leading-relaxed text-foreground">{children}</div>
    </div>
  )
}
