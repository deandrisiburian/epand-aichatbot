import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../context/ChatContext';
import { cn } from '../utils/cn';
import MarkdownRenderer from './MarkdownRenderer';

const CopyButton: React.FC<{ content: string }> = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all",
        copied
          ? "bg-green-500/20 text-green-400 border border-green-500/30"
          : "bg-white/5 hover:bg-white/10 text-white/50 hover:text-white/80 border border-white/10"
      )}
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Copied!</span>
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>Copy</span>
        </>
      )}
    </button>
  );
};

interface ChatProps {
  onOpenSidebar: () => void;
}

const Chat: React.FC<ChatProps> = ({ onOpenSidebar }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentChat, sendMessage, isLoading, settings, createNewChat } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!currentChat) {
      createNewChat();
    }

    const message = input;
    setInput('');
    
    // Small delay to ensure chat is created
    setTimeout(() => {
      sendMessage(message);
    }, 100);
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <header className="glass-dark px-4 py-3 flex items-center gap-3 border-b border-white/5">
        <button
          onClick={onOpenSidebar}
          className="p-2 hover:bg-white/10 rounded-lg transition-all md:hidden"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex-1">
          <h2 className="text-white font-semibold">
            {currentChat?.title || 'New Conversation'}
          </h2>
          <p className="text-white/40 text-xs">
            EAI-1.0
          </p>
        </div>
        {!settings.apiKey && (
          <div className="glass px-3 py-1 rounded-full bg-yellow-500/10 border-yellow-500/20">
            <span className="text-yellow-300/80 text-xs">⚠️ API Key Required</span>
          </div>
        )}
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!currentChat || currentChat.messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 glass flex items-center justify-center mb-6 border border-white/10">
              <span className="text-5xl">🤖</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Welcome to EpanD AI
            </h2>
            <p className="text-white/50 max-w-md mb-8">
              Your intelligent chat assistant powered by advanced AI. Start a conversation to explore endless possibilities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-lg">
              {[
                { icon: '📊', text: 'Show me a comparison table of programming languages' },
                { icon: '🧮', text: 'Explain the quadratic formula with math equations' },
                { icon: '💻', text: 'Write a Python function to sort an array' },
                { icon: '📋', text: 'Create a task list for building a web app' },
              ].map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => setInput(suggestion.text)}
                  className="glass-button px-4 py-3 rounded-xl text-left text-white/70 text-sm flex items-center gap-3 hover:text-white"
                >
                  <span className="text-xl">{suggestion.icon}</span>
                  <span>{suggestion.text}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {currentChat.messages.map((message, index) => (
              <div
                key={message.id}
                className={cn(
                  "message-appear",
                  message.role === 'user' ? 'flex gap-3 justify-end' : ''
                )}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {message.role === 'user' ? (
                  <>
                    <div className="max-w-[85%] md:max-w-[75%] rounded-2xl rounded-br-sm bg-white text-black px-4 py-3">
                      <p className="text-sm md:text-base whitespace-pre-wrap break-words">
                        {message.content}
                      </p>
                      <p className="text-xs mt-2 text-black/50">
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">👤</span>
                    </div>
                  </>
                ) : (
                  <div className="group">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                        <span className="text-sm">🤖</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white/70 text-sm font-medium">EpanD AI</span>
                        <span className="text-white/30 text-xs">{formatTime(message.timestamp)}</span>
                      </div>
                    </div>
                    <div className="pl-11 text-white text-sm md:text-base">
                      <MarkdownRenderer content={message.content} />
                    </div>
                    <div className="pl-11 mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <CopyButton content={message.content} />
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="message-appear">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                    <span className="text-sm">🤖</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/70 text-sm font-medium">EpanD AI</span>
                  </div>
                </div>
                <div className="pl-11">
                  <div className="typing-indicator flex gap-1.5">
                    <span className="w-2 h-2 bg-white/50 rounded-full"></span>
                    <span className="w-2 h-2 bg-white/50 rounded-full"></span>
                    <span className="w-2 h-2 bg-white/50 rounded-full"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/5">
        <form onSubmit={handleSubmit} className="relative">
          <div className="glass-dark rounded-2xl flex items-end gap-2 p-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder={settings.apiKey ? "Type your message..." : "Add your API key..."}
              disabled={!settings.apiKey}
              className="flex-1 bg-transparent text-white placeholder-white/30 resize-none focus:outline-none px-3 py-2 max-h-32 min-h-[44px]"
              rows={1}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading || !settings.apiKey}
              className={cn(
                "p-3 rounded-xl transition-all flex-shrink-0",
                input.trim() && settings.apiKey
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-white/10 text-white/50"
              )}
            >
              {isLoading ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-white/20 text-xs text-center mt-2">
            Press Enter to send, Shift + Enter for new line
          </p>
        </form>
      </div>
    </div>
  );
};

export default Chat;
