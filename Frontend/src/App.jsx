import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomeScreen from './components/HomeScreen';
import MaterialsPurchasedEntry from './components/MaterialsPurchasedEntry';
import VendorPurchaseReport from './components/VendorPurchaseReport';
import BackendStatusModal from './components/BackendStatusModal';
import LoginPage from './components/LoginPage';
import { checkMicroservicesHealth } from './services/api';

const AUTH_STORAGE_KEY = 'ims_auth_user';

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [activeTab, setActiveTab] = useState('home');
  const [selectedVendorForReport, setSelectedVendorForReport] = useState('Only Vimal');
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isLiveBackend, setIsLiveBackend] = useState(false);

  const verifyBackend = async () => {
    try {
      const status = await checkMicroservicesHealth();
      const live = Boolean(status.inventory.online || status.material.online || status.vendor.online);
      setIsLiveBackend(live);
    } catch {
      setIsLiveBackend(false);
    }
  };

  useEffect(() => {
    verifyBackend();
    const interval = setInterval(verifyBackend, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (authenticatedUser) => {
    setUser(authenticatedUser);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authenticatedUser));
    } catch {
      // Storage unavailable or disabled
    }
    setActiveTab('home');
  };

  const handleLogout = () => {
    setUser(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // Storage unavailable or disabled
    }
    setActiveTab('home');
  };

  const handleNavigateToReport = (vendorName) => {
    if (vendorName) {
      setSelectedVendorForReport(vendorName);
    }
    setActiveTab('report');
  };

  // If user is not authenticated, display Login page
  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isLiveBackend={isLiveBackend}
        onOpenStatusModal={() => setIsStatusModalOpen(true)}
        user={user}
        onLogout={handleLogout}
      />

      <main className="main-content">
        {activeTab === 'home' && (
          <HomeScreen
            onNavigate={setActiveTab}
            user={user}
            isLiveBackend={isLiveBackend}
            onOpenStatusModal={() => setIsStatusModalOpen(true)}
          />
        )}

        {activeTab === 'entry' && (
          <MaterialsPurchasedEntry onNavigateToReport={handleNavigateToReport} />
        )}

        {activeTab === 'report' && (
          <VendorPurchaseReport initialVendorName={selectedVendorForReport} />
        )}
      </main>

      <BackendStatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        onRefreshStatus={verifyBackend}
      />
    </div>
  );
}
