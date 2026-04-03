import React, { useMemo, memo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useDashboard } from '../../context/DashboardContext';
import { useTheme } from '../../context/ThemeContext';
import { formatCurrency, getMonthlyLabels } from '../../utils/formatters';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CompareChart = memo(() => {
  const { monthlyData } = useDashboard();
  const { isDark } = useTheme();

  const data = useMemo(() => ({
    labels: getMonthlyLabels(),
    datasets: [
      {
        label: 'Income',
        data: monthlyData.income,
        backgroundColor: 'rgba(29,158,117,0.75)',
        borderRadius: 4,
      },
      {
        label: 'Expenses',
        data: monthlyData.expense,
        backgroundColor: 'rgba(226,75,74,0.65)',
        borderRadius: 4,
      },
    ],
  }), [monthlyData.income, monthlyData.expense]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.dataset.label}: ${formatCurrency(context.raw)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: isDark ? '#aaa' : '#888', font: { size: 11 } },
      },
      y: {
        grid: { color: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)' },
        ticks: {
          color: isDark ? '#aaa' : '#888',
          font: { size: 11 },
          callback: (v) => '₹' + Math.round(v / 1000) + 'k',
        },
      },
    },
  }), [isDark]);

  return <Bar data={data} options={options} />;
});

CompareChart.displayName = 'CompareChart';

export default CompareChart;
