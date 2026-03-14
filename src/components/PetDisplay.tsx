import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';
import { usePetStore } from '../store/usePetStore';

export default function PetDisplay() {
  const { mood, shape, color, stage, setMood, addXP } = usePetStore();
  const controls = useAnimation();
  const [clickCount, setClickCount] = useState(0);

  const colorMap: Record<string, string> = {
    cyan: '#06b6d4',
    purple: '#a855f7',
    emerald: '#10b981',
    rose: '#f43f5e',
    amber: '#f59e0b',
  };

  const activeColor = colorMap[color] || colorMap.cyan;

  const variants = {
    Happy: { y: [0, -15, 0], transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } },
    Sad: { y: [0, 5, 0], scale: 0.95, transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } },
    Hungry: { x: [-3, 3, -3], transition: { repeat: Infinity, duration: 0.8, ease: "easeInOut" } },
    Sleepy: { y: [0, 8, 0], opacity: 0.8, transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } },
    Excited: { y: [0, -25, 0], rotate: [0, 5, -5, 0], transition: { repeat: Infinity, duration: 0.6, ease: "easeInOut" } },
    Curious: { rotate: [0, 10, 0], transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" } },
  };

  useEffect(() => {
    controls.start(mood);
  }, [mood, controls]);

  const handleInteraction = () => {
    setClickCount(prev => prev + 1);
    addXP(5);
    
    if (clickCount >= 7) {
      controls.start({
        rotate: 360,
        scale: [1, 1.2, 1],
        transition: { duration: 0.8, ease: "backOut" }
      }).then(() => {
        setClickCount(0);
        setMood('Excited');
      });
    } else {
      controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.2 }
      }).then(() => {
        controls.start(mood);
      });
      if (mood === 'Sad' || mood === 'Sleepy') {
        setMood('Happy');
      }
    }
  };

  const renderShape = () => {
    const size = stage === 'Baby AI' ? 120 : stage === 'Teen AI' ? 160 : 220;
    
    if (shape === 'Robot') {
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="drop-shadow-2xl">
          {/* Floating TV Head */}
          <rect x="15" y="20" width="70" height="55" rx="12" fill="#111" stroke={activeColor} strokeWidth="2"/>
          {/* Screen */}
          <rect x="22" y="27" width="56" height="41" rx="6" fill={`${activeColor}15`} stroke={`${activeColor}44`} strokeWidth="1"/>
          {/* Eyes */}
          <rect x="32" y="40" width="10" height="12" rx="4" fill={activeColor} className={mood === 'Sleepy' ? 'animate-pulse opacity-50' : ''} style={{ transition: 'all 0.3s' }} />
          <rect x="58" y="40" width="10" height="12" rx="4" fill={activeColor} className={mood === 'Sleepy' ? 'animate-pulse opacity-50' : ''} style={{ transition: 'all 0.3s' }} />
          {/* Cheeks */}
          {(mood === 'Happy' || mood === 'Excited') && (
            <>
              <circle cx="28" cy="55" r="4" fill={activeColor} opacity="0.4" />
              <circle cx="72" cy="55" r="4" fill={activeColor} opacity="0.4" />
            </>
          )}
          {/* Antenna */}
          <path d="M50 20 L50 8" stroke={activeColor} strokeWidth="2" strokeLinecap="round"/>
          <circle cx="50" cy="6" r="3" fill={activeColor} className={mood === 'Excited' ? 'animate-ping' : ''} />
          {/* Floating Base shadow */}
          <path d="M35 85 Q50 95 65 85" stroke={activeColor} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.3"/>
        </svg>
      );
    } else if (shape === 'Hologram') {
      return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
          <div className="absolute inset-0 rounded-full border border-dashed animate-[spin_10s_linear_infinite]" style={{ borderColor: activeColor, opacity: 0.3, borderWidth: '1px' }}></div>
          <div className="absolute inset-2 rounded-full border animate-[spin_7s_linear_infinite_reverse]" style={{ borderColor: activeColor, opacity: 0.5, borderWidth: '2px', borderTopColor: 'transparent' }}></div>
          <div className="absolute inset-6 rounded-full border animate-[spin_5s_linear_infinite]" style={{ borderColor: activeColor, opacity: 0.8, borderWidth: '2px', borderLeftColor: 'transparent', borderRightColor: 'transparent' }}></div>
          <div className="absolute w-1/3 h-1/3 rounded-full animate-pulse blur-md" style={{ backgroundColor: activeColor }}></div>
          <div className="absolute w-1/4 h-1/4 rounded-full bg-white blur-sm opacity-80"></div>
        </div>
      );
    } else {
      // Orb
      return (
        <div className="relative flex items-center justify-center rounded-full overflow-hidden" style={{ width: size, height: size, background: `radial-gradient(circle at 30% 30%, ${activeColor}, #000)`, boxShadow: `0 0 40px ${activeColor}44, inset 0 0 20px #000` }}>
           <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ background: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
           <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-white blur-2xl opacity-30 animate-pulse"></div>
           {/* Eyes */}
           <div className="absolute flex gap-6 z-10" style={{ transform: mood === 'Sad' ? 'translateY(10px)' : 'none', transition: 'transform 0.3s' }}>
             <div className="w-3 rounded-full bg-white shadow-[0_0_10px_white]" style={{ height: mood === 'Sleepy' ? '3px' : '24px', transition: 'height 0.3s' }}></div>
             <div className="w-3 rounded-full bg-white shadow-[0_0_10px_white]" style={{ height: mood === 'Sleepy' ? '3px' : '24px', transition: 'height 0.3s' }}></div>
           </div>
        </div>
      );
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center relative overflow-hidden w-full h-full">
      {/* Ambient Breathing Glow */}
      <motion.div 
        className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 pointer-events-none" 
        style={{ backgroundColor: activeColor }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        drag
        dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
        whileDrag={{ scale: 1.1, cursor: "grabbing" }}
        className="cursor-grab relative z-10"
        animate={controls}
        variants={variants}
        onClick={handleInteraction}
      >
        {renderShape()}
      </motion.div>
    </div>
  );
}
