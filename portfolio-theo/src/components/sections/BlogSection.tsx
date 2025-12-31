'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
  { id: 'all', label: 'All' },
  { id: 'shopify', label: 'Shopify & CRO' },
  { id: 'seo', label: 'SEO' },
  { id: 'ai', label: 'AI & LLMs' },
];

const categoryKeywords: Record<string, string[]> = {
  shopify: ['shopify', 'cro', 'conversion', 'speed', 'theme', 'performance'],
  seo: ['seo', 'search', 'ranking', 'google', 'keywords'],
  ai: ['ai', 'llm', 'artificial intelligence', 'automation', 'claude', 'gpt'],
};

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || loading) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [loading]);

  const filteredPosts = posts.filter((post) => {
    if (activeCategory === 'all') return true;
    const keywords = categoryKeywords[activeCategory] || [];
    const searchText = `${post.title} ${post.description} ${post.category} ${post.tags.join(' ')}`.toLowerCase();
    return keywords.some((kw) => searchText.includes(kw.toLowerCase()));
  });

  // Show max 4 posts on homepage
  const displayPosts = filteredPosts.slice(0, 4);

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="py-24 px-4 md:px-8 relative bg-gray-dark/30"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10">
          <span className="tag tag-lime mb-4 inline-block">Insights</span>
          <h2 className="heading-lg text-white mb-4">
            Latest from the Blog
          </h2>
          <p className="text-silver-400 max-w-lg mx-auto">
            Curated thoughts on e-commerce, performance, and AI.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-lime-neon text-black'
                  : 'glass-card text-silver-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-silver-500">Loading articles...</p>
          </div>
        ) : displayPosts.length === 0 ? (
          <div className="text-center glass-card p-8">
            <p className="text-silver-400 mb-2">
              {activeCategory === 'all' 
                ? 'No articles yet.' 
                : `No ${categories.find(c => c.id === activeCategory)?.label} articles yet.`}
            </p>
            <p className="text-silver-500 text-sm">
              Coming soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="glass-card p-5 group hover:border-lime-neon/30 
                           hover:shadow-lime-glow transition-all duration-300 block"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="px-2 py-0.5 bg-lime-neon/10 text-lime-neon text-[10px] rounded">
                    {post.category}
                  </span>
                  <span className="text-[10px] text-silver-500">{post.readTime}</span>
                </div>

                <h3 className="text-base font-semibold text-white mb-2 group-hover:text-lime-neon transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-silver-500 text-xs line-clamp-2 mb-3">
                  {post.description}
                </p>

                <div className="flex items-center text-lime-neon text-xs font-medium">
                  Read Article
                  <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* View All Link */}
        {posts.length > 0 && (
          <div className="text-center mt-8">
            <Link href="/blog" className="btn-secondary inline-flex items-center gap-2">
              View All Articles
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
