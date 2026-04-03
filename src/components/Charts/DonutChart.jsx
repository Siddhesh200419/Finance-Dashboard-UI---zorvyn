import React, { useMemo, memo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useDashboard } from '../../context/DashboardContext';
import { CAT_COLORS } from '../../constants/data';
import { formatCurrency } from '../../utils/formatters';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = memo(() => {
  const { transactions } = useDashboard();

  const { labels, dataValues, colors, total } = useMemo(() => {
    const cats = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        cats[t.category] = (cats[t.category] || 0) + t.amount;
      });

    const labels = Object.keys(cats);
    const dataValues = labels.map((l) => cats[l]);
    const colors = labels.map((l) => CAT_COLORS[l] || '#888');
    const total = dataValues.reduce((a, b) => a + b, 0);

    return { labels, dataValues, colors, total };
  }, [transactions]);

  const data = useMemo(() => ({
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: colors,
        borderWidth: 2,
        borderColor: 'transparent',
      },
    ],
  }), [labels, dataValues, colors]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) =>
            ` ${context.label}: ${formatCurrency(context.raw)} (${(
              (context.raw / total) *
              100
            ).toFixed(1)}%)`,
        },
      },
    },
  }), [total]);

  return (
    <>
      <div id="donutLegend" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
        {labels.map((l, i) => (
          <span key={l} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-secondary)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: colors[i], flexShrink: 0 }}></span>
            {l}
          </span>
        ))}
      </div>
      <div style={{ position: 'relative', height: '180px' }}>
        <Doughnut data={data} options={options} />
      </div>
    </>
  );
});

DonutChart.displayName = 'DonutChart';

export default DonutChart;
