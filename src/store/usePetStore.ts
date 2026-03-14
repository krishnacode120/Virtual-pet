import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Emotion = 'Happy' | 'Sad' | 'Hungry' | 'Sleepy' | 'Excited' | 'Curious';
export type Stage = 'Baby AI' | 'Teen AI' | 'Advanced AI';
export type PetShape = 'Robot' | 'Hologram' | 'Orb';
export type PetColor = 'cyan' | 'purple' | 'emerald' | 'rose' | 'amber';

export interface PetState {
  name: string;
  level: number;
  xp: number;
  mood: Emotion;
  energy: number;
  happiness: number;
  hunger: number;
  intelligence: number;
  stage: Stage;
  shape: PetShape;
  color: PetColor;
  accessories: string[];
  memory: string[];
  themeColor: string;
  soundVolume: number;
  petVoice: string;
  
  // Actions
  setName: (name: string) => void;
  addXP: (amount: number) => void;
  setMood: (mood: Emotion) => void;
  feed: (amount: number) => void;
  play: (amount: number) => void;
  rest: (amount: number) => void;
  learn: (amount: number) => void;
  setShape: (shape: PetShape) => void;
  setColor: (color: PetColor) => void;
  addMemory: (memory: string) => void;
  setThemeColor: (color: string) => void;
  setSoundVolume: (volume: number) => void;
  setPetVoice: (voice: string) => void;
  tick: () => void; // Time-based decay
}

export const usePetStore = create<PetState>()(
  persist(
    (set) => ({
      name: 'Neo',
      level: 1,
      xp: 0,
      mood: 'Happy',
      energy: 100,
      happiness: 100,
      hunger: 0,
      intelligence: 0,
      stage: 'Baby AI',
      shape: 'Robot',
      color: 'cyan',
      accessories: [],
      memory: [],
      themeColor: 'cyan',
      soundVolume: 0.5,
      petVoice: 'Google UK English Female',

      setName: (name) => set({ name }),
      addXP: (amount) => set((state) => {
        const newXp = state.xp + amount;
        const nextLevelXp = state.level * 100;
        if (newXp >= nextLevelXp) {
          const newLevel = state.level + 1;
          let newStage = state.stage;
          if (newLevel >= 10) newStage = 'Advanced AI';
          else if (newLevel >= 5) newStage = 'Teen AI';
          return { xp: newXp - nextLevelXp, level: newLevel, stage: newStage, mood: 'Excited' };
        }
        return { xp: newXp };
      }),
      setMood: (mood) => set({ mood }),
      feed: (amount) => set((state) => ({ 
        hunger: Math.max(0, state.hunger - amount),
        happiness: Math.min(100, state.happiness + amount / 2),
        energy: Math.min(100, state.energy + amount / 2),
        mood: 'Happy'
      })),
      play: (amount) => set((state) => ({
        happiness: Math.min(100, state.happiness + amount),
        energy: Math.max(0, state.energy - amount / 2),
        hunger: Math.min(100, state.hunger + amount / 4),
        mood: 'Excited'
      })),
      rest: (amount) => set((state) => ({
        energy: Math.min(100, state.energy + amount),
        mood: 'Sleepy'
      })),
      learn: (amount) => set((state) => ({
        intelligence: Math.min(100, state.intelligence + amount),
        energy: Math.max(0, state.energy - amount / 2),
        mood: 'Curious'
      })),
      setShape: (shape) => set({ shape }),
      setColor: (color) => set({ color }),
      addMemory: (memory) => set((state) => ({ memory: [...state.memory, memory] })),
      setThemeColor: (themeColor) => set({ themeColor }),
      setSoundVolume: (soundVolume) => set({ soundVolume }),
      setPetVoice: (petVoice) => set({ petVoice }),
      tick: () => set((state) => {
        const newHunger = Math.min(100, state.hunger + 1);
        const newEnergy = Math.max(0, state.energy - 0.5);
        const newHappiness = Math.max(0, state.happiness - 0.5);
        
        let newMood = state.mood;
        if (newHunger > 80) newMood = 'Hungry';
        else if (newEnergy < 20) newMood = 'Sleepy';
        else if (newHappiness < 30) newMood = 'Sad';
        else if (state.mood === 'Hungry' || state.mood === 'Sleepy' || state.mood === 'Sad') {
            newMood = 'Happy';
        }

        return {
          hunger: newHunger,
          energy: newEnergy,
          happiness: newHappiness,
          mood: newMood
        };
      })
    }),
    {
      name: 'neopet-storage',
    }
  )
);
