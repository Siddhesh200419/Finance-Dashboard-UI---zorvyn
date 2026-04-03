import React, { useMemo } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import CompareChart from '../Charts/CompareChart';
import { CAT_COLORS } from '../../constants/data';
import { formatCurrency } from '../../utils/formatters';

const Insights = () => {
  const { transactions, monthlyData } = useDashboard();

  const insightData = useMemo(() => {
    const cats = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        cats[t.category] = (cats[t.category] || 0) + t.amount;
      });

    const sorted = Object.entries(cats).sort((a, b) => b[1] - a[1]);
    const topCat = sorted[0] || ['N/A', 0];

    const lastExpense = monthlyData.expense[monthlyData.expense.length - 1];
    const prevExpense = monthlyData.expense[monthlyData.expense.length - 2];
    const expChange = prevExpense > 0 ? (((lastExpense - prevExpense) / prevExpense) * 100).toFixed(1) : 0;
    const expDir = lastExpense <= prevExpense ? 'down' : 'up';

    const incomeTotal = transactions
      .filter((t) => t.type === 'income')
      .reduce((s, t) => s + t.amount, 0);
    const expenseTotal = transactions
      .filter((t) => t.type === 'expense')
      .reduce((s, t) => s + t.amount, 0);
    const savingsRate = incomeTotal > 0 ? (((incomeTotal - expenseTotal) / incomeTotal) * 100).toFixed(1) : 0;

    const avgMonthlyExpense =
      monthlyData.expense.reduce((a, b) => a + b, 0) / monthlyData.expense.length;

    return {
      topCat,
      expChange,
      expDir,
      savingsRate,
      avgMonthlyExpense,
      lastExpense,
      expenseTotal,
    };
  }, [transactions, monthlyData]);

  const { topCat, expChange, expDir, savingsRate, avgMonthlyExpense, lastExpense, expenseTotal } =
    insightData;

  const topCatTransactions = transactions.filter(
    (t) => t.category === topCat[0] && t.type === 'expense'
  ).length;

  return (
    <div className="fd-section active">
      <div className="fd-insights-grid">
        <div className="fd-insight-card" style={{ borderLeft: `3px solid ${CAT_COLORS[topCat[0]] || '#888'}` }}>
          <div className="fd-insight-eyebrow">Top spending category</div>
          <div className="fd-insight-headline">{topCat[0]}</div>
          <div className="fd-insight-number">{formatCurrency(topCat[1])}</div>
          <div className="fd-insight-body">
            {((topCat[1] / expenseTotal) * 100).toFixed(1)}% of total expenses across {topCatTransactions} transactions.
          </div>
        </div>
        <div className="fd-insight-card" style={{ borderLeft: `3px solid ${expDir === 'down' ? '#1D9E75' : '#E24B4A'}` }}>
          <div className="fd-insight-eyebrow">Month-over-month expenses</div>
          <div className="fd-insight-headline">
            {expDir === 'down' ? 'Spending decreased' : 'Spending increased'}
          </div>
          <div className="fd-insight-number" style={{ color: expDir === 'down' ? '#1D9E75' : '#E24B4A' }}>
            {expDir === 'down' ? '▼' : '▲'} {Math.abs(expChange)}%
          </div>
          <div className="fd-insight-body">
            Compared to previous month.
          </div>
        </div>
        <div className="fd-insight-card" style={{ borderLeft: '3px solid #378ADD' }}>
          <div className="fd-insight-eyebrow">Savings rate</div>
          <div className="fd-insight-headline">
            {parseFloat(savingsRate) >= 20 ? 'On track' : 'Needs attention'}
          </div>
          <div className="fd-insight-number" style={{ color: '#378ADD' }}>
            {savingsRate}%
          </div>
          <div className="fd-insight-body">
            Financial advisors recommend at least 20% savings rate.{' '}
            {parseFloat(savingsRate) >= 20
              ? "You're doing great!"
              : 'Consider reducing discretionary spending.'}
          </div>
        </div>
        <div className="fd-insight-card" style={{ borderLeft: '3px solid #7F77DD' }}>
          <div className="fd-insight-eyebrow">Avg monthly spend</div>
          <div className="fd-insight-headline">Spending pattern</div>
          <div className="fd-insight-number" style={{ color: '#7F77DD' }}>
            {formatCurrency(avgMonthlyExpense)}
          </div>
          <div className="fd-insight-body">
            Your average monthly expenses over the last 6 months.{' '}
            {lastExpense > avgMonthlyExpense
              ? 'Last month was above average.'
              : 'Last month was below average.'}
          </div>
        </div>
      </div>
      <div className="fd-chart-box" style={{ marginBottom: '16px' }}>
        <div className="fd-chart-title">Monthly Income vs Expenses</div>
        <div style={{ position: 'relative', height: '240px' }}>
          <CompareChart />
        </div>
      </div>
    </div>
  );
};

export default Insights;
