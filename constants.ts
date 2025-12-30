import { Book, Category } from './types';

export const MOCK_BOOKS: Book[] = [
  {
    id: '1',
    title: '道德经',
    author: '老子',
    category: Category.PHILOSOPHY,
    description: '道家哲学思想的重要来源，被誉为万经之王。',
    coverColor: 'bg-stone-700',
    sourceUrl: 'https://www.5000yan.com/daodejing/'
  },
  {
    id: '2',
    title: '论语',
    author: '孔子弟子及再传弟子',
    category: Category.PHILOSOPHY,
    description: '儒家经典之一，主要记录孔子及其弟子的言行。',
    coverColor: 'bg-amber-800',
    sourceUrl: 'https://www.5000yan.com/lunyu/'
  },
  {
    id: '3',
    title: '金刚经',
    author: '鸠摩罗什 译',
    category: Category.BUDDHISM,
    description: '大乘佛教般若部重要经典，主张“无相”布施。',
    coverColor: 'bg-amber-600',
    sourceUrl: 'https://www.5000yan.com/jingangjing/'
  },
  {
    id: '4',
    title: '周易',
    author: '姬昌',
    category: Category.ICHING,
    description: '群经之首，设卦观象，蕴含天地万物变易之理。',
    coverColor: 'bg-indigo-900',
    sourceUrl: 'https://www.5000yan.com/zhouyi/'
  },
  {
    id: '5',
    title: '孟子',
    author: '孟子',
    category: Category.PHILOSOPHY,
    description: '儒家经典，记载了孟子的治国思想和政治策略。',
    coverColor: 'bg-slate-700',
    sourceUrl: 'https://www.5000yan.com/mengzi/'
  },
  {
    id: '6',
    title: '传习录',
    author: '王阳明',
    category: Category.PHILOSOPHY,
    description: '心学集大成之作，主张“知行合一”与“致良知”。',
    coverColor: 'bg-red-900',
    sourceUrl: 'https://www.5000yan.com/chuanxilu/'
  },
  {
    id: '7',
    title: '心经',
    author: '玄奘 译',
    category: Category.BUDDHISM,
    description: '佛教经论中文字最为简炼，义理最为丰富的一部经典。',
    coverColor: 'bg-yellow-700',
    sourceUrl: 'https://www.5000yan.com/xinjing/'
  },
  {
    id: '8',
    title: '庄子',
    author: '庄周',
    category: Category.PHILOSOPHY,
    description: '道家代表作，汪洋恣肆，充满了浪漫主义色彩与寓言故事。',
    coverColor: 'bg-emerald-800',
    sourceUrl: 'https://www.5000yan.com/zhuangzi/'
  },
  {
    id: '9',
    title: '六祖坛经',
    author: '惠能',
    category: Category.BUDDHISM,
    description: '禅宗代表经典，记录六祖惠能的生平与说法。',
    coverColor: 'bg-orange-800',
    sourceUrl: 'https://www.5000yan.com/tanjing/'
  },
  {
    id: '10',
    title: '鬼谷子',
    author: '鬼谷子',
    category: Category.PHILOSOPHY,
    description: '纵横家之鼻祖，谋略之奇书。',
    coverColor: 'bg-zinc-800',
    sourceUrl: 'https://www.5000yan.com/guiguzi/'
  },
  {
    id: '11',
    title: '菜根谭',
    author: '洪应明',
    category: Category.PHILOSOPHY,
    description: '处世修养之奇书，融合儒释道三家精髓。',
    coverColor: 'bg-lime-900',
    sourceUrl: 'https://www.5000yan.com/caigentan/'
  },
  {
    id: '12',
    title: '史记',
    author: '司马迁',
    category: Category.HISTORY,
    description: '中国第一部纪传体通史，被鲁迅誉为“史家之绝唱”。',
    coverColor: 'bg-stone-800',
    sourceUrl: 'https://www.5000yan.com/shiji/'
  },
  {
    id: '13',
    title: '孙子兵法',
    author: '孙武',
    category: Category.HISTORY,
    description: '兵家圣典，兵学鼻祖。',
    coverColor: 'bg-red-800',
    sourceUrl: 'https://www.5000yan.com/sunzibingfa/'
  },
  {
    id: '14',
    title: '三十六计',
    author: '未知',
    category: Category.HISTORY,
    description: '根据中国古代军事思想和丰富的斗争经验总结而成的兵书。',
    coverColor: 'bg-neutral-800',
    sourceUrl: 'https://www.5000yan.com/36ji/'
  }
];

export const CATEGORIES = Object.values(Category);