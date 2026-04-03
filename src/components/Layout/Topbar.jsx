import React, { memo } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import ThemeToggle from './ThemeToggle';

const Topbar = memo(() => {
  const { role, setRole } = useDashboard();

  return (
    <div className="fd-topbar">
      <div className="fd-logo">fin<span>.</span>sight</div>
      <div className="fd-topbar-right">
      
        <span className="fd-role-label">Role:</span>
        <select 
          className="fd-role-select" 
          value={role} 
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
        <span className={`fd-role-badge ${role === 'admin' ? 'admin' : ''}`}>
          {role === 'admin' ? 'Admin' : 'Viewer'}
        </span>
          <ThemeToggle />
      </div>
    </div>
  );
});

Topbar.displayName = 'Topbar';

export default Topbar;
