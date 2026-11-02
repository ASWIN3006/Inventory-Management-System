import React, { useState, useEffect } from 'react';
import { checkMicroservicesHealth } from '../services/api';
import { X, RefreshCw, CheckCircle2, XCircle, Server, Database, Info } from 'lucide-react';

export default function BackendStatusModal({ isOpen, onClose, onRefreshStatus }) {
  const [healthStatus, setHealthStatus] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const runHealthCheck = async () => {
    setIsChecking(true);
    try {
      const res = await checkMicroservicesHealth();
      setHealthStatus(res);
      if (onRefreshStatus) onRefreshStatus(res);
    } catch (err) {
      console.error('Health check error:', err);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      runHealthCheck();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Server size={20} color="#38bdf8" />
            <h3 className="modal-title">Microservices & MySQL Database Status</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Close modal"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Microservices Status List */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569' }}>
                Backend Services
              </span>
              <button
                type="button"
                className="quick-preset-btn"
                onClick={runHealthCheck}
                disabled={isChecking}
              >
                <RefreshCw size={12} className={isChecking ? 'spinner' : ''} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                Ping Services
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* Inventory Service */}
              <div className="service-status-row">
                <div>
                  <div className="service-info-title">Inventory Management System</div>
                  <div className="service-url-sub">http://localhost:8089</div>
                </div>
                <div>
                  {healthStatus?.inventory?.online ? (
                    <span style={{ color: '#16a34a', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600, fontSize: '0.82rem' }}>
                      <CheckCircle2 size={16} /> Online
                    </span>
                  ) : (
                    <span style={{ color: '#dc2626', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600, fontSize: '0.82rem' }}>
                      <XCircle size={16} /> Offline
                    </span>
                  )}
                </div>
              </div>

              {/* Material Service */}
              <div className="service-status-row">
                <div>
                  <div className="service-info-title">Material Microservice</div>
                  <div className="service-url-sub">http://localhost:8088</div>
                </div>
                <div>
                  {healthStatus?.material?.online ? (
                    <span style={{ color: '#16a34a', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600, fontSize: '0.82rem' }}>
                      <CheckCircle2 size={16} /> Online
                    </span>
                  ) : (
                    <span style={{ color: '#dc2626', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600, fontSize: '0.82rem' }}>
                      <XCircle size={16} /> Offline
                    </span>
                  )}
                </div>
              </div>

              {/* Vendor Service */}
              <div className="service-status-row">
                <div>
                  <div className="service-info-title">Vendor Microservice</div>
                  <div className="service-url-sub">http://localhost:8087</div>
                </div>
                <div>
                  {healthStatus?.vendor?.online ? (
                    <span style={{ color: '#16a34a', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600, fontSize: '0.82rem' }}>
                      <CheckCircle2 size={16} /> Online
                    </span>
                  ) : (
                    <span style={{ color: '#dc2626', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600, fontSize: '0.82rem' }}>
                      <XCircle size={16} /> Offline
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Database Info Notice */}
          <div style={{ padding: 14, background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: 8, fontSize: '0.84rem', color: '#92400e' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, marginBottom: 6, color: '#b45309' }}>
              <Database size={16} color="#d97706" />
              <span>Strict Live Database Mode Active</span>
            </div>
            <p style={{ lineHeight: 1.5, marginBottom: 8, fontSize: '0.82rem' }}>
              <strong>Zero Preview Data:</strong> All fallback/seed mock data has been completely disabled. The application now communicates exclusively with live MySQL database instances via the Spring Boot REST endpoints.
            </p>
            <p style={{ lineHeight: 1.5, marginBottom: 8, fontSize: '0.82rem' }}>
              <strong>Status:</strong> If MySQL is not installed or running on <code>localhost:3306</code>, 0 records are shown and warnings are displayed on all screens.
            </p>
            <p style={{ lineHeight: 1.5, marginBottom: 8, fontSize: '0.82rem' }}>
              <strong>To enable live saving and reading:</strong> Start MySQL Server 8.0+ on port 3306 with credentials <code>root</code> / <code>root</code> and the 3 databases:
            </p>
            <div style={{ background: '#ffffff', padding: '8px 12px', borderRadius: 6, border: '1px solid #fcd34d', fontFamily: 'monospace', fontSize: '0.78rem', color: '#1e293b' }}>
              <div>CREATE DATABASE dbpurchase;</div>
              <div>CREATE DATABASE materialdb;</div>
              <div>CREATE DATABASE vendordb;</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
