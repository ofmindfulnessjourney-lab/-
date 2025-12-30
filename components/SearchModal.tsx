import React, { useState, useEffect } from 'react';
import { Book } from '../types';
import { searchTrendingBooks } from '../services/geminiService';
import BookCard from './BookCard';

interface SearchModalProps {
  onBookSelect: (book: Book) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ onBookSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Book[]>([]);
  const [summary, setSummary] = useState('');
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
      const saved = localStorage.getItem('searchHistory');
      if (saved) {
          try {
              const parsed = JSON.parse(saved);
              if (Array.isArray(parsed)) {
                  setSearchHistory(parsed);
              }
          } catch(e) { console.error(e); }
      }
  }, []);

  const saveHistory = (term: string) => {
      if(!term.trim()) return;
      const newHistory = [term, ...searchHistory.filter(h => h !== term)].slice(0, 10);
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const performSearch = async (searchTerm: string) => {
    if(!searchTerm.trim()) return;
    setQuery(searchTerm);
    setLoading(true);
    setResults([]);
    setSummary('');
    setSources([]);
    saveHistory(searchTerm);

    try {
      const data = await searchTrendingBooks(searchTerm);
      setResults(data.books);
      setSummary(data.rawText);
      setSources(data.sources);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  const clearSearchHistory = () => {
      setSearchHistory([]);
      localStorage.removeItem('searchHistory');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-[80vh]">
        <div className="text-center mb-10">
            <h2 className="text-4xl font-serif-sc mb-4 text-ink-black font-bold">探索无尽藏书</h2>
            <p className="text-stone-500 max-w-lg mx-auto mb-6">搜索哲学概念、经典古籍，或探索近期热门国学话题。</p>
            
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="例如：'曾国藩家书', '王阳明心学', '近期热门佛学书籍'"
                    className="w-full pl-6 pr-14 py-4 rounded-full border border-stone-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-seal-red/50 focus:border-seal-red text-lg bg-white placeholder-stone-400"
                />
                <button 
                    type="submit"
                    disabled={loading}
                    className="absolute right-2 top-2 h-10 w-10 bg-ink-black text-white rounded-full hover:bg-seal-red transition-colors flex items-center justify-center"
                >
                    {loading ? '...' : '🔍'}
                </button>
            </form>

            {/* Search History Chips */}
            {!loading && !results.length && !summary && searchHistory.length > 0 && (
                <div className="max-w-2xl mx-auto mt-6">
                    <div className="flex items-center justify-between mb-2 px-2">
                        <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">搜索历史</span>
                        <button onClick={clearSearchHistory} className="text-xs text-stone-400 hover:text-seal-red transition-colors">清除</button>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                        {searchHistory.map((term, i) => (
                            <button
                                key={i}
                                onClick={() => performSearch(term)}
                                className="px-4 py-1.5 bg-white border border-stone-200 hover:border-seal-red hover:text-seal-red text-stone-600 rounded-full text-sm font-serif transition-all shadow-sm"
                            >
                                {term}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>

        {/* Loading State */}
        {loading && (
             <div className="flex justify-center my-20">
                 <div className="flex items-center space-x-2 text-seal-red text-xl font-serif-sc">
                    <span className="animate-bounce">📖</span>
                    <span>正在检索典籍...</span>
                 </div>
             </div>
        )}

        {/* AI Summary Section */}
        {!loading && summary && (
            <div className="bg-white border border-stone-200 rounded-lg p-6 mb-8 shadow-sm">
                <h3 className="text-lg font-bold text-seal-red mb-3 uppercase tracking-wide border-b border-stone-100 pb-2">AI 智能综述</h3>
                <p className="text-stone-700 leading-relaxed whitespace-pre-line font-serif">{summary}</p>
                
                {/* Grounding Sources */}
                {sources.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-stone-100">
                    <p className="text-xs font-bold text-stone-500 mb-2">资料来源 (Google Search):</p>
                    <ul className="text-xs text-blue-600 space-y-1">
                      {sources.map((chunk, i) => (
                        <li key={i}>
                          <a href={chunk.web?.uri} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-2">
                             <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                             {chunk.web?.title || chunk.web?.uri}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
        )}

        {/* Results Grid */}
        {!loading && results.length > 0 && (
            <div>
                <h3 className="text-xl font-serif-sc mb-6 pl-3 border-l-4 border-seal-red font-bold">推荐书籍</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {results.map((book) => (
                        <BookCard key={book.id} book={book} onClick={onBookSelect} />
                    ))}
                </div>
            </div>
        )}
        
        {!loading && !results.length && !summary && searchHistory.length === 0 && (
             <div className="text-center text-stone-400 mt-20 font-serif">
                <p>请输入关键词开始您的智慧之旅。</p>
             </div>
        )}
    </div>
  );
};

export default SearchModal;