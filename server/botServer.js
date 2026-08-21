/**
 * Backend Node.js Server for Real Telegram Bot Integration (@AspriFiqriBot)
 */

import { Telegraf, Markup } from 'telegraf';
import express from 'express';
import cors from 'cors';

const BOT_TOKEN = process.env.BOT_TOKEN || '8894713807:AAE84LNGZLjd5QGH0QS6EOFjzl5NMLzFHBI';
const WEBAPP_URL = process.env.WEBAPP_URL || 'https://dompetku-finance-app.vercel.app';
const PORT = process.env.PORT || 3001;

const bot = new Telegraf(BOT_TOKEN);
const app = express();

app.use(cors());
app.use(express.json());

let transactions = [
  { id: 'demo_1', type: 'income', amount: 7500000, category: 'Pemasukan / Gaji', description: 'Gaji Bulanan', date: new Date().toISOString().split('T')[0], source: 'telegram' },
  { id: 'demo_2', type: 'expense', amount: 45000, category: 'Makanan & Minuman', description: 'Nasi Goreng', date: new Date().toISOString().split('T')[0], source: 'telegram' }
];

function parseAmount(str) {
  if (!str) return 0;
  let text = str.toString().toLowerCase().trim().replace(/rp|\s/g, '');
  
  if (text.includes('jt') || text.includes('m')) {
    text = text.replace(',', '.');
    const num = parseFloat(text);
    if (text.includes('jt')) return Math.round(num * 1_000_000);
    if (text.includes('m')) return Math.round(num * 1_000_000_000);
  }
  
  if (text.includes('rb') || text.includes('k')) {
    text = text.replace(',', '.');
    const num = parseFloat(text);
    return Math.round(num * 1_000);
  }

  const cleanNum = parseInt(text.replace(/[^0-9]/g, ''), 10);
  return isNaN(cleanNum) ? 0 : cleanNum;
}

function formatIDR(amount) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount || 0);
}

// Bot Command: /start or /help
bot.start((ctx) => {
  ctx.reply(
    `🤖 *Halo! Saya Bot AspriFiqri Finance Tracker*\n\nSaya siap membantu Anda mencatat keuangan secara otomatis di Telegram!\n\n*Format yang bisa Anda ketik:*\n👉 \`/catat 45000 Nasi Goreng\`\n👉 \`pemasukan 3.000.000 Gaji\`\n👉 \`/saldo\` - Cek ringkasan saldo\n👉 \`/laporan\` - Cek laporan bulanan\n\nKlik tombol di bawah untuk membuka aplikasi Livin' WebApp!`,
    {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [Markup.button.webApp('🚀 Buka Livin Finance WebApp', WEBAPP_URL)]
      ])
    }
  );
});

// Bot Command: /saldo
bot.command('saldo', (ctx) => {
  const incomeTotal = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expenseTotal = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = incomeTotal - expenseTotal;

  ctx.reply(
    `💳 *Ringkasan Saldo Rekening*\n\n💰 *Pemasukan (CR):* ${formatIDR(incomeTotal)}\n💸 *Pengeluaran (DB):* ${formatIDR(expenseTotal)}\n➖➖➖➖➖➖➖➖➖➖➖➖\n🏦 *Total Saldo Net:* *${formatIDR(balance)}*`,
    {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [Markup.button.webApp('🚀 Buka Livin Finance WebApp', WEBAPP_URL)]
      ])
    }
  );
});

// Bot Command /catat
bot.command('catat', (ctx) => {
  processTextMessage(ctx);
});

// Process ALL Text Messages dynamically (including "Simpang pemasukan 3.000.000" or "50000 kopi")
bot.on('text', (ctx) => {
  processTextMessage(ctx);
});

function processTextMessage(ctx) {
  const rawText = ctx.message.text.trim();
  const lower = rawText.toLowerCase();

  if (lower === '/start' || lower === '/help' || lower === 'halo' || lower === 'hi') {
    return ctx.reply(
      `🤖 *Halo! Saya Bot AspriFiqri Finance Tracker*\n\nSiap mencatat keuangan Anda! Ketik perintah seperti:\n• \`/catat 45000 Nasi Goreng\`\n• \`pemasukan 3.000.000\`\n• \`/saldo\``,
      {
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
          [Markup.button.webApp('🚀 Buka Livin Finance WebApp', WEBAPP_URL)]
        ])
      }
    );
  }

  if (lower === '/saldo' || lower === 'saldo') {
    const incomeTotal = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expenseTotal = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const balance = incomeTotal - expenseTotal;
    return ctx.reply(
      `💳 *Ringkasan Saldo Rekening*\n\n💰 *Pemasukan (CR):* ${formatIDR(incomeTotal)}\n💸 *Pengeluaran (DB):* ${formatIDR(expenseTotal)}\n➖➖➖➖➖➖➖➖➖➖➖➖\n🏦 *Total Saldo Net:* *${formatIDR(balance)}*`,
      {
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
          [Markup.button.webApp('🚀 Buka Livin Finance WebApp', WEBAPP_URL)]
        ])
      }
    );
  }

  let type = lower.includes('pemasukan') || lower.includes('masuk') || lower.includes('gaji') || lower.includes('simpang pemasukan') ? 'income' : 'expense';

  const amountMatch = rawText.match(/([0-9.,]+\s*(?:jt|m|rb|k)?)/i);
  let amount = 0;
  let description = rawText;

  if (amountMatch) {
    amount = parseAmount(amountMatch[1]);
    description = rawText.replace(amountMatch[1], '').replace(/\/catat|\/pemasukan|pemasukan|masuk|simpang/gi, '').trim() || (type === 'income' ? 'Pemasukan' : 'Pengeluaran');
  }

  if (amount > 0) {
    const newTx = {
      id: 'tx_' + Date.now(),
      type,
      amount,
      category: type === 'income' ? 'Pemasukan / Gaji' : 'Pengeluaran',
      description,
      date: new Date().toISOString().split('T')[0],
      source: 'telegram'
    };
    transactions.unshift(newTx);

    const replyText = type === 'income'
      ? `✅ *Pemasukan (CR) Berhasil Dicatat!*\n\n💰 *Jumlah:* ${formatIDR(amount)}\n📝 *Keterangan:* ${description}\n📅 *Tanggal:* ${newTx.date}`
      : `✅ *Pengeluaran (DB) Berhasil Dicatat!*\n\n💸 *Jumlah:* ${formatIDR(amount)}\n📝 *Keterangan:* ${description}\n📅 *Tanggal:* ${newTx.date}`;

    return ctx.reply(replyText, {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [Markup.button.webApp('🚀 Lihat di Livin WebApp', WEBAPP_URL)]
      ])
    });
  }

  return ctx.reply(
    `❓ *Perintah tidak dikenali.*\n\nContoh format yang bisa Anda gunakan:\n• \`pemasukan 3.000.000 Gaji\`\n• \`/catat 45000 Nasi Goreng\`\n• \`/saldo\``,
    { parse_mode: 'Markdown' }
  );
}

if (BOT_TOKEN && BOT_TOKEN !== 'YOUR_TELEGRAM_BOT_TOKEN_HERE') {
  bot.launch()
    .then(() => console.log('🤖 Telegram Bot @AspriFiqriBot Listener ACTIVE!'))
    .catch((err) => console.error('Error starting bot:', err.message));
}

app.listen(PORT, () => {
  console.log(`🚀 Livin Finance REST API Server running on port ${PORT}`);
});
