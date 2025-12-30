
export enum Category {
  PHILOSOPHY = '诸子百家',
  BUDDHISM = '佛学经典',
  ICHING = '易经术数',
  HISTORY = '史书典籍',
  WESTERN = '西方哲学',
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: Category;
  description: string;
  coverColor?: string;
  isPopular?: boolean; // From search trends
  sourceUrl?: string; // External link for iframe embedding
}

export interface SearchResult {
  title: string;
  snippet: string;
  url?: string;
}

export interface WisdomQuote {
  text: string;
  source: string;
  interpretation: string;
}

export type ViewState = 'HOME' | 'READER' | 'SEARCH' | 'CHAT' | 'LIBRARY';
