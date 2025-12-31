'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  tags: string[];
  readTime: string;
}

const categories = [
  { id: 'all', label: 'All', keywords: [] },
  { id: 'shopify', label: 'Shopify & CRO', keywords: ['shopify', 'cro', 'conversion', 'speed', 'theme', 'performance'] },
  { id: 'seo', label: 'SEO', keywords: ['seo', 'search', 'ranking', 'google', 'keywords'] },
  { id: 'ai', label: 'AI & LLMs', keywords: ['ai', 'llm', 'artificial intelligence', 'automation', 'claude', 'gpt'] },
];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch posts from API route
    fetch('/api/blog')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // Filter posts by category
  const filteredPosts = posts.filter((post) => {
    if (activeCategory === 'all') return true;
    
    const category = categories.find((c) => c.id === activeCategory);
    if (!category) return true;

    const searchText = `${post.title} ${post.description} ${post.category} ${post.tags.join(' ')}`.toLowerCase();
    return category.keywords.some((kw) => searchText.includes(kw.toLowerCase()));
  });

  return (
    <main className="min-h-screen bg-black pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="tag tag-lime mb-4 inline-block">Blog</span>
          <h1 className="heading-lg text-white mb-4">
            What I've Learned From 70+ Store Audits
          </h1>
          <p className="text-silver-400 max-w-lg mx-auto">
            Speed, SEO, and conversions - the stuff that actually moves the needle.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-lime-neon text-black'
                  : 'glass-card text-silver-400 hover:text-white hover:border-lime-neon/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center glass-card p-12">
            <p className="text-silver-400">Loading articles...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center glass-card p-12">
            <p className="text-silver-400 mb-4">
              {activeCategory === 'all' 
                ? 'No posts yet.' 
                : `No ${categories.find(c => c.id === activeCategory)?.label} posts yet.`}
            </p>
            <p className="text-silver-500 text-sm">
              Run the content generator to create articles.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="glass-card p-6 group hover:border-lime-neon/30 
                           hover:shadow-lime-glow transition-all duration-300 block"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <span className="px-2 py-1 bg-lime-neon/10 text-lime-neon text-xs rounded">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-silver-500">
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-lime-neon transition-colors">
                  {post.title}
                </h2>

                <p className="text-silver-400 text-sm mb-4 line-clamp-2">
                  {post.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tag text-[10px]">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center text-lime-neon text-sm font-medium group-hover:translate-x-1 transition-transform">
                  Read Article
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Back Link */}
        <div className="text-center mt-12">
          <Link href="/" className="btn-secondary inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
