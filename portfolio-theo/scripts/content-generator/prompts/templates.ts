export const blogPrompt = (topic: string, tone: string = 'educational') => `
You are writing a blog article for Theo Daudebourg's portfolio. Theo is a Shopify performance specialist who focuses on speed optimization, CRO, and AI-powered SEO systems.

TOPIC: ${topic}
TONE: ${tone} (be honest, practical, never salesy)

OUTPUT FORMAT (REQUIRED):
Return ONLY valid markdown with YAML frontmatter. No explanations before or after.

---
title: "[Compelling but honest title]"
date: "${new Date().toISOString().split('T')[0]}"
description: "[Meta description, max 155 characters]"
category: "[Speed Optimization | CRO | AI SEO | Shopify Development]"
tags: ["tag1", "tag2", "tag3"]
readTime: "[X min read]"
---

# Introduction
[Hook the reader with a real problem you've seen]

## [Section 1 Title]
[Content with actionable insights]

## [Section 2 Title]
[Content - include code snippets if relevant]

## [Section 3 Title]
[Content with examples]

## Conclusion
[Wrap up with honest takeaway - no hard sell]

---

STYLE RULES:
- Write as "I" - share real experiences and opinions
- Be specific: use numbers, examples, code when relevant
- No fluff or filler content
- Acknowledge limitations honestly
- Sound like a practitioner talking to a peer
- Keep paragraphs short (2-4 sentences max)
- Use bullet points for lists
- Total length: 800-1200 words
`;

export const linkedinPrompt = (topic: string) => `
Write a LinkedIn post for Theo Daudebourg, a Shopify performance specialist.

TOPIC: ${topic}

OUTPUT FORMAT:
Return ONLY the post text, ready to paste into LinkedIn. No explanations.

RULES:
- First line must be a hook (interrupt the scroll)
- 150-250 words total
- Short paragraphs (1-2 sentences each)
- Use line breaks for readability
- End with a question or soft CTA
- Max 2-3 emojis (or none)
- Sound human, not corporate
- Share a real insight or opinion
- No hashtag spam (max 3 at the end)

Example structure:
[Hook line that stops the scroll]

[Context/Story - what happened]

[The insight or lesson]

[Optional: practical tip]

[Question or CTA]

#hashtag1 #hashtag2
`;

export const twitterPrompt = (topic: string) => `
Create a Twitter/X thread for Theo Daudebourg about Shopify performance.

TOPIC: ${topic}

OUTPUT FORMAT:
Return ONLY the thread tweets, each separated by "---". No explanations.

RULES:
- 5-7 tweets maximum
- First tweet is the hook (must work standalone)
- Each tweet under 280 characters
- Number tweets: 1/, 2/, etc.
- Last tweet: summary + mention portfolio link
- No hashtag spam
- Short, punchy sentences
- Include at least one specific tip or number

Example:
1/ [Hook tweet that makes people want to read more]

---

2/ [Expand on the problem or context]

---

3/ [First insight or tip]

---

4/ [Second insight with specifics]

---

5/ [Wrap up + CTA to learn more]
`;
