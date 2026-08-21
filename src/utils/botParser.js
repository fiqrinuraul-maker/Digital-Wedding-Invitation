import { formatIDR, getCurrentMonthNameIndo } from './formatters';

export const CATEGORIES = {
  FOOD: { id: 'food', name: 'Makanan & Minuman', icon: '🍔', color: '#f59e0b' },
  TRANSPORT: { id: 'transport', name: 'Transportasi', icon: '🚗', color: '#3b82f6' },
  SHOPPING: { id: 'shopping', name: 'Belanja & Shopping', icon: '🛍️', color: '#ec4899' },
  UTILITIES: { id: 'utilities', name: 'Tagihan & Utilitas', icon: '💡', color: '#10b981' },
  ENTERTAINMENT: { id: 'entertainment', name: 'Hiburan & Lifestyle', icon: '🎮', color: '#8b5cf6' },
  INCOME: { id: 'income', name: 'Pemasukan / Gaji', icon: '💼', color: '#06b6d4' },
  OTHER: { id: 'other', name: 'Lain-lain', icon: '📦', color: '#64748b' },
};

/**
 * Smart Category Auto-detector based on keywords
 */
export const detectCategory = (description, type = 'expense') => {
  if (type === 'income') return CATEGORIES.INCOME;

  const desc = (description || '').toLowerCase();

  if (/makan|minum|kopi|nasi|bakso|soto|resto|cafe|lunch|dinner|sarapan|snack|boba|es teh|gofood|grabfood/i.test(desc)) {
    return CATEGORIES.FOOD;
  }
  if (/bensin|pertamax|pertalite|gojek|grab|e-toll|toll|parkir|angkot|bis|bus|kereta|mrt|lrt|taksi|ojek|travel|servis|oli/i.test(desc)) {
    return CATEGORIES.TRANSPORT;
  }
  if (/baju|sepatu|tokopedia|shopee|lazada|belanja|supermarket|indomaret|alfamart|skincare|baju|celana|mall/i.test(desc)) {
    return CATEGORIES.SHOPPING;
  }
  if (/listrik|pln|air|pdam|wifi|indihome|biznet|pulsa|kuota|bpjs|sewa|kos|kontrakan|cicilan|asuransi|tagihan/i.test(desc)) {
    return CATEGORIES.UTILITIES;
  }
  if (/bioskop|xxi|cgv|game|steam|spotify|netflix|youtube|topup|liburan|hotel|tiketing|nonton|hobi/i.test(desc)) {
    return CATEGORIES.ENTERTAINMENT;
  }
  if (/gaji|bonus|freelance|thr|dividen|cashback|hadiah|penjualan|pemasukan/i.test(desc)) {
    return CATEGORIES.INCOME;
  }

  return CATEGORIES.OTHER;
};

/**
 * Parses numeric amount strings (supports "50rb", "50k", "1.5jt", "1,5jt", "50000")
 */
export const parseAmount = (amountStr) => {
  if (!amountStr) return 0;
  let str = amountStr.toString().toLowerCase().trim().replace(/rp|\.|\s/g, '');
  
  if (str.includes('jt') || str.includes('m')) {
    str = str.replace(',', '.');
    const num = parseFloat(str);
    if (str.includes('jt')) return Math.round(num * 1_000_000);
    if (str.includes('m')) return Math.round(num * 1_000_000_000);
  }
  
  if (str.includes('rb') || str.includes('k')) {
    str = str.replace(',', '.');
    const num = parseFloat(str);
    return Math.round(num * 1_000);
  }

  const cleanNum = parseInt(str.replace(/[^0-9]/g, ''), 10);
  return isNaN(cleanNum) ? 0 : cleanNum;
};

/**
 * Main Telegram Bot Natural Language / Command Parser
 */
