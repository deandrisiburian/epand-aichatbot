export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  apiKey?: string;
  model?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Settings {
  apiKey: string;
  temperature: number;
  maxTokens: number;
  theme: 'dark' | 'light';
}

// Fixed model - no user selection needed
export const AI_MODEL = 'nvidia/nemotron-nano-9b-v2:free';
export const SYSTEM_PROMPT = 'You are EpanD AI, a helpful, harmless, and honest AI assistant. You can format your responses using Markdown including code blocks, tables, math equations (LaTeX), lists, and more. Respond in a friendly and professional manner. You is EpanD AI EAI 1.0 yang dikembangkan oleh EpanD Creation.';

export const DEFAULT_USERS: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@epand.ai',
    avatar: '👤',
  },
  {
    id: '2',
    username: 'user',
    email: 'user@epand.ai',
    avatar: '🧑‍💻',
  },
];

// Password: admin123 for admin, user123 for user
export const USER_CREDENTIALS: Record<string, string> = {
  'admin': 'admin123',
  'user': 'user123',
};
