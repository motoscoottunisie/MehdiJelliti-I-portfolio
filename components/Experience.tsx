
import React from 'react';
import { Section } from './ui/Section';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Trophy } from 'lucide-react';

export const Experience: React.FC = () => {
  const { content, dir } = useLanguage();

  const getIcon = (type: string) => {
    switch (type) {
      case 'education': return <GraduationCap size={20} />;
      case 'achievement': return <Trophy size={20} />;
      default: return <Briefcase size={20} />;
    }
  };

  return (
    <Section id="experience">
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-semibold text-white">{content.experience.title}</h2>
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Vertical Line */}
        <div className={`absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent ${dir === 'ltr' ? 'left-[20px] md:left-1/2' : 'right-[20px] md:right-1/2'}`} />

        <div className="space-y-12">
          {content.experience.items.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`relative flex items-start gap-8 md:gap-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Timeline Node */}
              <div className={`absolute top-0 w-10 h-10 rounded-full bg-black border border-white/10 flex items-center justify-center z-10 text-app-accent shadow-[0_0_20px_rgba(245,110,15,0.2)] ${dir === 'ltr' ? 'left-0 md:left-1/2 md:-translate-x-1/2' : 'right-0 md:right-1/2 md:translate-x-1/2'}`}>
                {getIcon(item.type)}
              </div>

              {/* Content Card */}
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? (dir === 'ltr' ? 'md:pl-12' : 'md:pr-12') : (dir === 'ltr' ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left')} ${dir === 'ltr' ? 'pl-16' : 'pr-16'}`}>
                <div className="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300">
                  <span className="text-xs font-bold tracking-widest text-app-accent mb-2 block uppercase">{item.year}</span>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-app-accent transition-colors">{item.title}</h3>
                  <p className="text-sm font-medium text-gray-400 mb-3">{item.organization}</p>
                  <p className="text-sm text-gray-500 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
              
              {/* Spacer for alternate side */}
              <div className="hidden md:block w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};
