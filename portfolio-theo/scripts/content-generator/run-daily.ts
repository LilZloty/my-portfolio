#!/usr/bin/env node

/**
 * Daily Content Generation Orchestrator
 * 
 * Runs the full content curation pipeline:
 * 1. Fetches news from RSS feeds OR uses Grok search
 * 2. Filters duplicates
 * 3. Generates blog + social content with Grok API
 * 4. Validates output
 * 5. Places content in review queue
 * 
 * Usage:
 *   npx ts-node run-daily.ts [options]
 * 
 * Options:
 *   --articles <n>   Number of articles to process (default: 2)
 *   --topics <list>  Comma-separated topics (default: all)
 *   --days <n>       Look back N days for articles (default: 3)
 *   --dry-run        Preview without generating content
 *   --use-search     Use Grok's web search instead of RSS feeds
 */

// Load environment variables from .env.local
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import * as fs from 'fs';
import * as path from 'path';
import Parser from 'rss-parser';
import slugify from 'slugify';
import { generateWithGrok, searchNews } from './utils/grok';
import { feeds, topicKeywords } from './feeds/sources';
import { curationPrompt, linkedinCurationPrompt, twitterCurationPrompt } from './prompts/curation';
import { isDuplicate, markAsProcessed, getCacheStats } from './utils/deduplication';
import { validateContent, cleanContent } from './utils/validator';

const parser = new Parser();

interface DailyConfig {
  articles: number;
  topics: string[];
  daysBack: number;
  dryRun: boolean;
  useSearch: boolean;
}

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet: string;
  source: string;
  topics: string[];
}

function parseArgs(): DailyConfig {
  const args = process.argv.slice(2);
  const config: DailyConfig = {
    articles: 2,
    topics: ['all'],
    daysBack: 3,
    dryRun: false,
    useSearch: false,
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--articles' && args[i + 1]) {
      config.articles = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === '--topics' && args[i + 1]) {
      config.topics = args[i + 1].split(',').map(t => t.trim().toLowerCase());
      i++;
    } else if (args[i] === '--days' && args[i + 1]) {
      config.daysBack = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === '--dry-run') {
      config.dryRun = true;
    } else if (args[i] === '--use-search') {
      config.useSearch = true;
    }
  }

  return config;
}

function matchesTopic(text: string, topics: string[]): boolean {
  if (topics.includes('all')) return true;

  const lowerText = text.toLowerCase();
  for (const topic of topics) {
    const keywords = topicKeywords[topic] || [topic];
    for (const keyword of keywords) {
      if (lowerText.includes(keyword.toLowerCase())) {
        return true;
      }
    }
  }
  return false;
}

function detectTopics(text: string): string[] {
  const detected: string[] = [];
  const lowerText = text.toLowerCase();

  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword.toLowerCase())) {
        if (!detected.includes(topic)) {
          detected.push(topic);
        }
        break;
      }
    }
  }

  return detected.length > 0 ? detected : ['general'];
}

async function fetchAllFeeds(config: DailyConfig): Promise<FeedItem[]> {
  const items: FeedItem[] = [];
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - config.daysBack);

  console.log(`\n[1/5] Fetching from ${feeds.length} RSS feeds (last ${config.daysBack} days)...`);

  for (const feedSource of feeds) {
    if (!config.topics.includes('all')) {
      const hasMatchingTopic = feedSource.topics.some(t => config.topics.includes(t));
      if (!hasMatchingTopic) continue;
    }

    try {
      const feed = await parser.parseURL(feedSource.url);

      for (const item of feed.items || []) {
        const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();
        if (pubDate < cutoffDate) continue;

        const fullText = `${item.title || ''} ${item.contentSnippet || ''} ${item.content || ''}`;
        if (!matchesTopic(fullText, config.topics)) continue;

        items.push({
          title: item.title || 'Untitled',
          link: item.link || '',
          pubDate: item.pubDate || new Date().toISOString(),
          content: item.content || item.contentSnippet || '',
          contentSnippet: item.contentSnippet || '',
          source: feedSource.name,
          topics: detectTopics(fullText),
        });
      }
    } catch {
      // Silently skip failed feeds
    }
  }

  items.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
  return items;
}

async function generateBlogPost(item: FeedItem): Promise<string> {
  const article = {
    title: item.title,
    description: item.contentSnippet,
    content: item.content,
    source: item.source,
    link: item.link,
    topics: item.topics,
  };

  let content = await generateWithGrok(curationPrompt(article));
  
  // Auto-clean AI artifacts
  content = cleanContent(content);
  
  return content;
}

async function generateSocialContent(item: FeedItem): Promise<{ linkedin: string; twitter: string }> {
  const article = {
    title: item.title,
    description: item.contentSnippet,
    source: item.source,
    link: item.link,
    topics: item.topics,
  };

  const [linkedin, twitter] = await Promise.all([
    generateWithGrok(linkedinCurationPrompt(article)),
    generateWithGrok(twitterCurationPrompt(article)),
  ]);

  return {
    linkedin: cleanContent(linkedin),
    twitter: cleanContent(twitter).replace('[LINK]', item.link),
  };
}

