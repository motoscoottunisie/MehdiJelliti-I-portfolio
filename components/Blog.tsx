import React from 'react';
import { Section } from './ui/Section';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogProps {
    onPostClick: (post: BlogPost) => void;
}

export const Blog: React.FC<BlogProps> = ({ onPostClick }) => {
  const { content, dir } = useLanguage();

  return (
    <div className="pt-24 min-h-screen">
      <Section fullWidth className="!py-12">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-start"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
              {content.blog.title}
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
              {content.blog.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.blog.posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => onPostClick(post)}
                className="group cursor-pointer flex flex-col h-full bg-white/5 border border-white/5 rounded-2xl overflow-hidden hover:border-app-accent/30 hover:bg-white/10 transition-all duration-300"
              >
                {/* Image */}
                <div className="aspect-[16/9] overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 z-20">
                     <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-xs font-medium text-white rounded-full border border-white/10">
                        {post.category}
                     </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-app-accent transition-colors duration-300 leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto flex items-center text-sm font-medium text-white group-hover:text-app-accent transition-colors duration-300">
                    {content.blog.readMore}
                    <ArrowRight size={16} className={`mx-2 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};