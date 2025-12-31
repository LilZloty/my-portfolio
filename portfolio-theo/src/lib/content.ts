import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  tags: string[];
  readTime: string;
  content: string;
  // Optional enhanced fields
  keyTakeaways?: string[];
  originalSource?: string;
  originalLink?: string;
}

const contentDirectory = path.join(process.cwd(), 'content', 'blog');

export function getAllPosts(): BlogPost[] {
  // Check if directory exists
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);
  const posts = files
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, '');
      return getPostBySlug(slug);
    })
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    // Try .mdx first, then .md
    let filePath = path.join(contentDirectory, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(contentDirectory, `${slug}.md`);
    }
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      description: data.description || '',
      category: data.category || 'Uncategorized',
      tags: data.tags || [],
      readTime: data.readTime || '5 min read',
      content,
      // Optional enhanced fields
      keyTakeaways: data.keyTakeaways,
      originalSource: data.originalSource,
      originalLink: data.originalLink,
    };
  } catch {
    return null;
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  return fs
    .readdirSync(contentDirectory)
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => file.replace(/\.mdx?$/, ''));
}
