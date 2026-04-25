import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { 
  History, 
  Map as MapIcon, 
  Search, 
  Loader2, 
  Sparkles, 
  Compass, 
  ScrollText,
  ChevronRight,
  Clock
} from 'lucide-react';
import { generateHistoryMap } from './services/gemini';
import { cn } from './lib/utils';

export default function App() {
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const markdown = await generateHistoryMap(topic);
      setResult(markdown);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    '大航海时代',
    '安史之乱',
    '文艺复兴',
    '工业革命的起源',
    '丝绸之路的黄金时代'
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
        <div className="absolute top-10 left-10 w-96 h-96 border border-archive-black rounded-full" />
        <div className="absolute bottom-10 right-10 w-64 h-64 border border-heritage-gold rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-archive-black rotate-12" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-archive-black -rotate-12" />
      </div>

      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20 relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-archive-black rounded-xl shadow-2xl relative">
              <Compass className="w-10 h-10 text-heritage-gold animate-pulse" />
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-4 h-4 text-heritage-gold" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-archive-black">
            CHRONOS ATLAS
          </h1>
          <p className="text-slate-500 max-w-md mx-auto text-lg leading-relaxed font-light">
            通过“大历史观”串联时空，将碎片化的历史脉络编织成深度逻辑图谱。
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <form onSubmit={handleGenerate} className="relative group">
            <input 
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="输入一个历史主题，如：大航海时代..."
              className="w-full bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-2xl px-12 py-5 text-xl font-medium focus:outline-none focus:border-heritage-gold transition-all shadow-sm group-hover:shadow-md"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-heritage-gold transition-colors" />
            <button 
              type="submit"
              disabled={isLoading || !topic.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-archive-black text-heritage-gold px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <MapIcon className="w-5 h-5" />
                  可视化
                </>
              )}
            </button>
          </form>

          {/* Quick Suggestions */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setTopic(s)}
                className="text-sm px-4 py-1.5 rounded-full bg-slate-100 hover:bg-heritage-gold/20 hover:text-archive-black transition-colors text-slate-500 font-medium"
              >
                {s}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-center mb-8"
            >
              {error}
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <div className="bg-white/60 backdrop-blur-md border border-slate-200 rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden">
                {/* Decorative Scroll Texture */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.05] pointer-events-none">
                  <ScrollText className="w-32 h-32" />
                </div>
                
                {/* Main Content */}
                <div className="markdown-body">
                  <ReactMarkdown>{result}</ReactMarkdown>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-3 text-slate-400">
                    <Clock className="w-5 h-5 text-heritage-gold" />
                    <span className="text-sm font-medium italic">
                      生成的时空轴节点由 Gemini AI 计算完成
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(result);
                        alert('已复制到剪贴板');
                      }}
                      className="flex items-center gap-2 text-slate-500 font-medium hover:text-heritage-gold transition-colors text-sm"
                    >
                      复制原文
                    </button>
                    <button 
                      onClick={() => window.print()}
                      className="flex items-center gap-2 text-archive-black font-bold hover:text-heritage-gold transition-colors"
                    >
                      <span>保存为学术报告</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {!result && !isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              className="text-center py-20 flex flex-col items-center space-y-4"
            >
              <History className="w-16 h-16 text-slate-300 stroke-[1px]" />
              <p className="text-slate-400 italic">在上方输入主题开启历史回响...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 text-center text-slate-400 text-xs tracking-widest uppercase font-medium border-t border-slate-200/50">
        &copy; 2026 Chronos Atlas &bull; The Historical Mind Map Laboratory
      </footer>
    </div>
  );
}
