// RSS Feed Sources Configuration
export interface FeedSource {
  name: string;
  url: string;
  topics: string[];
}

export const feeds: FeedSource[] = [
  // =====================
  // SHOPIFY & E-COMMERCE
  // =====================
  {
    name: 'Shopify Blog',
    url: 'https://www.shopify.com/blog/feed',
    topics: ['shopify', 'ecommerce', 'development'],
  },
  {
    name: 'Shopify Engineering',
    url: 'https://shopify.engineering/feed',
    topics: ['shopify', 'development', 'performance'],
  },
  {
    name: 'Shopify Partners',
    url: 'https://www.shopify.com/partners/blog/feed',
    topics: ['shopify', 'development', 'business'],
  },
  {
    name: 'BigCommerce Blog',
    url: 'https://www.bigcommerce.com/blog/feed/',
    topics: ['ecommerce', 'cro'],
  },
  {
    name: 'Practical Ecommerce',
    url: 'https://www.practicalecommerce.com/feed',
    topics: ['ecommerce', 'shopify', 'cro'],
  },

  // =====================
  // SEO & CRO
  // =====================
  {
    name: 'Moz Blog',
    url: 'https://moz.com/blog/feed',
    topics: ['seo'],
  },
  {
    name: 'Search Engine Journal',
    url: 'https://www.searchenginejournal.com/feed/',
    topics: ['seo'],
  },
  {
    name: 'CXL',
    url: 'https://cxl.com/blog/feed/',
    topics: ['cro', 'conversion'],
  },
  {
    name: 'Baymard Institute',
    url: 'https://baymard.com/blog.rss',
    topics: ['cro', 'ecommerce', 'ux'],
  },
  {
    name: 'Ahrefs Blog',
    url: 'https://ahrefs.com/blog/feed/',
    topics: ['seo'],
  },

  // =====================
  // PERFORMANCE & WEB DEV
  // =====================
  {
    name: 'web.dev',
    url: 'https://web.dev/feed.xml',
    topics: ['speed', 'performance', 'development'],
  },
  {
    name: 'Smashing Magazine',
    url: 'https://www.smashingmagazine.com/feed/',
    topics: ['development', 'performance', 'design'],
  },
  {
    name: 'CSS-Tricks',
    url: 'https://css-tricks.com/feed/',
    topics: ['development', 'performance'],
  },

  // =====================
  // AI & LLMs
  // =====================
  {
    name: 'Anthropic News',
    url: 'https://www.anthropic.com/feed.xml',
    topics: ['ai', 'llm'],
  },
  {
    name: 'OpenAI Blog',
    url: 'https://openai.com/blog/rss/',
    topics: ['ai', 'llm'],
  },
  {
    name: 'Hugging Face Blog',
    url: 'https://huggingface.co/blog/feed.xml',
    topics: ['ai', 'llm', 'development'],
  },
  {
    name: 'LangChain Blog',
    url: 'https://blog.langchain.dev/rss/',
    topics: ['ai', 'llm', 'development'],
  },
  {
    name: 'Vercel Blog',
    url: 'https://vercel.com/blog/rss.xml',
    topics: ['ai', 'development', 'performance'],
  },
  {
    name: 'The Rundown AI',
    url: 'https://www.therundown.ai/rss',
    topics: ['ai', 'llm'],
  },
  {
    name: 'AI News (Google)',
    url: 'https://blog.google/technology/ai/rss/',
    topics: ['ai', 'llm'],
  },
];

// Topic keywords for filtering
export const topicKeywords: Record<string, string[]> = {
  seo: ['seo', 'search engine', 'ranking', 'google', 'indexing', 'keywords', 'backlinks', 'serp', 'organic traffic'],
  cro: ['conversion', 'cro', 'a/b test', 'optimization', 'checkout', 'cart abandonment', 'user experience', 'bounce rate', 'funnel'],
  speed: ['speed', 'performance', 'pagespeed', 'core web vitals', 'lcp', 'fid', 'cls', 'lighthouse', 'load time', 'ttfb', 'tti'],
  ai: ['ai', 'artificial intelligence', 'machine learning', 'llm', 'gpt', 'claude', 'automation', 'chatbot', 'langchain', 'rag', 'embeddings', 'vector'],
  shopify: ['shopify', 'liquid', 'theme', 'storefront', 'checkout', 'ecommerce', 'e-commerce', 'store', 'merchant', 'headless'],
  development: ['javascript', 'typescript', 'react', 'next.js', 'api', 'code', 'developer', 'frontend', 'backend', 'node'],
};
