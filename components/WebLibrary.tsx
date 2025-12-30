import React, { useState } from 'react';

const WebLibrary: React.FC = () => {
  // Toggle between simple full view or split view
  const [showAiChat, setShowAiChat] = useState(false);
  
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-stone-100 relative">
      
      {/* Top Bar for Library Mode */}
      <div className="bg-[#fdfbf7] px-4 py-2 flex justify-between items-center border-b border-stone-300 shadow-sm shrink-0 h-12">
        <div className="flex items-center gap-2">
            <span className="text-sm font-bold bg-stone-800 text-white px-2 py-0.5 rounded">内置浏览</span>
            <span className="text-sm text-stone-600 font-serif">5000言 (5000yan.com)</span>
        </div>

        <div className="flex items-center gap-3">
             {/* Toggle LMSYS Chat */}
             <button 
                onClick={() => setShowAiChat(!showAiChat)}
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-sm font-serif-sc border ${
                    showAiChat 
                    ? 'bg-indigo-dye text-white border-indigo-dye' 
                    : 'bg-white text-indigo-dye border-indigo-dye/30 hover:border-indigo-dye'
                }`}
             >
                <span>{showAiChat ? '关闭 AI 助手' : '开启 AI 助手 (LM Area)'}</span> 
             </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left: 5000yan Website */}
        <div className={`flex-1 relative transition-all duration-300 h-full bg-white`}>
            <iframe 
                src="https://www.5000yan.com/" 
                className="w-full h-full border-none"
                title="5000yan Library"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
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
                     
                     <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-yellow-100/90 text-yellow-800 text-[10px] px-2 py-1 rounded shadow pointer-events-none opacity-80">
                         遇到不懂之处，可在此复制询问
                     </div>
                 </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default WebLibrary;