import React from 'react';
import SummaryCards from './SummaryCards';
import TrendChart from '../Charts/TrendChart';
import DonutChart from '../Charts/DonutChart';

const Overview = () => {
  return (
    <div className="fd-section active">
      <SummaryCards />
      <div className="fd-charts-row">
        <div className="fd-chart-box">
          <div className="fd-chart-title">Balance Trend — Last 6 Months</div>
          <div style={{ position: 'relative', height: '220px' }}>
            <TrendChart />
          </div>
        </div>
        <div className="fd-chart-box">
          <div className="fd-chart-title">Spending by Category</div>
          <DonutChart />
        </div>
      </div>
    </div>
  );
};

export default Overview;
