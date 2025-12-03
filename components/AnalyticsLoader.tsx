import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const AnalyticsLoader: React.FC = () => {
  const { content } = useLanguage();
  const { googleAnalyticsId, googleSearchConsoleCode } = content.integrations;

  // Google Analytics Injection
  useEffect(() => {
    if (!googleAnalyticsId) return;

    // Check if script already exists to avoid duplication
    if (document.getElementById('ga-script')) return;

    const script = document.createElement('script');
    script.id = 'ga-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
    
    document.head.appendChild(script);

    const inlineScript = document.createElement('script');
    inlineScript.id = 'ga-init';
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${googleAnalyticsId}');
    `;
    document.head.appendChild(inlineScript);

  }, [googleAnalyticsId]);

  // Google Search Console Injection
  useEffect(() => {
    if (!googleSearchConsoleCode) return;

    // Check if meta tag already exists
    let meta = document.querySelector('meta[name="google-site-verification"]');
    
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'google-site-verification');
      document.head.appendChild(meta);
    }

    meta.setAttribute('content', googleSearchConsoleCode);

  }, [googleSearchConsoleCode]);

  return null;
};