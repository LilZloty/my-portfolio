#!/usr/bin/env node

/**
 * Generate Content from URL
 * 
 * Fetches content from a URL and rewrites it in your brand voice.
 * 
 * Usage:
 *   npm run content:from-url -- <url>
 *   npm run content:from-url -- <url> --title "Custom Title"
 * 
 * Examples:
 *   npm run content:from-url -- https://example.com/article
 *   npm run content:from-url -- https://x.com/user/status/123 --title "AI Trends"
 */

import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import slugify from 'slugify';
import { generateWithGrok } from './utils/grok';
import { cleanContent, validateContent } from './utils/validator';
import { markAsProcessed } from './utils/deduplication';

dotenv.config({ path: '.env.local' });

const REWRITE_PROMPT = `You are Theo Daudebourg, a Shopify performance specialist.

## YOUR BRAND VOICE

### Voice Pillars
1. Honest and No-BS - Skip jargon, be upfront, admit limitations
2. Technical but Accessible - Show understanding, explain simply  
3. Results-Obsessed - Lead with outcomes, use specific numbers
4. Quietly Confident - Let results speak, no desperate sales pitches

### Writing Rules
- First-person ("I") perspective
- Use regular dashes (-) NOT em-dashes
- Use straight quotes (") NOT curly quotes
- NO emojis or Unicode symbols
- Active voice, present tense
- Short sentences. Short paragraphs.
- Use contractions (I'm, don't, it's)
- Always include specific metrics/numbers when possible

### Words to AVOID
- Solutions, leverage, revolutionary, cutting-edge, synergy
- "In today's digital landscape..."
- "It's important to note that..."
- "Furthermore...", "Moreover..."

---

SOURCE CONTENT:
Title: {TITLE}
URL: {URL}
Content: {CONTENT}

---

Rewrite this as a blog post using ONE of the styles below (pick randomly):

## ARTICLE STYLE OPTIONS (pick one):

### STYLE 1: THE ANALYSIS
Deep dive into what this means. Break down the research/findings.
Structure: Introduction → Key Finding → Why It Matters → My Take → Action Step

### STYLE 2: CONTRARIAN TAKE
Challenge common assumptions about this topic.
Structure: "Most people think X, but..." → Evidence → My perspective → What to do differently

### STYLE 3: HOW-TO / TUTORIAL
Make it practical and actionable.
Structure: Problem statement → Step 1, 2, 3 → Pro tip → Results you can expect

### STYLE 4: CASE STUDY STYLE
Tell it as a story. "I worked with a client who faced this exact issue..."
Structure: The problem → What we tried → What worked → Lesson learned

### STYLE 5: OPINION PIECE
Strong personal opinion backed by experience.
Structure: Bold claim → My reasoning → Evidence from article → Call to action

MUST INCLUDE:
1. My take on WHY this matters for Shopify stores
2. How it connects to speed, CRO, or AI/SEO
3. A practical action readers can take
4. Credit to the original source at the end

## SEO OPTIMIZATION REQUIREMENTS:

### Meta & Title
- Title: Include primary keyword naturally, under 60 chars
- Description: Include keyword, compelling, max 155 chars

### Content Structure
- Use H2 (##) and H3 (###) headers to break up content
- First paragraph should contain the main keyword
- Include 2-3 semantic keyword variations

### Featured Snippet Optimization
- Include a "Key Takeaways" bullet list
- Add a "What You Can Do Today" action section
- Short, direct answers that could be pulled as snippets

REQUIRED OUTPUT FORMAT (valid MDX frontmatter):
---
title: "[Your Unique Angle] - under 60 chars"
date: "{DATE}"
description: "[Compelling summary with keyword - max 155 chars]"
category: "[Speed Optimization | CRO | AI SEO | Shopify Development | Industry Insights]"
tags: ["tag1", "tag2", "tag3"]
readTime: "2 min read"
status: "draft"
---

## [H2 Header with your unique take]

[Opening paragraph - your perspective on the topic, not a summary]

[Your ORIGINAL analysis and insights - 300-500 words with subheaders]

### Key Takeaways

- [Takeaway 1 with specific detail]
- [Takeaway 2 with metric if possible]
- [Takeaway 3]

### What You Can Do Today

[1-2 paragraph practical action step - snippet-worthy]

CRITICAL:
- Write ORIGINAL content inspired by the topic, NOT a rewrite
- Do NOT include "Originally from..." or visible source links
- Sound like an expert sharing YOUR knowledge, not summarizing an article
- No emojis, straight quotes only

Return ONLY the MDX content, no explanations.`;

interface UrlConfig {
  url: string;
  title?: string;
  social?: boolean;
}

function parseArgs(): UrlConfig | null {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === '--help') {
    console.log(`
Generate Content from URL

Usage:
  npm run content:from-url -- <url>
  npm run content:from-url -- <url> --title "Custom Title"
  npm run content:from-url -- <url> --social

Options:
  --title <text>   Custom title for the article
  --social         Also generate LinkedIn + Twitter posts

Examples:
  npm run content:from-url -- https://blog.example.com/ai-trends
  npm run content:from-url -- "https://x.com/user/status/123" --title "AI Trends 2025"
    `);
    return null;
  }

  const config: UrlConfig = {
    url: args[0],
    social: false,
  };

  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--title' && args[i + 1]) {
      config.title = args[i + 1];
      i++;
    } else if (args[i] === '--social') {
      config.social = true;
    }
  }

  return config;
}

