import { MONTHS_SHORT } from '../constants/data';

export const formatCurrency = (amount) => {
  return '₹' + Math.abs(amount).toLocaleString('en-IN');
};

export const formatDate = (dateStr) => {
  const dt = new Date(dateStr);
  return dt.getDate() + ' ' + MONTHS_SHORT[dt.getMonth()] + ' ' + dt.getFullYear().toString().slice(2);
};

export const getMonthlyKeys = () => {
  return ['2025-10', '2025-11', '2025-12', '2026-01', '2026-02', '2026-03'];
};

export const getMonthlyLabels = () => {
  return ['Oct 25', 'Nov 25', 'Dec 25', 'Jan 26', 'Feb 26', 'Mar 26'];
};
