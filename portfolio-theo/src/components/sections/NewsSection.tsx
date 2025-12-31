'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  category: string;
}

// Fallback news items when RSS fails or for initial load
const fallbackNews: NewsItem[] = [
  {
    title: 'Shopify Winter Editions 2024',
    link: 'https://www.shopify.com/editions/winter2024',
    pubDate: new Date().toISOString(),
    description: 'Discover the latest features and updates in Shopify\'s Winter 2024 edition release.',
    category: 'Product Updates',
  },
  {
    title: 'AI-Powered Commerce: The Future of E-commerce',
    link: 'https://www.shopify.com/blog/ai-commerce',
    pubDate: new Date().toISOString(),
    description: 'How artificial intelligence is transforming online shopping experiences.',
    category: 'AI & Innovation',
  },
  {
    title: 'Checkout Extensibility: Customize Your Checkout',
    link: 'https://www.shopify.com/blog/checkout-extensibility',
    pubDate: new Date().toISOString(),
    description: 'New tools for merchants to customize and optimize their checkout experience.',
    category: 'Development',
  },
  {
    title: 'Shopify Markets: Sell Globally with Ease',
    link: 'https://www.shopify.com/markets',
    pubDate: new Date().toISOString(),
    description: 'Expand your business internationally with Shopify\'s cross-border commerce tools.',
    category: 'Global Commerce',
  },
];

export default function NewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [news, setNews] = useState<NewsItem[]>(fallbackNews);
  const [loading, setLoading] = useState(true);

  // Fetch Shopify news (using RSS to JSON proxy or fallback)
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Try to fetch from Shopify's RSS via a public RSS-to-JSON service
        const response = await fetch(
          'https://api.rss2json.com/v1/api.json?rss_url=https://www.shopify.com/blog/feed'
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.items && data.items.length > 0) {
            const formattedNews: NewsItem[] = data.items.slice(0, 4).map((item: {
              title: string;
              link: string;
              pubDate: string;
              description: string;
              categories?: string[];
            }) => ({
              title: item.title,
              link: item.link,
              pubDate: item.pubDate,
              description: item.description?.replace(/<[^>]*>/g, '').slice(0, 150) + '...',
              category: item.categories?.[0] || 'Shopify News',
            }));
            setNews(formattedNews);
          }
        }
      } catch (error) {
        console.log('Using fallback news data');
        // Keep fallback news on error
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // GSAP animations
  useEffect(() => {
    if (typeof window === 'undefined' || loading) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
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

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.news-card');
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [loading]);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return 'Recent';
    }
  };

  return (
    <section
      id="news"
      ref={sectionRef}
      className="section-container relative py-24 bg-gray-dark/30"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12">
          <span className="text-lime-neon text-sm font-semibold tracking-wider uppercase mb-4 block opacity-0">
            Stay Updated
          </span>
          <h2 className="heading-lg mb-6 opacity-0">
            Shopify <span className="gradient-text">News</span>
          </h2>
          <p className="body-lg max-w-2xl mx-auto opacity-0">
            Latest updates, features, and insights from the Shopify ecosystem.
          </p>
        </div>

        {/* News Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {news.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="news-card glass-card p-6 group hover:border-lime-neon/30 
                         hover:shadow-lime-glow transition-all duration-300 opacity-0"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="px-2 py-1 bg-lime-neon/10 text-lime-neon text-xs rounded">
                  {item.category}
                </span>
                <span className="text-xs text-gray-brand">
                  {formatDate(item.pubDate)}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-lime-neon transition-colors line-clamp-2">
                {item.title}
              </h3>
              
              <p className="text-sm text-gray-brand line-clamp-2 mb-4">
                {item.description}
              </p>
              
              <div className="flex items-center text-lime-neon text-sm font-medium group-hover:translate-x-1 transition-transform">
                Read More
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <a
            href="https://www.shopify.com/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            View All Shopify News
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
