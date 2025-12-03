import React, { useState } from 'react';
import { Github, Linkedin, Twitter, Check, Loader2, ShieldCheck } from 'lucide-react';
import { Button } from './ui/Button';
import { useLanguage } from '../contexts/LanguageContext';

export const Contact: React.FC = () => {
  const { content } = useLanguage();
  const [isHuman, setIsHuman] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleCaptcha = () => {
    if (isHuman) return;
    setIsVerifying(true);
    // Simulate verification delay
    setTimeout(() => {
      setIsVerifying(false);
      setIsHuman(true);
    }, 1000);
  };

  return (
    <footer id="contact" className="bg-black relative pt-32 pb-12 overflow-hidden">
      {/* Structural Top Border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Context & Typography */}
          <div className="space-y-16 lg:col-span-5">
            <div className="relative">
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-none mb-8">
                {content.contact.title}
              </h2>
              
              <div className="space-y-4">
                {content.contact.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                      <Check size={14} className="text-green-500" strokeWidth={3} />
                    </div>
                    <span className="text-gray-300 font-light text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-10">
               <div className="space-y-2">
                 <span className="text-xs font-bold uppercase tracking-widest text-gray-600 block">Contact</span>
                 <a href="mailto:hello@mehdijelliti.com" className="text-2xl md:text-3xl text-white hover:text-app-accent transition-colors font-medium block">
                   hello@mehdijelliti.com
                 </a>
                 <a href={`tel:${content.contact.phone.replace(/\s/g, '')}`} className="text-2xl md:text-3xl text-white hover:text-app-accent transition-colors font-medium block">
                   {content.contact.phone}
                 </a>
               </div>
               
               <div className="space-y-4">
                 <span className="text-xs font-bold uppercase tracking-widest text-gray-600 block">Socials</span>
                 <div className="flex gap-6">
                    {[
                      { icon: <Github size={22} />, href: "#" },
                      { icon: <Linkedin size={22} />, href: "#" },
                      { icon: <Twitter size={22} />, href: "#" },
                    ].map((social, i) => (
                      <a 
                        key={i} 
                        href={social.href}
                        className="text-gray-500 hover:text-white transition-all hover:scale-110"
                      >
                        {social.icon}
                      </a>
                    ))}
                 </div>
               </div>
            </div>
          </div>

          {/* Right Column: Black Form with Border Inputs */}
          <div className="lg:pt-4 lg:col-span-7">
            <div className="bg-black border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                {/* Decorative shine */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                    <div className="space-y-2 group">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-app-accent transition-colors ml-1">
                        {content.contact.name}
                      </label>
                      <input 
                        type="text" 
                        className="w-full bg-transparent border border-white/10 rounded-xl px-6 py-3 text-white focus:outline-none focus:border-app-accent transition-all text-lg font-light"
                      />
                    </div>
                    <div className="space-y-2 group">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-app-accent transition-colors ml-1">
                        {content.contact.email}
                      </label>
                      <input 
                        type="email" 
                        className="w-full bg-transparent border border-white/10 rounded-xl px-6 py-3 text-white focus:outline-none focus:border-app-accent transition-all text-lg font-light"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                    <div className="space-y-2 group">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-app-accent transition-colors ml-1">
                        {content.contact.company}
                      </label>
                      <input 
                        type="text" 
                        className="w-full bg-transparent border border-white/10 rounded-xl px-6 py-3 text-white focus:outline-none focus:border-app-accent transition-all text-lg font-light"
                      />
                    </div>
                    <div className="space-y-2 group">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-app-accent transition-colors ml-1">
                        {content.contact.phoneInput}
                      </label>
                      <input 
                        type="tel" 
                        className="w-full bg-transparent border border-white/10 rounded-xl px-6 py-3 text-white focus:outline-none focus:border-app-accent transition-all text-lg font-light"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 group">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-app-accent transition-colors ml-1">
                      {content.contact.message}
                    </label>
                    <textarea 
                      rows={3}
                      className="w-full bg-transparent border border-white/10 rounded-xl px-6 py-3 text-white focus:outline-none focus:border-app-accent transition-all text-lg font-light resize-none min-h-[100px]"
                    />
                  </div>

                  {/* Custom I am not a robot CAPTCHA */}
                  <div className="flex justify-start">
                    <div 
                      onClick={handleCaptcha}
                      className="bg-[#111] border border-white/10 rounded-lg p-3 pr-6 flex items-center gap-4 cursor-pointer hover:bg-white/5 transition-colors select-none w-fit min-w-[240px]"
                    >
                      <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                        isHuman 
                          ? 'bg-app-accent border-app-accent' 
                          : 'bg-transparent border-gray-500 hover:border-gray-400'
                      }`}>
                        {isVerifying ? (
                          <Loader2 size={14} className="animate-spin text-app-accent" />
                        ) : isHuman ? (
                          <Check size={16} className="text-white" strokeWidth={3} />
                        ) : null}
                      </div>
                      <span className="text-sm font-medium text-gray-300">I am not a robot</span>
                      
                      <div className="ml-auto flex flex-col items-center justify-center text-gray-500">
                         <ShieldCheck size={20} strokeWidth={1.5} />
                         <span className="text-[8px] font-bold mt-0.5">reCAPTCHA</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button 
                      type="submit" 
                      variant="rotate-border" 
                      className={`w-full md:w-auto ${!isHuman ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                      disabled={!isHuman}
                    >
                      {content.contact.send}
                    </Button>
                  </div>
                </form>
            </div>
          </div>

        </div>

        {/* Minimal Footer */}
        <div className="border-t border-white/10 mt-32 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest font-medium text-gray-600">
          <span>{content.contact.copyright}</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>

      </div>
    </footer>
  );
};