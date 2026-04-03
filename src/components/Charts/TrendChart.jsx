import React, { useMemo, memo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { useDashboard } from '../../context/DashboardContext';
import { useTheme } from '../../context/ThemeContext';
import { formatCurrency, getMonthlyLabels } from '../../utils/formatters';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const TrendChart = memo(() => {
  const { monthlyData } = useDashboard();
  const { isDark } = useTheme();

  const data = useMemo(() => ({
    labels: getMonthlyLabels(),
    datasets: [
      {
        label: 'Balance',
        data: monthlyData.balance,
        borderColor: '#1D9E75',
        backgroundColor: 'rgba(29,158,117,0.08)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#1D9E75',
        pointRadius: 4,
        borderWidth: 2,
      },
    ],
  }), [monthlyData.balance]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => ' ' + formatCurrency(context.raw),
        },
      },
    },
    scales: {
      x: {
        grid: { color: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)' },
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

  return <Line data={data} options={options} />;
});

TrendChart.displayName = 'TrendChart';

export default TrendChart;
