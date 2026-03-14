import React, { useState, useEffect } from 'react';
import { usePetStore } from '../store/usePetStore';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, Target } from 'lucide-react';

export default function MiniGames({ onClose }: { onClose: () => void }) {
  const { play, color } = usePetStore();
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [orbPos, setOrbPos] = useState({ x: 50, y: 50 });

  const colorMap: Record<string, string> = {
    cyan: '#06b6d4',
    purple: '#a855f7',
    emerald: '#10b981',
    rose: '#f43f5e',
    amber: '#f59e0b',
  };

  const activeColor = colorMap[color] || colorMap.cyan;

  useEffect(() => {
    let timer: any;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      play(score); // Reward pet based on score
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, play, score]);

  useEffect(() => {
    let mover: any;
    if (isPlaying) {
      mover = setInterval(() => {
        setOrbPos({
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
        });
      }, Math.max(500, 1500 - score * 50)); // Gets faster as you score
    }
    return () => clearInterval(mover);
  }, [isPlaying, score]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
  };

  const catchOrb = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isPlaying) return;
    setScore(prev => prev + 1);
    setOrbPos({
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass-panel border border-white/10 rounded-3xl w-full max-w-3xl h-[80vh] md:h-[600px] flex flex-col relative overflow-hidden shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-colors z-50"
        >
          <X size={20} />
        </button>

        <div className="p-6 border-b border-white/10 flex justify-between items-center z-10 bg-black/40">
          <div className="flex items-center gap-3">
            <Target size={20} style={{ color: activeColor }} />
            <h2 className="text-xl font-bold uppercase tracking-widest text-white">Orb Catcher</h2>
          </div>
          {isPlaying && (
            <div className="flex gap-6 text-sm font-mono uppercase tracking-widest">
              <span className="text-white/50">Time <span className="text-white ml-2">{timeLeft}s</span></span>
              <span className="text-white/50">Score <span className="ml-2 font-bold" style={{ color: activeColor }}>{score}</span></span>
            </div>
          )}
        </div>

        <div className="flex-1 relative cursor-crosshair overflow-hidden" onClick={() => isPlaying && setScore(Math.max(0, score - 1))}>
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

          {!isPlaying && timeLeft === 30 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 z-20 p-6 text-center">
              <div className="w-24 h-24 rounded-full flex items-center justify-center mb-8 border-2 border-dashed" style={{ borderColor: activeColor }}>
                <Trophy size={40} style={{ color: activeColor }} className="drop-shadow-lg" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-white tracking-wider">CATCH THE ORB</h3>
              <p className="text-white/50 mb-10 max-w-md text-sm leading-relaxed">
                Click the glowing orb as fast as you can. Missing costs you points. High scores make your pet very happy!
              </p>
              <button 
                onClick={startGame}
                className="px-10 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-white transition-all hover:scale-105"
                style={{ backgroundColor: activeColor, boxShadow: `0 0 20px ${activeColor}66` }}
              >
                Initialize Game
              </button>
            </div>
          )}

          {!isPlaying && timeLeft === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-20 p-6 text-center backdrop-blur-sm">
              <h3 className="text-4xl font-bold mb-4 text-white tracking-wider uppercase">Simulation Complete</h3>
              <p className="text-xl text-white/50 mb-10 uppercase tracking-widest">
                Final Score: <span className="font-bold text-3xl ml-2" style={{ color: activeColor }}>{score}</span>
              </p>
              <button 
                onClick={startGame}
                className="px-10 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-white transition-all hover:scale-105"
                style={{ backgroundColor: activeColor, boxShadow: `0 0 20px ${activeColor}66` }}
              >
                Play Again
              </button>
            </div>
          )}

          <AnimatePresence>
            {isPlaying && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, left: `${orbPos.x}%`, top: `${orbPos.y}%` }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="absolute w-14 h-14 rounded-full cursor-pointer"
                onClick={catchOrb}
                style={{ 
                  transform: 'translate(-50%, -50%)',
                  background: `radial-gradient(circle at 30% 30%, #fff, ${activeColor})`,
                  boxShadow: `0 0 30px ${activeColor}`
                }}
              >
                <div className="absolute inset-2 bg-white/50 rounded-full animate-ping"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
