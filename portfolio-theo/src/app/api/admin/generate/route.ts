import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
import slugify from 'slugify';

const GROK_API_URL = 'https://api.x.ai/v1/chat/completions';

interface GenerateRequest {
  topic: string;
  context: string;
  messages: Array<{ role: string; content: string }>;
  outputs: {
    blog: boolean;
    linkedin: boolean;
    twitter: boolean;
  };
}

const BLOG_PROMPT = `You are Theo Daudebourg, a Shopify performance specialist.

Based on the conversation context below, write an ORIGINAL blog post.

## BRAND IDENTITY: Theo Daudebourg - Shopify Performance Specialist

### Voice Pillars
1. **Honest and No-BS**: Skip jargon, be upfront, admit limitations
2. **Technical but Accessible**: Show understanding, explain simply
3. **Results-Obsessed**: Lead with outcomes, use specific numbers
4. **Quietly Confident**: Let results speak, no desperate sales pitches

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

### Words to USE
- Fast, instant, proven, measurable, real
- Honest, upfront, transparent
- Save, boost, fix, automate

## ARTICLE STYLE (pick one randomly):
1. Deep analysis with evidence
2. Contrarian take challenging assumptions
3. How-to tutorial with steps
4. Case study from experience
5. Strong opinion piece

## ESSENTIAL ON-PAGE SEO CHECKLIST

### Topic Depth & Coverage
- Cover more relevant subtopics than competing pages
- Identify every angle users expect answers to
- Match or exceed competitor depth in a single page
- Pages that fully explain a topic rank for hundreds of long-tail queries

### Content Structure
- Use clean H2/H3 structure that mirrors how users think about the topic
- Each section should answer a specific sub-question
- Stop thinking about keyword density - focus on comprehensiveness
- Use short paragraphs, bullet points, tables where they improve comprehension

### Search Intent
- Each page should serve ONE dominant intent (informational, comparison, transactional)
- Don't mix informational, commercial, and transactional goals on same page
- Users should immediately understand what the page is about and why it's useful
- Clear intro/summary reduces early bounce and improves engagement

### Meta Optimization
- Title under 60 chars with primary keyword (strongest ranking signal)
- Description under 155 chars - compelling with keyword
- Create clean, short, descriptive URLs with relevant keywords
- Keep URLs to 3-5 meaningful words, use hyphens, lowercase

### UX & Readability
- Fast, readable pages enable engagement signals
- Slower pages lose by default - focus on TTFB and render-blocking issues
- Pages must be visually stable, responsive, and usable on real devices
- Short paragraphs, bullet points, visuals, tables where they help

### Mobile-First
- Google indexes mobile version first
- Responsive layouts, readable text, tap-friendly interactions are mandatory
- Sites that fail here get disproportionately penalized

### Content Freshness
- Update strong pages with new data, examples, remove outdated info
- Refreshing important pages often produces faster gains than publishing new content
- Aim to refresh important pages at least once per year

### E-E-A-T Signals
- Cite credible sources, avoid false claims
- Show transparent authorship
- This is about reliability, not branding

### Image Optimization
- All images need descriptive, keyword-rich alt text
- Alt text should be 1-2 sentences, 100-150 characters
- Use meaningful file names

OUTPUT FORMAT (valid MDX frontmatter):
---
title: "[Your Unique Angle on Topic] - under 60 chars"
date: "{DATE}"
description: "[Compelling summary with keyword - max 155 chars]"
category: "[Speed Optimization | CRO | AI SEO | Shopify Development | Industry Insights]"
tags: ["tag1", "tag2", "tag3"]
readTime: "3 min read"
status: "draft"
---

## [H2 Header with keyword - mirrors user thinking]

[Clear intro explaining what this page covers and why it's useful]

[Your ORIGINAL content here - 500-800 words, well-structured with H3 subsections]

### Key Takeaways

- [Takeaway 1 with specific detail]
- [Takeaway 2 with metric if possible]
- [Takeaway 3]

### What You Can Do Today

[Practical action step - snippet-worthy, can be pulled by Google]

CRITICAL:
- Write ORIGINAL content, NOT a summary
- Sound like an expert sharing YOUR knowledge
- Answer every sub-question users might have
- No emojis, straight quotes only
`;

