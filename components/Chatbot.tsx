
import React, { useState, useRef, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Bot, User } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { COMPANY_INFO, PRODUCTS } from '../constants';
import { LangContext } from '../App';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export const Chatbot: React.FC = () => {
  const { lang } = useContext(LangContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 'welcome', 
      role: 'model', 
      text: lang === 'AR' 
        ? 'مرحباً! أنا مساعد بروديت الذكي. كيف يمكنني مساعدتك في اختيار منتجات النظافة اليوم؟' 
        : lang === 'FR' 
        ? 'Bonjour ! Je suis l\'assistant virtuel PRODET. Comment puis-je vous aider avec vos besoins en hygiène professionnelle ?'
        : 'Hello! I am the PRODET virtual assistant. How can I help you with your professional hygiene needs?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Construct System Context from Products
  const getSystemInstruction = () => {
    const productContext = PRODUCTS.map(p => 
      `- ${p.name} (${p.category}): ${p.tagline.fr}. ${p.description.fr}. Prix: ${p.price} TND.`
    ).join('\n');

    return `
      Role: You are an expert sales engineer for PRODET, a Tunisian B2B industrial detergent manufacturer.
      Tone: Professional, helpful, concise, industrial expert.
      Language: Respond in the same language as the user (French, English, or Arabic).
      
      Company Info:
      - Name: ${COMPANY_INFO.name}
      - Phone: ${COMPANY_INFO.phone}
      - Email: ${COMPANY_INFO.email}
      - Address: ${COMPANY_INFO.address}
      
      Product Catalog:
      ${productContext}
      
      Instructions:
      1. Recommend specific products based on the user's industry (Hotel, Restaurant, Factory).
      2. If asked about prices, always quote in TND (Tunisian Dinars).
      3. If asked about usage, explain the dosage or application method.
      4. If you don't know an answer, suggest they contact sales via the contact form.
      5. Keep responses short and easy to read on a mobile chat.
    `;
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation history for context (last 5 messages)
      // Note: In a real app we might pass history to the model, 
      // here we rely on the single turn generation with strong system prompt for simplicity in this demo,
      // or we can use chat sessions. Let's use generateContent for simplicity with full context.
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: input, // In a full implementation, pass history here
        config: {
          systemInstruction: getSystemInstruction(),
        }
      });

      const modelMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        text: response.text || (lang === 'FR' ? "Je n'ai pas pu générer de réponse." : "Could not generate response.")
      };
      
      setMessages(prev => [...prev, modelMsg]);

    } catch (error) {
      console.error("Chat error", error);
      const errorMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        text: lang === 'FR' ? "Désolé, une erreur est survenue. Veuillez réessayer." : "Sorry, an error occurred. Please try again."
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-tr from-prodet-700 to-prodet-500 text-white rounded-full shadow-lg shadow-prodet-600/30 flex items-center justify-center ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Sparkles size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-100"
          >
            {/* Header */}
            <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-prodet-500 to-blue-400 flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Prodet AI Expert</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    <span className="text-[10px] text-slate-300">Gemini 3 Pro Powered</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-prodet-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                 <div className="flex justify-start">
                    <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-slate-200 flex gap-1">
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                    </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={lang === 'AR' ? 'اكتب رسالتك...' : "Type your question..."}
                  className="flex-1 bg-slate-100 text-slate-900 text-sm rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-prodet-200 transition-all"
                />
                <button 
                  type="submit" 
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 bg-prodet-700 text-white rounded-full flex items-center justify-center hover:bg-prodet-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95"
                >
                  <Send size={18} className={lang === 'AR' ? 'rotate-180' : ''} />
                </button>
              </div>
              <p className="text-[10px] text-center text-slate-400 mt-2">
                AI can make mistakes. Check product labels for exact safety info.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
