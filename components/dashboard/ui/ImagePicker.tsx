import React, { useState } from 'react';
import { DashboardInput } from './DashboardInput';
import { MediaLibrary } from './MediaLibrary';
import { Image as ImageIcon, Search } from 'lucide-react';

interface ImagePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: string;
}

export const ImagePicker: React.FC<ImagePickerProps> = ({ label, value, onChange, placeholder, helperText }) => {
  const [isLibraryOpen, setLibraryOpen] = useState(false);

  return (
    <div className="space-y-3">
      <DashboardInput
        label={label}
        icon={<ImageIcon size={14} />}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        helperText={helperText}
      />
      
      <div className="flex gap-4">
        <div className="h-32 w-48 flex-shrink-0 bg-black border border-white/10 rounded-xl overflow-hidden relative group">
          {value ? (
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-600 bg-white/5">
              <ImageIcon size={24} />
            </div>
          )}
        </div>
        
        <div className="flex flex-col justify-end">
          <button 
            type="button"
            onClick={() => setLibraryOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors border border-white/5"
          >
            <Search size={16} /> Browse Media Library
          </button>
        </div>
      </div>

      <MediaLibrary 
        isOpen={isLibraryOpen} 
        onClose={() => setLibraryOpen(false)} 
        onSelect={onChange} 
      />
    </div>
  );
};