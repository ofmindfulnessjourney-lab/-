import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { chatWithScholar } from '../services/geminiService';

const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: "阁下安好。吾乃智阁守书人，通晓古今。今日有何困惑，不妨道来？" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
        inputRef.current.focus();
    }
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      // Convert messages to history format for Gemini
      const history = messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
      }));

      const reply = await chatWithScholar(history, userMsg);
      setMessages(prev => [...prev, { role: 'model', text: reply || "老朽正在沉思，请稍候..." }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', text: "思绪受阻（网络错误），请重新提问。" }]);
    } finally {
      setLoading(false);
      // Re-focus input after send
      setTimeout(() => {
          if (inputRef.current) inputRef.current.focus();
      }, 100);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col bg-white rounded-lg shadow-xl border border-stone-200 mt-2 overflow-hidden relative">
      <div className="bg-indigo-dye text-white px-6 py-4 flex items-center gap-3 shrink-0">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
        <h2 className="font-serif-sc text-lg tracking-widest">国学大师在线</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-stone-50" ref={scrollRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[85%] px-5 py-3 rounded-2xl text-base leading-relaxed shadow-sm font-serif ${
                msg.role === 'user' 
                  ? 'bg-ink-black text-white rounded-br-none' 
                  : 'bg-white border border-stone-200 text-stone-800 rounded-bl-none'
              }`}
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && (
           <div className="flex justify-start animate-pulse">
              <div className="bg-white border border-stone-200 px-5 py-3 rounded-2xl rounded-bl-none text-stone-500 italic text-sm font-serif flex items-center gap-2">
                 <span>翻阅典籍中</span>
                 <span className="flex gap-1">
                    <span className="w-1 h-1 bg-stone-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                    <span className="w-1 h-1 bg-stone-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                    <span className="w-1 h-1 bg-stone-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                 </span>
              </div>
           </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-stone-200 shrink-0">
          <form onSubmit={handleSend} className="flex gap-2">
            <input 
              ref={inputRef}
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="请输入您的问题..."
              className="flex-1 px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:border-indigo-dye focus:ring-2 focus:ring-indigo-dye/20 placeholder-stone-400 text-stone-800 bg-white"
              autoComplete="off"
            />
            <button 
              type="submit" 
              disabled={loading || !input}
              className="bg-indigo-dye text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 font-bold font-serif-sc whitespace-nowrap"
            >
              发送
            </button>
          </form>
          <p className="text-[10px] text-stone-400 text-center mt-2 font-serif">
             大师由 Gemini AI 驱动，回答仅供参考。
          </p>
      </div>
    </div>
  );
};

export default ChatAssistant;