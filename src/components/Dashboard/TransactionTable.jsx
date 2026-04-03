import React, { memo } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { formatCurrency, formatDate } from '../../utils/formatters';

const TransactionTable = memo(({ filteredTransactions }) => {
  const { role, deleteTransaction } = useDashboard();
  const isAdmin = role === 'admin';

  if (filteredTransactions.length === 0) {
    return <div className="fd-empty">No transactions match your filters.</div>;
  }

  return (
    <div className="fd-tx-table">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Type</th>
            <th style={{ textAlign: 'right' }}>Amount</th>
            {isAdmin && <th style={{ textAlign: 'center' }}>Action</th>}
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((t) => (
            <tr key={t.id}>
              <td style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
                {formatDate(t.date)}
              </td>
              <td>{t.desc}</td>
              <td>
                <span className={`fd-cat-badge fd-cat-${t.category.toLowerCase()}`}>
                  {t.category}
                </span>
              </td>
              <td>
                <span
                  className={`fd-cat-badge ${
                    t.type === 'income' ? 'fd-type-income' : 'fd-type-expense'
                  }`}
                >
                  {t.type}
                </span>
              </td>
              <td
                className={t.type === 'income' ? 'fd-amount-pos' : 'fd-amount-neg'}
                style={{ textAlign: 'right' }}
              >
                {t.type === 'income' ? '+' : '-'}
                {formatCurrency(t.amount)}
              </td>
              {isAdmin && (
                <td style={{ textAlign: 'center' }}>
                  <button
                    className="fd-btn"
                    style={{ padding: '4px 10px', fontSize: '11px' }}
                    onClick={() => deleteTransaction(t.id)}
                  >
                    Remove
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

TransactionTable.displayName = 'TransactionTable';

export default TransactionTable;
