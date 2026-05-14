interface CodeBlockProps {
  children: React.ReactNode
  'data-language'?: string
}

// Fumadocs + Shiki pass syntax-highlighted HTML as children.
// This component is purely the visual shell.
export function CodeBlock({ children, 'data-language': lang }: CodeBlockProps) {
  return (
    <div className="relative my-6 rounded-card border border-border overflow-hidden">
      {lang && (
        <span className="absolute top-3 right-4 text-xs font-mono text-muted select-none">
          {lang}
        </span>
      )}
      <pre className="overflow-x-auto p-4 text-sm bg-[#0d1117]">
        {children}
      </pre>
    </div>
  )
}