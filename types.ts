
import React from 'react';

export type UserRole = 'admin' | 'editor' | 'author';

export interface User {
  username: string;
  role: UserRole;
  avatar?: string;
}

export interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage: string;
}

export interface Integrations {
  googleAnalyticsId: string;
  googleSearchConsoleCode: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  gallery?: string[];
  isVisible?: boolean;
}

export interface Skill {
  name: string;
  key: string;
  icon?: React.ReactNode;
}

export interface ExperienceItem {
  id: number;
  year: string;
  title: string;
  organization: string;
  description: string;
  type: 'education' | 'work' | 'achievement';
}

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  role?: string;
  isVisible?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
  content: string[];
  tags?: string[];
  status?: 'published' | 'draft';
  author?: string;
  seo?: SEOSettings;
}

export interface DashboardStats {
  visits: number;
  uniqueVisitors: number;
  blogViews: number;
  projectClicks: number;
}
