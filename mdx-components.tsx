import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'
import { CodeBlock } from './components/mdx/CodeBlock'
import { Callout } from './components/mdx/Callout'

// Next.js picks this up automatically — no manual import needed in pages.
// To extend per-page, call useMDXComponents({ MyExtra: ... }) at the render site.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // --- Typography ---
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-primary mt-10 mb-4 tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-primary mt-8 mb-3 border-b border-border pb-2">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-primary mt-6 mb-2">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-secondary leading-7 mb-4">
        {children}
      </p>
    ),

    // --- Links ---
    // Internal links use Next.js Link; external open in new tab
    a: ({ href = '', children }) => {
      const isInternal = href.startsWith('/')
      return isInternal
        ? (
          <Link href={href} className="text-accent-cyan hover:underline underline-offset-4">
            {children}
          </Link>
        )
        : (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-cyan hover:underline underline-offset-4"
          >
            {children}
          </a>
        )
    },

    // --- Code ---
    // Fumadocs runs Shiki at build time — pre is just the container shell
    pre: ({ children, ...props }) => (
      <CodeBlock {...props}>{children}</CodeBlock>
    ),
    // Inline code
    code: ({ children }) => (
      <code className="bg-surface text-accent-cyan font-mono text-sm px-1.5 py-0.5 rounded border border-border">
        {children}
      </code>
    ),

    // --- Media ---
    img: ({ src, alt }) => (
      <Image
        src={src!}
        alt={alt ?? ''}
        width={800}
        height={450}
        className="rounded-card my-6 w-full object-cover border border-border"
      />
    ),

    // --- Block elements ---
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-accent-cyan pl-4 my-4 text-muted italic">
        {children}
      </blockquote>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-secondary space-y-1 mb-4 pl-2">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-secondary space-y-1 mb-4 pl-2">
        {children}
      </ol>
    ),
    hr: () => <hr className="border-border my-8" />,

    // --- Custom MDX components (usable directly in .mdx files) ---
    Callout,

    // Spread any page-level extras passed at render site
    ...components,
  }
}