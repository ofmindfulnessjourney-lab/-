import React from 'react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  onClick?: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  const isInteractive = !!onClick;

  return (
    <div 
      onClick={() => isInteractive && onClick && onClick(book)}
      className={`group relative bg-white rounded-sm shadow-sm border border-stone-100 overflow-hidden flex flex-col h-72 w-full
         ${isInteractive ? 'cursor-pointer hover:shadow-xl transition-all duration-500 hover:-translate-y-1' : 'opacity-90 grayscale-[0.2]'}
      `}
    >
      <div className={`h-3/4 ${book.coverColor || 'bg-stone-500'} p-4 relative flex items-center justify-center overflow-hidden`}>
        {/* Book Texture Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leather.png')]"></div>
        
        {/* Spine Line */}
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-white/30 box-shadow-lg"></div>
        
        {/* Vertical Title for Chinese feel */}
        <div className="border border-white/40 p-3 relative z-10 bg-black/10 backdrop-blur-sm min-w-[30%]">
             <h3 className="text-white font-serif-sc text-center text-2xl font-bold leading-tight drop-shadow-md writing-vertical-rl mx-auto tracking-widest py-2">
              {book.title}
            </h3>
        </div>

        {book.isPopular && (
            <span className="absolute top-2 right-2 bg-yellow-600/90 backdrop-blur text-white text-[10px] px-2 py-0.5 rounded shadow-sm font-bold">热门</span>
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col justify-between bg-paper-white relative">
         {/* Subtle pattern */}
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-stone-200 to-transparent opacity-50"></div>
         
        <div>
           <p className="text-xs text-stone-500 mb-1 font-serif text-right">{book.author}</p>
           <p className="text-xs text-stone-400 line-clamp-2 text-justify leading-relaxed">{book.description}</p>
        </div>
        {isInteractive && (
            <div className="text-[10px] text-seal-red font-bold text-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                点击阅读 &rarr;
            </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;