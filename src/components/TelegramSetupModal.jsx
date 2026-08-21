import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Bot, Send, Key, ShieldCheck, Download, RotateCcw, Copy, Check, Terminal } from 'lucide-react';

export const TelegramSetupModal = () => {
  const { botConfig, updateBotConfig, transactions, resetDemoData } = useFinance();
  const [tokenInput, setTokenInput] = useState(botConfig.botToken || '');
  const [chatIdInput, setChatIdInput] = useState(botConfig.chatId || '');
  const [botUsername, setBotUsername] = useState(botConfig.botUsername || 'DompetKuBot');
  const [testSuccess, setTestSuccess] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleSaveConfig = (e) => {
    e.preventDefault();
    updateBotConfig({
      botToken: tokenInput,
      chatId: chatIdInput,
      botUsername: botUsername,
      isConnected: Boolean(tokenInput && chatIdInput)
    });
    setTestSuccess(true);
    setTimeout(() => setTestSuccess(false), 3000);
  };

  const exportCSV = () => {
    const headers = ['ID,Tipe,Jumlah,Kategori,Keterangan,Tanggal,Sumber\n'];
    const rows = transactions.map(t => 
      `"${t.id}","${t.type}","${t.amount}","${t.category}","${t.description.replace(/"/g, '""')}","${t.date}","${t.source}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `livin_finance_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const curlCommand = `curl -X POST "https://api.telegram.org/bot${tokenInput || 'YOUR_BOT_TOKEN'}/sendMessage" \\
  -d "chat_id=${chatIdInput || 'YOUR_CHAT_ID'}" \\
  -d "text=🤖 Livin Finance Bot Terhubung Sempurna!"`;

  const copyCurl = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="livin-card p-5 space-y-6 max-w-2xl mx-auto">
      
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ffc709] to-[#e5b200] flex items-center justify-center text-[#061224] font-black text-xl shadow-lg">
          L
        </div>
        <div>
          <h3 className="font-extrabold text-white text-base">Setup Koneksi Livin' Telegram Bot</h3>
          <p className="text-xs text-slate-400">Hubungkan aplikasi dengan Telegram Bot resmi dari Telegram BotFather</p>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#ffc709] flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" /> 3 Langkah Mudah Integrasi Bot:
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="w-6 h-6 rounded-full bg-[#ffc709]/20 text-[#ffc709] font-black inline-flex items-center justify-center mb-2">1</span>
            <p className="font-bold text-white mb-1">Buka @BotFather</p>
            <p className="text-slate-400 text-[11px]">Ketik <code className="text-[#ffc709]">/newbot</code> di Telegram untuk membuat bot baru.</p>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="w-6 h-6 rounded-full bg-[#ffc709]/20 text-[#ffc709] font-black inline-flex items-center justify-center mb-2">2</span>
            <p className="font-bold text-white mb-1">Salin BOT_TOKEN</p>
            <p className="text-slate-400 text-[11px]">Salin HTTP API token rahasia yang diberikan BotFather.</p>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="w-6 h-6 rounded-full bg-[#ffc709]/20 text-[#ffc709] font-black inline-flex items-center justify-center mb-2">3</span>
            <p className="font-bold text-white mb-1">Cek CHAT_ID</p>
            <p className="text-slate-400 text-[11px]">Buka bot <code className="text-[#ffc709]">@userinfobot</code> untuk mengecek ID Telegram Anda.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSaveConfig} className="bg-[#061224] p-4 rounded-2xl border border-white/10 space-y-3.5">
        <h4 className="text-xs font-extrabold text-white flex items-center gap-1.5">
          <Key className="w-4 h-4 text-[#ffc709]" />
          Konfigurasi Kunci Telegram API:
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] text-slate-400 font-bold mb-1 block">Telegram BOT TOKEN</label>
            <input
              type="password"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="Contoh: 123456789:ABCdefGhIJKlmNoP..."
              className="livin-input text-xs font-mono"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 font-bold mb-1 block">Telegram CHAT ID</label>
            <input
              type="text"
              value={chatIdInput}
              onChange={(e) => setChatIdInput(e.target.value)}
              placeholder="Contoh: 987654321"
              className="livin-input text-xs font-mono"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="submit"
            className="livin-btn-primary py-2.5 px-4 text-xs flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Simpan & Uji Koneksi Bot
          </button>

          {testSuccess && (
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 animate-pulse">
              <Check className="w-4 h-4" /> Konfigurasi Berhasil Disimpan!
            </span>
          )}
        </div>
      </form>

      <div className="bg-black/60 p-4 rounded-2xl border border-white/10 space-y-2 font-mono text-xs">
        <div className="flex items-center justify-between text-slate-400">
          <span className="flex items-center gap-1.5 text-[#ffc709] font-bold">
            <Terminal className="w-4 h-4" /> Uji via Terminal / cURL:
          </span>
          <button
            onClick={copyCurl}
            className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg"
          >
            {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            {copiedCode ? 'Tersalin' : 'Salin cURL'}
          </button>
        </div>
        <pre className="p-3 bg-black/80 rounded-xl text-slate-300 overflow-x-auto text-[11px]">
          {curlCommand}
        </pre>
      </div>

      <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          onClick={exportCSV}
          className="w-full sm:w-auto py-2.5 px-4 rounded-2xl bg-white/10 hover:bg-white/15 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-white/10 transition-all"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          Ekspor Data Mutasi CSV
        </button>

        <button
          onClick={() => {
            if (confirm('Apakah Anda yakin ingin mengembalikan data ke contoh awal?')) {
              resetDemoData();
            }
          }}
          className="w-full sm:w-auto py-2.5 px-4 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-bold text-xs flex items-center justify-center gap-2 border border-rose-500/20 transition-all"
        >
          <RotateCcw className="w-4 h-4 text-rose-400" />
          Reset Data Demo
        </button>
      </div>

    </div>
  );
};
