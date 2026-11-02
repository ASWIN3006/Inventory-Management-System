import React, { useState, useEffect } from 'react';
import { fetchVendors, fetchVendorPurchaseReport } from '../services/api';
import { Search, Download, Printer, ShoppingBag, AlertTriangle, RefreshCw } from 'lucide-react';

export default function VendorPurchaseReport({ initialVendorName }) {
  const [vendors, setVendors] = useState([]);
  const [selectedVendorName, setSelectedVendorName] = useState(initialVendorName || '');
  const [fromDate, setFromDate] = useState('2018-01-01');
  const [toDate, setToDate] = useState('2026-12-31');

  const [selectedVendorDetails, setSelectedVendorDetails] = useState(null);
  const [reportData, setReportData] = useState([]);
  const [isDbConnected, setIsDbConnected] = useState(true);
  const [dbError, setDbError] = useState(null);
  const [isLoadingVendors, setIsLoadingVendors] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const executeSearch = async (vendor = selectedVendorName, start = fromDate, end = toDate) => {
    if (!vendor) return;
    setIsSearching(true);
    try {
      const res = await fetchVendorPurchaseReport({
        vendorName: vendor,
        fromDate: start,
        toDate: end
      });
      setIsDbConnected(Boolean(res.isLive));
      setDbError(res.error || null);
      setReportData(res.data || []);
    } catch (err) {
      console.error('Error searching report:', err);
      setIsDbConnected(false);
      setDbError('Failed to connect to MySQL database on localhost:3306.');
      setReportData([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Load vendors list from backend
  const loadVendors = async () => {
    setIsLoadingVendors(true);
    try {
      const res = await fetchVendors();
      const list = res.data || [];
      setVendors(list);

      if (!res.isLive || list.length === 0) {
        setIsDbConnected(false);
        setDbError(res.error || 'Unable to fetch vendors from MySQL database.');
        setReportData([]);
        setSelectedVendorName('');
        setSelectedVendorDetails(null);
      } else {
        setIsDbConnected(true);
        setDbError(null);
        const match = initialVendorName
          ? list.find((v) => v.vendorName === initialVendorName)
          : list[0];
        const chosen = match || list[0];
        setSelectedVendorName(chosen.vendorName);
        setSelectedVendorDetails(chosen);
        executeSearch(chosen.vendorName, fromDate, toDate);
      }
    } catch (err) {
      console.error('Error fetching vendors:', err);
      setIsDbConnected(false);
      setDbError('Cannot reach MySQL database or Vendor Microservice on localhost:8087.');
      setVendors([]);
      setReportData([]);
    } finally {
      setIsLoadingVendors(false);
    }
  };

  useEffect(() => {
    loadVendors();
  }, [initialVendorName]);

  const handleVendorChange = (newVendorName) => {
    setSelectedVendorName(newVendorName);
    const match = vendors.find((v) => v.vendorName === newVendorName);
    setSelectedVendorDetails(match || null);
    if (newVendorName) {
      executeSearch(newVendorName, fromDate, toDate);
    } else {
      setReportData([]);
    }
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    executeSearch(selectedVendorName, fromDate, toDate);
  };

  const formatReportDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const yyyy = d.getFullYear();
      return `${dd}-${mm}-${yyyy}`;
    } catch {
      return dateStr;
    }
  };

  const formatCurrency = (val) => {
    const num = parseFloat(val);
    if (isNaN(num)) return '0.00';
    return num.toFixed(2);
  };

  const totalSpend = reportData.reduce((acc, curr) => acc + (parseFloat(curr.purchaseAmount) || 0), 0);
  const totalBalance = reportData.reduce((acc, curr) => acc + (parseFloat(curr.balance) || 0), 0);
  const totalQuantity = reportData.reduce((acc, curr) => acc + (parseInt(curr.quantity, 10) || 0), 0);

  const handleExportCSV = () => {
    if (reportData.length === 0) return;
    const headers = ['Material Category', 'Material Type', 'Brand', 'Quantity', 'Unit', 'Price', 'Balance', 'Purchase Date', 'Transaction ID'];
    const rows = reportData.map((r) => [
      `"${r.materialCategoryName || ''}"`,
      `"${r.materialTypeName || ''}"`,
      `"${r.brandName || ''}"`,
      r.quantity,
      `"${r.materialUnitName || ''}"`,
      formatCurrency(r.purchaseAmount),
      formatCurrency(r.balance),
      formatReportDate(r.purchaseDate),
      `"${r.transactionId || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Vendor_Report_${(selectedVendorName || 'All').replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="screen-wrapper">
      <div className="proto-page-header">
        <h2 className="proto-title-main">Vendor Purchase Report</h2>
      </div>

      <div className="prototype-card">
        <div className="proto-banner">Vendor purchase report</div>

        {/* Database Warning Banner */}
        {(!isDbConnected || dbError) && (
          <div className="db-warning-banner error" id="db-warning-banner">
            <div className="db-warning-banner-top">
              <div className="db-warning-title-wrap">
                <AlertTriangle size={18} color="#dc2626" />
                <span>Warning: Unable to fetch data from MySQL Database</span>
              </div>
              <span className="db-warning-badge" style={{ background: '#fee2e2', color: '#b91c1c', borderColor: '#fca5a5' }}>
                Database Offline
              </span>
            </div>
            <p className="db-warning-desc" style={{ color: '#7f1d1d' }}>
              {dbError || 'MySQL is not installed or running on localhost:3306. Cannot retrieve records from database (dbpurchase / vendordb). Strict Live Database mode is active.'}
            </p>
            {/* <div style={{ marginTop: 6 }}>
              <button
                type="button"
                className="quick-preset-btn"
                onClick={loadVendors}
                disabled={isLoadingVendors}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <RefreshCw size={12} className={isLoadingVendors ? 'spinner' : ''} />
                <span>Retry Database Connection</span>
              </button>
            </div> */}
          </div>
        )}

        {/* Filter Bar */}
        <form className="report-filter-bar" onSubmit={handleSearchSubmit}>
          <div className="filter-item">
            <label className="filter-label" htmlFor="reportVendorSelect">
              Vendor Name
            </label>
            <select
              id="reportVendorSelect"
              className="proto-select"
              value={selectedVendorName}
              onChange={(e) => handleVendorChange(e.target.value)}
              disabled={isLoadingVendors || vendors.length === 0}
            >
              {vendors.length === 0 ? (
                <option value="">-- No vendors found (Database Offline) --</option>
              ) : (
                <>
                  <option value="">-- Select Vendor --</option>
                  {vendors.map((v) => (
                    <option key={v.vendorId} value={v.vendorName}>
                      {v.vendorName}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>

          <div className="filter-item">
            <label className="filter-label" htmlFor="fromDate">
              From date
            </label>
            <input
              type="date"
              id="fromDate"
              className="proto-input"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
            />
          </div>

          <div className="filter-item">
            <label className="filter-label" htmlFor="toDate">
              To date
            </label>
            <input
              type="date"
              id="toDate"
              className="proto-input"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="search-btn"
            disabled={isSearching || !selectedVendorName}
            id="btn-search-report"
          >
            {isSearching ? <span className="spinner"></span> : <Search size={16} />}
            <span>Search</span>
          </button>
        </form>

        {/* Vendor Details Banner from Vendor Microservice */}
        {selectedVendorDetails && (
          <div className="vendor-info-banner" id="vendor-info-banner">
            <div className="vendor-meta-block">
              <span className="vendor-meta-label">Address:</span>
              <span className="vendor-meta-value">{selectedVendorDetails.vendorAddress || 'N/A'}</span>
            </div>
            <div className="vendor-meta-block">
              <span className="vendor-meta-label">Contact Number:</span>
              <span className="vendor-meta-value">{selectedVendorDetails.contactNumber || 'N/A'}</span>
            </div>
            <div className="vendor-meta-block">
              <span className="vendor-meta-label">Contact person:</span>
              <span className="vendor-meta-value">{selectedVendorDetails.contactPerson || 'N/A'}</span>
            </div>
          </div>
        )}

        {/* Table Content Area */}
        <div style={{ padding: '20px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
              Found <strong>{reportData.length}</strong> purchase record{reportData.length === 1 ? '' : 's'} in MySQL database
              {selectedVendorName && (
                <> for <strong style={{ color: '#1e293b' }}>{selectedVendorName}</strong></>
              )}
            </div>
            {/* <div style={{ display: 'flex', gap: 10 }}>
              <button
                type="button"
                className="quick-preset-btn"
                onClick={handleExportCSV}
                disabled={reportData.length === 0}
                id="btn-export-csv"
              >
                <Download size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                Export CSV
              </button>
              <button
                type="button"
                className="quick-preset-btn"
                onClick={() => window.print()}
                id="btn-print"
                disabled={reportData.length === 0}
              >
                <Printer size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                Print
              </button>
            </div> */}
          </div>

          <div className="table-responsive">
            <table className="proto-table" id="report-results-table">
              <thead>
                <tr>
                  <th>Material Category</th>
                  <th>Material Type</th>
                  <th>Brand</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th style={{ textAlign: 'right' }}>Price</th>
                  <th style={{ textAlign: 'right' }}>Balance</th>
                  <th>Purchase Date</th>
                </tr>
              </thead>
              <tbody>
                {reportData.length > 0 ? (
                  reportData.map((item, idx) => (
                    <tr key={item.purchaseId || item.transactionId || idx}>
                      <td><strong>{item.materialCategoryName || item.materialCategoryId}</strong></td>
                      <td>{item.materialTypeName || item.materialTypeId}</td>
                      <td>
                        <span className="badge-tag brand">{item.brandName}</span>
                      </td>
                      <td className="num-cell">{item.quantity}</td>
                      <td>{item.materialUnitName || item.unitId}</td>
                      <td className="num-cell">{formatCurrency(item.purchaseAmount)}</td>
                      <td className="num-cell">{formatCurrency(item.balance != null ? item.balance : item.purchaseAmount)}</td>
                      <td className="date-cell">{formatReportDate(item.purchaseDate)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">
                      {!isDbConnected || dbError ? (
                        <div className="empty-state-box">
                          <AlertTriangle size={42} color="#dc2626" className="empty-state-icon" />
                          <div className="empty-state-title" style={{ color: '#991b1b' }}>
                            Unable to fetch data from MySQL Database
                          </div>
                          <p style={{ maxWidth: 500, margin: '0 auto 12px', color: '#7f1d1d', lineHeight: 1.5 }}>
                            {dbError || 'Connection to MySQL database on localhost:3306 failed. Please verify that MySQL is installed and running.'}
                          </p>
                        </div>
                      ) : (
                        <div className="empty-state-box">
                          <ShoppingBag size={36} className="empty-state-icon" />
                          <div className="empty-state-title">No purchases found</div>
                          <p>No purchase records found in MySQL database for {selectedVendorName || 'this vendor'} within the specified date range.</p>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {reportData.length > 0 && (
            <div className="report-summary-bar">
              <div className="report-summary-col">
                <div className="report-summary-label">Total Items</div>
                <div className="report-summary-value">{totalQuantity} Units</div>
              </div>
              <div className="report-summary-col">
                <div className="report-summary-label">Total Purchases (Price)</div>
                <div className="report-summary-value">₹{totalSpend.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
              </div>
              <div className="report-summary-col">
                <div className="report-summary-label">Total Outstanding Balance</div>
                <div className="report-summary-value">₹{totalBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


