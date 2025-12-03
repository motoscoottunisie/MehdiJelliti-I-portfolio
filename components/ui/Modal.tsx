import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Project } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, project }) => {
  const { content } = useLanguage();
  
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            onClick={onClose}
          />
          <motion.div
            layoutId={`project-${project.id}`}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none"
          >
            <div 
              className="bg-app-surface w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 shadow-2xl pointer-events-auto custom-scrollbar relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={onClose}
                className="absolute top-6 end-6 p-2 bg-white/10 rounded-full text-white hover:bg-app-accent hover:text-white transition-colors z-50"
              >
                <X size={20} />
              </button>

              <div className="w-full aspect-video relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-app-surface to-transparent opacity-80" />
                
                <div className="absolute bottom-8 start-8 md:bottom-12 md:start-12 text-start">
                   <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{project.title}</h2>
                   <p className="text-app-accent text-lg">{project.category}</p>
                </div>
              </div>

              <div className="p-8 md:p-12 space-y-8 text-start">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">{content.modal.overview}</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">{project.fullDescription}</p>
                </div>

                <div>
                   <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">{content.modal.technologies}</h3>
                   <div className="flex flex-wrap gap-2">
                     {project.technologies.map(tech => (
                       <span key={tech} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">
                         {tech}
                       </span>
                     ))}
                   </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex justify-between items-center">
                    <span className="text-gray-500">{content.modal.caseStudy}</span>
                    <button className="text-app-accent font-medium hover:text-white transition-colors flex items-center gap-2">
                      {content.modal.livePreview} <span className="rtl:rotate-180">&rarr;</span>
                    </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};