const LINKEDIN_PROMPT = `You're Theo Daudebourg, a Shopify performance specialist. Write a LinkedIn post.

## BRAND VOICE
- Honest, no-BS tone
- Results-obsessed with specific metrics
- NO emojis ever
- First-person ("I") perspective

## STYLE (pick one randomly):
1. Contrarian hot take - "Unpopular opinion..."
2. Story-based - "Last week..." or "I just saw..."
3. Quick tip - Short, actionable, 3-4 lines
4. The challenge - "I challenge you to..."
5. Data drop - Lead with surprising stat
6. The breakdown - Bullet list format

## RULES:
- VARY your opening every time
- 150-200 words max (short posts perform better)
- ZERO emojis - absolutely critical
- Use line breaks for mobile readability
- Bullet points with dashes (-)
- Sound like a real practitioner, not a content marketer
- First-person perspective
- End with question or CTA

OUTPUT: Just the post text, ready to paste.
`;

const TWITTER_PROMPT = `You're Theo Daudebourg, a Shopify performance specialist. Write a single tweet.

## BRAND VOICE
- Honest, direct, no fluff
- NO emojis ever
- Sound human, not promotional

## RULES:
- Under 250 characters total
- Your hot take on the topic
- Be specific with numbers if possible
- No hashtag spam (one max)

OUTPUT: Just the tweet text.
`;

async function generateWithGrok(prompt: string, context: string): Promise<string> {
  const apiKey = process.env.GROK_API_KEY;
  
  const response = await fetch(GROK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'grok-3-latest',
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: `Context and conversation:\n\n${context}` },
      ],
      max_tokens: 4096,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`Grok API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GROK_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GROK_API_KEY not configured' },
        { status: 500 }
      );
    }

    const body: GenerateRequest = await request.json();
    const { topic, context, messages, outputs } = body;

    // Build context from conversation
    const conversationContext = messages
      .map(m => `${m.role === 'user' ? 'You' : 'AI'}: ${m.content}`)
      .join('\n\n');
    
    const fullContext = `Topic: ${topic}\n\nContext: ${context}\n\nConversation:\n${conversationContext}`;
    
    const results: { blog?: string; linkedin?: string; twitter?: string } = {};
    const date = new Date().toISOString().split('T')[0];

    // Generate blog if requested
    if (outputs.blog) {
      const blogPrompt = BLOG_PROMPT.replace('{DATE}', date);
      const blogContent = await generateWithGrok(blogPrompt, fullContext);
      
      // Save blog file
      const slug = slugify(topic, { lower: true, strict: true }).slice(0, 50);
      const blogPath = path.join(process.cwd(), 'content', 'blog', `${slug}.mdx`);
      fs.writeFileSync(blogPath, blogContent, 'utf-8');
      
      results.blog = blogContent;
    }

    // Generate LinkedIn if requested
    if (outputs.linkedin) {
      const linkedinContent = await generateWithGrok(LINKEDIN_PROMPT, fullContext);
      
      const slug = slugify(topic, { lower: true, strict: true }).slice(0, 40);
      const linkedinPath = path.join(process.cwd(), 'content', 'social', `linkedin-${slug}.txt`);
      
      const socialDir = path.dirname(linkedinPath);
      if (!fs.existsSync(socialDir)) {
        fs.mkdirSync(socialDir, { recursive: true });
      }
      
      fs.writeFileSync(linkedinPath, linkedinContent, 'utf-8');
      results.linkedin = linkedinContent;
    }

    // Generate Twitter if requested
    if (outputs.twitter) {
      const twitterContent = await generateWithGrok(TWITTER_PROMPT, fullContext);
      
      const slug = slugify(topic, { lower: true, strict: true }).slice(0, 40);
      const twitterPath = path.join(process.cwd(), 'content', 'social', `twitter-${slug}.txt`);
      fs.writeFileSync(twitterPath, twitterContent, 'utf-8');
      
      results.twitter = twitterContent;
    }

    return NextResponse.json({
      success: true,
      results,
      message: 'Content generated successfully',
    });
  } catch (error) {
    console.error('Generate error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}
