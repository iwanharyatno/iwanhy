interface CodeBlockProps {
  children: React.ReactNode
  'data-language'?: string
}

export function CodeBlock({ children, 'data-language': lang }: CodeBlockProps) {
  return (
    <div className="relative my-6 overflow-hidden border border-border">
      {lang && (
        <span className="absolute right-3 top-2 select-none font-mono text-xs text-muted">
          {lang}
        </span>
      )}
      <pre className="overflow-x-auto bg-surface p-4 text-sm">
        {children}
      </pre>
    </div>
  )
}
