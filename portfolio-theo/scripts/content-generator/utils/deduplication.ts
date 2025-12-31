import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

interface CacheEntry {
  hash: string;
  title: string;
  source: string;
  processedAt: string;
  outputType: string;
}

interface ContentCache {
  version: number;
  entries: CacheEntry[];
}

const CACHE_FILE = '.content-cache.json';
const CACHE_VERSION = 1;
const MAX_CACHE_ENTRIES = 500; // Keep last 500 articles

/**
 * Generate a hash for article deduplication
 */
function generateHash(title: string, source: string): string {
  const normalized = `${title.toLowerCase().trim()}|${source.toLowerCase().trim()}`;
  return crypto.createHash('md5').update(normalized).digest('hex');
}

/**
 * Load the content cache from disk
 */
function loadCache(cacheDir: string): ContentCache {
  const cachePath = path.join(cacheDir, CACHE_FILE);
  
  if (fs.existsSync(cachePath)) {
    try {
      const data = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
      if (data.version === CACHE_VERSION) {
        return data;
      }
    } catch {
      console.warn('Cache file corrupted, starting fresh');
    }
  }
  
  return { version: CACHE_VERSION, entries: [] };
}

/**
 * Save the content cache to disk
 */
function saveCache(cacheDir: string, cache: ContentCache): void {
  const cachePath = path.join(cacheDir, CACHE_FILE);
  
  // Ensure directory exists
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }
  
  // Trim to max entries (keep most recent)
  if (cache.entries.length > MAX_CACHE_ENTRIES) {
    cache.entries = cache.entries.slice(-MAX_CACHE_ENTRIES);
  }
  
  fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), 'utf-8');
}

/**
 * Check if an article has already been processed
 */
export function isDuplicate(
  title: string, 
  source: string, 
  cacheDir: string = process.cwd()
): boolean {
  const cache = loadCache(cacheDir);
  const hash = generateHash(title, source);
  
  return cache.entries.some(entry => entry.hash === hash);
}

/**
 * Mark an article as processed
 */
export function markAsProcessed(
  title: string,
  source: string,
  outputType: 'blog' | 'linkedin' | 'twitter' | 'all',
  cacheDir: string = process.cwd()
): void {
  const cache = loadCache(cacheDir);
  const hash = generateHash(title, source);
  
  // Don't add if already exists
  if (cache.entries.some(entry => entry.hash === hash)) {
    return;
  }
  
  cache.entries.push({
    hash,
    title,
    source,
    processedAt: new Date().toISOString(),
    outputType,
  });
  
  saveCache(cacheDir, cache);
}

/**
 * Get cache statistics
 */
export function getCacheStats(cacheDir: string = process.cwd()): {
  totalProcessed: number;
  lastProcessedAt: string | null;
  bySource: Record<string, number>;
} {
  const cache = loadCache(cacheDir);
  
  const bySource: Record<string, number> = {};
  for (const entry of cache.entries) {
    bySource[entry.source] = (bySource[entry.source] || 0) + 1;
  }
  
  const lastEntry = cache.entries[cache.entries.length - 1];
  
  return {
    totalProcessed: cache.entries.length,
    lastProcessedAt: lastEntry?.processedAt || null,
    bySource,
  };
}

/**
 * Clear the cache (for testing or reset)
 */
export function clearCache(cacheDir: string = process.cwd()): void {
  const cachePath = path.join(cacheDir, CACHE_FILE);
  if (fs.existsSync(cachePath)) {
    fs.unlinkSync(cachePath);
  }
}
