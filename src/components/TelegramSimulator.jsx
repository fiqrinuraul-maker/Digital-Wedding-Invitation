import React, { useState, useRef, useEffect } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Send, Bot, User, CheckCheck, Sparkles, ExternalLink, Mic, CornerDownLeft } from 'lucide-react';

export const TelegramSimulator = () => {
  const { chatMessages, sendBotSimMessage, setActiveTab } = useFinance();
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    sendBotSimMessage(inputText);
    setInputText('');
  };

  const handleQuickCommand = (cmd) => {
    sendBotSimMessage(cmd);
  };

  const renderTelegramText = (text) => {
    if (!text) return '';
    return text.split('\n').map((line, idx) => {
      let formattedLine = line.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');
      formattedLine = formattedLine.replace(/_([^_]+)_/g, '<em>$1</em>');
      formattedLine = formattedLine.replace(/`([^`]+)`/g, '<code class="bg-black/40 px-1 py-0.5 rounded text-[#ffc709] font-mono text-xs">$1</code>');

      return (
        <span
          key={idx}
          className="block min-h-[1.2rem]"
          dangerouslySetInnerHTML={{ __html: formattedLine }}
        />
      );
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-2xl mx-auto rounded-3xl overflow-hidden border border-[#ffc709]/30 shadow-2xl bg-[#061224]">
      
      {/* Header */}
      <div className="bg-[#0c1d38] px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ffc709] to-[#e5b200] flex items-center justify-center text-[#061224] font-black text-xl shadow-md">
              L
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0c1d38]"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-white text-sm">Livin' Finance Bot</h3>
              <span className="text-[10px] bg-[#ffc709]/20 text-[#ffc709] font-bold px-2 py-0.5 rounded-full border border-[#ffc709]/30">bot</span>
            </div>
            <p className="text-xs text-slate-400">@DompetKuBot • bot telegram aktif</p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('dashboard')}
          className="px-3 py-1.5 rounded-xl bg-[#ffc709]/20 hover:bg-[#ffc709]/30 text-[#ffc709] text-xs font-bold flex items-center gap-1.5 transition-all border border-[#ffc709]/30"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Livin App
        </button>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 telegram-chat-container">
        {chatMessages.map((msg) => {
          const isBot = msg.sender === 'bot';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} animate-slide-up`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] p-3.5 text-xs sm:text-sm leading-relaxed ${
                  isBot ? 'telegram-bubble-bot text-slate-100' : 'telegram-bubble-user text-white'
                }`}
              >
                {renderTelegramText(msg.text)}

                {isBot && (
                  <div className="mt-3 pt-2 border-t border-white/10">
                    <button
                      onClick={() => setActiveTab('dashboard')}
                      className="w-full py-2 px-3 livin-btn-primary text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      🚀 Buka Livin' Finance WebApp
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-end gap-1 mt-1.5 text-[10px] text-slate-400">
                  <span>{new Date(msg.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                  {!isBot && <CheckCheck className="w-3 h-3 text-[#ffc709]" />}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      {/* Quick Action Command Chips */}
      <div className="bg-[#0c1d38] px-3 py-2 border-t border-white/5 overflow-x-auto flex items-center gap-2 no-scrollbar">
        <span className="text-[11px] text-slate-400 font-bold whitespace-nowrap">Coba Command:</span>
        <button
          onClick={() => handleQuickCommand('/catat 45000 Nasi Goreng & Es Teh')}
          className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-[#ffc709] text-xs font-mono whitespace-nowrap border border-white/10 transition-all"
        >
          /catat 45000 Nasi Goreng
        </button>
        <button
          onClick={() => handleQuickCommand('/catat 15rb Kopi Kenangan')}
          className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-[#ffc709] text-xs font-mono whitespace-nowrap border border-white/10 transition-all"
        >
          /catat 15rb Kopi
        </button>
        <button
          onClick={() => handleQuickCommand('/pemasukan 5000000 Gaji Bulanan')}
          className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-emerald-300 text-xs font-mono whitespace-nowrap border border-white/10 transition-all"
        >
          /pemasukan 5jt Gaji
        </button>
        <button
          onClick={() => handleQuickCommand('/saldo')}
          className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-[#ffc709] text-xs font-mono whitespace-nowrap border border-white/10 transition-all"
        >
          /saldo
        </button>
        <button
          onClick={() => handleQuickCommand('/budget')}
          className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-purple-300 text-xs font-mono whitespace-nowrap border border-white/10 transition-all"
        >
          /budget
        </button>
      </div>

      {/* Telegram Input Bar */}
      <form onSubmit={handleSend} className="bg-[#0c1d38] p-3 border-t border-white/10 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ketik perintah (contoh: /catat 50000 Makan)..."
          className="flex-1 bg-[#061224] text-white placeholder-slate-400 rounded-full px-4 py-2.5 text-xs sm:text-sm outline-none border border-white/10 focus:border-[#ffc709] transition-all"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="w-10 h-10 rounded-full bg-[#ffc709] hover:bg-amber-400 disabled:opacity-40 text-[#061224] flex items-center justify-center transition-all shadow-md active:scale-95 font-bold"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
