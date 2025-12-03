import React from 'react';
import { Section } from './ui/Section';
import { useLanguage } from '../contexts/LanguageContext';

export const Testimonials: React.FC = () => {
  const { content, dir } = useLanguage();
  
  // Only show visible testimonials (isVisible defaults to true if undefined)
  const visibleItems = content.testimonials.items.filter(item => item.isVisible !== false);

  if (visibleItems.length === 0) return null;

  return (
    <Section className="overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {visibleItems.map((t, i) => (
          <div 
            key={i}
            className="p-10 rounded-3xl bg-white/5 backdrop-blur-md border border-white/5 relative group hover:bg-white/10 transition-colors duration-500"
          >
            <div className={`text-app-accent text-6xl font-serif absolute top-6 opacity-30 ${dir === 'ltr' ? 'left-6' : 'right-6'}`}>"</div>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed relative z-10 mb-8 mt-4 font-light italic">
              {t.text}
            </p>
            <div>
              <p className="text-white font-medium">{t.author}</p>
              <p className="text-sm text-gray-500">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};