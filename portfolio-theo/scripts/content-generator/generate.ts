#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import slugify from 'slugify';
import { generateContent } from './utils/anthropic';
import { generateWithMiniMax } from './utils/minimax';
import { blogPrompt, linkedinPrompt, twitterPrompt } from './prompts/templates';

interface Config {
  type: 'blog' | 'linkedin' | 'twitter';
  topic: string;
  tone?: string;
  model: 'claude' | 'minimax';
}

function parseArgs(): Config {
  const args = process.argv.slice(2);
  const config: Config = {
    type: 'blog',
    topic: '',
    tone: 'educational',
    model: 'claude',
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--type' && args[i + 1]) {
      config.type = args[i + 1] as Config['type'];
      i++;
    } else if (args[i] === '--topic' && args[i + 1]) {
      config.topic = args[i + 1];
      i++;
    } else if (args[i] === '--tone' && args[i + 1]) {
      config.tone = args[i + 1];
      i++;
    } else if (args[i] === '--model' && args[i + 1]) {
      config.model = args[i + 1] as Config['model'];
      i++;
    }
  }

  if (!config.topic) {
    console.error('Error: --topic is required');
    console.log('Usage: npx ts-node generate.ts --type blog --topic "Your topic" [--model claude|minimax]');
    console.log('Types: blog, linkedin, twitter');
    console.log('Models: claude (default), minimax');
    process.exit(1);
  }

  return config;
}

async function main() {
  const config = parseArgs();

  console.log(`\n🚀 Generating ${config.type} content...`);
  console.log(`📝 Topic: "${config.topic}"`);
  console.log(`🤖 Model: ${config.model}`);

  let prompt: string;
  switch (config.type) {
    case 'blog':
      prompt = blogPrompt(config.topic, config.tone || 'educational');
      break;
    case 'linkedin':
      prompt = linkedinPrompt(config.topic);
      break;
    case 'twitter':
      prompt = twitterPrompt(config.topic);
      break;
    default:
      throw new Error(`Unknown type: ${config.type}`);
  }

  try {
    // Use selected model
    const content = config.model === 'minimax' 
      ? await generateWithMiniMax(prompt)
      : await generateContent(prompt);

    if (config.type === 'blog') {
      // Save to content/blog directory
      const contentDir = path.join(process.cwd(), 'content', 'blog');
      if (!fs.existsSync(contentDir)) {
        fs.mkdirSync(contentDir, { recursive: true });
      }

      const slug = slugify(config.topic, { lower: true, strict: true });
      const filename = `${slug}.mdx`;
      const filepath = path.join(contentDir, filename);

      fs.writeFileSync(filepath, content, 'utf-8');
      console.log(`\n✅ Blog article saved to: content/blog/${filename}`);
    } else {
      // Output social content to console
      console.log('\n' + '='.repeat(60));
      console.log(`${config.type.toUpperCase()} CONTENT:`);
      console.log('='.repeat(60) + '\n');
      console.log(content);
      console.log('\n' + '='.repeat(60));
      
      // Also save to a file for convenience
      const outputDir = path.join(process.cwd(), 'content', 'social');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      const slug = slugify(config.topic, { lower: true, strict: true });
      const filename = `${config.type}-${slug}.txt`;
      fs.writeFileSync(path.join(outputDir, filename), content, 'utf-8');
      console.log(`\n📁 Also saved to: content/social/${filename}`);
    }
  } catch (error) {
    console.error('\n❌ Error generating content:', error);
    process.exit(1);
  }
}

main();
