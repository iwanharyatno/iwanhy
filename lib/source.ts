import { blogPosts, projects } from "collections/server";
import { loader } from "fumadocs-core/source";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";

export const blogPostSource = loader({
  baseUrl: "/journal",
  source: toFumadocsSource(blogPosts, []),
  i18n: {
    languages: ["id", "en"],
    defaultLanguage: "en",
  },
});

export const projectSource = loader({
  baseUrl: "/projects",
  source: toFumadocsSource(projects, []),
  i18n: {
    languages: ["id", "en"],
    defaultLanguage: "en",
  },
});
