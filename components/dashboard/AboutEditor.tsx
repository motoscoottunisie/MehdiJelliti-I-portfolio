import React, { useState } from 'react';
import { useContent } from '../../contexts/ContentContext';
import { useToast } from '../../contexts/ToastContext';
import { DashboardInput } from './ui/DashboardInput';
import { LanguageToggle } from './ui/LanguageToggle';
import { Save, User, Tag } from 'lucide-react';

export const AboutEditor: React.FC = () => {
  const { fullContent, updateContent } = useContent();
  const { showToast } = useToast();
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  const content = fullContent[lang].about;

  const handleChange = (key: string, value: any) => {
    updateContent(lang, 'about', key, value);
  };

  const handleTagsChange = (value: string) => {
    const tagsArray = value.split(',').map(t => t.trim()).filter(t => t !== '');
    handleChange('tags', tagsArray);
  };

  const handleSave = () => {
    showToast('About section updated successfully!', 'success');
  };

  return (
    <div className="max-w-4xl space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h3 className="text-2xl font-bold text-white">About Section Manager</h3>
            <p className="text-gray-400 text-sm">Edit your bio, philosophy, and expertise tags.</p>
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

      <div className="bg-black border border-white/10 rounded-2xl p-8 space-y-8 animate-in fade-in slide-in-from-top-4">
        
        {/* Title Section */}
        <div className="space-y-4">
            <h4 className="text-lg font-bold text-white border-b border-white/10 pb-2 flex items-center gap-2">
                <User size={18} className="text-app-accent"/> Main Headline
            </h4>
            <DashboardInput
                label="About Title"
                value={content.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g. Entrepreneur. Designer. Creator."
            />
        </div>

        {/* Description Section */}
        <div className="space-y-4">
            <h4 className="text-lg font-bold text-white border-b border-white/10 pb-2">Biography & Philosophy</h4>
            <p className="text-xs text-gray-500 mb-4">The text is split to allow for specific word highlighting in the design.</p>
            
            <DashboardInput
                label="Main Description (Part 1)"
                textarea
                value={content.description1}
                onChange={(e) => handleChange('description1', e.target.value)}
                placeholder="Start of the paragraph..."
                className="min-h-[100px]"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DashboardInput
                    label="Highlight 1"
                    value={content.descriptionEffortless}
                    onChange={(e) => handleChange('descriptionEffortless', e.target.value)}
                    placeholder="e.g. effortless"
                    helperText="Displayed in white/bold"
                />
                <DashboardInput
                    label="Highlight 2"
                    value={content.descriptionIntuitive}
                    onChange={(e) => handleChange('descriptionIntuitive', e.target.value)}
                    placeholder="e.g. intuitive"
                    helperText="Displayed in white/bold"
                />
                <DashboardInput
                    label="Highlight 3"
                    value={content.descriptionPremium}
                    onChange={(e) => handleChange('descriptionPremium', e.target.value)}
                    placeholder="e.g. premium"
                    helperText="Displayed in accent color"
                />
            </div>

            <DashboardInput
                label="Ending Suffix"
                value={content.description2}
                onChange={(e) => handleChange('description2', e.target.value)}
                placeholder="e.g. ."
            />
        </div>

        {/* Tags Section */}
        <div className="space-y-4">
            <h4 className="text-lg font-bold text-white border-b border-white/10 pb-2 flex items-center gap-2">
                <Tag size={18} className="text-app-accent"/> Expertise Tags
            </h4>
            <DashboardInput
                label="Tags (Comma Separated)"
                value={content.tags.join(', ')}
                onChange={(e) => handleTagsChange(e.target.value)}
                placeholder="React front-end, Custom WordPress, ..."
                helperText="These appear as a list below the description."
            />
            <div className="flex flex-wrap gap-2 mt-2">
                {content.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                        {tag}
                    </span>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};