async function fetchUrlContent(url: string): Promise<{ title: string; content: string; source: string }> {
  console.log(`Fetching: ${url}`);
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ContentBot/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    
    // Extract title from HTML
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : 'Untitled';
    
    // Extract main content (basic - remove scripts, styles, tags)
    let content = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 8000); // Limit content length

    // Extract source from URL
    const urlObj = new URL(url);
    const source = urlObj.hostname.replace('www.', '');

    return { title, content, source };
  } catch (error) {
    console.error(`Failed to fetch URL: ${error}`);
    // Ask Grok to use its knowledge instead
    return {
      title: 'Unknown Article',
      content: `Please use your knowledge to write about the topic from this URL: ${url}`,
      source: new URL(url).hostname.replace('www.', ''),
    };
  }
}

async function generateFromUrl(config: UrlConfig) {
  console.log('\n========================================');
  console.log('   GENERATE FROM URL                   ');
  console.log('========================================\n');

  // Fetch content
  const { title, content, source } = await fetchUrlContent(config.url);
  const finalTitle = config.title || title;
  
  console.log(`Title: ${finalTitle}`);
  console.log(`Source: ${source}`);
  console.log(`Content length: ${content.length} chars\n`);

  // Build prompt
  const prompt = REWRITE_PROMPT
    .replace('{TITLE}', finalTitle)
    .replace(/{URL}/g, config.url)
    .replace('{CONTENT}', content)
    .replace('{DATE}', new Date().toISOString().split('T')[0])
    .replace(/{SOURCE}/g, source);

  console.log('Generating blog post with Grok...');
  let blogContent = await generateWithGrok(prompt);
  blogContent = cleanContent(blogContent);

  // Save blog post
  const contentDir = path.join(process.cwd(), 'content', 'blog');
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  const slug = slugify(`curated-${finalTitle}`, { lower: true, strict: true }).slice(0, 60);
  const blogPath = path.join(contentDir, `${slug}.mdx`);
  fs.writeFileSync(blogPath, blogContent, 'utf-8');

  // Validate
  const validation = validateContent(blogContent);
  
  console.log(`\nBlog post saved: ${slug}.mdx`);
  console.log(`Score: ${validation.isValid ? 'PASSED' : 'NEEDS REVIEW'}`);
  
  if (validation.warnings.length > 0) {
    console.log('Warnings:', validation.warnings.join(', '));
  }

  // Generate social if requested
  if (config.social) {
    console.log('\nGenerating social content...');
    
    const socialDir = path.join(process.cwd(), 'content', 'social');
    if (!fs.existsSync(socialDir)) {
      fs.mkdirSync(socialDir, { recursive: true });
    }

    // LinkedIn
    const linkedinPrompt = `Write a LinkedIn post about this article.

Title: ${finalTitle}
URL: ${config.url}

FORMATTING STRUCTURE:
1. HOOK LINE (bold statement or question that stops scrolling)

2. BLANK LINE

3. CONTEXT (2-3 short sentences about what you learned)

4. KEY TAKEAWAYS:
   - Point one
   - Point two
   - Point three

5. YOUR INSIGHT (connect to Shopify/e-commerce)

6. CTA (question to drive engagement)

7. LINK at the end

RULES:
- Use line breaks generously for mobile readability
- Bullet points with dashes (-)
- 200-250 words
- ZERO emojis
- First-person ("I found this interesting...")
- Sound like a practitioner sharing something useful

OUTPUT: Just the post text, ready to paste.`;
    
    const linkedin = await generateWithGrok(linkedinPrompt);
    fs.writeFileSync(
      path.join(socialDir, `linkedin-${slug.slice(0, 40)}.txt`),
      cleanContent(linkedin) + `\n\n${config.url}`,
      'utf-8'
    );

    // Twitter
    const twitterPrompt = `Write a tweet about this article.
Title: ${finalTitle}
URL: ${config.url}
Keep it under 250 chars. Be direct, no emojis.`;
    
    const twitter = await generateWithGrok(twitterPrompt);
    fs.writeFileSync(
      path.join(socialDir, `twitter-${slug.slice(0, 40)}.txt`),
      cleanContent(twitter) + ` ${config.url}`,
      'utf-8'
    );

    console.log('Social content saved!');
  }

  // Mark as processed
  markAsProcessed(finalTitle, source, 'all');

  console.log('\n========================================');
  console.log('DONE!');
  console.log('========================================');
  console.log(`\nNext steps:`);
  console.log(`  1. Review: npm run content:copy-review -- content/blog/${slug}.mdx`);
  console.log(`  2. Approve: npm run content:review -- approve ${slug}`);
}

const config = parseArgs();
if (config) {
  generateFromUrl(config).catch(console.error);
}
