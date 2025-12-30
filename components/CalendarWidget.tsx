import React, { useState, useEffect } from 'react';

const QUOTES = [
    "天行健，君子以自强不息。",
    "地势坤，君子以厚德载物。",
    "知行合一，致良知。",
    "学而不思则罔，思而不学则殆。",
    "上善若水，水利万物而不争。",
    "不积跬步，无以至千里。",
    "满招损，谦受益。",
    "路漫漫其修远兮，吾将上下而求索。"
];

const CalendarWidget: React.FC = () => {
  const [checkedIn, setCheckedIn] = useState(false);
  const [streak, setStreak] = useState(0);
  const [todayQuote, setTodayQuote] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Load state from local storage
    const lastCheckIn = localStorage.getItem('lastCheckInDate');
    const currentStreak = parseInt(localStorage.getItem('streak') || '0');
    const todayStr = new Date().toDateString();

    if (lastCheckIn === todayStr) {
        setCheckedIn(true);
    }
    setStreak(currentStreak);

    // Pick a quote based on day of month to be consistent for the day
    const dayOfMonth = new Date().getDate();
    setTodayQuote(QUOTES[dayOfMonth % QUOTES.length]);
  }, []);

  const handleCheckIn = () => {
    if (checkedIn) return;

    const todayStr = new Date().toDateString();
    const newStreak = streak + 1;
    
    localStorage.setItem('lastCheckInDate', todayStr);
    localStorage.setItem('streak', newStreak.toString());
    
    setCheckedIn(true);
    setStreak(newStreak);
  };

  // Generate a simple calendar grid for visual
  const renderCalendarGrid = () => {
     const days = [];
     const totalDays = 35; // 5 rows of 7
     const today = currentDate.getDate();
     
     for (let i = 1; i <= totalDays; i++) {
        // Mocking a month view roughly
        let dayNum = i - 2; // Offset start
        if (dayNum < 1 || dayNum > 30) dayNum = 0;
        
        const isToday = dayNum === today;
        const isPast = dayNum < today && dayNum > 0;
        
        days.push(
            <div key={i} className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full text-xs font-serif
                ${dayNum === 0 ? 'opacity-0' : ''}
                ${isToday ? 'bg-seal-red text-white font-bold shadow-md' : ''}
                ${isPast ? 'bg-bamboo-green/20 text-bamboo-green' : ''}
                ${!isToday && !isPast && dayNum > 0 ? 'text-stone-400' : ''}
            `}>
                {dayNum > 0 ? dayNum : ''}
            </div>
        );
     }
     return days;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-6 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <span className="text-9xl font-serif">历</span>
        </div>

        {/* Left: Quote & Action */}
        <div className="flex-1 text-center md:text-left z-10">
             <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                 <span className="text-xs font-bold text-seal-red tracking-widest uppercase border border-seal-red/30 px-2 py-0.5 rounded">每日修身</span>
                 <span className="text-xs text-stone-400">{currentDate.toLocaleDateString()}</span>
             </div>
             
             <h3 className="text-2xl font-serif-sc text-ink-black mb-4 font-bold leading-relaxed">
                 “{todayQuote}”
             </h3>
             
             <div className="flex flex-col md:flex-row items-center gap-4">
                 <button 
                    onClick={handleCheckIn}
                    disabled={checkedIn}
                    className={`px-6 py-2 rounded-full font-bold transition-all transform active:scale-95 flex items-center gap-2 ${
                        checkedIn 
                        ? 'bg-bamboo-green text-white cursor-default' 
                        : 'bg-ink-black text-white hover:bg-seal-red shadow-lg hover:shadow-xl'
                    }`}
                 >
                    {checkedIn ? '✓ 今日已打卡' : '◎ 立即打卡'}
                 </button>
                 <span className="text-sm text-stone-500 font-serif">
                     已连续修习 <strong className="text-ink-black text-lg">{streak}</strong> 天
                 </span>
             </div>
        </div>

        {/* Right: Visual Calendar */}
        <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 z-10">
            <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
                {['日','一','二','三','四','五','六'].map(d => (
                    <div key={d} className="text-center text-[10px] text-stone-400 font-serif">{d}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-1 md:gap-2">
                {renderCalendarGrid()}
            </div>
        </div>
    </div>
  );
};

export default CalendarWidget;