/**
 * Copywriting Review Utility
 * 
 * Uses Grok to review content for:
 * - Brand voice alignment
 * - Tone and style compliance
 * - AI-sounding phrases detection
 * - Humanization suggestions
 */

import * as fs from 'fs';
import * as path from 'path';
import { generateWithGrok } from './utils/grok';

// Load environment variables
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

interface ReviewResult {
  score: number; // 0-100
  passed: boolean;
  issues: Array<{
    type: 'error' | 'warning' | 'suggestion';
    description: string;
    location?: string;
  }>;
  suggestions: string[];
  rewrittenContent?: string;
}

const BRAND_VOICE_REVIEW_PROMPT = `You are reviewing content for brand voice alignment. The content should follow these guidelines:

## BRAND IDENTITY: Theo Daudebourg - Shopify Performance Specialist

### Voice Pillars
1. **Honest and No-BS**: Skip jargon, be upfront, admit limitations
2. **Technical but Accessible**: Show understanding, explain simply
3. **Results-Obsessed**: Lead with outcomes, use specific numbers
4. **Quietly Confident**: Let results speak, no desperate sales pitches

### Writing Rules
- Use regular dashes (-) NOT em-dashes
- Use straight quotes (") NOT curly quotes
- NO emojis or Unicode symbols
- NO special characters that look AI-generated
- Active voice, present tense
- Short sentences. Short paragraphs.
- Use contractions (I'm, don't, it's)
- First-person ("I") perspective

### Words to AVOID
- Solutions, leverage, revolutionary, cutting-edge, synergy
- "In today's digital landscape..."
- "It's important to note that..."
- "Furthermore...", "Moreover..."
- Any corporate buzzwords

### Words to USE
- Fast, instant, proven, measurable, real
- Honest, upfront, transparent
- Save, boost, fix, automate

---

CONTENT TO REVIEW:
{CONTENT}

---

Analyze this content and return a JSON response with:
{
  "score": <0-100 brand alignment score>,
  "passed": <true if score >= 70>,
  "issues": [
    {
      "type": "<error|warning|suggestion>",
      "description": "<what's wrong>",
      "location": "<line or phrase where issue occurs>"
    }
  ],
  "suggestions": ["<specific improvement suggestions>"],
  "rewrittenContent": "<only if score < 70, provide a rewritten version>"
}

Be strict about:
- AI-sounding phrases (mark as error)
- Emojis or special characters (mark as error)
- Missing first-person perspective (mark as warning)
- Generic language without specifics (mark as suggestion)

Return ONLY the JSON, no other text.`;

/**
 * Review content using Grok
 */
export async function reviewContent(content: string): Promise<ReviewResult> {
  const apiKey = process.env.GROK_API_KEY || process.env.XAI_API_KEY;
  
  if (!apiKey) {
    console.warn('GROK_API_KEY not set, skipping copywriting review');
    return {
      score: 0,
      passed: false,
      issues: [{ type: 'error', description: 'GROK_API_KEY required for copy review' }],
      suggestions: ['Add GROK_API_KEY to .env.local'],
    };
  }

  const prompt = BRAND_VOICE_REVIEW_PROMPT.replace('{CONTENT}', content);
  
  try {
    const response = await generateWithGrok(prompt, { temperature: 0.3 });

    // Extract JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse review response');
    }

    return JSON.parse(jsonMatch[0]) as ReviewResult;
  } catch (error) {
    console.error('Copy review failed:', error);
    return {
      score: 0,
      passed: false,
      issues: [{ type: 'error', description: `Review failed: ${error}` }],
      suggestions: [],
    };
  }
}

/**
 * Review a file and print formatted results
 */
export async function reviewFile(filePath: string): Promise<ReviewResult> {
  if (!fs.existsSync(filePath)) {
    return {
      score: 0,
      passed: false,
      issues: [{ type: 'error', description: 'File not found' }],
      suggestions: [],
    };
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  return reviewContent(content);
}

/**
 * Format review results for display
 */
export function formatReviewResults(result: ReviewResult, filename: string): string {
  const lines: string[] = [];
  
  lines.push(`\n${'='.repeat(60)}`);
  lines.push(`COPYWRITING REVIEW: ${filename}`);
  lines.push(`${'='.repeat(60)}`);
  lines.push('');
  
  // Score
  const scoreEmoji = result.score >= 80 ? 'EXCELLENT' : result.score >= 70 ? 'PASSED' : 'NEEDS WORK';
  lines.push(`Score: ${result.score}/100 (${scoreEmoji})`);
  lines.push(`Status: ${result.passed ? 'Ready for publishing' : 'Revision needed'}`);
  lines.push('');

  // Issues
  if (result.issues.length > 0) {
    lines.push('Issues Found:');
    for (const issue of result.issues) {
      const icon = issue.type === 'error' ? 'X' : issue.type === 'warning' ? '!' : '-';
      lines.push(`  [${icon}] ${issue.description}`);
      if (issue.location) {
        lines.push(`      Location: "${issue.location}"`);
      }
    }
    lines.push('');
  }

  // Suggestions
  if (result.suggestions.length > 0) {
    lines.push('Suggestions:');
    for (const suggestion of result.suggestions) {
      lines.push(`  - ${suggestion}`);
    }
    lines.push('');
  }

  lines.push(`${'='.repeat(60)}`);
  
  return lines.join('\n');
}

/**
 * CLI for copy review
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === '--help') {
    console.log(`
Copywriting Review CLI

Usage:
  npx ts-node copy-review.ts <file>           Review a single file
  npx ts-node copy-review.ts --drafts         Review all drafts
  npx ts-node copy-review.ts --rewrite <file> Review and auto-rewrite if needed

Examples:
  npx ts-node copy-review.ts content/blog/my-article.mdx
  npx ts-node copy-review.ts --drafts
    `);
    return;
  }

  if (command === '--drafts') {
    const contentDir = path.join(process.cwd(), 'content', 'blog');
    if (!fs.existsSync(contentDir)) {
      console.log('No blog content directory found.');
      return;
    }

    const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx'));
    console.log(`\nReviewing ${files.length} files...\n`);

    for (const file of files) {
      const filePath = path.join(contentDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Check if draft
      if (!content.includes('status: "draft"') && !content.includes("status: 'draft'")) {
        continue;
      }

      console.log(`Reviewing: ${file}...`);
      const result = await reviewFile(filePath);
      console.log(formatReviewResults(result, file));
    }
  } else if (command === '--rewrite') {
    const filePath = args[1];
    if (!filePath) {
      console.log('Usage: npx ts-node copy-review.ts --rewrite <file>');
      return;
    }

    console.log(`Reviewing: ${filePath}...`);
    const result = await reviewFile(filePath);
    console.log(formatReviewResults(result, path.basename(filePath)));

    if (!result.passed && result.rewrittenContent) {
      console.log('\nRewritten content available. Save? (y/n)');
      // In a real implementation, you'd handle stdin here
    }
  } else {
    // Review single file
    const filePath = command;
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      return;
    }

    console.log(`Reviewing: ${filePath}...`);
    const result = await reviewFile(filePath);
    console.log(formatReviewResults(result, path.basename(filePath)));
  }
}

main().catch(console.error);
