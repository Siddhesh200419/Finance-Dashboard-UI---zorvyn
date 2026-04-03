import React, { memo } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { formatCurrency } from '../../utils/formatters';

const SummaryCards = memo(() => {
  const { summary, transactions } = useDashboard();
  const { income, expense, balance } = summary;
  const savings = income > 0 ? (((income - expense) / income) * 100).toFixed(1) : 0;

  const incomeCount = transactions.filter((t) => t.type === 'income').length;
  const expenseCount = transactions.filter((t) => t.type === 'expense').length;

  return (
    <div className="fd-cards">
      <div className="fd-card fd-card-accent">
        <div className="fd-card-label">Total Balance</div>
        <div className="fd-card-value">{formatCurrency(balance)}</div>
        <div className="fd-card-sub up">All time net</div>
      </div>
      <div className="fd-card fd-card-accent">
        <div className="fd-card-label">Total Income</div>
        <div className="fd-card-value">{formatCurrency(income)}</div>
        <div className="fd-card-sub">{incomeCount} transactions</div>
      </div>
      <div className="fd-card fd-card-accent-red">
        <div className="fd-card-label">Total Expenses</div>
        <div className="fd-card-value">{formatCurrency(expense)}</div>
        <div className="fd-card-sub">{expenseCount} transactions</div>
      </div>
      <div className="fd-card fd-card-accent-blue">
        <div className="fd-card-label">Savings Rate</div>
        <div className="fd-card-value">{savings}%</div>
        <div className={`fd-card-sub ${parseFloat(savings) >= 20 ? 'up' : 'down'}`}>
          {parseFloat(savings) >= 20 ? 'Healthy' : 'Below target'}
        </div>
      </div>
    </div>
  );
});

SummaryCards.displayName = 'SummaryCards';

export default SummaryCards;
