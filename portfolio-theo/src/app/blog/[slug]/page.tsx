'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllSlugs, getPostBySlug } from '@/lib/content';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

// Reading Progress Bar Component
function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setProgress(Math.min(scrolled, 100));
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-silver-900 z-50">
      <div
        className="h-full bg-lime-neon transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Enhanced markdown to HTML conversion with optimal typography
  const htmlContent = post.content
    .split('\n')
    .map((line) => {
      // Headers with better spacing
      if (line.startsWith('### ')) {
        return `<h3 class="text-xl font-semibold text-white mt-12 mb-4">${line.slice(4)}</h3>`;
      }
      if (line.startsWith('## ')) {
        return `<h2 class="text-2xl font-bold text-white mt-14 mb-6">${line.slice(3)}</h2>`;
      }
      if (line.startsWith('# ')) {
        return `<h1 class="text-3xl font-bold text-white mt-14 mb-6">${line.slice(2)}</h1>`;
      }
      
      // Blockquotes as pull quotes
      if (line.startsWith('> ')) {
        return `<blockquote class="border-l-4 border-lime-neon pl-6 my-8 text-xl italic text-silver-200">${line.slice(2)}</blockquote>`;
      }
      
      // Code blocks
      if (line.startsWith('```')) {
        return line === '```' 
          ? '</pre></code>' 
          : '<code><pre class="bg-silver-900/60 border border-silver-800 p-6 rounded-lg overflow-x-auto text-sm text-silver-200 my-8 font-mono">';
      }
      
      // Bullet points with better spacing
      if (line.startsWith('- ')) {
        return `<li class="text-silver-300 text-lg leading-relaxed ml-6 mb-3 list-disc">${line.slice(2)}</li>`;
      }
      
      // Numbered lists
      if (/^\d+\.\s/.test(line)) {
        const content = line.replace(/^\d+\.\s/, '');
        return `<li class="text-silver-300 text-lg leading-relaxed ml-6 mb-3 list-decimal">${content}</li>`;
      }
      
      // Bold text
      const boldProcessed = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
      
      // Inline code
      const codeProcessed = boldProcessed.replace(/`([^`]+)`/g, '<code class="bg-silver-800/60 px-2 py-1 rounded text-lime-neon text-[0.95em] border border-silver-700 font-mono">$1</code>');
      
      // Links
      const linkProcessed = codeProcessed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-lime-neon underline underline-offset-4 hover:text-lime-dark transition-colors" target="_blank" rel="noopener noreferrer">$1</a>');
      
      // Empty lines
      if (line.trim() === '') {
        return '';
      }
      
      // Horizontal rules as section dividers
      if (line.trim() === '---') {
        return '<hr class="border-0 h-px bg-gradient-to-r from-transparent via-silver-700 to-transparent my-10" />';
      }
      
      // Regular paragraphs - optimized for reading
      return `<p class="text-silver-300 text-lg md:text-xl leading-[1.8] mb-6">${linkProcessed}</p>`;
    })
    .filter(line => line !== '')
    .join('\n');

  // Extract key insights from the content for the takeaways box
  const keyTakeaways = post.keyTakeaways || [
    "Key insights from this article",
  ];

  return (
    <>
      <ReadingProgress />
      
      <main className="min-h-screen bg-black pt-24 pb-20 px-4 md:px-8">
        <article className="max-w-2xl mx-auto">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-silver-400 hover:text-lime-neon transition-colors mb-10 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            {/* Meta info */}
            <div className="flex items-center gap-4 mb-5">
              <span className="px-3 py-1.5 bg-lime-neon/10 text-lime-neon text-xs font-medium rounded border border-lime-neon/20">
                {post.category}
              </span>
              <span className="text-sm text-silver-500">{post.readTime}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-silver-300 text-xl md:text-2xl leading-relaxed mb-6">
              {post.description}
            </p>

            {/* Author & Date */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-silver-400 pb-8 border-b border-silver-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-lime-neon/20 flex items-center justify-center">
                  <span className="text-lime-neon font-semibold text-sm">T</span>
                </div>
                <span>Theo Daudebourg</span>
              </div>
              <span className="text-silver-600">•</span>
              <span>
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <div className="flex gap-2 ml-auto">
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="tag text-[10px]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* Key Takeaways Box */}
          {keyTakeaways && keyTakeaways.length > 0 && (
            <div className="bg-lime-neon/5 border-l-4 border-lime-neon rounded-r-lg p-6 mb-12">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-lime-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Key Takeaways
              </h2>
              <ul className="space-y-3">
                {keyTakeaways.map((takeaway: string, index: number) => (
                  <li key={index} className="flex items-start gap-3 text-silver-300">
                    <span className="text-lime-neon mt-1">→</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Content */}
          <div
            className="article-prose"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Original Source Attribution */}
          {post.originalSource && (
            <div className="mt-12 pt-8 border-t border-silver-800">
              <p className="text-silver-500 text-sm">
                Originally published on{' '}
                <a 
                  href={post.originalLink} 
                  className="text-lime-neon hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {post.originalSource}
                </a>
              </p>
            </div>
          )}

          {/* Share Section */}
          <div className="mt-12 flex items-center gap-4">
            <span className="text-silver-500 text-sm">Share this article:</span>
            <div className="flex gap-2">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://theodaudebourg.com/blog/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-silver-800/50 border border-silver-700 flex items-center justify-center text-silver-400 hover:text-lime-neon hover:border-lime-neon/30 transition-all"
                aria-label="Share on Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://theodaudebourg.com/blog/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-silver-800/50 border border-silver-700 flex items-center justify-center text-silver-400 hover:text-lime-neon hover:border-lime-neon/30 transition-all"
                aria-label="Share on LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="mt-16 glass-card p-8 md:p-10 text-center">
            <p className="text-white text-xl md:text-2xl font-semibold mb-3">
              Want faster results from your store?
            </p>
            <p className="text-silver-400 mb-8 max-w-md mx-auto">
              I'll analyze your Shopify store and tell you exactly what's slowing you down — and what's worth fixing first.
            </p>
            <Link href="/#contact" className="btn-primary inline-flex items-center gap-2">
              Get My Free Speed Audit
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
