
import React, { useEffect, useState } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Portfolio } from './components/Portfolio';
import { Experience } from './components/Experience';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Blog } from './components/Blog';
import { BlogPostDetail } from './components/BlogPostDetail';
import { PortfolioPage } from './components/PortfolioPage';
import { ProjectDetail } from './components/ProjectDetail';
import { AdminLogin } from './components/AdminLogin';
import { Navigation } from './components/Navigation';
import { AnalyticsLoader } from './components/AnalyticsLoader';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { Overview } from './components/dashboard/Overview';
import { HeroEditor } from './components/dashboard/HeroEditor';
import { AboutEditor } from './components/dashboard/AboutEditor';
import { PortfolioManager } from './components/dashboard/PortfolioManager';
import { BlogManager } from './components/dashboard/BlogManager';
import { TestimonialsManager } from './components/dashboard/TestimonialsManager';
import { SettingsManager } from './components/dashboard/SettingsManager';
import { AnimatePresence, motion } from 'framer-motion';
import { LanguageProvider } from './contexts/LanguageContext';
import { ContentProvider, useContent } from './contexts/ContentContext';
import { ToastProvider } from './contexts/ToastContext';
import { BlogPost, Project } from './types';

type ViewState = 'home' | 'blog' | 'blog-post' | 'portfolio' | 'project-detail' | 'admin-login' | 'admin-dashboard';

const AppContent: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [activeDashboardModule, setActiveDashboardModule] = useState('overview');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { user } = useContent();
  
  useEffect(() => {
    if (user && currentView === 'admin-login') {
        setCurrentView('admin-dashboard');
    }
  }, [user, currentView]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (view: ViewState, sectionId?: string) => {
    if (view === 'portfolio' && currentView === 'project-detail') {
        setCurrentView('portfolio');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    if (view === 'blog' && currentView === 'blog-post') {
       setCurrentView('blog');
       window.scrollTo({ top: 0, behavior: 'smooth' });
       return;
    }

    if (view !== currentView) {
      setCurrentView(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (view === 'home' && sectionId !== undefined) {
       setTimeout(() => {
         if (!sectionId || sectionId === '#') {
           window.scrollTo({ top: 0, behavior: 'smooth' });
         } else {
           const element = document.getElementById(sectionId);
           if (element) {
             element.scrollIntoView({ behavior: 'smooth' });
           }
         }
       }, view !== currentView ? 100 : 0);
    }
  };

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setCurrentView('blog-post');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProjectClick = (project: Project) => {
      setSelectedProject(project);
      setCurrentView('project-detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const renderDashboardModule = () => {
    switch(activeDashboardModule) {
        case 'hero': return <HeroEditor />;
        case 'about': return <AboutEditor />;
        case 'portfolio': return <PortfolioManager />;
        case 'blog': return <BlogManager />;
        case 'testimonials': return <TestimonialsManager />;
        case 'settings': return <SettingsManager />;
        default: return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-app-bg text-app-text selection:bg-app-accent selection:text-white overflow-hidden">
      <AnalyticsLoader />
      <AnimatePresence>
        {isLoaded && (
          <>
            {currentView !== 'admin-login' && currentView !== 'admin-dashboard' && (
                <Navigation currentView={currentView} onNavigate={(view, sectionId) => handleNavigate(view as ViewState, sectionId)} />
            )}
            
            <main className="relative z-10">
              <AnimatePresence mode="wait">
                {currentView === 'home' ? (
                  <motion.div
                    key="home"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Hero />
                    <About />
                    <Skills />
                    <Portfolio onProjectClick={handleProjectClick} />
                    <Experience />
                    <Testimonials />
                    <Contact />
                  </motion.div>
                ) : currentView === 'blog' ? (
                  <motion.div
                    key="blog"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Blog onPostClick={handlePostClick} />
                    <Contact />
                  </motion.div>
                ) : currentView === 'portfolio' ? (
                  <motion.div
                    key="portfolio"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <PortfolioPage onProjectClick={handleProjectClick} />
                    <Contact />
                  </motion.div>
                ) : currentView === 'project-detail' ? (
                   <motion.div
                    key="project-detail"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                   >
                       {selectedProject && (
                           <ProjectDetail 
                                project={selectedProject}
                                onBack={() => handleNavigate('portfolio')}
                           />
                       )}
                       <Contact />
                   </motion.div> 
                ) : currentView === 'admin-login' ? (
                    <motion.div
                        key="admin-login"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <AdminLogin onBack={() => handleNavigate('home')} />
                    </motion.div>
                ) : currentView === 'admin-dashboard' ? (
                     <motion.div
                        key="admin-dashboard"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-50 bg-neutral-900"
                    >
                        <DashboardLayout 
                            activeModule={activeDashboardModule} 
                            onModuleChange={setActiveDashboardModule}
                            onExit={() => setCurrentView('home')}
                        >
                            {renderDashboardModule()}
                        </DashboardLayout>
                    </motion.div>
                ) : (
                  <motion.div
                    key="blog-post"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                     {selectedPost && (
                        <BlogPostDetail 
                          post={selectedPost} 
                          onBack={() => handleNavigate('blog')} 
                        />
                     )}
                     <Contact />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
            
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
               <div className="absolute top-[-20%] start-[-10%] w-[50vw] h-[50vw] bg-app-accent/5 rounded-full blur-[120px] opacity-30" />
               <div className="absolute bottom-[-10%] end-[-5%] w-[40vw] h-[40vw] bg-blue-900/5 rounded-full blur-[120px] opacity-20" />
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ContentProvider>
      <LanguageProvider>
        <ToastProvider> 
          <AppContent />
        </ToastProvider>
      </LanguageProvider>
    </ContentProvider>
  );
};

export default App;
