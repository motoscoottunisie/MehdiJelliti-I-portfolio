import React from 'react';
import { 
  Code, Layout, PenTool, Database, Globe, 
  Figma, Layers 
} from 'lucide-react';

export const SKILL_ICONS: Record<string, React.ReactNode> = {
  'React': <Code size={24} />,
  'Next.js': <Globe size={24} />,
  'JavaScript': <Code size={24} />,
  'WordPress': <Database size={24} />,
  'Elementor': <Layout size={24} />,
  'UI/UX Design': <Figma size={24} />,
  'Branding': <PenTool size={24} />,
  'Prototyping': <Layers size={24} />,
};
