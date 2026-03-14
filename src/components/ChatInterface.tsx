import React, { useState, useRef, useEffect } from 'react';
import { usePetStore } from '../store/usePetStore';
import { chatWithPet } from '../services/gemini';
import { speak, listen } from '../services/speech';
import { Send, Mic, MicOff, Loader2, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ChatInterface() {
  const { name, mood, stage, memory, addMemory, color, petVoice, soundVolume } = usePetStore();
  const [messages, setMessages] = useState<{ role: 'user' | 'pet', text: string }[]>([
    { role: 'pet', text: `Connection established. I am ${name}, your ${stage} unit. How can I assist you today?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const colorMap: Record<string, string> = {
    cyan: '#06b6d4',
    purple: '#a855f7',
    emerald: '#10b981',
    rose: '#f43f5e',
    amber: '#f59e0b',
  };

  const activeColor = colorMap[color] || colorMap.cyan;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { role: 'user' as const, text }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    if (text.toLowerCase().includes('my favorite') || text.toLowerCase().includes('i like') || text.toLowerCase().includes('i am')) {
      addMemory(text);
    }

    const context = `You are ${name}, a ${stage}. Your current mood is ${mood}.`;
    const response = await chatWithPet(text, context, memory);

    setMessages([...newMessages, { role: 'pet', text: response }]);
    setIsTyping(false);
    
    if (soundVolume > 0) {
      speak(response, petVoice, soundVolume);
    }
  };

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current = listen(
        (text) => {
          setInput(text);
          setIsListening(false);
          handleSend(text);
        },
        (err) => {
          console.error(err);
          setIsListening(false);
        }
      );
    }
  };

  return (
    <div className="glass-panel md:border-y-0 md:border-r-0 border-l border-white/10 flex flex-col h-full w-full">
      {/* Header */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between bg-black/20 md:pt-24">
        <div className="flex items-center gap-3">
          <Terminal size={16} className="text-white/50" />
          <h3 className="text-[11px] font-semibold text-white/70 uppercase tracking-[0.2em]">Comm Link</h3>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: activeColor }}></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: activeColor }}></span>
          </span>
          <span className="text-[9px] font-mono text-white/50 uppercase tracking-widest">Active</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] p-4 text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-white/10 text-white rounded-2xl rounded-tr-sm border border-white/5' 
                  : 'bg-black/40 text-white/90 rounded-2xl rounded-tl-sm border border-white/10'
              }`}
              style={msg.role === 'pet' ? { borderLeft: `2px solid ${activeColor}` } : {}}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="p-4 bg-black/40 rounded-2xl rounded-tl-sm border border-white/10 flex items-center gap-3" style={{ borderLeft: `2px solid ${activeColor}` }}>
                <Loader2 size={14} className="animate-spin text-white/50" />
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Processing</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/10 bg-black/40">
        <div className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-full p-1 pl-4 focus-within:border-white/30 transition-colors">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Transmit message..."
            className="flex-1 bg-transparent border-none text-sm text-white placeholder-white/30 focus:outline-none focus:ring-0"
          />
          <button 
            onClick={toggleListen}
            className={`p-2.5 rounded-full transition-colors ${isListening ? 'bg-rose-500/20 text-rose-400' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
          <button 
            onClick={() => handleSend(input)}
            disabled={!input.trim()}
            className="p-2.5 rounded-full text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ backgroundColor: input.trim() ? activeColor : 'transparent' }}
          >
            <Send size={18} className={input.trim() ? 'translate-x-0.5 -translate-y-0.5' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
}
