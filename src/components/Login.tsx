import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../utils/cn';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    const success = login(username, password);
    if (!success) {
      setError('Invalid username or password');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full liquid-gradient flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Orbs - Black Theme */}
      <div className="floating-orb w-72 h-72 bg-white top-10 left-10" style={{ animationDelay: '0s' }} />
      <div className="floating-orb w-96 h-96 bg-gray-400 bottom-10 right-10" style={{ animationDelay: '2s' }} />
      <div className="floating-orb w-64 h-64 bg-gray-300 top-1/2 left-1/4" style={{ animationDelay: '4s' }} />

      <div className="glass rounded-3xl p-8 md:p-12 w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center glass border border-white/10">
            <span className="text-4xl">🤖</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">EpanD AI</h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white/70 text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-white/40"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-white/70 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-white/40"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <div className="glass rounded-xl p-3 bg-red-500/10 border-red-500/20">
              <p className="text-red-300 text-sm text-center">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "w-full py-4 rounded-xl font-semibold transition-all duration-300",
              "btn-white",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Demo Accounts */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-white/50 text-sm text-center mb-4">Demo Accounts</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => { setUsername('admin'); setPassword('admin123'); }}
              className="glass-button px-4 py-2 rounded-lg text-white/70 text-sm hover:text-white"
            >
              👤 Admin
            </button>
            <button
              onClick={() => { setUsername('user'); setPassword('user123'); }}
              className="glass-button px-4 py-2 rounded-lg text-white/70 text-sm hover:text-white"
            >
              🧑‍💻 User 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
