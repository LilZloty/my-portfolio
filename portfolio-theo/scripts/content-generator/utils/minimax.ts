// MiniMax API wrapper for content generation
// Docs: https://www.minimax.io/

interface MiniMaxResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function generateWithMiniMax(prompt: string): Promise<string> {
  const apiKey = process.env.MINIMAX_API_KEY;
  
  if (!apiKey) {
    throw new Error('MINIMAX_API_KEY not set in environment');
  }

  const response = await fetch('https://api.minimax.io/v1/text/chatcompletion_v2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'abab6.5s-chat',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 4096,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`MiniMax API error: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as MiniMaxResponse;
  
  if (!data.choices || data.choices.length === 0) {
    throw new Error('No response from MiniMax');
  }

  return data.choices[0].message.content;
}
