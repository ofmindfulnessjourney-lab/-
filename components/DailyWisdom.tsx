import React, { useEffect, useState } from 'react';
import { getDailyWisdom } from '../services/geminiService';
import { WisdomQuote } from '../types';

const DailyWisdom: React.FC = () => {
  const [wisdom, setWisdom] = useState<WisdomQuote | null>(null);

  useEffect(() => {
    // Only fetch once per session roughly
    getDailyWisdom().then(setWisdom);
  }, []);

  if (!wisdom) return <div className="h-48 w-full bg-stone-100 animate-pulse rounded-lg flex items-center justify-center text-stone-300 text-4xl">☯</div>;

  return (
    <div className="bg-bamboo-green/10 border border-bamboo-green/20 rounded-lg p-8 relative overflow-hidden group hover:bg-bamboo-green/20 transition-all duration-500 text-center">
        <div className="absolute -right-10 -top-10 text-9xl text-bamboo-green/10 rotate-12 font-serif select-none pointer-events-none">
            悟
        </div>
        
        <div className="relative z-10 flex flex-col items-center">
            <h3 className="text-xs font-bold tracking-[0.3em] text-bamboo-green uppercase mb-6 border border-bamboo-green/30 px-3 py-1 rounded-full">每日一悟</h3>
            
            <p className="font-serif-sc text-3xl md:text-4xl text-ink-black mb-6 leading-relaxed drop-shadow-sm">
                "{wisdom.text}"
            </p>
            
            <div className="flex items-center space-x-2 text-stone-600 mb-6">
                <span className="h-[1px] w-8 bg-stone-400"></span>
                <span className="font-bold text-sm tracking-widest">{wisdom.source}</span>
                <span className="h-[1px] w-8 bg-stone-400"></span>
            </div>
            
            <div className="bg-white/60 p-4 rounded-lg backdrop-blur-sm max-w-2xl">
                <p className="text-stone-600 text-sm md:text-base italic font-serif leading-loose">
                    <span className="font-bold mr-2 text-seal-red">解曰:</span>
                    {wisdom.interpretation}
                </p>
            </div>
        </div>
    </div>
  );
};

export default DailyWisdom;