import * as fs from 'fs';
import * as path from 'path';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

interface ContentMetrics {
  wordCount: number;
  hasEmojis: boolean;
  hasSpecialChars: boolean;
  hasFrontmatter: boolean;
  hasValidStatus: boolean;
  titleLength: number;
  descriptionLength: number;
}

// Patterns to detect AI artifacts
const EMOJI_PATTERN = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
const SPECIAL_CHAR_PATTERN = /[""''…—–•]/g;
const AI_PHRASES = [
  'leverage', 'revolutionary', 'cutting-edge', 'synergy', 
  'game-changer', 'paradigm shift', 'holistic approach',
  'seamlessly', 'robust solution', 'best-in-class'
];

/**
 * Analyze content for quality metrics
 */
function analyzeContent(content: string): ContentMetrics {
  const lines = content.split('\n');
  const frontmatterEnd = content.indexOf('---', 4);
  const body = frontmatterEnd > 0 ? content.slice(frontmatterEnd + 3) : content;
  
  // Extract frontmatter
  const frontmatter = content.slice(0, frontmatterEnd + 3);
  const hasStatus = /status:\s*["']?(draft|published|review)["']?/i.test(frontmatter);
  const titleMatch = frontmatter.match(/title:\s*["']?(.+?)["']?\s*$/m);
  const descMatch = frontmatter.match(/description:\s*["']?(.+?)["']?\s*$/m);
  
  const words = body.split(/\s+/).filter(w => w.length > 0);
  
  return {
    wordCount: words.length,
    hasEmojis: EMOJI_PATTERN.test(content),
    hasSpecialChars: SPECIAL_CHAR_PATTERN.test(content),
    hasFrontmatter: content.startsWith('---') && frontmatterEnd > 3,
    hasValidStatus: hasStatus,
    titleLength: titleMatch ? titleMatch[1].length : 0,
    descriptionLength: descMatch ? descMatch[1].length : 0,
  };
}

/**
 * Check for AI-sounding phrases
 */
function findAIPhrases(content: string): string[] {
  const found: string[] = [];
  const lowerContent = content.toLowerCase();
  
  for (const phrase of AI_PHRASES) {
    if (lowerContent.includes(phrase.toLowerCase())) {
      found.push(phrase);
    }
  }
  
  return found;
}

/**
 * Validate content against quality standards
 */
export function validateContent(content: string): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
  };
  
  const metrics = analyzeContent(content);
  
  // Critical errors (block publishing)
  if (!metrics.hasFrontmatter) {
    result.errors.push('Missing or invalid YAML frontmatter');
    result.isValid = false;
  }
  
  if (metrics.hasEmojis) {
    result.errors.push('Contains emojis - violates brand guidelines');
    result.isValid = false;
  }
  
  if (metrics.wordCount < 100) {
    result.errors.push(`Content too short: ${metrics.wordCount} words (minimum: 100)`);
    result.isValid = false;
  }
  
  if (metrics.wordCount > 2000) {
    result.errors.push(`Content too long: ${metrics.wordCount} words (maximum: 2000)`);
    result.isValid = false;
  }
  
  // Warnings (review recommended)
  if (metrics.hasSpecialChars) {
    result.warnings.push('Contains special characters (curly quotes, em-dashes) - may look AI-generated');
  }
  
  const aiPhrases = findAIPhrases(content);
  if (aiPhrases.length > 0) {
    result.warnings.push(`Contains AI-sounding phrases: ${aiPhrases.join(', ')}`);
  }
  
  if (metrics.titleLength > 60) {
    result.warnings.push(`Title too long: ${metrics.titleLength} chars (recommended: 60 max)`);
  }
  
  if (metrics.descriptionLength > 155) {
    result.warnings.push(`Description too long for SEO: ${metrics.descriptionLength} chars (max: 155)`);
  }
  
  if (!metrics.hasValidStatus) {
    result.warnings.push('Missing status field in frontmatter (should be draft/review/published)');
  }
  
  return result;
}

/**
 * Validate a file and return results
 */
export function validateFile(filePath: string): ValidationResult & { path: string } {
  if (!fs.existsSync(filePath)) {
    return {
      path: filePath,
      isValid: false,
      errors: ['File not found'],
      warnings: [],
    };
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const validation = validateContent(content);
  
  return {
    path: filePath,
    ...validation,
  };
}

/**
 * Validate all content in a directory
 */
export function validateDirectory(dirPath: string): Array<ValidationResult & { path: string }> {
  const results: Array<ValidationResult & { path: string }> = [];
  
  if (!fs.existsSync(dirPath)) {
    return results;
  }
  
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    results.push(validateFile(filePath));
  }
  
  return results;
}

/**
 * Clean content by removing AI artifacts
 */
export function cleanContent(content: string): string {
  let cleaned = content;
  
  // Replace special characters
  cleaned = cleaned.replace(/"/g, '"').replace(/"/g, '"');
  cleaned = cleaned.replace(/'/g, "'").replace(/'/g, "'");
  cleaned = cleaned.replace(/…/g, '...');
  cleaned = cleaned.replace(/—/g, ' - ');
  cleaned = cleaned.replace(/–/g, '-');
  cleaned = cleaned.replace(/•/g, '-');
  
  // Remove emojis
  cleaned = cleaned.replace(EMOJI_PATTERN, '');
  
  return cleaned;
}
