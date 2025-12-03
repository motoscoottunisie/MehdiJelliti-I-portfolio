import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Tag, Share2 } from 'lucide-react';
import { BlogPost } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { Section } from './ui/Section';

interface BlogPostDetailProps {
  post: BlogPost;
  onBack: () => void;
}

export const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post, onBack }) => {
  const { dir, content } = useLanguage();

  if (!post) return null;

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
                    <span className="text-sm font-medium tracking-wide">{content.blog.backToBlog}</span>
                </motion.button>

                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="max-w-4xl"
                >
                    <div className="flex flex-wrap items-center gap-4 text-sm text-app-accent mb-6 font-medium">
                        <span className="px-3 py-1 bg-app-accent/10 border border-app-accent/20 rounded-full">{post.category}</span>
                        <div className="w-1 h-1 rounded-full bg-gray-600" />
                        <div className="flex items-center gap-2 text-gray-400">
                            <Clock size={14} />
                            <span>{post.readTime}</span>
                        </div>
                         <div className="w-1 h-1 rounded-full bg-gray-600" />
                        <div className="flex items-center gap-2 text-gray-400">
                            <Calendar size={14} />
                            <span>{post.date}</span>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-8">
                        {post.title}
                    </h1>
                </motion.div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full aspect-[21/9] rounded-3xl overflow-hidden mb-16 border border-white/10 relative"
                >
                     <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-app-bg to-transparent opacity-20" />
                </motion.div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-2 hidden lg:block">
                         <div className="sticky top-32 space-y-4">
                            <button className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/5">
                                <Share2 size={20} />
                            </button>
                         </div>
                    </div>
                    
                    <motion.div 
                        className="lg:col-span-8 prose prose-invert prose-lg max-w-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                         {post.content.map((paragraph, idx) => (
                             <p key={idx} className="text-gray-300 leading-relaxed mb-6 text-lg md:text-xl font-light">
                                 {paragraph}
                             </p>
                         ))}
                         
                         {post.tags && post.tags.length > 0 && (
                            <div className="mt-16 pt-12 border-t border-white/10">
                                <h3 className="text-white font-medium mb-4">Tags</h3>
                                <div className="flex gap-2 flex-wrap">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="px-4 py-2 bg-white/5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer transition-colors flex items-center gap-2">
                                            <Tag size={14} />
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                         )}
                    </motion.div>
                </div>
            </div>
        </Section>
    </div>
  );
};