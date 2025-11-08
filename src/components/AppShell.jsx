import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
  Home,
  Search,
  FileText,
  MessageCircle,
  Menu,
  X,
  TrendingUp,
  Shield,
  Sun,
  Moon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AppShell = ({ children, currentPage, setCurrentPage }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: Home, path: '/' },
    { id: 'protocols', name: 'Protocol Discovery', icon: Search, path: '/protocols' },
    { id: 'research', name: 'Research', icon: FileText, path: '/research' },
    { id: 'qa', name: 'Expert Q&A', icon: MessageCircle, path: '/qa' },
  ];

  const handleNavigation = (item) => {
    setCurrentPage(item.id);
    navigate(item.path);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-surface-light dark:bg-surface-dark border-r border-gray-800 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-gradient">DeFiPulse</span>
          </div>
          <button
            className="lg:hidden p-2 text-text-dark dark:text-text-light hover:text-primary"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className={`
                    w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200
                    ${currentPage === item.id
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-text-dark dark:text-text-light hover:bg-gray-800 dark:hover:bg-gray-700 hover:text-primary'
                    }
                  `}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <div className="card p-4 bg-surface-light dark:bg-surface-dark border border-gray-800 dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-semibold text-text-dark dark:text-text-light">BSC Network</span>
            </div>
            <p className="text-sm text-text-dark/70 dark:text-text-light/70">
              Connected to Binance Smart Chain for optimal DeFi insights
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="h-16 bg-surface-light dark:bg-surface-dark border-b border-gray-800 dark:border-gray-700 flex items-center justify-between px-6">
          <button
            className="lg:hidden p-2 text-text-dark dark:text-text-light hover:text-primary"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex-1 lg:flex-none">
            <h1 className="text-xl font-semibold text-text-dark dark:text-text-light">
              {navigation.find(nav => nav.id === currentPage)?.name || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-text-dark dark:text-text-light hover:text-primary rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <ConnectButton />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppShell;