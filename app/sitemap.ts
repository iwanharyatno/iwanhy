import { MetadataRoute } from 'next'
import { projectSource, blogPostSource } from '@/lib/source'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://iwanhy.my.id'
  const locales = ['en', 'id']

  // Helper utility to construct cross-language alternate properties for search crawlers
  const getAlternates = (relativePath: string) => {
    const languages: Record<string, string> = {}
    locales.forEach((lng) => {
      languages[lng] = `${baseUrl}/${lng}${relativePath}`
    })
    return { languages }
  }

  // --- 1. Static Core App Pathways ---
  const staticPaths = ['', '/journal', '/projects']
  const staticEntries = locales.flatMap((lng) => 
    staticPaths.map((path) => ({
      url: `${baseUrl}/${lng}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1.0 : 0.8,
      alternates: getAlternates(path)
    }))
  )

  // --- 2. Dynamic Project Documentation Sheets (Fumadocs) ---
  const projectMDXFiles = projectSource.getPages('en')
  const projectEntries = locales.flatMap((lng) => 
    projectMDXFiles.map((page) => {
      // FIX: Strip the leading locale prefix if Fumadocs included it (e.g., /en/projects -> /projects)
      const cleanPath = page.url.replace(/^\/(en|id)/, '')
      
      return {
        url: `${baseUrl}/${lng}${cleanPath}`,
        lastModified: page.data.date ? new Date(page.data.date) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: getAlternates(cleanPath)
      }
    })
  )

  // --- 3. Dynamic Journal Posts (Fumadocs) ---
  const journalMDXFiles = blogPostSource.getPages('en')
  const journalEntries = locales.flatMap((lng) => 
    journalMDXFiles.map((page) => {
      // FIX: Strip the leading locale prefix here as well
      const cleanPath = page.url.replace(/^\/(en|id)/, '')
      
      return {
        url: `${baseUrl}/${lng}${cleanPath}`,
        lastModified: page.data.date ? new Date(page.data.date) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
        alternates: getAlternates(cleanPath)
      }
    })
  )

  return [...staticEntries, ...projectEntries, ...journalEntries]
}