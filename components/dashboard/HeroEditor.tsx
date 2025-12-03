import React, { useState } from 'react';
import { useContent } from '../../contexts/ContentContext';
import { useToast } from '../../contexts/ToastContext';
import { DashboardInput } from './ui/DashboardInput';
import { LanguageToggle } from './ui/LanguageToggle';
import { ImagePicker } from './ui/ImagePicker';
import { Save, Image as ImageIcon, Type, MousePointer } from 'lucide-react';

export const HeroEditor: React.FC = () => {
  const { fullContent, updateContent } = useContent();
  const { showToast } = useToast();
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [activeTab, setActiveTab] = useState<'text' | 'media' | 'actions'>('text');
  
  const handleChange = (key: string, value: string) => {
    updateContent(lang, 'hero', key, value);
  };

  const handleSave = () => {
    showToast('Hero section updated successfully!', 'success');
  };

  const tabs = [
    { id: 'text', label: 'Text Content', icon: <Type size={16} /> },
    { id: 'media', label: 'Media & Visuals', icon: <ImageIcon size={16} /> },
    { id: 'actions', label: 'Call to Actions', icon: <MousePointer size={16} /> },
  ];

  return (
    <div className="max-w-4xl space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h3 className="text-2xl font-bold text-white">Hero Section Manager</h3>
            <p className="text-gray-400 text-sm">Customize the main landing area of your site.</p>
         </div>

         <div className="flex items-center gap-4">
            <LanguageToggle lang={lang} setLang={setLang} />
            <button 
                onClick={handleSave}
                className="flex items-center gap-2 bg-app-accent px-4 py-2 rounded-lg text-sm font-bold text-white hover:bg-orange-600 transition-colors shadow-lg shadow-orange-900/20"
            >
                <Save size={16} /> Save Changes
            </button>
         </div>
      </div>

      <div className="flex border-b border-white/10 space-x-6">
        {tabs.map(tab => (
            <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-4 flex items-center gap-2 text-sm font-medium transition-colors relative ${activeTab === tab.id ? 'text-app-accent' : 'text-gray-500 hover:text-white'}`}
            >
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-app-accent" />}
            </button>
        ))}
      </div>

      <div className="bg-black border border-white/10 rounded-2xl p-8 space-y-6 animate-in fade-in slide-in-from-top-4">
        
        {activeTab === 'text' && (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DashboardInput
                        label="Role Title (Badge)"
                        value={fullContent[lang].hero.role}
                        onChange={(e) => handleChange('role', e.target.value)}
                        placeholder="e.g. DESIGNER"
                    />
                    <DashboardInput
                        label="Your Name (Alt Text)"
                        value={fullContent[lang].hero.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="e.g. Mehdi Jelliti"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DashboardInput
                        label="Main Title"
                        value={fullContent[lang].hero.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        placeholder="e.g. Design."
                    />
                    <DashboardInput
                        label="Accent Title (Gradient)"
                        value={fullContent[lang].hero.titleAccent}
                        onChange={(e) => handleChange('titleAccent', e.target.value)}
                        placeholder="e.g. Elevated."
                    />
                </div>

                <DashboardInput
                    label="Description Paragraph"
                    textarea
                    value={fullContent[lang].hero.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="e.g. I create design experiences built on clarity..."
                />
            </div>
        )}

        {activeTab === 'media' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ImagePicker
                    label="Desktop Background"
                    value={fullContent[lang].hero.desktopImage}
                    onChange={(val) => handleChange('desktopImage', val)}
                    placeholder="https://..."
                    helperText="Recommended: 800x1000px WEBP"
                />
                <ImagePicker
                    label="Mobile Background"
                    value={fullContent[lang].hero.mobileImage}
                    onChange={(val) => handleChange('mobileImage', val)}
                    placeholder="https://..."
                    helperText="Recommended: 600x800px WEBP"
                />
            </div>
        )}

        {activeTab === 'actions' && (
            <div className="space-y-6">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-app-accent"></span> Primary CTA
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <DashboardInput
                            label="Button Label"
                            value={fullContent[lang].hero.viewWork}
                            onChange={(e) => handleChange('viewWork', e.target.value)}
                        />
                         <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Action</label>
                            <select disabled className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-gray-500 text-sm cursor-not-allowed">
                                <option>Scroll to Portfolio</option>
                            </select>
                            <p className="text-[10px] text-gray-500">* Hardcoded behavior.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                     <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-white/50"></span> Secondary CTA
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <DashboardInput
                            label="Button Label"
                            value={fullContent[lang].hero.downloadCV}
                            onChange={(e) => handleChange('downloadCV', e.target.value)}
                        />
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Action</label>
                            <select disabled className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-gray-500 text-sm cursor-not-allowed">
                                <option>Download /cv.pdf</option>
                            </select>
                            <p className="text-[10px] text-gray-500">* Opens /cv.pdf in new tab.</p>
                        </div>
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};