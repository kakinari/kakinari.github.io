import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getPostsGroupedByCategory(posts: Post[]) {
  const grouped = new Map<string, Post[]>();

  for (const post of posts) {
    const category = post.category || "未分類";
    const current = grouped.get(category) || [];
    current.push(post);
    grouped.set(category, current);
  }

  return Array.from(grouped.entries()).map(([category, postsInCategory]) => ({
    category,
    posts: postsInCategory,
  }));
}

export function getCategories(posts: Post[]) {
  return Array.from(new Set(posts.map((post) => post.category || "未分類"))).sort(
    (a, b) => a.localeCompare(b, "ja"),
  );
}
