import React from 'react';
import { ViewState } from '../types';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  return (
    <nav className="sticky top-0 z-50 bg-paper-white/95 backdrop-blur-md border-b border-stone-200 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setView('HOME')}>
        <div className="w-9 h-9 bg-seal-red rounded-md flex items-center justify-center text-white font-serif font-bold text-2xl shadow-inner group-hover:bg-red-800 transition-colors">
          智
        </div>
        <div className="flex flex-col">
            <span className="font-serif-sc text-xl font-bold text-ink-black tracking-widest leading-none">智阁</span>
            <span className="text-[10px] text-stone-500 uppercase tracking-widest">Wisdom Pavilion</span>
        </div>
      </div>

      <div className="flex items-center space-x-3 md:space-x-6 text-base font-medium text-stone-600 font-serif-sc">
        <button 
          onClick={() => setView('HOME')}
          className={`hover:text-seal-red transition-all ${currentView === 'HOME' ? 'text-seal-red font-bold scale-105' : ''}`}
        >
          藏书阁
        </button>
        <button 
          onClick={() => setView('SEARCH')}
          className={`hover:text-seal-red transition-all ${currentView === 'SEARCH' ? 'text-seal-red font-bold scale-105' : ''}`}
        >
          寻书
        </button>
        <button 
          onClick={() => setView('CHAT')}
          className={`hover:text-seal-red transition-all ${currentView === 'CHAT' ? 'text-seal-red font-bold scale-105' : ''}`}
        >
          问道大师
        </button>
      </div>
    </nav>
  );
};

export default Navigation;