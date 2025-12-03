import React from 'react';
import { useContent } from '../../contexts/ContentContext';
import { Eye, MousePointer, FileText, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnalyticsChart } from './AnalyticsChart';

export const Overview: React.FC = () => {
  const { fullContent } = useContent();
  const projectsCount = fullContent.en.projects.length;
  const postsCount = fullContent.en.blog.posts.length;

  const stats = [
    { label: 'Total Visits', value: '12,450', change: '+12%', icon: <Eye />, color: 'bg-blue-500' },
    { label: 'Project Views', value: '3,200', change: '+5%', icon: <Briefcase />, color: 'bg-purple-500' },
    { label: 'Blog Reads', value: '1,800', change: '+18%', icon: <FileText />, color: 'bg-green-500' },
    { label: 'Click Rate', value: '4.2%', change: '+1.2%', icon: <MousePointer />, color: 'bg-app-accent' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-black border border-white/10 rounded-2xl p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10 text-white`}>
                {stat.icon}
              </div>
              <span className="text-green-500 text-xs font-bold bg-green-500/10 px-2 py-1 rounded-full">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Main Content Area */}
        <div className="xl:col-span-2 space-y-8">
            {/* Analytics Chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <AnalyticsChart />
            </motion.div>

            <div className="bg-black border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>
                <div className="space-y-4">
                    {[1,2,3].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-lg transition-colors">
                            <div className="w-2 h-2 rounded-full bg-app-accent" />
                            <p className="text-sm text-gray-300 flex-1">System content updated via CMS.</p>
                            <span className="text-xs text-gray-600">2h ago</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
        {/* Sidebar Status */}
        <div className="xl:col-span-1">
            <div className="bg-black border border-white/10 rounded-2xl p-6 h-full">
                <h3 className="text-lg font-semibold mb-6">System Status</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Content Database</span>
                        <span className="text-green-500 text-xs font-bold px-2 py-1 bg-green-500/10 rounded">Active</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Total Projects</span>
                        <span className="text-white font-mono">{projectsCount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Total Posts</span>
                        <span className="text-white font-mono">{postsCount}</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};