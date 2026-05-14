import { pageSchema } from 'fumadocs-core/source/schema';
import { defineCollections, defineConfig } from 'fumadocs-mdx/config';
import { z } from 'zod';

// ---------------------------------------------------------------
// Blog collection
// dir: all .mdx files under content/blog/**
// ---------------------------------------------------------------
export const blogPosts = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  schema: pageSchema.extend({
    title:     z.string(),
    date:      z.string(),                        // ISO 8601: "2026-05-01"
    summary:   z.string(),
    tags:      z.array(z.string()).optional(),
    published: z.boolean().default(true),         // set false to draft
  }),
});

// ---------------------------------------------------------------
// Projects collection
// dir: all .mdx files under content/projects/**
// ---------------------------------------------------------------
export const projects = defineCollections({
  type: 'doc',
  dir: 'content/projects',
  schema: pageSchema.extend({
    title:      z.string(),
    summary:    z.string(),
    techStack:  z.array(z.string()),
    thumbnail:  z.string(),                       // Cloudflare R2 URL
    liveUrl:    z.string().url().optional(),
    repoUrl:    z.string().url().optional(),
    featured:   z.boolean().default(false),       // show on landing page
    order:      z.number().optional(),            // manual sort on /projects
  }),
});

export default defineConfig()