import React, { useState } from 'react';
import { Book } from '../types';

interface ReaderProps {
  book: Book | null;
  onClose: () => void;
}

const Reader: React.FC<ReaderProps> = ({ book, onClose }) => {
  // Toggle between simple full view or split view
  const [showAiChat, setShowAiChat] = useState(false);
  
  // Progress state
  const [progress, setProgress] = useState(0);

  const handleProgress = () => {
    const newProgress = Math.min(progress + 5, 100);
    setProgress(newProgress);
    // In a real app, save to localStorage here
  };

  if (!book) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-stone-100">
      
      {/* Top Bar */}
      <div className="bg-[#f0e6d2] px-4 py-2 flex justify-between items-center border-b border-stone-300 shadow-sm shrink-0 h-14">
        <div className="flex items-center gap-4 overflow-hidden">
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-stone-300 flex items-center justify-center transition-colors text-stone-600 font-bold"
            >
              ←
            </button>
            <div className="flex flex-col">
                <h2 className="text-lg font-serif-sc text-ink-black font-bold leading-none truncate max-w-[150px] md:max-w-md">{book.title}</h2>
                <div className="flex items-center gap-2 text-[10px] text-stone-500 mt-1">
                    <span>{book.author}</span>
                    <span className="w-px h-2 bg-stone-300"></span>
                    <span>阅读进度: {progress}%</span>
                </div>
            </div>
        </div>

        <div className="flex items-center gap-3">
             {/* Progress Button */}
             <button onClick={handleProgress} className="hidden md:block text-xs bg-bamboo-green/10 text-bamboo-green px-3 py-1.5 rounded-full hover:bg-bamboo-green/20 transition-colors font-bold font-serif-sc">
                今日打卡 (+5%)
             </button>

             {/* Toggle LMSYS Chat */}
             <button 
                onClick={() => setShowAiChat(!showAiChat)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm font-serif-sc border ${
                    showAiChat 
                    ? 'bg-indigo-dye text-white border-indigo-dye' 
                    : 'bg-white text-indigo-dye border-indigo-dye/30 hover:border-indigo-dye'
                }`}
             >
                <span>{showAiChat ? '关闭 AI' : '免费 AI 答疑'}</span> 
                <span className="bg-white/20 px-1 rounded text-[10px]">LM Area</span>
             </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left: Reading Content (5000yan) */}
        <div className={`flex-1 relative transition-all duration-300 h-full bg-white`}>
             {book.sourceUrl ? (
                <iframe 
                    src={book.sourceUrl} 
                    className="w-full h-full border-none"
                    title={book.title}
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
             ) : (
                <div className="flex flex-col items-center justify-center h-full text-stone-500">
                    <p>链接失效，请联系管理员。</p>
                </div>
             )}
        </div>

        {/* Right: LMSYS / LM Area Chat Sidebar */}
        {showAiChat && (
            <div className="w-full md:w-[400px] lg:w-[500px] bg-white border-l border-stone-200 flex flex-col absolute inset-0 md:static z-20 shadow-2xl md:shadow-none animate-in slide-in-from-right duration-300">
                 <div className="bg-indigo-dye text-white px-4 py-2 flex justify-between items-center shrink-0 h-10">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <h3 className="font-bold text-xs tracking-wider">LM AREA (LMSYS) - 免费 AI 助手</h3>
                    </div>
                    <button onClick={() => setShowAiChat(false)} className="md:hidden text-white/80 hover:text-white">✕</button>
                 </div>
                 
                 <div className="flex-1 bg-stone-50 relative">
                     <iframe 
                        src="https://chat.lmsys.org/" 
                        className="w-full h-full border-none"
                        title="LM Area Chat"
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                     />
                     
                     {/* Overlay hint if needed */}
                     <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-yellow-100/90 text-yellow-800 text-[10px] px-2 py-1 rounded shadow pointer-events-none opacity-80">
                         遇到不懂之处，请复制文本在此询问
                     </div>
                 </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default Reader;