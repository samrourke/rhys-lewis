import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export function getPostSlugs() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((f) => /\.mdx?$/.test(f));
}

export function getPostBySlug(slug) {
  const realSlug = slug.replace(/\.mdx?$/, "");
  const mdxPath = path.join(POSTS_DIR, `${realSlug}.mdx`);
  const mdPath = path.join(POSTS_DIR, `${realSlug}.md`);

  let file;
  if (fs.existsSync(mdxPath)) file = fs.readFileSync(mdxPath, "utf8");
  else if (fs.existsSync(mdPath)) file = fs.readFileSync(mdPath, "utf8");
  else throw new Error(`Post not found: ${slug}`);

  const { data, content } = matter(file);
  const meta = {
    slug: data.slug ?? realSlug,
    title: data.title ?? realSlug,
    date: data.date ?? new Date().toISOString(),
    excerpt: data.excerpt ?? "",
    tags: data.tags ?? [],
    cover: data.cover ?? "",
    draft: !!data.draft,
  };

  return { meta, content };
}

export function getAllPosts() {
  return getPostSlugs()
    .map((s) => getPostBySlug(s))
    .filter((p) => !p.meta.draft)
    .sort((a, b) => +new Date(b.meta.date) - +new Date(a.meta.date));
}
