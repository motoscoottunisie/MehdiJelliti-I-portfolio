import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';
import { Button } from './ui/Button';
import { ArrowLeft, Lock, User, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onBack: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBack }) => {
  const { content, dir } = useLanguage();
  const { login } = useContent();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
        login('admin', 'admin');
    } else {
        setError('Invalid credentials (Try admin/admin)');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-app-bg">
      <div className="absolute top-[-20%] start-[-10%] w-[50vw] h-[50vw] bg-app-accent/10 rounded-full blur-[120px] opacity-40 pointer-events-none" />
      <div className="absolute bottom-[-10%] end-[-5%] w-[40vw] h-[40vw] bg-blue-900/10 rounded-full blur-[120px] opacity-30 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <button
          onClick={onBack}
          className="absolute -top-16 start-0 flex items-center gap-2 text-gray-500 hover:text-white transition-colors group text-sm font-medium tracking-widest uppercase"
        >
          <ArrowLeft size={16} className={`transform group-hover:-translate-x-1 transition-transform ${dir === 'rtl' ? 'rotate-180 group-hover:translate-x-1' : ''}`} />
          {content.admin.returnHome}
        </button>

        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">{content.admin.loginTitle}</h1>
            <p className="text-gray-400 text-sm">{content.admin.loginSubtitle}</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2 group">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-app-accent transition-colors flex items-center gap-2">
                <User size={14} />
                {content.admin.username}
              </label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-app-accent transition-all placeholder-white/10 text-lg font-light"
                placeholder="admin"
              />
            </div>

            <div className="space-y-2 group">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-app-accent transition-colors flex items-center gap-2">
                <Lock size={14} />
                {content.admin.password}
              </label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-app-accent transition-all placeholder-white/10 text-lg font-light"
                placeholder="••••••••"
              />
            </div>

            {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 p-3 rounded-lg">
                    <AlertCircle size={16} /> {error}
                </div>
            )}

            <div className="pt-6">
              <Button type="submit" className="w-full">
                {content.admin.loginButton}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};