import React from 'react';
import { Section } from './ui/Section';
import { Project } from '../types';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface PortfolioProps {
  onProjectClick?: (project: Project) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onProjectClick }) => {
  const { content, dir } = useLanguage();

  return (
    <Section id="portfolio">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div className="flex flex-col items-start md:items-start">
          <h3 className="text-sm font-bold tracking-widest text-app-accent uppercase mb-2 text-start">{content.portfolio.label}</h3>
          <h2 className="text-4xl font-semibold text-white text-start">{content.portfolio.title}</h2>
        </div>
        <p className="text-gray-500 text-sm max-w-xs text-start">
          {content.portfolio.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {content.projects.map((project) => (
          <motion.div 
            key={project.id}
            layoutId={`project-${project.id}`}
            className="group cursor-pointer"
            onClick={() => onProjectClick?.(project)}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-white/5 shadow-2xl">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-transparent group-hover:ring-app-accent/50 transition-all duration-500 rounded-2xl z-20" />
            </div>
            
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-medium text-white group-hover:text-app-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{project.description}</p>
              </div>
              <span className="text-xs border border-white/10 rounded-full px-3 py-1 text-gray-400">
                {project.category}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};