import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Menu, X, LayoutDashboard } from 'lucide-react';

interface NavigationProps {
  currentView: 'home' | 'blog' | 'blog-post' | 'portfolio' | 'project-detail' | 'admin-login';
  onNavigate: (view: 'home' | 'blog' | 'portfolio' | 'admin-login', sectionId?: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const { language, setLanguage, content, dir } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (currentView === 'home') {
        const sections = ['hero', 'about', 'contact'];
        let current = 'hero';

        // Check if at bottom of page
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            current = 'contact';
        } else {
            // Find the section currently in view
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If the section is substantially in the viewport (e.g., top third)
                    if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
                        current = section;
                        break;
                    }
                }
            }
        }
        setActiveSection(current);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  const links = [
    { name: content.nav.hello, href: '#', view: 'home' },
    { name: content.nav.portfolio, href: '#portfolio-page', view: 'portfolio' },
    { name: content.nav.about, href: '#about', view: 'home' },
    { name: content.nav.blog, href: '#blog', view: 'blog' },
    { name: content.nav.contact, href: '#contact', view: 'home' }
  ];

  const handleLinkClick = (e: React.MouseEvent, link: any) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(link.view as 'home' | 'blog' | 'portfolio', link.href.startsWith('#') && link.view === 'home' ? link.href.substring(1) : undefined);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const isLinkActive = (link: any) => {
    if (link.view === 'portfolio') {
      return currentView === 'portfolio' || currentView === 'project-detail';
    }
    if (link.view === 'blog') {
      return currentView === 'blog' || currentView === 'blog-post';
    }
    if (link.view === 'home' && currentView === 'home') {
      const targetId = link.href === '#' ? 'hero' : link.href.substring(1);
      return activeSection === targetId;
    }
    return false;
  };

  return (
    <>
      <motion.nav 
        className={`fixed top-0 start-0 end-0 z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-app-bg/80 backdrop-blur-md' : 'py-6 md:py-8 bg-transparent'}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#"
            onClick={(e) => handleLinkClick(e, { view: 'home', href: '#' })}
            className="text-xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity z-50 relative"
          >
            MehdiJelliti<span className="text-app-accent">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
             <ul className="flex space-x-10 rtl:space-x-reverse text-sm font-medium">
              {links.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    onClick={(e) => handleLinkClick(e, link)}
                    className={`transition-colors duration-300 text-[13px] tracking-wide ${
                      isLinkActive(link)
                      ? 'text-app-accent' 
                      : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <button 
                onClick={toggleLanguage}
                className="text-xs font-medium px-3 py-1 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-all"
              >
                {language === 'en' ? 'AR' : 'EN'}
              </button>
              
              <button 
                onClick={() => onNavigate('admin-login')}
                className="text-xs font-medium px-3 py-1 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-all flex items-center justify-center"
                aria-label="Back Office"
              >
                <LayoutDashboard size={14} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden z-50 relative">
             <button 
                onClick={toggleLanguage}
                className="text-xs font-medium px-3 py-1 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-all"
              >
                {language === 'en' ? 'AR' : 'EN'}
              </button>
             
             <button 
                onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('admin-login');
                }}
                className="text-xs font-medium px-3 py-1 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-all flex items-center justify-center"
                aria-label="Back Office"
             >
                <LayoutDashboard size={14} strokeWidth={1.5} />
             </button>

             <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white focus:outline-none ml-2"
             >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-app-bg/90 backdrop-blur-xl flex items-center justify-center md:hidden"
          >
            <ul className="flex flex-col items-center gap-8 text-center">
              {links.map((link, i) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <a 
                    href={link.href} 
                    onClick={(e) => handleLinkClick(e, link)}
                    className={`text-3xl font-bold tracking-tight transition-colors duration-300 ${
                      isLinkActive(link)
                      ? 'text-app-accent' 
                      : 'text-white hover:text-app-accent'
                    }`}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};