# Dynamic Blog Content Generation System

## Overview

An automated AI-powered content pipeline that fetches news, rewrites with brand voice, SEO-optimizes, and publishes to blog + social media.

**Powered by Grok API (xAI)**

---

## Quick Start

```bash
# 1. Add your API key to .env.local
GROK_API_KEY=xai-xxxxxxxxxxxxx

# 2. Generate content from RSS feeds
npm run content:daily -- --articles 2 --days 7

# 3. Generate from any URL
npm run content:from-url -- "https://example.com/article" --social

# 4. Review copy for brand voice
npm run content:copy-review -- content/blog/<article>.mdx

# 5. Approve and publish
npm run content:review -- approve <slug>
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     CONTENT SOURCES                              │
├─────────────────────────────────────────────────────────────────┤
│  RSS Feeds (17 sources)     │  Manual URL Input                 │
│  - Shopify, Moz, Ahrefs     │  - Any blog article               │
│  - OpenAI, Anthropic blogs  │  - X/Twitter posts                │
│  - web.dev, Vercel          │  - Industry content               │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     GROK AI PROCESSING                           │
├─────────────────────────────────────────────────────────────────┤
│  1. Fetch + Deduplicate                                         │
│  2. Rewrite with brand voice                                    │
│  3. SEO optimize (keywords, headers, snippets)                  │
│  4. Validate (no emojis, tone check)                            │
│  5. Save as draft for review                                    │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     OUTPUT                                       │
├─────────────────────────────────────────────────────────────────┤
│  Blog (MDX)         │  LinkedIn           │  Twitter            │
│  SEO-optimized      │  Formatted with     │  Single tweet       │
│  H2/H3 headers      │  hooks + bullets    │  with link          │
│  Key Takeaways      │  CTA question       │                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## Commands

### Generate from RSS Feeds
```bash
npm run content:daily -- [options]

Options:
  --articles <n>   Number to generate (default: 2)
  --topics <list>  ai,shopify,seo,cro,speed,development
  --days <n>       Look back N days (default: 3)
  --dry-run        Preview without generating
```

### Generate from URL
```bash
npm run content:from-url -- <url> [options]

Options:
  --title <text>   Custom title
  --social         Also generate LinkedIn + Twitter

Examples:
  npm run content:from-url -- "https://blog.shopify.com/article"
  npm run content:from-url -- "https://x.com/user/status/123" --title "AI Trends" --social
```

### Copy Review (Brand Voice Check)
```bash
npm run content:copy-review -- <file>
npm run content:copy-review -- --drafts    # Review all drafts
```

### Review Queue
```bash
npm run content:review -- list              # List drafts
npm run content:review -- approve <slug>    # Publish
npm run content:review -- reject <slug>     # Archive
npm run content:review -- clean <slug>      # Fix AI artifacts
```

---

## SEO Optimization

All blog posts are automatically optimized:

| Feature | Implementation |
|---------|---------------|
| **Keywords** | Primary keyword in title, first paragraph |
| **Meta** | Description under 155 chars with keyword |
| **Headers** | H2/H3 structure for content hierarchy |
| **Snippets** | "Key Takeaways" + "What You Can Do" sections |
| **Internal Links** | HTML comments suggesting link opportunities |

---

## Brand Voice Rules

Content is rewritten to match:

- **No emojis** or special Unicode characters
- **First-person** ("I") perspective
- **Specific metrics** (20-30%, not "significant")
- **Honest tone** ("Admit limitations upfront...")
- **Short sentences** and paragraphs
- **Contractions** (I'm, don't, it's)

---

## File Structure

```
scripts/content-generator/
├── run-daily.ts          # RSS → Blog + Social
├── from-url.ts           # URL → Blog + Social
├── copy-review.ts        # Brand voice check
├── review-queue.ts       # Draft management
├── curate.ts             # Legacy curation
├── ARCHITECTURE.md       # This file
├── feeds/sources.ts      # 17 RSS feeds
├── prompts/curation.ts   # SEO + brand prompts
└── utils/
    ├── grok.ts           # Grok API
    ├── deduplication.ts  # Hash-based dedup
    └── validator.ts      # Quality checks

content/
├── blog/*.mdx            # Generated blog posts
└── social/               # LinkedIn + Twitter
```

---

## Workflow

```
1. Find Content
   ├── RSS: npm run content:daily -- --dry-run
   └── URL: Copy interesting article/tweet

2. Generate
   ├── RSS: npm run content:daily -- --articles 2
   └── URL: npm run content:from-url -- "URL" --social

3. Review
   └── npm run content:copy-review -- content/blog/<slug>.mdx

4. Publish
   └── npm run content:review -- approve <slug>

5. Deploy
   └── git push → Vercel auto-deploys
```

---

## Environment Variables

```bash
# .env.local
GROK_API_KEY=xai-xxxxxxxxxxxxx
```

---

## RSS Feed Sources (17)

| Category | Sources |
|----------|---------|
| Shopify | Shopify Blog, Engineering, Partners |
| SEO | Moz, Search Engine Journal, Ahrefs |
| CRO | CXL, Baymard Institute |
| Performance | web.dev, Smashing Magazine |
| AI | Anthropic, OpenAI, Hugging Face, LangChain, Vercel, The Rundown AI |