/**
 * Fetch news using Grok's web search
 */
async function fetchWithGrokSearch(config: DailyConfig): Promise<FeedItem[]> {
  const topicsQuery = config.topics.includes('all') 
    ? 'AI, Shopify, e-commerce, CRO, web performance'
    : config.topics.join(', ');

  console.log(`\n[1/5] Searching for news with Grok (topics: ${topicsQuery})...`);
  
  const searchResults = await searchNews(topicsQuery, {
    daysBack: config.daysBack,
    limit: config.articles * 2, // Fetch more to account for duplicates
  });

  return searchResults.map(result => ({
    title: result.title,
    link: result.url,
    pubDate: result.date,
    content: result.summary,
    contentSnippet: result.summary,
    source: result.source,
    topics: detectTopics(`${result.title} ${result.summary}`),
  }));
}

async function main() {
  const config = parseArgs();
  const startTime = Date.now();

  console.log('\n========================================');
  console.log('   DAILY CONTENT GENERATION PIPELINE   ');
  console.log('        (Powered by Grok API)          ');
  console.log('========================================');
  console.log(`\nConfig:`);
  console.log(`  Articles: ${config.articles}`);
  console.log(`  Topics: ${config.topics.join(', ')}`);
  console.log(`  Days back: ${config.daysBack}`);
  console.log(`  Source: ${config.useSearch ? 'Grok Web Search' : 'RSS Feeds'}`);
  console.log(`  Dry run: ${config.dryRun}`);

  // Show cache stats
  const stats = getCacheStats();
  console.log(`  Previously processed: ${stats.totalProcessed} articles`);

  try {
    // Fetch articles based on mode
    const allItems = config.useSearch 
      ? await fetchWithGrokSearch(config)
      : await fetchAllFeeds(config);
    console.log(`\n[2/5] Found ${allItems.length} articles matching criteria`);

    // Filter duplicates
    const newItems = allItems.filter(item => !isDuplicate(item.title, item.source));
    const skipped = allItems.length - newItems.length;
    console.log(`\n[3/5] Filtering duplicates: ${skipped} already processed, ${newItems.length} new`);

    if (newItems.length === 0) {
      console.log('\nNo new articles to process. Try increasing --days or check later.');
      return;
    }

    // Take only the configured number
    const toProcess = newItems.slice(0, config.articles);
    console.log(`\nProcessing ${toProcess.length} articles:\n`);
    toProcess.forEach((item, i) => {
      console.log(`  ${i + 1}. [${item.source}] ${item.title}`);
    });

    if (config.dryRun) {
      console.log('\n[DRY RUN] Would generate content for the above articles.');
      return;
    }

    // Generate content
    console.log(`\n[4/5] Generating content with AI...`);
    
    const contentDir = path.join(process.cwd(), 'content', 'blog');
    const socialDir = path.join(process.cwd(), 'content', 'social');
    
    if (!fs.existsSync(contentDir)) fs.mkdirSync(contentDir, { recursive: true });
    if (!fs.existsSync(socialDir)) fs.mkdirSync(socialDir, { recursive: true });

    let successCount = 0;
    let errorCount = 0;

    for (const item of toProcess) {
      console.log(`\n  Processing: ${item.title.slice(0, 50)}...`);

      try {
        // Generate blog post
        const blogContent = await generateBlogPost(item);
        const slug = slugify(`curated-${item.title}`, { lower: true, strict: true }).slice(0, 60);
        const blogPath = path.join(contentDir, `${slug}.mdx`);
        fs.writeFileSync(blogPath, blogContent, 'utf-8');

        // Validate
        const validation = validateContent(blogContent);
        if (!validation.isValid) {
          console.log(`    Blog: Saved with errors - ${validation.errors.join(', ')}`);
        } else if (validation.warnings.length > 0) {
          console.log(`    Blog: Saved with warnings`);
        } else {
          console.log(`    Blog: Saved successfully`);
        }

        // Generate social content
        const social = await generateSocialContent(item);
        const socialSlug = slugify(item.title, { lower: true, strict: true }).slice(0, 40);
        
        fs.writeFileSync(path.join(socialDir, `linkedin-${socialSlug}.txt`), social.linkedin, 'utf-8');
        fs.writeFileSync(path.join(socialDir, `twitter-${socialSlug}.txt`), social.twitter, 'utf-8');
        console.log(`    Social: LinkedIn + Twitter saved`);

        // Mark as processed
        markAsProcessed(item.title, item.source, 'all');
        successCount++;

      } catch (error) {
        console.log(`    Error: ${error}`);
        errorCount++;
      }
    }

    // Summary
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`\n[5/5] Pipeline complete!`);
    console.log('========================================');
    console.log(`  Duration: ${duration}s`);
    console.log(`  Success: ${successCount} articles`);
    console.log(`  Errors: ${errorCount}`);
    console.log(`  Blog posts: content/blog/`);
    console.log(`  Social content: content/social/`);
    console.log('\nNext step: Run "npx ts-node review-queue.ts list" to review drafts');

  } catch (error) {
    console.error('\nPipeline failed:', error);
    process.exit(1);
  }
}

main();
