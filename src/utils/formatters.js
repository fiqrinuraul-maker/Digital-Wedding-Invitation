// Utility functions for formatting Indonesian currency, dates, and numbers

/**
 * Format number as Indonesian Rupiah (e.g. 50000 -> Rp 50.000)
 */
export const formatIDR = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Format short Rupiah string (e.g. 50000 -> 50rb, 1500000 -> 1.5jt)
 */
export const formatShortIDR = (amount) => {
  if (!amount || isNaN(amount)) return '0';
  const abs = Math.abs(amount);
  if (abs >= 1_000_000_000) {
    return (amount / 1_000_000_000).toFixed(1).replace('.0', '') + ' M';
  }
  if (abs >= 1_000_000) {
    return (amount / 1_000_000).toFixed(1).replace('.0', '') + ' jt';
  }
  if (abs >= 1_000) {
    return (amount / 1_000).toFixed(0) + ' rb';
  }
  return amount.toString();
};

/**
 * Format date string or timestamp to Indonesian readable date
 */
export const formatDateIndo = (dateInput) => {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
};

/**
 * Format date with time (e.g. 8 Agt 2026, 21.45)
 */
export const formatDateTimeIndo = (dateInput) => {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

/**
 * Get YYYY-MM-DD string for input fields
 */
export const getTodayIso = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

/**
 * Get current month name in Indonesian
 */
export const getCurrentMonthNameIndo = () => {
  return new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(new Date());
};
