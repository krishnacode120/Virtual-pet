import React, { useEffect, useState } from 'react';
import { usePetStore, PetColor, PetShape } from '../store/usePetStore';
import { Settings as SettingsIcon, Volume2, Palette, Box, Mic2, X } from 'lucide-react';
import { motion } from 'motion/react';

export default function Settings({ onClose }: { onClose: () => void }) {
  const { color, shape, soundVolume, petVoice, setColor, setShape, setSoundVolume, setPetVoice } = usePetStore();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      if (window.speechSynthesis) {
        setVoices(window.speechSynthesis.getVoices());
      }
    };
    loadVoices();
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const colors: PetColor[] = ['cyan', 'purple', 'emerald', 'rose', 'amber'];
  const shapes: PetShape[] = ['Robot', 'Hologram', 'Orb'];
  
  const colorHexMap: Record<string, string> = {
    cyan: '#06b6d4',
    purple: '#a855f7',
    emerald: '#10b981',
    rose: '#f43f5e',
    amber: '#f59e0b',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="glass-panel rounded-3xl p-8 w-full max-w-md shadow-2xl relative border border-white/10"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
          <SettingsIcon className="text-white/50" size={24} />
          <h2 className="text-xl font-bold text-white uppercase tracking-widest">System Config</h2>
        </div>

        <div className="space-y-8">
          {/* Core Color */}
          <div>
            <label className="flex items-center gap-2 text-[10px] font-semibold text-white/50 uppercase tracking-[0.2em] mb-4">
              <Palette size={14} /> Core Color
            </label>
            <div className="flex gap-4">
              {colors.map(c => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-10 h-10 rounded-full transition-all ${
                    color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110' : 'hover:scale-110 opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: colorHexMap[c], boxShadow: color === c ? `0 0 20px ${colorHexMap[c]}88` : 'none' }}
                />
              ))}
            </div>
          </div>

          {/* Chassis Form */}
          <div>
            <label className="flex items-center gap-2 text-[10px] font-semibold text-white/50 uppercase tracking-[0.2em] mb-4">
              <Box size={14} /> Chassis Form
            </label>
            <div className="grid grid-cols-3 gap-3">
              {shapes.map(s => (
                <button
                  key={s}
                  onClick={() => setShape(s)}
                  className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider rounded-xl border transition-all ${
                    shape === s 
                      ? 'bg-white/10 border-white/30 text-white shadow-lg' 
                      : 'bg-black/40 border-white/5 text-white/50 hover:bg-white/5 hover:text-white/80'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Audio Output */}
          <div>
            <label className="flex items-center gap-2 text-[10px] font-semibold text-white/50 uppercase tracking-[0.2em] mb-4">
              <Volume2 size={14} /> Audio Output
            </label>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1" 
              value={soundVolume}
              onChange={(e) => setSoundVolume(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
            />
          </div>

          {/* Vocal Synthesizer */}
          <div>
            <label className="flex items-center gap-2 text-[10px] font-semibold text-white/50 uppercase tracking-[0.2em] mb-4">
              <Mic2 size={14} /> Vocal Synthesizer
            </label>
            <select 
              value={petVoice}
              onChange={(e) => setPetVoice(e.target.value)}
              className="w-full bg-black/40 border border-white/10 text-white text-sm rounded-xl focus:ring-white/30 focus:border-white/30 block p-3 appearance-none outline-none"
            >
              {voices.length > 0 ? voices.map(v => (
                <option key={v.name} value={v.name} className="bg-slate-900">{v.name} ({v.lang})</option>
              )) : (
                <option value="Default">Default System Voice</option>
              )}
            </select>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
