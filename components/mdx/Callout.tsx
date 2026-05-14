type CalloutVariant = 'info' | 'warning' | 'tip'

interface CalloutProps {
  children: React.ReactNode
  type?: CalloutVariant
  title?: string
}

const variants: Record<CalloutVariant, { border: string; label: string }> = {
  info:    { border: 'border-accent-blue',  label: 'Info'    },
  warning: { border: 'border-yellow-400',   label: 'Warning' },
  tip:     { border: 'border-accent-cyan',  label: 'Tip'     },
}

export function Callout({ children, type = 'info', title }: CalloutProps) {
  const { border, label } = variants[type]
  return (
    <div className={`glass border-l-2 ${border} p-4 my-6`}>
      <p className="text-xs font-mono text-muted uppercase tracking-widest mb-1">
        {title ?? label}
      </p>
      <div className="text-secondary text-sm leading-relaxed">{children}</div>
    </div>
  )
}