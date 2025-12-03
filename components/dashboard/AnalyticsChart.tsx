import React from 'react';
import { BarChart3, Calendar, TrendingUp } from 'lucide-react';

export const AnalyticsChart: React.FC = () => {
  // Mock data for 14 days to simulate traffic visualization
  const data = [45, 52, 38, 65, 48, 55, 62, 58, 42, 68, 75, 52, 48, 65];
  const max = Math.max(...data);

  return (
    <div className="bg-black border border-white/10 rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BarChart3 className="text-app-accent" size={20} />
            Traffic Overview
            </h3>
            <p className="text-sm text-gray-500 mt-1">Visitor statistics for the last 14 days</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 text-gray-400">
            <Calendar size={12} /> Last 14 Days
        </div>
      </div>

      <div className="flex items-end justify-between gap-1 sm:gap-2 h-48 w-full px-2">
        {data.map((value, i) => (
            <div key={i} className="relative group flex-1 flex flex-col justify-end h-full">
                <div 
                    className="w-full bg-white/5 rounded-t-sm group-hover:bg-app-accent transition-all duration-300 relative overflow-hidden"
                    style={{ height: `${(value / max) * 100}%` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg z-10">
                    {value} Visits
                    <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
                </div>
            </div>
        ))}
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/5">
         <div className="text-center p-3 rounded-xl bg-white/[0.02]">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Total Visits</p>
            <p className="text-xl font-bold text-white flex items-center justify-center gap-2">
                12,450 
                <span className="text-[10px] text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                    <TrendingUp size={8} /> +12%
                </span>
            </p>
         </div>
         <div className="text-center p-3 rounded-xl bg-white/[0.02]">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Avg. Duration</p>
            <p className="text-xl font-bold text-white">2m 14s</p>
         </div>
         <div className="text-center p-3 rounded-xl bg-white/[0.02]">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Bounce Rate</p>
            <p className="text-xl font-bold text-white">42%</p>
         </div>
      </div>
    </div>
  );
};