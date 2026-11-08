type CalloutVariant = 'info' | 'warning' | 'tip'

interface CalloutProps {
  children: React.ReactNode
  type?: CalloutVariant
  title?: string
}

const variants: Record<CalloutVariant, string> = {
  info: 'border-l-border-strong',
  warning: 'border-l-accent',
  tip: 'border-l-success',
}

export function Callout({ children, type = 'info', title }: CalloutProps) {
  return (
    <div className={`my-6 border border-l-2 border-border bg-surface p-4 ${variants[type]}`}>
      {title ? (
        <p className="mb-1 font-mono text-xs uppercase tracking-wide text-muted">
          {title}
        </p>
      ) : null}
      <div className="text-sm leading-relaxed text-secondary">{children}</div>
    </div>
  )
}
