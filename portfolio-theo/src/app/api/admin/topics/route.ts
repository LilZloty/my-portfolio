import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

const TOPICS_FILE = path.join(process.cwd(), 'content', 'topics.json');

interface Topic {
  id: string;
  title: string;
  context: string;
  messages: Array<{ role: string; content: string }>;
  createdAt: string;
  updatedAt: string;
}

function getTopics(): Topic[] {
  if (!fs.existsSync(TOPICS_FILE)) {
    return [];
  }
  const data = fs.readFileSync(TOPICS_FILE, 'utf-8');
  return JSON.parse(data);
}

function saveTopics(topics: Topic[]): void {
  const dir = path.dirname(TOPICS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(TOPICS_FILE, JSON.stringify(topics, null, 2));
}

// GET - List all topics
export async function GET() {
  const topics = getTopics();
  return NextResponse.json({ topics });
}

// POST - Create new topic
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, context, messages } = body;

    const topics = getTopics();
    const newTopic: Topic = {
      id: Date.now().toString(),
      title,
      context: context || '',
      messages: messages || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    topics.push(newTopic);
    saveTopics(topics);

    return NextResponse.json({ topic: newTopic });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create topic' },
      { status: 500 }
    );
  }
}

// PUT - Update topic
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, context, messages } = body;

    const topics = getTopics();
    const index = topics.findIndex(t => t.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: 'Topic not found' },
        { status: 404 }
      );
    }

    topics[index] = {
      ...topics[index],
      title: title ?? topics[index].title,
      context: context ?? topics[index].context,
      messages: messages ?? topics[index].messages,
      updatedAt: new Date().toISOString(),
    };

    saveTopics(topics);
    return NextResponse.json({ topic: topics[index] });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update topic' },
      { status: 500 }
    );
  }
}

// DELETE - Remove topic
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Topic ID required' },
        { status: 400 }
      );
    }

    const topics = getTopics();
    const filtered = topics.filter(t => t.id !== id);
    saveTopics(filtered);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete topic' },
      { status: 500 }
    );
  }
}
