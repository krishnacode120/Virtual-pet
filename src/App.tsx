import React, { useEffect, useState } from 'react';
import { usePetStore } from './store/usePetStore';
import Dashboard from './components/Dashboard';
import PetDisplay from './components/PetDisplay';
import ChatInterface from './components/ChatInterface';
import ControlPanel from './components/ControlPanel';
import Settings from './components/Settings';
import MiniGames from './components/MiniGames';
import { Settings as SettingsIcon, Gamepad2, Activity, Smile, MessageSquare } from 'lucide-react';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const { tick, color } = usePetStore();
  const [showSettings, setShowSettings] = useState(false);
  const [showGames, setShowGames] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'pet' | 'chat'>('pet');

  useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, 60000); // Tick every minute

    return () => clearInterval(interval);
  }, [tick]);

  const colorMap: Record<string, string> = {
    cyan: 'rgba(6, 182, 212, 0.15)',
    purple: 'rgba(168, 85, 247, 0.15)',
    emerald: 'rgba(16, 185, 129, 0.15)',
    rose: 'rgba(244, 63, 94, 0.15)',
    amber: 'rgba(245, 158, 11, 0.15)',
  };

  const activeGlow = colorMap[color] || colorMap.cyan;

  return (
    <div className="h-[100dvh] w-full bg-[#050505] text-slate-200 font-sans overflow-hidden flex flex-col md:flex-row relative selection:bg-white/20">
      {/* Immersive Background Effects */}
      <div 
        className="absolute inset-0 pointer-events-none transition-colors duration-1000"
        style={{ background: `radial-gradient(circle at 50% 40%, ${activeGlow} 0%, transparent 60%)` }}
      />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      
      {/* Mobile Header */}
      <header className="md:hidden flex justify-between items-center p-5 z-40 glass-panel border-b-0 border-x-0 rounded-none">
        <h1 className="text-xl font-bold tracking-widest uppercase text-white">NeoPet <span className="font-light opacity-50">OS</span></h1>
        <div className="flex gap-3">
          <button onClick={() => setShowGames(true)} className="p-2 rounded-full glass-button text-white/70 hover:text-white">
            <Gamepad2 size={18} />
          </button>
          <button onClick={() => setShowSettings(true)} className="p-2 rounded-full glass-button text-white/70 hover:text-white">
            <SettingsIcon size={18} />
          </button>
        </div>
      </header>

      {/* Desktop Header (Floating) */}
      <header className="hidden md:flex absolute top-6 left-6 right-6 justify-between items-center z-40 pointer-events-none">
        <h1 className="text-2xl font-bold tracking-widest uppercase text-white pointer-events-auto drop-shadow-lg">NeoPet <span className="font-light opacity-50">OS</span></h1>
        <div className="flex gap-4 pointer-events-auto">
          <button onClick={() => setShowGames(true)} className="p-3 rounded-full glass-button text-white/70 hover:text-white group relative">
            <Gamepad2 size={20} className="group-hover:scale-110 transition-transform" />
          </button>
          <button onClick={() => setShowSettings(true)} className="p-3 rounded-full glass-button text-white/70 hover:text-white group relative">
            <SettingsIcon size={20} className="group-hover:rotate-90 transition-transform duration-500" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex relative h-full overflow-hidden">
        
        {/* Left Panel - Dashboard */}
        <div className={`w-full md:w-80 h-full flex-shrink-0 transition-opacity duration-300 ${activeTab === 'dashboard' ? 'opacity-100 z-30' : 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto md:z-30'} absolute md:relative`}>
          <Dashboard />
        </div>

        {/* Center - Pet Display & Controls */}
        <div className={`flex-1 h-full relative flex flex-col transition-opacity duration-300 ${activeTab === 'pet' ? 'opacity-100 z-20' : 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto md:z-20'} absolute md:relative w-full`}>
          <PetDisplay />
          <ControlPanel />
        </div>

        {/* Right Panel - Chat */}
        <div className={`w-full md:w-96 h-full flex-shrink-0 transition-opacity duration-300 ${activeTab === 'chat' ? 'opacity-100 z-30' : 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto md:z-30'} absolute md:relative right-0`}>
          <ChatInterface />
        </div>

      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden flex justify-around items-center p-4 glass-panel border-t-white/10 border-x-0 border-b-0 z-50 pb-safe">
        <button 
          onClick={() => setActiveTab('dashboard')} 
          className={`flex flex-col items-center gap-1 p-2 transition-colors ${activeTab === 'dashboard' ? 'text-white' : 'text-white/40'}`}
        >
          <Activity size={20} />
          <span className="text-[10px] uppercase tracking-wider font-medium">Stats</span>
        </button>
        <button 
          onClick={() => setActiveTab('pet')} 
          className={`flex flex-col items-center gap-1 p-2 transition-colors ${activeTab === 'pet' ? 'text-white' : 'text-white/40'}`}
        >
          <Smile size={20} />
          <span className="text-[10px] uppercase tracking-wider font-medium">Pet</span>
        </button>
        <button 
          onClick={() => setActiveTab('chat')} 
          className={`flex flex-col items-center gap-1 p-2 transition-colors ${activeTab === 'chat' ? 'text-white' : 'text-white/40'}`}
        >
          <MessageSquare size={20} />
          <span className="text-[10px] uppercase tracking-wider font-medium">Chat</span>
        </button>
      </nav>

      {/* Modals */}
      <AnimatePresence>
        {showSettings && <Settings onClose={() => setShowSettings(false)} />}
        {showGames && <MiniGames onClose={() => setShowGames(false)} />}
      </AnimatePresence>
    </div>
  );
}
