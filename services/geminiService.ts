import { GoogleGenAI, Type } from "@google/genai";
import { Book, WisdomQuote } from '../types';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing from environment variables.");
    throw new Error("API Key missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const searchTrendingBooks = async (query: string): Promise<{ books: Book[], rawText: string, sources: any[] }> => {
  const ai = getAiClient();
  
  // Adjusted prompt to specifically look for 5000yan links.
  // REMOVED responseSchema and responseMimeType because they often cause 500 errors when combined with googleSearch tools.
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `User is searching for: "${query}". 
    Task: Use Google Search to find relevant Chinese classic books, philosophy, or history texts.
    CRITICAL: You MUST prioritize finding results from the website "5000yan.com". 
    If a 5000yan.com link is found, use it as the sourceUrl.
    
    Output Format:
    1. A short summary of the search results in Chinese.
    2. A JSON block containing the list of books found.
    
    The JSON block must follow this structure:
    \`\`\`json
    {
      "books": [
        {
          "title": "Book Title",
          "author": "Author Name",
          "description": "Short description",
          "category": "Category",
          "targetUrl": "URL found"
        }
      ]
    }
    \`\`\`
    `,
    config: {
      tools: [{ googleSearch: {} }],
      // responseMimeType: 'application/json', // DISABLED to fix Rpc error
    }
  });

  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  let parsed: any = { books: [], summary: '' };
  
  try {
    const text = response.text || '';
    
    // Extract JSON
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```([\s\S]*?)```/);
    if (jsonMatch) {
        const jsonStr = jsonMatch[1];
        const obj = JSON.parse(jsonStr);
        parsed.books = Array.isArray(obj.books) ? obj.books : [];
        
        // Remove the JSON block to get the summary
        parsed.summary = text.replace(jsonMatch[0], '').trim();
    } else {
        // Try to find the start of JSON object
        const startIndex = text.indexOf('{');
        const endIndex = text.lastIndexOf('}');
        if (startIndex !== -1 && endIndex !== -1) {
            const jsonStr = text.substring(startIndex, endIndex + 1);
            const obj = JSON.parse(jsonStr);
            parsed.books = Array.isArray(obj.books) ? obj.books : [];
            parsed.summary = text.substring(0, startIndex).trim();
        } else {
            parsed.summary = text;
        }
    }
  } catch (e) {
    console.error("Failed to parse JSON from search result", e);
    parsed.summary = response.text || '';
    parsed.books = [];
  }

  // Map to internal Book type
  const mappedBooks: Book[] = Array.isArray(parsed.books) ? parsed.books.map((b: any, idx: number) => {
    let finalUrl = b.targetUrl;
    // Heuristic: If it doesn't look like a url, make it a search on 5000yan
    if (!finalUrl || !finalUrl.includes('http')) {
        finalUrl = `https://www.bing.com/search?q=site:5000yan.com ${encodeURIComponent(b.title)}`;
    }

    return {
        id: `search-${Date.now()}-${idx}`,
        title: b.title,
        author: b.author,
        category: b.category as any, 
        description: b.description,
        isPopular: true,
        coverColor: 'bg-indigo-900', // Distinct color for search results
        sourceUrl: finalUrl
    };
  }) : [];

  return {
    books: mappedBooks,
    rawText: parsed.summary || response.text || '',
    sources
  };
};

export const getBookContent = async (bookTitle: string): Promise<string> => {
  const ai = getAiClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `为书籍: "${bookTitle}" 提供一个深度的"智能导读"。
    请使用Markdown格式，包含以下部分：
    1. **简介**：简要介绍书籍背景。
    2. **核心思想**：列出3-5个核心哲学或思想观点。
    3. **经典摘录与解读**：选取一段原文（如果是古文请附带原文），并提供现代汉语的深度解读。
    4. **现代启示**：这本书对现代人生活的指导意义。
    
    风格要求：古朴典雅，富有智慧。`,
  });
  
  return response.text || "暂无内容。";
};

export const getDailyWisdom = async (): Promise<WisdomQuote> => {
  const ai = getAiClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `生成一张"每日智慧"卡片内容。
    随机选择：易经的一个卦象（包含卦名和卦辞），或者一句中国古代哲学名言（老庄、孔孟、禅宗等）。
    
    返回JSON格式:
    {
      "text": "名言内容 或 卦名+卦辞",
      "source": "出处 (如: 道德经, 周易)",
      "interpretation": "一句简短的现代生活解读，充满正能量和启发性。"
    }`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING },
          source: { type: Type.STRING },
          interpretation: { type: Type.STRING }
        }
      }
    }
  });

  try {
     return JSON.parse(response.text || '{}') as WisdomQuote;
  } catch (e) {
    return {
        text: "道可道，非常道。",
        source: "道德经",
        interpretation: "言语定义了界限，去直接体验生活的真谛吧。"
    };
  }
};

export const chatWithScholar = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
   const ai = getAiClient();
   const chat = ai.chats.create({
       model: 'gemini-3-flash-preview',
       history: history,
       config: {
           systemInstruction: "你是一位博古通今的国学大师，精通佛学、道家、儒家及易经。请用中文回答用户的问题。回答应富有哲理，引经据典，同时语言通俗易懂，态度谦和宁静。"
       }
   });
   
   const result = await chat.sendMessage({ message });
   return result.text;
};

// New feature: Daily Quiz Generation
export const getDailyQuiz = async (): Promise<{question: string, options: string[], answer: number, explanation: string}> => {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a fun, interesting multiple choice quiz question about Chinese History, Philosophy, or Literature.
        Output JSON:
        {
            "question": "The question text in Chinese",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "answer": 0 (index of correct option),
            "explanation": "Short explanation in Chinese why it is correct"
        }`,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                    answer: { type: Type.INTEGER },
                    explanation: { type: Type.STRING }
                }
            }
        }
    });
    
    try {
        const parsed = JSON.parse(response.text || '{}');
        if (!parsed.question || !Array.isArray(parsed.options) || parsed.options.length === 0) {
            throw new Error("Invalid quiz format");
        }
        return parsed;
    } catch(e) {
        return {
            question: "‘上善若水’出自哪部经典？",
            options: ["论语", "道德经", "庄子", "孟子"],
            answer: 1,
            explanation: "出自《道德经》第八章：上善若水。水善利万物而不争。"
        };
    }
}