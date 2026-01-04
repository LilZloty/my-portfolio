'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Topic {
  id: string;
  title: string;
  context: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export default function AdminDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [currentTopic, setCurrentTopic] = useState<string>('');
  const [generating, setGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get admin auth header for API calls
  const getAuthHeaders = () => {
    const password = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '';
    return {
      'Content-Type': 'application/json',
      'X-Admin-Auth': password,
    };
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const res = await fetch('/api/admin/topics');
      const data = await res.json();
      setTopics(data.topics || []);
    } catch (error) {
      console.error('Failed to fetch topics:', error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/chat', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
          systemPrompt: `You are helping Theo Daudebourg, a Shopify performance specialist, develop content ideas for his blog. 
Help him explore topics related to Shopify speed optimization, CRO, AI-powered SEO, and e-commerce. 
Be conversational and help develop ideas that could become blog posts or social media content.
Keep responses focused and practical.`,
        }),
      });

      const data = await res.json();

      if (data.message) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.message,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveTopic = async () => {
    const title = prompt('Enter topic title:');
    if (!title) return;

    try {
      await fetch('/api/admin/topics', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          title,
          context: currentTopic,
          messages: messages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      fetchTopics();
      alert('Topic saved!');
    } catch (error) {
      console.error('Failed to save topic:', error);
    }
  };

  const loadTopic = (topic: Topic) => {
    setCurrentTopic(topic.context);
    setMessages(topic.messages.map((m, i) => ({
      id: i.toString(),
      role: m.role as 'user' | 'assistant',
      content: m.content,
      timestamp: new Date(topic.updatedAt),
    })));
  };

  const generateContent = async (type: 'all' | 'blog' | 'linkedin' | 'twitter') => {
    if (messages.length === 0) {
      alert('Start a conversation first!');
      return;
    }

    const title = prompt('Enter content title/topic:');
    if (!title) return;

    setGenerating(true);

    try {
      const res = await fetch('/api/admin/generate', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          topic: title,
          context: currentTopic,
          messages: messages.map(m => ({ role: m.role, content: m.content })),
          outputs: {
            blog: type === 'all' || type === 'blog',
            linkedin: type === 'all' || type === 'linkedin',
            twitter: type === 'all' || type === 'twitter',
          },
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert('Content generated! Check /content folder.');
      } else {
        alert('Generation failed: ' + data.error);
      }
    } catch (error) {
      console.error('Generate error:', error);
    } finally {
      setGenerating(false);
    }
  };

  const clearChat = () => {
    if (confirm('Clear current conversation?')) {
      setMessages([]);
      setCurrentTopic('');
    }
  };

  return (
    <div className="flex h-[calc(100vh-65px)]">
      {/* Sidebar - Topics */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-900/30 p-4 overflow-y-auto">
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
          Saved Topics
        </h2>
        
        <div className="space-y-2">
          {topics.length === 0 ? (
            <p className="text-xs text-zinc-500">No topics saved yet.</p>
          ) : (
            topics.map(topic => (
              <button
                key={topic.id}
                onClick={() => loadTopic(topic)}
                className="w-full text-left px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <div className="font-medium truncate">{topic.title}</div>
                <div className="text-xs text-zinc-500">
                  {new Date(topic.updatedAt).toLocaleDateString()}
                </div>
              </button>
            ))
          )}
        </div>

        <div className="mt-6 pt-6 border-t border-zinc-800">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => generateContent('all')}
              disabled={generating || messages.length === 0}
              className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {generating ? 'Generating...' : 'Generate All'}
            </button>
            <button
              onClick={() => generateContent('blog')}
              disabled={generating || messages.length === 0}
              className="w-full py-2 px-3 bg-zinc-700 hover:bg-zinc-600 disabled:opacity-50 text-white text-sm rounded-lg transition-colors"
            >
              Blog Only
            </button>
            <button
              onClick={() => generateContent('linkedin')}
              disabled={generating || messages.length === 0}
              className="w-full py-2 px-3 bg-zinc-700 hover:bg-zinc-600 disabled:opacity-50 text-white text-sm rounded-lg transition-colors"
            >
              LinkedIn Only
            </button>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Context Input */}
        <div className="p-4 border-b border-zinc-800 bg-zinc-900/30">
          <label className="block text-xs text-zinc-500 mb-2">
            Topic Context (optional - helps Grok understand your focus)
          </label>
          <input
            type="text"
            value={currentTopic}
            onChange={(e) => setCurrentTopic(e.target.value)}
            placeholder="e.g., Shopify speed optimization for fashion stores"
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-zinc-500 mt-20">
              <p className="text-lg mb-2">Start a conversation</p>
              <p className="text-sm">
                Discuss content ideas with Grok, then generate blog posts and social content.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-zinc-800 text-zinc-100'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-zinc-800 text-zinc-400 px-4 py-3 rounded-2xl">
                <span className="animate-pulse">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/30">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Type your message... (Enter to send)"
              className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-semibold rounded-lg transition-colors"
            >
              Send
            </button>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={saveTopic}
              disabled={messages.length === 0}
              className="text-xs text-zinc-400 hover:text-white disabled:opacity-50"
            >
              Save Topic
            </button>
            <span className="text-zinc-600">|</span>
            <button
              onClick={clearChat}
              className="text-xs text-zinc-400 hover:text-white"
            >
              Clear Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
