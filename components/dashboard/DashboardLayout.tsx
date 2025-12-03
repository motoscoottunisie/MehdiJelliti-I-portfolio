import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Image, Briefcase, FileText, Settings, 
  LogOut, Globe, Shield, Menu, X, User as UserIcon, MessageSquareQuote 
} from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeModule: string;
  onModuleChange: (module: string) => void;
  onExit: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, activeModule, onModuleChange, onExit }) => {
  const { user, logout } = useContent();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'hero', label: 'Hero Section', icon: <Image size={20} /> },
    { id: 'about', label: 'About Me', icon: <UserIcon size={20} /> },
    { id: 'portfolio', label: 'Portfolio', icon: <Briefcase size={20} /> },
    { id: 'blog', label: 'Blog', icon: <FileText size={20} /> },
    { id: 'testimonials', label: 'Testimonials', icon: <MessageSquareQuote size={20} /> },
    { id: 'settings', label: 'Settings & SEO', icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    logout();
    onExit();
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex overflow-hidden font-sans">
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className={`bg-black border-r border-white/10 flex-shrink-0 flex flex-col z-20 transition-all duration-300 ${!isSidebarOpen ? 'items-center' : ''}`}
      >
        <div className="p-6 flex items-center justify-between w-full">
          {isSidebarOpen ? (
             <span className="text-xl font-bold tracking-tight">Mehdi<span className="text-app-accent">.</span>CMS</span>
          ) : (
             <span className="text-xl font-bold text-app-accent">M.</span>
          )}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-gray-400 hover:text-white">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="flex-1 py-6 space-y-2 px-3 overflow-y-auto w-full">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onModuleChange(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                activeModule === item.id 
                  ? 'bg-app-accent text-white shadow-lg shadow-app-accent/20' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              } ${!isSidebarOpen ? 'justify-center' : ''}`}
            >
              <div>{item.icon}</div>
              {isSidebarOpen && <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-white/10 w-full">
          <div className={`flex items-center gap-3 ${!isSidebarOpen ? 'justify-center' : ''}`}>
            <img src={user?.avatar} alt="User" className="w-10 h-10 rounded-full bg-gray-800" />
            {isSidebarOpen && (
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">{user?.username}</p>
                <p className="text-xs text-gray-500 capitalize flex items-center gap-1">
                  <Shield size={10} /> {user?.role}
                </p>
              </div>
            )}
            {isSidebarOpen && (
              <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors">
                <LogOut size={18} />
              </button>
            )}
          </div>
        </div>
      </motion.aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-neutral-900">
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-black/50 backdrop-blur-md">
          <h2 className="text-lg font-semibold capitalize">{activeModule.replace('-', ' ')}</h2>
          <div className="flex items-center gap-4">
            <button onClick={onExit} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <Globe size={16} />
              View Site
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
};