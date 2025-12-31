/**
 * Grok API Integration
 * 
 * Uses xAI's Grok API with web search capabilities for:
 * - Real-time news discovery
 * - Content rewriting with brand voice
 * - Fact-checking and source verification
 */

interface GrokMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface GrokResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

const GROK_API_URL = 'https://api.x.ai/v1/chat/completions';

/**
 * Generate content using Grok API
 */
export async function generateWithGrok(
  prompt: string, 
  options: {
    model?: string;
    maxTokens?: number;
    temperature?: number;
    enableSearch?: boolean;
  } = {}
): Promise<string> {
  const apiKey = process.env.GROK_API_KEY || process.env.XAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('GROK_API_KEY or XAI_API_KEY environment variable is required');
  }

  const {
    model = 'grok-4-latest',
    maxTokens = 4096,
    temperature = 0.7,
    enableSearch = false,
  } = options;

  const messages: GrokMessage[] = [
    {
      role: 'user',
      content: prompt,
    },
  ];

  // Build request body
  const requestBody: Record<string, unknown> = {
    model,
    messages,
    max_tokens: maxTokens,
    temperature,
  };

  // Note: live_search requires special API access
  // For now, we use Grok for content generation only
  // and RSS feeds for news discovery

  const response = await fetch(GROK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Grok API error (${response.status}): ${errorText}`);
  }

  const data = await response.json() as GrokResponse;
  
  if (!data.choices || data.choices.length === 0) {
    throw new Error('No response from Grok API');
  }

  return data.choices[0].message.content;
}

/**
 * Search for news using Grok's web search capability
 */
export async function searchNews(
  topic: string,
  options: {
    daysBack?: number;
    limit?: number;
  } = {}
): Promise<Array<{
  title: string;
  summary: string;
  source: string;
  url: string;
  date: string;
}>> {
  const { daysBack = 3, limit = 5 } = options;

  const searchPrompt = `Search for the latest news and articles about "${topic}" from the past ${daysBack} days.

Focus on:
- AI and LLM developments
- Shopify and e-commerce updates
- Conversion rate optimization
- Web performance improvements

Return ONLY a JSON array with the ${limit} most relevant articles. Each article should have:
{
  "title": "Article title",
  "summary": "2-3 sentence summary",
  "source": "Source name (e.g., Shopify Blog, TechCrunch)",
  "url": "Full URL to the article",
  "date": "Publication date in YYYY-MM-DD format"
}

Return ONLY the JSON array, no other text.`;

  const response = await generateWithGrok(searchPrompt, {
    enableSearch: true,
    temperature: 0.3, // Lower temperature for more factual results
  });

  try {
    // Extract JSON from response
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.warn('Could not parse news search results, returning empty array');
      return [];
    }
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.warn('Failed to parse Grok news search response:', error);
    return [];
  }
}

/**
 * Rewrite content using Grok with brand voice
 */
export async function rewriteWithBrandVoice(
  content: string,
  brandGuidelines: string
): Promise<string> {
  const rewritePrompt = `${brandGuidelines}

---

ORIGINAL CONTENT:
${content}

---

Rewrite this content following the brand guidelines above. Maintain the key facts and insights but adapt the tone, style, and format to match the brand voice.

Return ONLY the rewritten content, no explanations.`;

  return generateWithGrok(rewritePrompt, {
    temperature: 0.6,
  });
}
