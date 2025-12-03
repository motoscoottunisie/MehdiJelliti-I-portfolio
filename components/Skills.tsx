import React from 'react';
import { Section } from './ui/Section';
import { SKILL_ICONS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

export const Skills: React.FC = () => {
  const { content } = useLanguage();

  return (
    <Section>
      <div className="mb-16">
        <h3 className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-2">{content.skills.label}</h3>
        <h2 className="text-3xl font-semibold text-white">{content.skills.title}</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {content.skills.items.map((skill, index) => (
          <div 
            key={index}
            className="group relative bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:scale-105 hover:bg-white/10 hover:border-app-accent/30"
          >
            {/* Glow Effect on Hover */}
            <div className="absolute inset-0 bg-app-accent/20 blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl"></div>
            
            <div className="text-gray-400 group-hover:text-app-accent transition-colors duration-300">
              {SKILL_ICONS[skill.key]}
            </div>
            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
};