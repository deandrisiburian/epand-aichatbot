import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { cn } from '../utils/cn';

interface SidebarProps {
  currentPage: 'chat' | 'settings';
  setCurrentPage: (page: 'chat' | 'settings') => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  const { chats, currentChat, createNewChat, selectChat, deleteChat } = useChat();

  const handleNewChat = () => {
    createNewChat();
    setCurrentPage('chat');
    setIsOpen(false);
  };

  const handleSelectChat = (chatId: string) => {
    selectChat(chatId);
    setCurrentPage('chat');
    setIsOpen(false);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:relative z-50 h-full w-72 glass-dark flex flex-col",
          "transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center border border-white/10">
              <span className="text-xl">🤖</span>
            </div>
            <div>
              <h1 className="text-white font-bold">EpanD AI</h1>
              <p className="text-white/40 text-xs">Intelligent Assistant</p>
            </div>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button
            onClick={handleNewChat}
            className="w-full btn-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Chat
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-2">
          <p className="text-white/30 text-xs px-2 mb-2 uppercase tracking-wider">Recent Chats</p>
          <div className="space-y-1">
            {chats.length === 0 ? (
              <p className="text-white/20 text-sm text-center py-4">No chats yet</p>
            ) : (
              chats.map(chat => (
                <div
                  key={chat.id}
                  className={cn(
                    "group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all",
                    currentChat?.id === chat.id && currentPage === 'chat'
                      ? "bg-white/10 border border-white/10"
                      : "hover:bg-white/5"
                  )}
                  onClick={() => handleSelectChat(chat.id)}
                >
                  <svg className="w-4 h-4 text-white/40 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-white/70 text-sm truncate flex-1">{chat.title}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteChat(chat.id); }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded transition-all"
                  >
                    <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="p-2 border-t border-white/5">
          <button
            onClick={() => { setCurrentPage('chat'); setIsOpen(false); }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
              currentPage === 'chat' ? "bg-white/10 border border-white/10" : "hover:bg-white/5"
            )}
          >
            <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-white/70 font-medium">Chat</span>
          </button>
          <button
            onClick={() => { setCurrentPage('settings'); setIsOpen(false); }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
              currentPage === 'settings' ? "bg-white/10 border border-white/10" : "hover:bg-white/5"
            )}
          >
            <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-white/70 font-medium">Settings</span>
          </button>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center border border-white/10">
              <span className="text-lg">{user?.avatar}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{user?.username}</p>
              <p className="text-white/40 text-xs truncate">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="p-2 hover:bg-white/10 rounded-lg transition-all"
              title="Logout"
            >
              <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
