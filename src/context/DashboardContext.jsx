import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { INITIAL_TRANSACTIONS } from '../constants/data';
import { getMonthlyKeys } from '../utils/formatters';

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

export const DashboardProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [role, setRole] = useState('viewer');
  const [activeSection, setActiveSection] = useState('overview');

  const summary = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((s, t) => s + t.amount, 0);
    const expense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((s, t) => s + t.amount, 0);
    return { income, expense, balance: income - expense };
  }, [transactions]);

  const monthlyData = useMemo(() => {
    const keys = getMonthlyKeys();
    const income = keys.map((k) =>
      transactions
        .filter((t) => t.date.startsWith(k) && t.type === 'income')
        .reduce((s, t) => s + t.amount, 0)
    );
    const expense = keys.map((k) =>
      transactions
        .filter((t) => t.date.startsWith(k) && t.type === 'expense')
        .reduce((s, t) => s + t.amount, 0)
    );
    const balance = income.map((inc, i) => {
      let b = 0;
      for (let j = 0; j <= i; j++) b += income[j] - expense[j];
      return b;
    });
    return { income, expense, balance };
  }, [transactions]);

  const addTransaction = useCallback((newTx) => {
    setTransactions((prev) => [...prev, { ...newTx, id: Date.now() }]);
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = useMemo(() => ({
    transactions,
    role,
    setRole,
    activeSection,
    setActiveSection,
    summary,
    monthlyData,
    addTransaction,
    deleteTransaction,
  }), [
    transactions, 
    role, 
    activeSection, 
    summary, 
    monthlyData, 
    addTransaction, 
    deleteTransaction, 
  ]);

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};
