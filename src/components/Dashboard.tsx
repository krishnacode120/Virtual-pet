import React from 'react';
import { usePetStore } from '../store/usePetStore';
import { Activity, Heart, Zap, Brain, Star } from 'lucide-react';
import { motion } from 'motion/react';

export default function Dashboard() {
  const { name, level, xp, mood, stage, energy, happiness, hunger, intelligence, color } = usePetStore();

  const colorMap: Record<string, string> = {
    cyan: '#06b6d4',
    purple: '#a855f7',
    emerald: '#10b981',
    rose: '#f43f5e',
    amber: '#f59e0b',
  };

  const activeColor = colorMap[color] || colorMap.cyan;

  const ProgressBar = ({ label, value, icon: Icon }: { label: string, value: number, icon: any }) => (
    <div className="mb-5 group">
      <div className="flex justify-between text-[11px] mb-2 text-white/50 uppercase tracking-widest font-medium">
        <span className="flex items-center gap-2"><Icon size={12} style={{ color: activeColor }} /> {label}</span>
        <span className="font-mono text-white/80">{Math.round(value)}%</span>
      </div>
      <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden relative">
        <motion.div 
          className="absolute top-0 left-0 h-full rounded-full"
          style={{ backgroundColor: activeColor, boxShadow: `0 0 10px ${activeColor}` }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );

  return (
    <div className="glass-panel md:border-y-0 md:border-l-0 border-r border-white/10 w-full h-full flex flex-col pt-6 md:pt-24 pb-6 px-6 md:px-8">
      
      {/* Profile Section */}
      <div className="flex items-center gap-5 mb-10">
        <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 bg-black/40 overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundColor: activeColor }}></div>
          <Star size={28} style={{ color: activeColor }} className="drop-shadow-lg" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-wider text-white drop-shadow-sm">{name}</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] text-white/50 uppercase tracking-widest border border-white/10 px-2 py-0.5 rounded-full bg-white/5">{stage}</span>
            <span className="text-[10px] text-white/50 uppercase tracking-widest font-mono">LVL {level}</span>
          </div>
        </div>
      </div>

      {/* XP Bar */}
      <div className="mb-10 p-4 rounded-2xl bg-black/20 border border-white/5">
        <div className="flex justify-between text-[10px] mb-2 text-white/40 uppercase tracking-widest">
          <span>Experience</span>
          <span className="font-mono text-white/70">{Math.round(xp)} / {level * 100}</span>
        </div>
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full"
            style={{ backgroundColor: activeColor }}
            initial={{ width: 0 }}
            animate={{ width: `${(xp / (level * 100)) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex-1">
        <h3 className="text-[10px] font-semibold text-white/30 mb-6 uppercase tracking-[0.2em]">System Status</h3>
        <ProgressBar label="Energy" value={energy} icon={Zap} />
        <ProgressBar label="Happiness" value={happiness} icon={Heart} />
        <ProgressBar label="Hunger" value={hunger} icon={Activity} />
        <ProgressBar label="Intelligence" value={intelligence} icon={Brain} />
      </div>

      {/* Footer Status */}
      <div className="mt-auto pt-6 border-t border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-white/40 uppercase tracking-widest">Current State</span>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: activeColor }}></span>
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: activeColor }}></span>
            </span>
            <span className="text-[11px] font-mono tracking-wider text-white/80 uppercase">
              {mood}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
