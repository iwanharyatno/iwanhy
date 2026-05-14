import { blogPosts, projects } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';

// Each loader creates a typed Source object with:
//   .getPages()          → all entries
//   .getPage([slug])     → single entry by slug
//   .generateParams()    → static params for generateStaticParams()

export const blogPostSource = loader({
  baseUrl: '/journal',
  source: toFumadocsSource(blogPosts, []),
})

export const projectSource = loader({
  baseUrl: '/projects',
  source: toFumadocsSource(projects, [])
})