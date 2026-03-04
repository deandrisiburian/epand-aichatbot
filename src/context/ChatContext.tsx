import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Chat, Message, Settings } from '../types';

interface ChatContextType {
  chats: Chat[];
  currentChat: Chat | null;
  settings: Settings;
  isLoading: boolean;
  createNewChat: () => void;
  selectChat: (chatId: string) => void;
  deleteChat: (chatId: string) => void;
  sendMessage: (content: string) => Promise<void>;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
  apiKey: '',
  model: 'openai/gpt-4o-mini',
  temperature: 0.7,
  maxTokens: 2048,
  systemPrompt: 'Kamu adalah EpanD AI, asisten AI yang membantu, tidak berbahaya, dan jujur ​​yang dikembangkan oleh tim EpanD, dengan model nvidia/nemotron-nano-9b-v2:free untuk CAI-1.0, nvidia/nemotron-nano-12b-v2-vl:free untuk CAI-1.5, nvidia/nemotron-3-nano-30b-a3b:free untuk CAI-2.0 sebutkan CAI-1.0/1.5/2.0 untuk modelnya.',
  theme: 'dark',
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedChats = localStorage.getItem('epand_chats');
    const savedSettings = localStorage.getItem('epand_settings');
    
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats);
      setChats(parsedChats);
      if (parsedChats.length > 0) {
        setCurrentChat(parsedChats[0]);
      }
    }
    
    if (savedSettings) {
      setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('epand_chats', JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem('epand_settings', JSON.stringify(settings));
  }, [settings]);

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setChats(prev => [newChat, ...prev]);
    setCurrentChat(newChat);
  };

  const selectChat = (chatId: string) => {
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      setCurrentChat(chat);
    }
  };

  const deleteChat = (chatId: string) => {
    setChats(prev => prev.filter(c => c.id !== chatId));
    if (currentChat?.id === chatId) {
      setCurrentChat(chats.length > 1 ? chats.find(c => c.id !== chatId) || null : null);
    }
  };

  const sendMessage = async (content: string) => {
    if (!currentChat || !settings.apiKey) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    const updatedChat: Chat = {
      ...currentChat,
      messages: [...currentChat.messages, userMessage],
      title: currentChat.messages.length === 0 ? content.slice(0, 30) + '...' : currentChat.title,
      updatedAt: new Date(),
    };

    setCurrentChat(updatedChat);
    setChats(prev => prev.map(c => c.id === updatedChat.id ? updatedChat : c));
    setIsLoading(true);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${settings.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'EpanD AI',
        },
        body: JSON.stringify({
          model: settings.model,
          messages: [
            { role: 'system', content: settings.systemPrompt },
            ...updatedChat.messages.map(m => ({ role: m.role, content: m.content })),
          ],
          temperature: settings.temperature,
          max_tokens: settings.maxTokens,
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const assistantContent = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: assistantContent,
        timestamp: new Date(),
      };

      const finalChat: Chat = {
        ...updatedChat,
        messages: [...updatedChat.messages, assistantMessage],
        updatedAt: new Date(),
      };

      setCurrentChat(finalChat);
      setChats(prev => prev.map(c => c.id === finalChat.id ? finalChat : c));
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '⚠️ Error: Could not connect to the API. Please check your API key and try again.',
        timestamp: new Date(),
      };

      const errorChat: Chat = {
        ...updatedChat,
        messages: [...updatedChat.messages, errorMessage],
        updatedAt: new Date(),
      };

      setCurrentChat(errorChat);
      setChats(prev => prev.map(c => c.id === errorChat.id ? errorChat : c));
    } finally {
      setIsLoading(false);
    }
  };

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChat,
        settings,
        isLoading,
        createNewChat,
        selectChat,
        deleteChat,
        sendMessage,
        updateSettings,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
};
