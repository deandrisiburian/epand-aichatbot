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
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
  theme: 'dark' | 'light';
}

export const AVAILABLE_MODELS = [
  { id: 'nvidia/nemotron-nano-9b-v2:free', name: 'CAI-1.0' },
  { id: 'nvidia/nemotron-nano-12b-v2-vl:free', name: 'CAI-1.5' },
  { id: 'nvidia/nemotron-3-nano-30b-a3b:free', name: 'CAI-2.0' },
];

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
