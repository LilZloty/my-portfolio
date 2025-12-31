#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import Parser from 'rss-parser';
import slugify from 'slugify';
import { generateContent } from './utils/anthropic';
import { feeds, topicKeywords, FeedSource } from './feeds/sources';
import { curationPrompt, linkedinCurationPrompt, twitterCurationPrompt } from './prompts/curation';
import { isDuplicate, markAsProcessed, getCacheStats } from './utils/deduplication';

const parser = new Parser();

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet: string;
  source: string;
  topics: string[];
}

interface Config {
  topics: string[];
  limit: number;
  output: 'blog' | 'linkedin' | 'twitter' | 'all';
  daysBack: number;
}

function parseArgs(): Config {
  const args = process.argv.slice(2);
  const config: Config = {
    topics: ['all'],
    limit: 5,
    output: 'blog',
    daysBack: 7,
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--topics' && args[i + 1]) {
      config.topics = args[i + 1].split(',').map((t) => t.trim().toLowerCase());
      i++;
    } else if (args[i] === '--limit' && args[i + 1]) {
      config.limit = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === '--output' && args[i + 1]) {
      config.output = args[i + 1] as Config['output'];
      i++;
    } else if (args[i] === '--days' && args[i + 1]) {
      config.daysBack = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === '--help') {
      console.log(`
Content Curation CLI

Usage: npx ts-node curate.ts [options]

Options:
  --topics <list>   Comma-separated topics to filter (seo,cro,speed,ai,shopify,development)
                    Use 'all' for all topics (default)
  --limit <n>       Maximum articles to process (default: 5)
  --output <type>   Output type: blog, linkedin, twitter, all (default: blog)
  --days <n>        Only include articles from last N days (default: 7)

Examples:
  npx ts-node curate.ts --topics seo,cro --limit 3 --output blog
  npx ts-node curate.ts --topics ai --output linkedin
  npx ts-node curate.ts --topics all --limit 10 --output all
      `);
      process.exit(0);
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

async function fetchFeeds(config: Config): Promise<FeedItem[]> {
  const items: FeedItem[] = [];
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - config.daysBack);

  console.log(`\n📡 Fetching feeds (last ${config.daysBack} days)...`);

  for (const feedSource of feeds) {
    // Skip feeds that don't match any of our topics
    if (!config.topics.includes('all')) {
      const hasMatchingTopic = feedSource.topics.some((t) => config.topics.includes(t));
      if (!hasMatchingTopic) continue;
    }

    try {
      console.log(`  → ${feedSource.name}...`);
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
    } catch (error) {
      console.log(`  ⚠️  Failed to fetch ${feedSource.name}`);
    }
  }

  // Sort by date (newest first) and limit
  items.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
  return items.slice(0, config.limit);
}

async function curateArticle(item: FeedItem, output: string): Promise<void> {
  const article = {
    title: item.title,
    description: item.contentSnippet,
    content: item.content,
    source: item.source,
    link: item.link,
    topics: item.topics,
  };

  if (output === 'blog' || output === 'all') {
    console.log(`\n📝 Generating blog post...`);
    const blogContent = await generateContent(curationPrompt(article));

    const contentDir = path.join(process.cwd(), 'content', 'blog');
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true });
    }

    const slug = slugify(`curated-${item.title}`, { lower: true, strict: true }).slice(0, 60);
    const filename = `${slug}.mdx`;
    fs.writeFileSync(path.join(contentDir, filename), blogContent, 'utf-8');
    console.log(`  ✅ Saved: content/blog/${filename}`);
  }

  if (output === 'linkedin' || output === 'all') {
    console.log(`\n💼 Generating LinkedIn post...`);
    const linkedinContent = await generateContent(linkedinCurationPrompt(article));

    const socialDir = path.join(process.cwd(), 'content', 'social');
    if (!fs.existsSync(socialDir)) {
      fs.mkdirSync(socialDir, { recursive: true });
    }

    const slug = slugify(item.title, { lower: true, strict: true }).slice(0, 40);
    const filename = `linkedin-${slug}.txt`;
    fs.writeFileSync(path.join(socialDir, filename), linkedinContent, 'utf-8');
    console.log(`  ✅ Saved: content/social/${filename}`);
  }

  if (output === 'twitter' || output === 'all') {
    console.log(`\n🐦 Generating tweet...`);
    const twitterContent = await generateContent(twitterCurationPrompt({
      title: item.title,
      description: item.contentSnippet,
      source: item.source,
      link: item.link,
    }));

    const socialDir = path.join(process.cwd(), 'content', 'social');
    if (!fs.existsSync(socialDir)) {
      fs.mkdirSync(socialDir, { recursive: true });
    }

    const slug = slugify(item.title, { lower: true, strict: true }).slice(0, 40);
    const filename = `twitter-${slug}.txt`;
    const finalContent = twitterContent.replace('[LINK]', item.link);
    fs.writeFileSync(path.join(socialDir, filename), finalContent, 'utf-8');
    console.log(`  ✅ Saved: content/social/${filename}`);
  }
}

async function main() {
  const config = parseArgs();

  console.log(`\n🔍 Content Curation Pipeline`);
  console.log(`   Topics: ${config.topics.join(', ')}`);
  console.log(`   Limit: ${config.limit} articles`);
  console.log(`   Output: ${config.output}`);

  // Show cache stats
  const stats = getCacheStats();
  console.log(`   Cache: ${stats.totalProcessed} articles processed previously`);

  try {
    const items = await fetchFeeds(config);

    if (items.length === 0) {
      console.log(`\n⚠️  No matching articles found. Try different topics or increase --days.`);
      return;
    }

    // Filter out duplicates
    const newItems = items.filter(item => !isDuplicate(item.title, item.source));
    const skippedCount = items.length - newItems.length;

    console.log(`\n📰 Found ${items.length} matching articles (${skippedCount} already processed):\n`);
    newItems.forEach((item, i) => {
      console.log(`  ${i + 1}. [${item.source}] ${item.title}`);
      console.log(`     Topics: ${item.topics.join(', ')}`);
    });

    if (newItems.length === 0) {
      console.log(`\n⚠️  All articles have been processed before. Try increasing --days or wait for new content.`);
      return;
    }

    console.log(`\n🤖 Starting AI curation...`);

    for (const item of newItems) {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`📄 Processing: ${item.title}`);
      console.log(`   Source: ${item.source}`);
      await curateArticle(item, config.output);
      
      // Mark as processed after successful curation
      markAsProcessed(item.title, item.source, config.output as 'blog' | 'linkedin' | 'twitter' | 'all');
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log(`✅ Curation complete! Check content/blog/ and content/social/`);
    console.log(`   Processed: ${newItems.length} new articles`);
    console.log(`   Skipped: ${skippedCount} duplicates`);
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

main();
