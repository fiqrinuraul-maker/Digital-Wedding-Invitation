import React, { createContext, useContext, useState, useEffect } from 'react';
import { CATEGORIES, parseBotMessage } from '../utils/botParser';

const FinanceContext = createContext();

// Sample Indonesian Demo Data
const INITIAL_TRANSACTIONS = [
  {
    id: 'demo_1',
    type: 'income',
    amount: 7500000,
    category: CATEGORIES.INCOME.name,
    description: 'Gaji Bulanan Agustus',
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000,
    source: 'telegram'
  },
  {
    id: 'demo_2',
    type: 'expense',
    amount: 350000,
    category: CATEGORIES.UTILITIES.name,
    description: 'Listrik PLN & Indihome',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000,
    source: 'web'
  },
  {
    id: 'demo_3',
    type: 'expense',
    amount: 65000,
    category: CATEGORIES.FOOD.name,
    description: 'Nasi Padang & Es Jeruk',
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000,
    source: 'telegram'
  },
  {
    id: 'demo_4',
    type: 'expense',
    amount: 150000,
    category: CATEGORIES.TRANSPORT.name,
    description: 'Isi Pertamax Mobil',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
    source: 'telegram'
  },
  {
    id: 'demo_5',
    type: 'expense',
    amount: 280000,
    category: CATEGORIES.SHOPPING.name,
    description: 'Belanja Bulanan Supermarket',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
    source: 'web'
  },
  {
    id: 'demo_6',
    type: 'expense',
    amount: 75000,
    category: CATEGORIES.ENTERTAINMENT.name,
    description: 'Nonton XXI Tiket Film',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000,
    source: 'telegram'
  },
  {
    id: 'demo_7',
    type: 'expense',
    amount: 28000,
    category: CATEGORIES.FOOD.name,
    description: 'Kopi Kenangan Mantan',
    date: new Date().toISOString().split('T')[0],
    timestamp: Date.now(),
    source: 'telegram'
  }
];

const DEFAULT_BUDGETS = {
  [CATEGORIES.FOOD.id]: 1500000,
  [CATEGORIES.TRANSPORT.id]: 600000,
  [CATEGORIES.SHOPPING.id]: 1000000,
  [CATEGORIES.UTILITIES.id]: 800000,
  [CATEGORIES.ENTERTAINMENT.id]: 500000,
  [CATEGORIES.OTHER.id]: 300000
};

const DEFAULT_BOT_CONFIG = {
  botToken: '',
  chatId: '',
  botUsername: 'DompetKuBot',
  isConnected: false,
  webhookUrl: 'https://dompetku-bot.railway.app/webhook'
};

const INITIAL_BOT_MESSAGES = [
  {
    id: 'msg_1',
    sender: 'bot',
    text: `🤖 *Halo! Saya Bot DompetKu Finance Tracker*

Selamat datang! Anda bisa langsung mencatat pengeluaran & pemasukan melalui chat ini.

Contoh ketik:
👉 \`/catat 45000 Makan Nasi Goreng\`
👉 \`/pemasukan 5000000 Gaji\`
👉 \`/saldo\` untuk melihat saldo saat ini.

Atau klik tombol **Buka DompetKu WebApp** di bawah untuk melihat grafik & analitik keuangan lengkap!`,
    timestamp: Date.now() - 3600000
  }
];

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('dompetku_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem('dompetku_budgets');
    return saved ? JSON.parse(saved) : DEFAULT_BUDGETS;
  });

  const [botConfig, setBotConfig] = useState(() => {
    const saved = localStorage.getItem('dompetku_botconfig');
    return saved ? JSON.parse(saved) : DEFAULT_BOT_CONFIG;
  });

  const [chatMessages, setChatMessages] = useState(() => {
    const saved = localStorage.getItem('dompetku_chatmessages');
    return saved ? JSON.parse(saved) : INITIAL_BOT_MESSAGES;
  });

  // Active View Tab: 'dashboard' | 'transactions' | 'chat' | 'budget' | 'settings'
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    localStorage.setItem('dompetku_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('dompetku_budgets', JSON.stringify(budgets));
  }, [budgets]);

  useEffect(() => {
    localStorage.setItem('dompetku_botconfig', JSON.stringify(botConfig));
  }, [botConfig]);

  useEffect(() => {
    localStorage.setItem('dompetku_chatmessages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  const addTransaction = (tx) => {
    const newTx = {
      id: tx.id || 'tx_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      type: tx.type || 'expense',
      amount: Number(tx.amount),
      category: tx.category || 'Lain-lain',
      description: tx.description || '',
      date: tx.date || new Date().toISOString().split('T')[0],
      timestamp: tx.timestamp || Date.now(),
      source: tx.source || 'web'
    };

    setTransactions(prev => [newTx, ...prev]);
    return newTx;
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const updateBudget = (categoryId, amount) => {
    setBudgets(prev => ({
      ...prev,
      [categoryId]: Number(amount)
    }));
  };

  const updateBotConfig = (newConfig) => {
    setBotConfig(prev => ({
      ...prev,
      ...newConfig
    }));
  };

  /**
   * Process message sent inside the Telegram Simulator
   */
  const sendBotSimMessage = (userText) => {
    if (!userText || !userText.trim()) return;

    const userMsgObj = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text: userText,
      timestamp: Date.now()
    };

    setChatMessages(prev => [...prev, userMsgObj]);

    // Parse command with current state
    const result = parseBotMessage(userText, { transactions, budgets });

    if (result) {
      if (result.type === 'ADD_TRANSACTION' && result.transaction) {
        addTransaction(result.transaction);
      }

      const botReplyObj = {
        id: 'bot_' + Date.now(),
        sender: 'bot',
        text: result.replyMessage,
        timestamp: Date.now() + 300
      };

      setTimeout(() => {
        setChatMessages(prev => [...prev, botReplyObj]);
      }, 300);
    }
  };

  const resetDemoData = () => {
    setTransactions(INITIAL_TRANSACTIONS);
    setBudgets(DEFAULT_BUDGETS);
    setChatMessages(INITIAL_BOT_MESSAGES);
    localStorage.removeItem('dompetku_transactions');
    localStorage.removeItem('dompetku_budgets');
    localStorage.removeItem('dompetku_chatmessages');
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        budgets,
        botConfig,
        chatMessages,
        activeTab,
        setActiveTab,
        addTransaction,
        deleteTransaction,
        updateBudget,
        updateBotConfig,
        sendBotSimMessage,
        resetDemoData
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
