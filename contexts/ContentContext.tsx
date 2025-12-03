
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Content } from '../utils/translations';
import { Project, BlogPost, User, UserRole, Testimonial } from '../types';

interface ContentContextType {
  fullContent: { en: Content; ar: Content };
  updateContent: (lang: 'en' | 'ar', section: keyof Content, key: string, value: any) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: number) => void;
  addPost: (post: BlogPost) => void;
  updatePost: (post: BlogPost) => void;
  deletePost: (id: number) => void;
  addTestimonial: (testimonial: Testimonial) => void;
  updateTestimonial: (testimonial: Testimonial) => void;
  deleteTestimonial: (id: number) => void;
  categories: string[];
  addCategory: (category: string) => void;
  deleteCategory: (category: string) => void;
  user: User | null;
  login: (username: string, role: UserRole) => void;
  logout: () => void;
  resetToDefaults: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fullContent, setFullContent] = useState<{ en: Content; ar: Content }>(() => {
    const saved = localStorage.getItem('site_content');
    return saved ? JSON.parse(saved) : translations;
  });

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('cms_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('site_categories');
    return saved ? JSON.parse(saved) : ['Web Design', 'Mobile App', 'Branding', 'UI/UX', 'WordPress', 'Shopify', 'FinTech', 'Media Platform'];
  });

  useEffect(() => {
    localStorage.setItem('site_content', JSON.stringify(fullContent));
  }, [fullContent]);

  useEffect(() => {
    if (user) localStorage.setItem('cms_user', JSON.stringify(user));
    else localStorage.removeItem('cms_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('site_categories', JSON.stringify(categories));
  }, [categories]);

  const updateContent = (lang: 'en' | 'ar', section: keyof Content, key: string, value: any) => {
    setFullContent(prev => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [section]: {
          ...prev[lang][section],
          [key]: value
        }
      }
    }));
  };

  const addProject = (project: Project) => {
    setFullContent(prev => ({
      en: { ...prev.en, projects: [project, ...prev.en.projects] },
      ar: { ...prev.ar, projects: [project, ...prev.ar.projects] }
    }));
  };

  const updateProject = (project: Project) => {
    setFullContent(prev => ({
      en: { ...prev.en, projects: prev.en.projects.map(p => p.id === project.id ? project : p) },
      ar: { ...prev.ar, projects: prev.ar.projects.map(p => p.id === project.id ? project : p) }
    }));
  };

  const deleteProject = (id: number) => {
    setFullContent(prev => ({
      en: { ...prev.en, projects: prev.en.projects.filter(p => p.id !== id) },
      ar: { ...prev.ar, projects: prev.ar.projects.filter(p => p.id !== id) }
    }));
  };

  const addPost = (post: BlogPost) => {
    setFullContent(prev => ({
      en: { ...prev.en, blog: { ...prev.en.blog, posts: [post, ...prev.en.blog.posts] } },
      ar: { ...prev.ar, blog: { ...prev.ar.blog, posts: [post, ...prev.ar.blog.posts] } }
    }));
  };

  const updatePost = (post: BlogPost) => {
    setFullContent(prev => ({
      en: { ...prev.en, blog: { ...prev.en.blog, posts: prev.en.blog.posts.map(p => p.id === post.id ? post : p) } },
      ar: { ...prev.ar, blog: { ...prev.ar.blog, posts: prev.ar.blog.posts.map(p => p.id === post.id ? post : p) } }
    }));
  };

  const deletePost = (id: number) => {
    setFullContent(prev => ({
      en: { ...prev.en, blog: { ...prev.en.blog, posts: prev.en.blog.posts.filter(p => p.id !== id) } },
      ar: { ...prev.ar, blog: { ...prev.ar.blog, posts: prev.ar.blog.posts.filter(p => p.id !== id) } }
    }));
  };

  const addTestimonial = (testimonial: Testimonial) => {
    setFullContent(prev => ({
      en: { ...prev.en, testimonials: { items: [testimonial, ...prev.en.testimonials.items] } },
      ar: { ...prev.ar, testimonials: { items: [testimonial, ...prev.ar.testimonials.items] } }
    }));
  };

  const updateTestimonial = (testimonial: Testimonial) => {
    setFullContent(prev => ({
      en: { ...prev.en, testimonials: { items: prev.en.testimonials.items.map(t => t.id === testimonial.id ? testimonial : t) } },
      ar: { ...prev.ar, testimonials: { items: prev.ar.testimonials.items.map(t => t.id === testimonial.id ? testimonial : t) } }
    }));
  };

  const deleteTestimonial = (id: number) => {
    setFullContent(prev => ({
      en: { ...prev.en, testimonials: { items: prev.en.testimonials.items.filter(t => t.id !== id) } },
      ar: { ...prev.ar, testimonials: { items: prev.ar.testimonials.items.filter(t => t.id !== id) } }
    }));
  };

  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories(prev => [...prev, category]);
    }
  };

  const deleteCategory = (category: string) => {
    setCategories(prev => prev.filter(c => c !== category));
  };

  const login = (username: string, role: UserRole) => {
    setUser({ username, role, avatar: 'https://ui-avatars.com/api/?name=' + username });
  };

  const logout = () => {
    setUser(null);
  };

  const resetToDefaults = () => {
    setFullContent(translations);
    setCategories(['Web Design', 'Mobile App', 'Branding', 'UI/UX', 'WordPress', 'Shopify', 'FinTech', 'Media Platform']);
    localStorage.removeItem('site_content');
    localStorage.removeItem('site_categories');
  };

  return (
    <ContentContext.Provider value={{
      fullContent,
      updateContent,
      addProject,
      updateProject,
      deleteProject,
      addPost,
      updatePost,
      deletePost,
      addTestimonial,
      updateTestimonial,
      deleteTestimonial,
      categories,
      addCategory,
      deleteCategory,
      user,
      login,
      logout,
      resetToDefaults
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};