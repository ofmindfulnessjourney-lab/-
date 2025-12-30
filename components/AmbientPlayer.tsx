import React, { useState, useRef } from 'react';

const AmbientPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // A public domain or creative commons Guqin/Zither track URL
  // Using a reliable placeholder for "relaxation/guqin" type music
  const MUSIC_URL = "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3"; 

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed interaction needed", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <audio ref={audioRef} src={MUSIC_URL} loop />
      
      <button 
        onClick={togglePlay}
        className={`relative flex items-center gap-2 pl-4 pr-2 py-2 rounded-full shadow-lg border border-stone-200 transition-all duration-500 overflow-hidden ${
            isPlaying ? 'bg-stone-800 text-stone-100 w-auto' : 'bg-white text-stone-600 hover:w-auto w-10 md:w-auto'
        }`}
      >
        <div className={`absolute inset-0 bg-bamboo-green/20 transition-transform duration-[5s] ease-linear ${isPlaying ? 'translate-x-0' : '-translate-x-full'}`}></div>
        
        <span className="relative z-10 text-xs font-serif-sc font-bold whitespace-nowrap hidden md:block">
            {isPlaying ? "听琴·静心" : "播放背景音"}
        </span>
        
        <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${isPlaying ? 'bg-white/10' : 'bg-stone-100'}`}>
            {isPlaying ? (
                 <div className="flex gap-0.5 items-end h-4">
                     <div className="w-0.5 bg-white h-2 animate-[bounce_1s_infinite]"></div>
                     <div className="w-0.5 bg-white h-4 animate-[bounce_1.5s_infinite]"></div>
                     <div className="w-0.5 bg-white h-3 animate-[bounce_1.2s_infinite]"></div>
                 </div>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                </svg>
            )}
        </div>
      </button>
    </div>
  );
};

export default AmbientPlayer;