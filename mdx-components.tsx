import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'
import { CodeBlock } from './components/mdx/CodeBlock'
import { Callout } from './components/mdx/Callout'

const baseComponents: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="mb-4 mt-10 text-3xl font-bold tracking-tight text-primary">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-3 mt-8 border-b border-border pb-2 text-2xl font-semibold text-primary">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-2 mt-6 text-xl font-semibold text-primary">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 leading-7 text-secondary">
      {children}
    </p>
  ),

  a: ({ href = '', children }) => {
    const isInternal = href.startsWith('/')
    return isInternal
      ? (
        <Link href={href} className="text-accent hover:underline underline-offset-4">
          {children}
        </Link>
      )
      : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline underline-offset-4"
        >
          {children}
        </a>
      )
  },

  pre: ({ children, ...props }) => (
    <CodeBlock {...props}>{children}</CodeBlock>
  ),
  code: ({ children }) => (
    <code className="border border-border bg-surface px-1.5 py-0.5 font-mono text-sm text-accent">
      {children}
    </code>
  ),

  img: ({ src, alt }) =>
    src ? (
      <Image
        src={src}
        alt={alt ?? ''}
        width={800}
        height={450}
        className="my-6 w-full border border-border object-cover"
      />
    ) : null,

  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-2 border-accent pl-4 text-muted">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 list-disc space-y-1 pl-6 text-secondary">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 list-decimal space-y-1 pl-6 text-secondary">
      {children}
    </ol>
  ),
  hr: () => <hr className="my-8 border-border" />,
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto border border-border">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-border px-3 py-2 text-left font-semibold text-primary">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-border px-3 py-2 text-secondary">{children}</td>
  ),

  Callout,
}

export const mdxComponents = baseComponents

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...baseComponents,
    ...components,
  }
}
