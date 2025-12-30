import React, { useState, useEffect } from 'react';
import { MOCK_BOOKS, CATEGORIES } from './constants';
import { ViewState, Book, Category } from './types';
import Navigation from './components/Navigation';
import BookCard from './components/BookCard';
import Reader from './components/Reader';
import SearchModal from './components/SearchModal';
import ChatAssistant from './components/ChatAssistant';
import CalendarWidget from './components/CalendarWidget';
import WebLibrary from './components/WebLibrary';
import AmbientPlayer from './components/AmbientPlayer';
import DailyQuiz from './components/DailyQuiz';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [activeCategory, setActiveCategory] = useState<Category | 'ALL'>('ALL');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [readingHistory, setReadingHistory] = useState<Book[]>([]);

  // Load Reading History
  useEffect(() => {
    const saved = localStorage.getItem('readingHistory');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
                setReadingHistory(parsed);
            }
        } catch (e) {
            console.error("Failed to load history", e);
        }
    }
  }, []);

  const filteredBooks = activeCategory === 'ALL' 
    ? MOCK_BOOKS 
    : MOCK_BOOKS.filter(b => b.category === activeCategory);

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    
    // Add to history (prevent duplicates, keep top 6)
    const newHistory = [book, ...readingHistory.filter(b => b.id !== book.id)].slice(0, 6);
    setReadingHistory(newHistory);
    localStorage.setItem('readingHistory', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
      setReadingHistory([]);
      localStorage.removeItem('readingHistory');
  };

  const closeReader = () => {
    setSelectedBook(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7]">
      <Navigation currentView={view} setView={setView} />
      
      {/* Immersive Background Music Player */}
      <AmbientPlayer />

      <main className={`flex-1 ${view === 'LIBRARY' ? '' : 'container mx-auto px-4 py-8'}`}>
        
        {/* HOME VIEW */}
        {view === 'HOME' && (
          <div className="space-y-10">
            
            {/* Top Grid: Calendar & Portal & Quiz */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left: Calendar (4 cols) */}
                <div className="lg:col-span-5 h-full">
                    <CalendarWidget />
                </div>

                {/* Middle: 5000yan Portal Card (4 cols) */}
                <div 
                    className="lg:col-span-4 relative group cursor-pointer overflow-hidden rounded-lg shadow-sm border border-stone-200 hover:shadow-xl transition-all duration-300 min-h-[280px] h-full bg-stone-900" 
                    onClick={() => setView('LIBRARY')}
                >
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524311583145-d51d94824317?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center filter sepia contrast-75 brightness-75 group-hover:scale-105 transition-transform duration-700 opacity-60"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white z-10">
                        <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-5 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-serif-sc font-bold mb-2 tracking-[0.2em]">进入全馆</h2>
                        <div className="h-px w-12 bg-white/50 my-3"></div>
                        <p className="text-white/80 text-sm font-serif tracking-wide">浏览 5000言 完整书库</p>
                        <span className="mt-6 px-6 py-1.5 bg-seal-red/90 hover:bg-seal-red text-white text-xs rounded-full transition-colors border border-white/10 shadow-lg font-bold tracking-wider">
                            立即开启 &rarr;
                        </span>
                    </div>
                </div>

                {/* Right: Daily Quiz (3 cols) */}
                <div className="lg:col-span-3 h-full">
                    <DailyQuiz />
                </div>
            </div>

            {/* Reading History */}
            {readingHistory.length > 0 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                     <div className="flex items-center justify-between mb-4 border-b border-stone-200 pb-2">
                        <h1 className="text-xl font-serif-sc text-stone-700 font-bold flex items-center gap-2">
                            <span className="text-seal-red">🕒</span> 最近阅读
                        </h1>
                        <button onClick={clearHistory} className="text-xs text-stone-400 hover:text-seal-red transition-colors">清空记录</button>
                     </div>
                     <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {readingHistory.map(book => (
                             <BookCard key={book.id} book={book} onClick={handleBookSelect} />
                        ))}
                     </div>
                </div>
            )}

            {/* Book Categories & Grid */}
            <div>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b border-stone-200 pb-4">
                <h1 className="text-2xl font-serif-sc text-ink-black mb-4 md:mb-0 font-bold border-l-4 border-seal-red pl-4">精选典籍 (仅供展示)</h1>
                
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => setActiveCategory('ALL')}
                    className={`px-4 py-1.5 rounded-full text-sm font-serif border transition-all ${activeCategory === 'ALL' ? 'bg-ink-black text-white border-ink-black shadow-md' : 'text-stone-600 border-stone-200 hover:border-stone-400 bg-white'}`}
                  >
                    全部
                  </button>
                  {CATEGORIES.map(cat => (
                    <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-1.5 rounded-full text-sm font-serif border transition-all ${activeCategory === cat ? 'bg-ink-black text-white border-ink-black shadow-md' : 'text-stone-600 border-stone-200 hover:border-stone-400 bg-white'}`}
                    >
                        {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
                {filteredBooks.map(book => (
                  // onClick removed to make it unclickable/static as requested
                  <BookCard key={book.id} book={book} />
                ))}
              </div>

              {filteredBooks.length === 0 && (
                  <div className="text-center py-20 text-stone-400 font-serif">
                      该分类下暂无典籍。
                  </div>
              )}
            </div>
          </div>
        )}

        {/* SEARCH VIEW */}
        {view === 'SEARCH' && (
          <SearchModal onBookSelect={handleBookSelect} />
        )}

        {/* CHAT VIEW */}
        {view === 'CHAT' && (
          <ChatAssistant />
        )}

        {/* LIBRARY VIEW (Full 5000yan Browser) */}
        {view === 'LIBRARY' && (
          <WebLibrary />
        )}

      </main>

      {/* FOOTER - Only show on non-library pages to save space */}
      {view !== 'LIBRARY' && (
        <footer className="bg-stone-100 border-t border-stone-200 py-12 mt-12 mb-16 md:mb-0">
          <div className="container mx-auto px-4 text-center">
              <div className="mb-4">
                  <span className="w-8 h-8 inline-block bg-seal-red text-white text-sm font-bold leading-8 rounded-sm shadow-sm">智</span>
              </div>
              <p className="text-stone-600 font-serif text-sm">智阁 Wisdom Pavilion © {new Date().getFullYear()}</p>
              <p className="text-stone-400 text-xs mt-2">以 AI 之光，照亮古老智慧</p>
          </div>
        </footer>
      )}

      {/* READER OVERLAY */}
      {selectedBook && (
        <Reader book={selectedBook} onClose={closeReader} />
      )}
    </div>
  );
};

export default App;