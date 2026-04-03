import React, { useState, useMemo } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import TransactionTable from './TransactionTable';
import AddTransactionModal from './AddTransactionModal';

const Transactions = () => {
  const { transactions, role } = useDashboard();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOption, setSortOption] = useState('date-desc');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = useMemo(() => {
    return [...new Set(transactions.map((t) => t.category))].sort();
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    let list = transactions.filter((t) => {
      return (
        (t.desc.toLowerCase().includes(search.toLowerCase()) ||
          t.category.toLowerCase().includes(search.toLowerCase())) &&
        (typeFilter === 'all' || t.type === typeFilter) &&
        (categoryFilter === 'all' || t.category === categoryFilter)
      );
    });

    if (sortOption === 'date-desc') {
      list.sort((a, b) => b.date.localeCompare(a.date));
    } else if (sortOption === 'date-asc') {
      list.sort((a, b) => a.date.localeCompare(b.date));
    } else if (sortOption === 'amount-desc') {
      list.sort((a, b) => b.amount - a.amount);
    } else if (sortOption === 'amount-asc') {
      list.sort((a, b) => a.amount - b.amount);
    }

    return list;
  }, [transactions, search, typeFilter, categoryFilter, sortOption]);

  const exportCSV = () => {
    const rows = [
      ['Date', 'Description', 'Category', 'Type', 'Amount'],
      ...filteredTransactions.map((t) => [t.date, t.desc, t.category, t.type, t.amount]),
    ];
    const csvContent = rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'transactions.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fd-section active">
      <div className="fd-tx-controls">
        <input
          className="fd-search"
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="fd-select"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          className="fd-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          className="fd-select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">Highest Amount</option>
          <option value="amount-asc">Lowest Amount</option>
        </select>
        {role === 'admin' && (
          <button className="fd-btn primary" onClick={() => setIsModalOpen(true)}>
            + Add Transaction
          </button>
        )}
        <button className="fd-btn" onClick={exportCSV}>
          Export CSV
        </button>
      </div>
      <TransactionTable filteredTransactions={filteredTransactions} />
      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Transactions;
