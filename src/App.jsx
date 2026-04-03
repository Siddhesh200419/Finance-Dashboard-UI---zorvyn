import React, { Suspense, lazy } from 'react';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import { ThemeProvider } from './context/ThemeContext';
import Topbar from './components/Layout/Topbar';
import Navbar from './components/Layout/Navbar';
import './index.css';

// Lazy loading dashboard sections
const Overview = lazy(() => import('./components/Dashboard/Overview'));
const Transactions = lazy(() => import('./components/Dashboard/Transactions'));
const Insights = lazy(() => import('./components/Dashboard/Insights'));

const LoadingFallback = () => (
  <div className="fd-empty">Loading section...</div>
);

const DashboardContent = () => {
  const { activeSection } = useDashboard();

  return (
    <div className="fd-content">
      <Suspense fallback={<LoadingFallback />}>
        {activeSection === 'overview' && <Overview />}
        {activeSection === 'transactions' && <Transactions />}
        {activeSection === 'insights' && <Insights />}
      </Suspense>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <DashboardProvider>
        <div className="app-container">
          <Topbar />
          <Navbar />
          <DashboardContent />
        </div>
      </DashboardProvider>
    </ThemeProvider>
  );
}

export default App;
