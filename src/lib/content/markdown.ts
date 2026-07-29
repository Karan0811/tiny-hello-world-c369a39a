import { marked } from "marked";
import type { MarkdownDoc } from "./types";

// Minimal YAML front-matter reader. Content front-matter is flat
// `key: value` pairs, which keeps the parser dependency-free.
export function parseFrontmatter(source: string): {
  frontmatter: Record<string, string>;
  body: string;
} {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source);
  if (!match) return { frontmatter: {}, body: source };

  const frontmatter: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line
      .slice(idx + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
    if (key) frontmatter[key] = value;
  }
  return { frontmatter, body: source.slice(match[0].length) };
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[`*_~]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractHeadings(body: string) {
  const headings: MarkdownDoc["headings"] = [];
  let inFence = false;
  for (const line of body.split(/\r?\n/)) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{2,3})\s+(.*)$/.exec(line);
    if (!match) continue;
    const text = match[2].trim();
    headings.push({ depth: match[1].length, text, id: slugifyHeading(text) });
  }
  return headings;
}

marked.use({
  gfm: true,
  breaks: false,
  renderer: {
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens);
      const id = slugifyHeading(text.replace(/<[^>]+>/g, ""));
      return `<h${depth} id="${id}">${text}</h${depth}>\n`;
    },
    code({ text, lang }) {
      const language = (lang || "text").split(/\s+/)[0];
      const escaped = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      return `<pre data-lang="${language}"><code class="language-${language}">${escaped}</code></pre>\n`;
    },
  },
});

/** Parse a markdown / MDX-flavoured markdown string into a render-ready doc. */
export function parseMarkdown(source: string): MarkdownDoc {
  const { frontmatter, body } = parseFrontmatter(source);
  return {
    frontmatter,
    body,
    html: marked.parse(body, { async: false }) as string,
    headings: extractHeadings(body),
  };
}

/** First paragraph of a markdown body — used for summaries and previews. */
export function firstParagraph(body: string): string {
  const cleaned = body
    .split(/\r?\n/)
    .filter((l) => !/^\s*(#|---|\||```|<)/.test(l))
    .join("\n");
  const para = cleaned.split(/\n\s*\n/).find((p) => p.trim().length > 40);
  return (para ?? "").replace(/\s+/g, " ").trim();
}
