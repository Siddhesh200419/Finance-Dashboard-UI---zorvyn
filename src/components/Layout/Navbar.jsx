import React, { memo } from 'react';
import { useDashboard } from '../../context/DashboardContext';

const Navbar = memo(() => {
  const { activeSection, setActiveSection } = useDashboard();

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'insights', label: 'Insights' },
  ];

  return (
    <div className="fd-nav">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`fd-nav-btn ${activeSection === item.id ? 'active' : ''}`}
          onClick={() => setActiveSection(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
