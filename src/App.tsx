import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Settings from './components/Settings';

const MainApp: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState<'chat' | 'settings'>('chat');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <ChatProvider>
      <div className="min-h-screen w-full liquid-gradient relative overflow-hidden">
        {/* Floating Orbs Background - Black Theme with subtle gray/white tones */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="floating-orb w-96 h-96 bg-white -top-48 -left-48" style={{ animationDelay: '0s' }} />
          <div className="floating-orb w-80 h-80 bg-gray-400 top-1/4 right-0" style={{ animationDelay: '2s' }} />
          <div className="floating-orb w-72 h-72 bg-gray-300 bottom-0 left-1/4" style={{ animationDelay: '4s' }} />
          <div className="floating-orb w-64 h-64 bg-white -bottom-32 -right-32" style={{ animationDelay: '6s' }} />
        </div>

        {/* Main Container */}
        <div className="relative z-10 flex h-screen">
          <Sidebar
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            isOpen={sidebarOpen}
            setIsOpen={setSidebarOpen}
          />
          
          <main className="flex-1 flex flex-col overflow-hidden">
            {currentPage === 'chat' ? (
              <Chat onOpenSidebar={() => setSidebarOpen(true)} />
            ) : (
              <Settings onOpenSidebar={() => setSidebarOpen(true)} />
            )}
          </main>
        </div>
      </div>
    </ChatProvider>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
};

export default App;
