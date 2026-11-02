import React from 'react';
import {
  PackagePlus,
  BarChart3,
  ArrowUpRight,
  Receipt,
  FileSpreadsheet,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function HomeScreen({ onNavigate }) {
  return (
    <div className="home-container">
      {/* Workspace Portals Header */}
      <section className="home-nav-section">
        <div className="section-header-wrap">
          <div>
            <h1 className="section-heading">Workspace Portals</h1>
            <p className="section-subheading">Choose an operational workspace to manage inventory or inspect reports</p>
          </div>
        </div>

        <div className="home-cards-grid">
          {/* Portal 1: Material Purchase Entry */}
          <a
            href="#material-purchase-entry"
            id="link-material-purchase-entry"
            className="home-nav-card card-entry"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('entry');
            }}
          >
            <div className="portal-card-top">
              <div className="portal-icon-wrap icon-entry">
                <PackagePlus size={26} />
              </div>
              <div className="portal-launch-btn" aria-hidden="true">
                <ArrowUpRight size={18} />
              </div>
            </div>

            <div className="portal-card-content">
              <span className="portal-category-tag pill-entry">Procurement & Inventory</span>
              <h2 className="portal-title">Material Purchase Entry</h2>
              <p className="portal-description">
                Register incoming purchase orders, map material categories and units, record quantities, and calculate pricing into the live ledger.
              </p>
            </div>

            <div className="portal-tags-list">
              <span className="portal-tag">
                <Receipt size={13} /> Invoices
              </span>
              <span className="portal-tag">
                <Layers size={13} /> Categories & Units
              </span>
              <span className="portal-tag">Price Calc</span>
            </div>

            <div className="portal-card-action">
              <span className="portal-action-label">Launch Entry Portal</span>
              <span className="portal-action-arrow">
                <ArrowRight size={16} />
              </span>
            </div>
          </a>

          {/* Portal 2: Vendor Purchase Report */}
          <a
            href="#vendor-purchase-report"
            id="link-vendor-purchase-report"
            className="home-nav-card card-report"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('report');
            }}
          >
            <div className="portal-card-top">
              <div className="portal-icon-wrap icon-report">
                <BarChart3 size={26} />
              </div>
              <div className="portal-launch-btn" aria-hidden="true">
                <ArrowUpRight size={18} />
              </div>
            </div>

            <div className="portal-card-content">
              <span className="portal-category-tag pill-report">Analytics & Auditing</span>
              <h2 className="portal-title">Vendor Purchase Report</h2>
              <p className="portal-description">
                Query vendor transaction history, inspect itemized material costs, audit outstanding balances, and export detailed CSV reports.
              </p>
            </div>

            <div className="portal-tags-list">
              <span className="portal-tag">
                <FileSpreadsheet size={13} /> Vendor History
              </span>
              <span className="portal-tag">Cost Breakdown</span>
              <span className="portal-tag">CSV / Print Export</span>
            </div>

            <div className="portal-card-action">
              <span className="portal-action-label">View Purchase Reports</span>
              <span className="portal-action-arrow">
                <ArrowRight size={16} />
              </span>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}
