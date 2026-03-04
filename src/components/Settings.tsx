import React, { useState } from 'react';
import { useChat } from '../context/ChatContext';
import { cn } from '../utils/cn';

interface SettingsProps {
  onOpenSidebar: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onOpenSidebar }) => {
  const { settings, updateSettings } = useChat();
  const [showApiKey, setShowApiKey] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
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
          <h2 className="text-white font-semibold">Settings</h2>
          <p className="text-white/40 text-xs">Configure your AI assistant</p>
        </div>
      </header>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* API Configuration */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              API Configuration
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  OpenRouter API Key
                </label>
                <div className="relative">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={settings.apiKey}
                    onChange={(e) => updateSettings({ apiKey: e.target.value })}
                    className="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-white/40 pr-12"
                    placeholder="sk-or-v1-..."
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded"
                  >
                    {showApiKey ? (
                      <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="text-white/30 text-xs mt-2">
                  Get your API key from{' '}
                  <a
                    href="https://openrouter.ai/keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white underline"
                  >
                    openrouter.ai/keys
                  </a>
                </p>
              </div>

              {/* Model Info */}
              <div className="glass-button rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-lg">🧠</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">EAI-1.0</p>
                    <p className="text-white/40 text-xs">Powered by EpanDLabs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Model Parameters */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Model Parameters
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-white/70 text-sm font-medium">
                    Temperature
                  </label>
                  <span className="text-white/50 text-sm">{settings.temperature}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={settings.temperature}
                  onChange={(e) => updateSettings({ temperature: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                />
                <div className="flex justify-between text-white/30 text-xs mt-1">
                  <span>Precise</span>
                  <span>Creative</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-white/70 text-sm font-medium">
                    Max Tokens
                  </label>
                  <span className="text-white/50 text-sm">{settings.maxTokens}</span>
                </div>
                <input
                  type="range"
                  min="256"
                  max="4096"
                  step="256"
                  value={settings.maxTokens}
                  onChange={(e) => updateSettings({ maxTokens: parseInt(e.target.value) })}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                />
                <div className="flex justify-between text-white/30 text-xs mt-1">
                  <span>Short</span>
                  <span>Long</span>
                </div>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              About EpanD AI
            </h3>
            
            <div className="space-y-3 text-white/60 text-sm">
              <p>
                EpanD AI is an intelligent chat assistant powered by GPT-4o Mini through OpenRouter. It supports rich text responses including markdown, code highlighting, math equations, and tables.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="glass px-3 py-1 rounded-full text-xs text-white/50">🚀 Fast & Reliable</span>
                <span className="glass px-3 py-1 rounded-full text-xs text-white/50">🔒 Private & Secure</span>
                <span className="glass px-3 py-1 rounded-full text-xs text-white/50">🎨 Beautiful UI</span>
                <span className="glass px-3 py-1 rounded-full text-xs text-white/50">📱 Mobile Friendly</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Features
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="glass-button rounded-xl p-3">
                <span className="text-xl mb-2 block">📝</span>
                <p className="text-white/70 text-sm font-medium">Markdown</p>
                <p className="text-white/40 text-xs">Rich text formatting</p>
              </div>
              <div className="glass-button rounded-xl p-3">
                <span className="text-xl mb-2 block">💻</span>
                <p className="text-white/70 text-sm font-medium">Code Highlight</p>
                <p className="text-white/40 text-xs">Syntax highlighting</p>
              </div>
              <div className="glass-button rounded-xl p-3">
                <span className="text-xl mb-2 block">🧮</span>
                <p className="text-white/70 text-sm font-medium">Math Equations</p>
                <p className="text-white/40 text-xs">LaTeX support</p>
              </div>
              <div className="glass-button rounded-xl p-3">
                <span className="text-xl mb-2 block">📊</span>
                <p className="text-white/70 text-sm font-medium">Tables</p>
                <p className="text-white/40 text-xs">Formatted tables</p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className={cn(
              "w-full py-4 rounded-xl font-semibold transition-all duration-300",
              "btn-white"
            )}
          >
            {saved ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Settings Saved!
              </span>
            ) : (
              'Save Settings'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
