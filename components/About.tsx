import React from 'react';
import { Section } from './ui/Section';
import { useLanguage } from '../contexts/LanguageContext';

export const About: React.FC = () => {
  const { content, language } = useLanguage();

  return (
    <Section id="about">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{content.about.title}</h2>
        
        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
          {content.about.description1} <span className="text-white font-medium">{content.about.descriptionEffortless}</span>, <span className="text-white font-medium">{content.about.descriptionIntuitive}</span>, {language === 'en' && 'and'} <span className="text-app-accent font-medium">{content.about.descriptionPremium}</span>{content.about.description2}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
          {content.about.tags.map((item, index) => (
            <div key={index} className="border-t border-white/10 pt-4">
              <span className="text-sm uppercase tracking-widest text-gray-500">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};