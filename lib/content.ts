import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

import { frontmatterSchema } from "@/lib/schema";
import type { PageContent } from "@/lib/types";

const CONTENT_ROOT = path.join(process.cwd(), "content", "pages");

async function walk(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  const nested = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return walk(entryPath);
      }

      if (entry.isFile() && entry.name.endsWith(".mdx")) {
        return [entryPath];
      }

      return [] as string[];
    }),
  );

  return nested.flat();
}

let contentCache: PageContent[] | null = null;

export async function loadAllPages() {
  const shouldCache = process.env.NODE_ENV === "production";

  if (shouldCache && contentCache) {
    return contentCache;
  }

  const files = await walk(CONTENT_ROOT);
  const pages = await Promise.all(
    files.map(async (filePath) => {
      const fileContents = await fs.readFile(filePath, "utf8");
      const parsed = matter(fileContents);
      const frontmatter = frontmatterSchema.parse(parsed.data);

      const page: PageContent = {
        route: frontmatter.route,
        meta: frontmatter.meta,
        layoutFamily: frontmatter.layoutFamily,
        layoutTone: frontmatter.layoutTone,
        motionPreset: frontmatter.motionPreset,
        mediaMode: frontmatter.mediaMode,
        hero: frontmatter.hero,
        statement: frontmatter.statement,
        metrics: frontmatter.metrics,
        serviceGroups: frontmatter.serviceGroups,
        approach: frontmatter.approach,
        audiences: frontmatter.audiences,
        detail: frontmatter.detail,
        methodProfile: frontmatter.methodProfile,
        contact: frontmatter.contact,
        relatedLinks: frontmatter.relatedLinks,
        body: parsed.content.trim() || undefined,
      };

      return page;
    }),
  );

  const sortedPages = pages.sort((a, b) => a.route.localeCompare(b.route));

  if (shouldCache) {
    contentCache = sortedPages;
  }

  return sortedPages;
}

export async function getAllRoutes() {
  const pages = await loadAllPages();
  return pages.map((page) => page.route);
}

export async function getPageByRoute(route: string) {
  const pages = await loadAllPages();
  return pages.find((page) => page.route === route);
}

export async function getNavItems() {
  const pages = await loadAllPages();

  const preferredOrder: Array<{ route: string; label: string }> = [
    { route: "/", label: "Home" },
    { route: "/services", label: "Services" },
    { route: "/contact-us", label: "Contact" },
  ];

  return preferredOrder
    .map((entry) => {
      const page = pages.find((candidate) => candidate.route === entry.route);
      if (!page) {
        return null;
      }

      return {
        href: page.route,
        label: entry.label,
      };
    })
    .filter((item): item is { href: string; label: string } => Boolean(item));
}
