import * as fs from 'fs';
import * as path from 'path';
import { validateFile, cleanContent } from './utils/validator';

interface DraftPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  status: 'draft' | 'review' | 'published';
  filePath: string;
  validationErrors: string[];
  validationWarnings: string[];
}

interface ReviewQueue {
  drafts: DraftPost[];
  lastUpdated: string;
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');
const QUEUE_FILE = path.join(process.cwd(), 'content', 'review-queue.json');

/**
 * Parse frontmatter from MDX content
 */
function parseFrontmatter(content: string): Record<string, unknown> {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  
  const frontmatter: Record<string, unknown> = {};
  const lines = match[1].split('\n');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      
      // Remove quotes
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      frontmatter[key] = value;
    }
  }
  
  return frontmatter;
}

/**
 * Update frontmatter status in a file
 */
function updateStatus(filePath: string, newStatus: 'draft' | 'review' | 'published'): void {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Check if status exists
  if (/status:\s*["']?/.test(content)) {
    const updated = content.replace(
      /status:\s*["']?(draft|review|published)["']?/i,
      `status: "${newStatus}"`
    );
    fs.writeFileSync(filePath, updated, 'utf-8');
  } else {
    // Add status after date line
    const updated = content.replace(
      /(date:\s*["']?[^"'\n]+["']?\r?\n)/,
      `$1status: "${newStatus}"\n`
    );
    fs.writeFileSync(filePath, updated, 'utf-8');
  }
}

/**
 * Get all drafts pending review
 */
export function getDrafts(): DraftPost[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }
  
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'));
  const drafts: DraftPost[] = [];
  
  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const frontmatter = parseFrontmatter(content);
    
    const status = (frontmatter.status as string || 'draft').toLowerCase();
    if (status !== 'published') {
      const validation = validateFile(filePath);
      
      drafts.push({
        slug: file.replace('.mdx', ''),
        title: frontmatter.title as string || 'Untitled',
        date: frontmatter.date as string || '',
        category: frontmatter.category as string || 'Uncategorized',
        status: status as 'draft' | 'review',
        filePath,
        validationErrors: validation.errors,
        validationWarnings: validation.warnings,
      });
    }
  }
  
  // Sort by date (newest first)
  drafts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return drafts;
}

/**
 * Review and optionally publish a draft
 */
export function reviewDraft(slug: string, action: 'approve' | 'reject' | 'clean'): {
  success: boolean;
  message: string;
} {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return { success: false, message: `Draft not found: ${slug}` };
  }
  
  switch (action) {
    case 'approve':
      updateStatus(filePath, 'published');
      return { success: true, message: `Published: ${slug}` };
      
    case 'reject':
      // Move to rejected folder or delete
      const rejectedDir = path.join(CONTENT_DIR, 'rejected');
      if (!fs.existsSync(rejectedDir)) {
        fs.mkdirSync(rejectedDir, { recursive: true });
      }
      fs.renameSync(filePath, path.join(rejectedDir, `${slug}.mdx`));
      return { success: true, message: `Rejected and archived: ${slug}` };
      
    case 'clean':
      // Auto-clean AI artifacts
      const content = fs.readFileSync(filePath, 'utf-8');
      const cleaned = cleanContent(content);
      fs.writeFileSync(filePath, cleaned, 'utf-8');
      updateStatus(filePath, 'review');
      return { success: true, message: `Cleaned and marked for review: ${slug}` };
      
    default:
      return { success: false, message: `Unknown action: ${action}` };
  }
}

/**
 * Publish all approved drafts
 */
export function publishApproved(): { published: string[]; skipped: string[] } {
  const drafts = getDrafts();
  const published: string[] = [];
  const skipped: string[] = [];
  
  for (const draft of drafts) {
    if (draft.status === 'review' && draft.validationErrors.length === 0) {
      reviewDraft(draft.slug, 'approve');
      published.push(draft.slug);
    } else {
      skipped.push(draft.slug);
    }
  }
  
  return { published, skipped };
}

/**
 * CLI for review queue
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'list';
  
  switch (command) {
    case 'list':
      console.log('\n📋 Review Queue\n');
      const drafts = getDrafts();
      
      if (drafts.length === 0) {
        console.log('  No drafts pending review.');
        return;
      }
      
      for (const draft of drafts) {
        const statusIcon = draft.status === 'draft' ? '📝' : '👀';
        const validIcon = draft.validationErrors.length === 0 ? '✅' : '⚠️';
        
        console.log(`${statusIcon} ${draft.title}`);
        console.log(`   Slug: ${draft.slug}`);
        console.log(`   Category: ${draft.category}`);
        console.log(`   Date: ${draft.date}`);
        console.log(`   Status: ${draft.status} ${validIcon}`);
        
        if (draft.validationErrors.length > 0) {
          console.log(`   Errors: ${draft.validationErrors.join(', ')}`);
        }
        if (draft.validationWarnings.length > 0) {
          console.log(`   Warnings: ${draft.validationWarnings.join(', ')}`);
        }
        console.log('');
      }
      break;
      
    case 'approve':
      if (!args[1]) {
        console.log('Usage: npx ts-node review-queue.ts approve <slug>');
        return;
      }
      const approveResult = reviewDraft(args[1], 'approve');
      console.log(approveResult.message);
      break;
      
    case 'reject':
      if (!args[1]) {
        console.log('Usage: npx ts-node review-queue.ts reject <slug>');
        return;
      }
      const rejectResult = reviewDraft(args[1], 'reject');
      console.log(rejectResult.message);
      break;
      
    case 'clean':
      if (!args[1]) {
        console.log('Usage: npx ts-node review-queue.ts clean <slug>');
        return;
      }
      const cleanResult = reviewDraft(args[1], 'clean');
      console.log(cleanResult.message);
      break;
      
    case 'publish-all':
      const { published, skipped } = publishApproved();
      console.log(`\n✅ Published ${published.length} drafts`);
      if (skipped.length > 0) {
        console.log(`⏭️  Skipped ${skipped.length} (validation errors or not reviewed)`);
      }
      break;
      
    default:
      console.log(`
Review Queue CLI

Commands:
  list              Show all drafts pending review
  approve <slug>    Publish a draft
  reject <slug>     Archive a draft (move to rejected/)
  clean <slug>      Auto-clean AI artifacts and mark for review
  publish-all       Publish all reviewed drafts without errors
      `);
  }
}

main().catch(console.error);
