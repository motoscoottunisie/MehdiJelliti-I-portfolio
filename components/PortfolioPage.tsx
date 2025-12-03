import React, { useState } from 'react';
import { Section } from './ui/Section';
import { Project } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface PortfolioPageProps {
    onProjectClick?: (project: Project) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onProjectClick }) => {
  const [filter, setFilter] = useState<string>('all');
  const { content, dir } = useLanguage();

  const filterOptions = [
    { key: 'all', label: content.portfolioPage.filters.all },
    { key: 'Web', label: content.portfolioPage.filters.web },
    { key: 'Mobile', label: content.portfolioPage.filters.mobile },
    { key: 'Branding', label: content.portfolioPage.filters.branding },
  ];

  const filteredProjects = content.projects.filter(project => {
    if (filter === 'all') return true;
    
    // Inclusive filtering
    const cat = project.category;
    if (filter === 'Web') return cat.includes('Web') || cat.includes('Shopify') || cat.includes('WordPress') || cat.includes('Platform');
    if (filter === 'Mobile') return cat.includes('Mobile') || cat.includes('App');
    if (filter === 'Branding') return cat.includes('Branding') || cat.includes('Identity');
    
    return false;
  });

  return (
    <div className="pt-24 min-h-screen">
      <Section fullWidth className="!py-12">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-start"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
              {content.portfolioPage.title}
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
              {content.portfolioPage.subtitle}
            </p>
          </motion.div>

          {/* Filter Pills */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            {filterOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => setFilter(option.key)}
                className={`px-6 py-2 rounded-full text-sm transition-all duration-300 border ${
                  filter === option.key
                  ? 'bg-white text-black border-white font-medium scale-105'
                  : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {option.label}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div 
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group cursor-pointer"
                  onClick={() => onProjectClick?.(project)}
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 border border-white/5 shadow-2xl">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-transparent group-hover:ring-app-accent/50 transition-all duration-500 rounded-2xl z-20" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white group-hover:text-app-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{project.category}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};