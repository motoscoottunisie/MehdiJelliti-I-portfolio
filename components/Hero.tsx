import React from 'react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

export const Hero: React.FC = () => {
  const { content, dir } = useLanguage();

  return (
    <section id="hero" className="min-h-screen flex items-end md:items-center justify-center pt-20 pb-12 md:pb-10 relative overflow-hidden">
      
      {/* MOBILE ONLY: Centered Background Image */}
      <div className="absolute inset-0 z-0 flex items-center justify-center md:hidden pointer-events-none">
        <div className="relative w-full max-w-[600px] aspect-[3/4]">
           <img 
            src={content.hero.mobileImage} 
            alt={content.hero.name} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-30 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Copy */}
          {/* Mobile: Left aligned text. Desktop: Left aligned text. Content at bottom on mobile due to section items-end. */}
          <div className="space-y-6 md:space-y-8 text-start flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, x: dir === 'ltr' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full"
            >
              <div className="mb-6 flex justify-start">
                <Badge variant="glass">
                  {content.hero.role}
                </Badge>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-none md:leading-none tracking-tight text-white mb-6">
                {content.hero.title} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">{content.hero.titleAccent}</span>
              </h1>
              <p className="text-gray-300 md:text-gray-400 text-lg md:text-xl leading-relaxed max-w-lg mb-4 mx-0 font-medium md:font-normal">
                {content.hero.description}
              </p>
            </motion.div>

            <motion.div 
              className="flex flex-wrap gap-4 pt-2 md:pt-4 justify-start w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Desktop View My Work (Standard Style) */}
              <Button 
                className="hidden md:inline-flex"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {content.hero.viewWork}
              </Button>

              {/* Mobile View My Work (Rotate Border Style) */}
              <Button 
                variant="rotate-border"
                className="md:hidden" 
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {content.hero.viewWork}
              </Button>

              {/* Desktop Download CV (Rotate Border Style) */}
              <Button 
                variant="rotate-border" 
                className="hidden md:inline-flex"
                onClick={() => window.open('/cv.pdf', '_blank')}
              >
                {content.hero.downloadCV}
              </Button>
            </motion.div>
          </div>

          {/* Right Column: Photo (DESKTOP ONLY) */}
          {/* Hidden on mobile, visible on medium screens and up */}
          <div className={`hidden md:flex relative z-10 justify-center ${dir === 'ltr' ? 'lg:justify-end' : 'lg:justify-start'}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px]"
            >
              {/* Image Container */}
              <div className="w-full h-full relative rounded-2xl overflow-hidden">
                <img 
                  src={content.hero.desktopImage} 
                  alt={content.hero.name} 
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"></div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};