export const parseBotMessage = (text, currentData = { transactions: [], budgets: {} }) => {
  if (!text || typeof text !== 'string') return null;

  const rawText = text.trim();
  const lowerText = rawText.toLowerCase();

  // 1. HELP / START COMMAND
  if (lowerText === '/start' || lowerText === '/help' || lowerText === '/bantuan') {
    return {
      type: 'REPLY',
      replyMessage: `🤖 *Halo! Saya Bot DompetKu Finance Tracker*

Saya siap membantu Anda mencatat & memantau keuangan langsung via chat Telegram!

*Format Perintah yang Didukung:*
1. 💸 *Catat Pengeluaran:*
   • \`/catat 45000 Nasi Goreng\`
   • \`/catat 15rb Kopi Kenangan\`
   • \`50000 Bensin Pertamax\`

2. 💰 *Catat Pemasukan:*
   • \`/pemasukan 5000000 Gaji Bulanan\`
   • \`/masuk 2.5jt Freelance Website\`

3. 📊 *Cek Keuangan:*
   • \`/saldo\` - Cek total saldo & ringkasan
   • \`/budget\` - Cek batas pengeluaran kategori
   • \`/laporan\` - Ringkasan pengeluaran bulan ini

Gunakan tombol *Buka DompetKu WebApp* di bawah untuk melihat grafik & analitik lengkap!`
    };
  }

  // 2. SALDO COMMAND
  if (lowerText === '/saldo' || lowerText === 'saldo' || lowerText.includes('cek saldo')) {
    const incomeTotal = currentData.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenseTotal = currentData.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = incomeTotal - expenseTotal;

    return {
      type: 'REPLY',
      replyMessage: `💳 *Ringkasan Saldo DompetKu* (${getCurrentMonthNameIndo()})

💰 *Total Pemasukan:* ${formatIDR(incomeTotal)}
💸 *Total Pengeluaran:* ${formatIDR(expenseTotal)}
➖➖➖➖➖➖➖➖➖➖➖➖
🏦 *Sisa Saldo Net:* *${formatIDR(balance)}*

_${expenseTotal > incomeTotal ? '⚠️ Perhatian: Pengeluaran bulan ini melebihi pemasukan!' : '✅ Keuangan Anda dalam kondisi sehat!'}_`
    };
  }

  // 3. BUDGET COMMAND
  if (lowerText === '/budget' || lowerText === 'budget' || lowerText === '/anggaran') {
    const budgets = currentData.budgets || {};
    let message = `🎯 *Status Anggaran Kategori (${getCurrentMonthNameIndo()})*\n\n`;

    let totalBudget = 0;
    let totalSpent = 0;

    Object.values(CATEGORIES).forEach(cat => {
      if (cat.id === 'income') return;
      const budgetLimit = budgets[cat.id] || 0;
      if (!budgetLimit) return;

      const spent = currentData.transactions
        .filter(t => t.type === 'expense' && t.category === cat.name)
        .reduce((sum, t) => sum + t.amount, 0);

      totalBudget += budgetLimit;
      totalSpent += spent;

      const percent = Math.min(Math.round((spent / budgetLimit) * 100), 999);
      let statusIcon = '🟢';
      if (percent >= 100) statusIcon = '🔴 EXCEEDED';
      else if (percent >= 80) statusIcon = '🟡 WARNING';

      message += `${cat.icon} *${cat.name}:*\n  Terpakai: ${formatIDR(spent)} / ${formatIDR(budgetLimit)} (${percent}%) ${statusIcon}\n\n`;
    });

    if (totalBudget === 0) {
      message += `Belum ada anggaran yang diatur. Silakan atur budget di tab *Budgeting* pada WebApp!`;
    } else {
      message += `➖➖➖➖➖➖➖➖➖➖➖➖\n📊 *Total Terpakai:* ${formatIDR(totalSpent)} / ${formatIDR(totalBudget)}`;
    }

    return {
      type: 'REPLY',
      replyMessage: message
    };
  }

  // 4. LAPORAN COMMAND
  if (lowerText === '/laporan' || lowerText === '/report' || lowerText === 'laporan') {
    const expenses = currentData.transactions.filter(t => t.type === 'expense');
    const categoryTotals = {};

    expenses.forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

    let message = `📈 *Laporan Pengeluaran Kategori*\n📅 ${getCurrentMonthNameIndo()}\n\n`;

    const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

    if (sortedCategories.length === 0) {
      message += `Belum ada transaksi pengeluaran bulan ini.`;
    } else {
      sortedCategories.forEach(([catName, amount]) => {
        const catObj = Object.values(CATEGORIES).find(c => c.name === catName) || CATEGORIES.OTHER;
        message += `${catObj.icon} *${catName}:* ${formatIDR(amount)}\n`;
      });
      const total = expenses.reduce((s, t) => s + t.amount, 0);
      message += `\n➖➖➖➖➖➖➖➖➖➖➖➖\n💸 *Total Pengeluaran:* *${formatIDR(total)}*`;
    }

    return {
      type: 'REPLY',
      replyMessage: message
    };
  }

  // 5. TRANSACTION ADD COMMANDS (/catat, /pemasukan, /keluar, or free form like "50000 kopi")
  let type = 'expense';
  let cleanText = rawText;

  if (lowerText.startsWith('/pemasukan') || lowerText.startsWith('/masuk')) {
    type = 'income';
    cleanText = rawText.replace(/^\/(pemasukan|masuk)\s*/i, '');
  } else if (lowerText.startsWith('/catat') || lowerText.startsWith('/keluar')) {
    type = 'expense';
    cleanText = rawText.replace(/^\/(catat|keluar)\s*/i, '');
  }

  // Extract amount and description
  // Matches expressions like "50000 kopi kenangan", "50rb nasi goreng", "2.5jt gaji"
  const match = cleanText.match(/^([0-9.,]+(?:\s*[a-zA-Z]{1,2})?)\s+(.+)$/i) || 
                cleanText.match(/^(.+?)\s+([0-9.,]+(?:\s*[a-zA-Z]{1,2})?)$/i);

  let amount = 0;
  let description = '';

  if (match) {
    // Check which match group is numeric
    const amountStr1 = match[1];
    const amountStr2 = match[2];
    
    if (parseAmount(amountStr1) > 0) {
      amount = parseAmount(amountStr1);
      description = amountStr2.trim();
    } else if (parseAmount(amountStr2) > 0) {
      amount = parseAmount(amountStr2);
      description = amountStr1.trim();
    }
  } else {
    // Try simple regex extraction for amount anywhere in text
    const amountOnlyMatch = cleanText.match(/([0-9.,]+\s*(?:jt|m|rb|k)?)/i);
    if (amountOnlyMatch) {
      amount = parseAmount(amountOnlyMatch[1]);
      description = cleanText.replace(amountOnlyMatch[1], '').trim() || (type === 'income' ? 'Pemasukan' : 'Pengeluaran');
    }
  }

  if (amount > 0) {
    const categoryObj = detectCategory(description, type);
    const newTransaction = {
      id: 'tx_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      type,
      amount,
      category: categoryObj.name,
      description: description || (type === 'income' ? 'Pemasukan' : 'Pengeluaran'),
      date: new Date().toISOString().split('T')[0],
      timestamp: Date.now(),
      source: 'telegram'
    };

    const replyMsg = type === 'income' 
      ? `✅ *Pemasukan Berhasil Dicatat!*

${categoryObj.icon} *Kategori:* ${categoryObj.name}
💰 *Jumlah:* ${formatIDR(amount)}
📝 *Keterangan:* ${newTransaction.description}
📅 *Tanggal:* ${newTransaction.date}`
      : `✅ *Pengeluaran Berhasil Dicatat!*

${categoryObj.icon} *Kategori:* ${categoryObj.name}
💸 *Jumlah:* ${formatIDR(amount)}
📝 *Keterangan:* ${newTransaction.description}
📅 *Tanggal:* ${newTransaction.date}`;

    return {
      type: 'ADD_TRANSACTION',
      transaction: newTransaction,
      replyMessage: replyMsg
    };
  }

  // Fallback if unable to parse
  return {
    type: 'REPLY',
    replyMessage: `❓ *Perintah tidak dikenali.*

Gunakan format berikut:
• Pengeluaran: \`/catat 50000 Nasi Goreng\` atau \`50rb Kopi\`
• Pemasukan: \`/pemasukan 5000000 Gaji\`
• Cek Saldo: \`/saldo\`
• Bantuan: \`/help\``
  };
};
