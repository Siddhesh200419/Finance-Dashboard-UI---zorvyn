import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';

const AddTransactionModal = ({ isOpen, onClose }) => {
  const { addTransaction } = useDashboard();
  const [formData, setFormData] = useState({
    desc: '',
    amount: '',
    type: 'expense',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    const { desc, amount, date } = formData;
    if (!desc || !amount || !date) return;
    addTransaction({
      ...formData,
      amount: parseFloat(amount),
    });
    setFormData({
      desc: '',
      amount: '',
      type: 'expense',
      category: 'Food',
      date: new Date().toISOString().split('T')[0],
    });
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('fd-modal-bg')) {
      onClose();
    }
  };

  return (
    <div className="fd-modal-bg open" onClick={handleBackdropClick}>
      <div className="fd-modal">
        <div className="fd-modal-title">Add Transaction</div>
        <div className="fd-form-group">
          <label className="fd-form-label">Description</label>
          <input
            className="fd-form-input"
            type="text"
            placeholder="e.g. Grocery run"
            value={formData.desc}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
          />
        </div>
        <div className="fd-form-group">
          <label className="fd-form-label">Amount (₹)</label>
          <input
            className="fd-form-input"
            type="number"
            placeholder="0"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />
        </div>
        <div className="fd-form-group">
          <label className="fd-form-label">Type</label>
          <select
            className="fd-form-input"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div className="fd-form-group">
          <label className="fd-form-label">Category</label>
          <select
            className="fd-form-input"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option>Food</option>
            <option>Transport</option>
            <option>Housing</option>
            <option>Entertainment</option>
            <option>Health</option>
            <option>Utilities</option>
            <option>Shopping</option>
            <option>Income</option>
          </select>
        </div>
        <div className="fd-form-group">
          <label className="fd-form-label">Date</label>
          <input
            className="fd-form-input"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>
        <div className="fd-modal-actions">
          <button className="fd-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="fd-btn primary" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;
