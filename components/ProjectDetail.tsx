import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Tag, Globe, Layers } from 'lucide-react';
import { Project } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { Section } from './ui/Section';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const { content, dir } = useLanguage();

  if (!project) return null;

  return (
    <div className="pt-24 min-h-screen bg-app-bg relative">
        <Section fullWidth className="!py-0 pb-16">
            <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 w-full">
                {/* Back Button */}
                <motion.button 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 group"
                >
                    <ArrowLeft size={20} className={`transform group-hover:-translate-x-1 transition-transform ${dir === 'rtl' ? 'rotate-180 group-hover:translate-x-1' : ''}`} />
                    <span className="text-sm font-medium tracking-wide">{content.projectDetail.backToWork}</span>
                </motion.button>

                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="max-w-4xl"
                >
                    <div className="flex items-center gap-3 text-sm text-app-accent mb-6 font-medium uppercase tracking-widest">
                        <span>{project.category}</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-8">
                        {project.title}
                    </h1>
                </motion.div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full aspect-video rounded-3xl overflow-hidden mb-16 border border-white/10 relative shadow-2xl"
                >
                     <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                </motion.div>

                {/* Content & Sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
                    <motion.div 
                        className="lg:col-span-8 space-y-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                         <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">{content.projectDetail.aboutProject}</h3>
                            <p className="text-gray-300 leading-relaxed text-lg md:text-xl font-light">
                                {project.fullDescription}
                            </p>
                         </div>
                    </motion.div>

                    <motion.div 
                        className="lg:col-span-4 space-y-8"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">{content.projectDetail.technologies}</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map(tech => (
                                    <span key={tech} className="px-4 py-2 bg-black/30 border border-white/10 rounded-full text-sm text-gray-300">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Gallery */}
                {project.gallery && project.gallery.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <h3 className="text-3xl font-bold text-white mb-12 text-center md:text-start">{content.projectDetail.gallery}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {project.gallery.map((img, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1, duration: 0.5 }}
                          className={`rounded-2xl overflow-hidden border border-white/5 shadow-lg relative group ${idx % 3 === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-[4/3]'}`}
                        >
                          <img 
                            src={img} 
                            alt={`${project.title} gallery ${idx + 1}`}
                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
            </div>
        </Section>
    </div>
  );
};