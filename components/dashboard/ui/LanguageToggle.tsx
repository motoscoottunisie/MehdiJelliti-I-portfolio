import React from 'react';

interface LanguageToggleProps {
  lang: 'en' | 'ar';
  setLang: (lang: 'en' | 'ar') => void;
  onSwitch?: () => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ lang, setLang, onSwitch }) => {
  const handleSwitch = (newLang: 'en' | 'ar') => {
    if (lang !== newLang) {
      setLang(newLang);
      onSwitch?.();
    }
  };

  return (
    <div className="flex bg-black rounded-lg p-1 border border-white/10">
      <button 
        onClick={() => handleSwitch('en')}
        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 ${
          lang === 'en' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'
        }`}
      >
        EN
      </button>
      <button 
        onClick={() => handleSwitch('ar')}
        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 ${
          lang === 'ar' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'
        }`}
      >
        AR
      </button>
    </div>
  );
};