import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Image as ImageIcon, Check } from 'lucide-react';

interface MediaLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

const MOCK_ASSETS = [
  "https://www.magma-studio.tn/portfolio2/my-photo.webp",
  "https://www.magma-studio.tn/portfolio2/my-photo-mobile.webp",
  "https://picsum.photos/800/600?random=1",
  "https://picsum.photos/800/600?random=2",
  "https://picsum.photos/800/600?random=3",
  "https://picsum.photos/800/600?random=4",
  "https://picsum.photos/800/600?random=5",
  "https://picsum.photos/800/600?random=6",
  "https://picsum.photos/800/600?random=10",
  "https://picsum.photos/800/600?random=11",
  "https://picsum.photos/800/600?random=12",
];

export const MediaLibrary: React.FC<MediaLibraryProps> = ({ isOpen, onClose, onSelect }) => {
  const [activeTab, setActiveTab] = useState<'library' | 'upload'>('library');

  const handleSelect = (url: string) => {
    onSelect(url);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl h-[80vh] bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-black/50">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ImageIcon size={20} className="text-app-accent" /> Media Library
              </h3>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10">
              <button 
                onClick={() => setActiveTab('library')}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'library' ? 'text-white border-b-2 border-app-accent bg-white/5' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Media Library
              </button>
              <button 
                onClick={() => setActiveTab('upload')}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'upload' ? 'text-white border-b-2 border-app-accent bg-white/5' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Upload New
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-[#0A0A0A]">
              {activeTab === 'library' ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {MOCK_ASSETS.map((url, i) => (
                    <div 
                      key={i} 
                      onClick={() => handleSelect(url)}
                      className="group relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-white/5 cursor-pointer hover:border-app-accent transition-all"
                    >
                      <img src={url} alt={`Asset ${i}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 bg-app-accent/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="bg-app-accent text-white p-2 rounded-full shadow-lg">
                          <Check size={16} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl bg-white/5 p-12 text-center group hover:border-app-accent/50 hover:bg-white/10 transition-all cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Upload size={32} className="text-gray-400 group-hover:text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Drop files here to upload</h4>
                  <p className="text-gray-500 text-sm max-w-sm">
                    Support for PNG, JPG, WEBP. Maximum file size 5MB.
                  </p>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-white/10 bg-black/50 text-xs text-center text-gray-500">
              Media assets are managed centrally.
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};