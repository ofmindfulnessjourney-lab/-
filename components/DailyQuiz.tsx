import React, { useState, useEffect } from 'react';
import { getDailyQuiz } from '../services/geminiService';

const DailyQuiz: React.FC = () => {
    const [quiz, setQuiz] = useState<{question: string, options: string[], answer: number, explanation: string} | null>(null);
    const [selected, setSelected] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);

    useEffect(() => {
        getDailyQuiz().then(setQuiz);
    }, []);

    // Ensure quiz has options array before rendering
    if (!quiz || !Array.isArray(quiz.options)) return null;

    const handleSelect = (idx: number) => {
        if (selected !== null) return;
        setSelected(idx);
        setShowExplanation(true);
    };

    return (
        <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🍵</span>
                <h3 className="font-serif-sc font-bold text-lg text-ink-black">国学趣测</h3>
            </div>
            
            <p className="text-stone-700 font-serif mb-6 text-lg">{quiz.question}</p>
            
            <div className="space-y-3">
                {quiz.options.map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        disabled={selected !== null}
                        className={`w-full text-left px-4 py-3 rounded border transition-all relative overflow-hidden ${
                            selected === null 
                            ? 'border-stone-200 hover:bg-stone-50' 
                            : selected === idx 
                                ? (idx === quiz.answer ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800')
                                : (idx === quiz.answer ? 'bg-green-50 border-green-200 text-green-800' : 'opacity-50 border-stone-100')
                        }`}
                    >
                         <span className="relative z-10 font-serif-sc">{['A', 'B', 'C', 'D'][idx]}. {opt}</span>
                         {selected === idx && (
                             <span className="float-right">{idx === quiz.answer ? '✓' : '✗'}</span>
                         )}
                    </button>
                ))}
            </div>

            {showExplanation && (
                <div className="mt-4 p-4 bg-stone-100 rounded text-stone-600 text-sm font-serif leading-relaxed animate-in fade-in slide-in-from-top-2">
                    <span className="font-bold">解析：</span> {quiz.explanation}
                </div>
            )}
        </div>
    );
};

export default DailyQuiz;