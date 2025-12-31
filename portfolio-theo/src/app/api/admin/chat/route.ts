import { NextRequest, NextResponse } from 'next/server';

const GROK_API_URL = 'https://api.x.ai/v1/chat/completions';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequest {
  messages: Message[];
  systemPrompt?: string;
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

    const body: ChatRequest = await request.json();
    const { messages, systemPrompt } = body;

    // Build messages array with system prompt
    const grokMessages: Message[] = [];
    
    if (systemPrompt) {
      grokMessages.push({
        role: 'system',
        content: systemPrompt,
      });
    }
    
    grokMessages.push(...messages);

    const response = await fetch(GROK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'grok-3-latest',
        messages: grokMessages,
        max_tokens: 4096,
        temperature: 0.7,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Grok API error: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content || '';

    return NextResponse.json({
      message: assistantMessage,
      usage: data.usage,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
