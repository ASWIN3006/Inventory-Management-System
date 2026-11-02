import React from 'react';
import { Package, Home, PlusCircle, FileText, Server, LogOut, ShieldCheck } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  isLiveBackend,
  onOpenStatusModal,
  user,
  onLogout
}) {
  return (
    <header className="app-header">
      <div className="header-inner">
        {/* Brand Section - clickable to return Home */}
        <button
          type="button"
          className="brand-section brand-clickable"
          onClick={() => setActiveTab('home')}
          title="Return to Home Dashboard"
          aria-label="Return to Home Dashboard"
        >
          <div className="brand-logo">
            <Package size={22} />
          </div>
          <div className="brand-text">
            <h1 className="brand-title">Glory Textiles</h1>
            <p className="brand-subtitle">Inventory Management System</p>
          </div>
        </button>

        {/* Navigation Tabs */}
        <nav className="nav-tabs" aria-label="Main Navigation">
          <button
            className={`tab-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
            id="tab-home"
          >
            <Home size={16} />
            <span>Home</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'entry' ? 'active' : ''}`}
            onClick={() => setActiveTab('entry')}
            id="tab-entry"
          >
            <PlusCircle size={16} />
            <span>Materials Purchased Entry</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'report' ? 'active' : ''}`}
            onClick={() => setActiveTab('report')}
            id="tab-report"
          >
            <FileText size={16} />
            <span>Vendor Purchase Report</span>
          </button>
        </nav>

        {/* Header Actions: DB Status badge, Admin profile, and Logout button */}
        <div className="header-actions">
          {/* <button
            className={`status-badge ${isLiveBackend ? 'live' : 'db-status-badge-warning'}`}
            onClick={onOpenStatusModal}
            title="Click to view MySQL database connection status and setup guide"
            id="btn-service-status"
          >
            <span
              className={`pulse-dot ${isLiveBackend ? 'green' : 'red'}`}
              style={{ backgroundColor: isLiveBackend ? '#16a34a' : '#d97706' }}
            ></span>
            <span>{isLiveBackend ? 'MySQL DB Online' : '⚠️ DB Offline (MySQL Not Installed)'}</span>
            <Server size={14} style={{ opacity: 0.85 }} />
          </button> */}

          {/* User Badge */}
          {/* <div className="user-profile-badge" title={`Signed in as ${user?.username || 'admin'}`}>
            <span className="user-avatar">
              <ShieldCheck size={14} />
            </span>
            <span className="user-name">{user?.username || 'admin'}</span>
          </div> */}

          {/* Logout Button */}
          <button
            type="button"
            className="btn-logout"
            onClick={onLogout}
            id="btn-logout"
            title="Sign out of your account"
            aria-label="Log out"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
