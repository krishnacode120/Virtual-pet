import React from 'react';
import { usePetStore } from '../store/usePetStore';
import { Coffee, Pizza, Gamepad2, BookOpen, BedDouble } from 'lucide-react';
import { motion } from 'motion/react';

export default function ControlPanel() {
  const { feed, play, rest, learn, color } = usePetStore();

  const colorMap: Record<string, string> = {
    cyan: '#06b6d4',
    purple: '#a855f7',
    emerald: '#10b981',
    rose: '#f43f5e',
    amber: '#f59e0b',
  };

  const activeColor = colorMap[color] || colorMap.cyan;

  const ActionButton = ({ icon: Icon, label, onClick }: { icon: any, label: string, onClick: () => void }) => (
    <motion.button
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="group flex flex-col items-center justify-center p-3 rounded-full transition-all relative"
    >
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity" style={{ backgroundColor: activeColor }}></div>
      <Icon size={20} className="text-white/70 group-hover:text-white transition-colors" style={{ filter: `drop-shadow(0 0 8px ${activeColor}00)` }} />
      {/* Tooltip */}
      <span className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-medium uppercase tracking-widest bg-black/80 text-white px-2 py-1 rounded border border-white/10 pointer-events-none whitespace-nowrap">
        {label}
      </span>
    </motion.button>
  );

  return (
    <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-30">
      <div className="glass-panel rounded-full px-4 py-2 flex gap-2 md:gap-4 shadow-2xl items-center">
        <ActionButton icon={Pizza} label="Feed" onClick={() => feed(20)} />
        <ActionButton icon={Coffee} label="Drink" onClick={() => feed(10)} />
        <div className="w-[1px] h-8 bg-white/10 mx-1"></div>
        <ActionButton icon={Gamepad2} label="Play" onClick={() => play(20)} />
        <ActionButton icon={BookOpen} label="Learn" onClick={() => learn(15)} />
        <div className="w-[1px] h-8 bg-white/10 mx-1"></div>
        <ActionButton icon={BedDouble} label="Rest" onClick={() => rest(30)} />
      </div>
    </div>
  );
}
