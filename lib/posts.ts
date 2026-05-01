import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

function convertMarkdownTables(markdown: string): string {
  const lines = markdown.split("\n");
  const result: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const nextLine = lines[i + 1] || "";
    if (/^\|.+\|/.test(line) && /^\|[-| :]+\|/.test(nextLine)) {
      const headers = line.split("|").slice(1, -1).map((c) => c.trim());
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && /^\|.+\|/.test(lines[i])) {
        rows.push(lines[i].split("|").slice(1, -1).map((c) => c.trim()));
        i++;
      }
      const thead = `<thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead>`;
      const tbody = rows.length
        ? `<tbody>${rows.map((row) => `<tr>${row.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody>`
        : "";
      result.push(`<table>${thead}${tbody}</table>`);
    } else {
      result.push(line);
      i++;
    }
  }
  return result.join("\n");
}

export type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  categoryLabel: string;
  tags: string[];
  content?: string;
};

const categoryLabels: Record<string, string> = {
  will: "遺言書・エンディングノート",
  "post-death": "死後事務委任",
  "nursing-home": "老人ホーム・施設",
  digital: "デジタル遺産",
  medical: "医療・介護の備え",
  basics: "終活の基本",
};

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((f) => f.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      return {
        slug,
        title: data.title || "",
        date: data.date || "",
        description: data.description || "",
        category: data.category || "basics",
        categoryLabel: categoryLabels[data.category] || "その他",
        tags: data.tags || [],
      };
    });
  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((p) => p.category === category);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const processedContent = convertMarkdownTables(content);
  const processed = await remark().use(html, { sanitize: false }).process(processedContent);
  return {
    slug,
    title: data.title || "",
    date: data.date || "",
    description: data.description || "",
    category: data.category || "basics",
    categoryLabel: categoryLabels[data.category] || "その他",
    tags: data.tags || [],
    content: processed.toString(),
  };
}
