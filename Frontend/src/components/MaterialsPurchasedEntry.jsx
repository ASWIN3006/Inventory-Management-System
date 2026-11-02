import React, { useState, useEffect } from 'react';
import {
  fetchVendors,
  fetchCategories,
  fetchUnitAndTypeList,
  submitPurchaseDetail
} from '../services/api';
import { CheckCircle2, AlertCircle, ArrowRight, RotateCcw, AlertTriangle } from 'lucide-react';

export default function MaterialsPurchasedEntry({ onNavigateToReport }) {
  const getTodayString = () => new Date().toISOString().split('T')[0];

  // Form State
  const [formData, setFormData] = useState({
    vendorName: '',
    materialCategoryId: '',
    materialTypeId: '',
    unitId: '',
    brandName: '',
    quantity: '',
    purchaseAmount: '',
    purchaseDate: getTodayString()
  });

  // Dropdown options
  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [materialTypes, setMaterialTypes] = useState([]);
  const [units, setUnits] = useState([]);

  // UI States
  const [isDbConnected, setIsDbConnected] = useState(true);
  const [dbError, setDbError] = useState(null);
  const [isLoadingDropdowns, setIsLoadingDropdowns] = useState(true);
  const [isLoadingTypesAndUnits, setIsLoadingTypesAndUnits] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [submittedResult, setSubmittedResult] = useState(null);

  // Initial Load: Vendors & Categories from microservices
  const loadInitialData = async () => {
    setIsLoadingDropdowns(true);
    try {
      const [venRes, catRes] = await Promise.all([fetchVendors(), fetchCategories()]);
      const vendorList = venRes.data || [];
      const categoryList = catRes.data || [];

      setVendors(vendorList);
      setCategories(categoryList);

      if (!venRes.isLive || !catRes.isLive || vendorList.length === 0 || categoryList.length === 0) {
        setIsDbConnected(false);
        setDbError(venRes.error || catRes.error || 'Unable to connect to MySQL database on localhost:3306.');
      } else {
        setIsDbConnected(true);
        setDbError(null);
        setFormData((prev) => ({
          ...prev,
          vendorName: vendorList[0]?.vendorName || '',
          materialCategoryId: categoryList[0]?.categoryId || ''
        }));
      }
    } catch (err) {
      console.error('Error loading initial dropdowns:', err);
      setIsDbConnected(false);
      setDbError('Microservices or MySQL database is offline.');
    } finally {
      setIsLoadingDropdowns(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Whenever Material Category changes, fetch Types and Units from Material Application
  useEffect(() => {
    if (!formData.materialCategoryId) {
      setMaterialTypes([]);
      setUnits([]);
      setFormData((prev) => ({ ...prev, materialTypeId: '', unitId: '' }));
      return;
    }

    async function loadTypesAndUnits() {
      setIsLoadingTypesAndUnits(true);
      try {
        const result = await fetchUnitAndTypeList(formData.materialCategoryId);
        const typesList = result.types || [];
        const unitsList = result.units || [];

        setMaterialTypes(typesList);
        setUnits(unitsList);

        if (!result.isLive) {
          setIsDbConnected(false);
          setDbError(result.error);
        } else {
          if (typesList.length > 0) {
            setFormData((prev) => ({ ...prev, materialTypeId: typesList[0].typeId }));
          }
          if (unitsList.length > 0) {
            setFormData((prev) => ({ ...prev, unitId: unitsList[0].unitId }));
          }
        }
      } catch (err) {
        console.error('Error loading types and units:', err);
        setIsDbConnected(false);
      } finally {
        setIsLoadingTypesAndUnits(false);
      }
    }

    loadTypesAndUnits();
  }, [formData.materialCategoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.vendorName) errs.vendorName = 'Vendor name is a required field.';
    if (!formData.materialCategoryId) errs.materialCategoryId = 'Material category is a required field.';
    if (!formData.materialTypeId) errs.materialTypeId = 'Material type is a required field.';
    if (!formData.unitId) errs.unitId = 'Unit is a required field.';
    if (!formData.brandName || !formData.brandName.trim()) errs.brandName = 'Brand name is a required field.';
    if (!formData.quantity || Number(formData.quantity) <= 0) errs.quantity = 'Quantity must be greater than 0.';
    if (!formData.purchaseAmount || Number(formData.purchaseAmount) <= 0) errs.purchaseAmount = 'Purchase amount is required.';
    if (!formData.purchaseDate) errs.purchaseDate = 'Purchase date is a required field.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmittedResult(null);
    try {
      const selectedCat = categories.find((c) => c.categoryId === formData.materialCategoryId);
      const selectedType = materialTypes.find((t) => t.typeId === formData.materialTypeId);
      const selectedUnit = units.find((u) => u.unitId === formData.unitId);

      const payload = {
        vendorName: formData.vendorName,
        materialCategoryId: formData.materialCategoryId,
        materialCategoryName: selectedCat ? selectedCat.categoryName : '',
        materialTypeId: formData.materialTypeId,
        materialTypeName: selectedType ? selectedType.typeName : '',
        unitId: formData.unitId,
        materialUnitName: selectedUnit ? selectedUnit.unitName : '',
        brandName: formData.brandName.trim(),
        quantity: parseInt(formData.quantity, 10),
        purchaseAmount: parseFloat(formData.purchaseAmount),
        purchaseDate: formData.purchaseDate
      };

      const response = await submitPurchaseDetail(payload);
      if (response && response.success) {
        setSubmittedResult(response.data);
        setErrors({});
      } else {
        setErrors({
          form: response.error || 'Database Error: Failed to save purchase to MySQL. Connection refused on localhost:3306.'
        });
      }
    } catch (err) {
      console.error('Submit error:', err);
      setErrors({ form: err.message || 'Failed to submit purchase detail to MySQL.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      vendorName: vendors.length > 0 ? vendors[0].vendorName : '',
      materialCategoryId: categories.length > 0 ? categories[0].categoryId : '',
      materialTypeId: '',
      unitId: '',
      brandName: '',
      quantity: '',
      purchaseAmount: '',
      purchaseDate: getTodayString()
    });
    setSubmittedResult(null);
    setErrors({});
  };

  return (
    <div className="screen-wrapper">
      <div className="proto-page-header">
        <h2 className="proto-title-main">Materials Purchased Entry</h2>
        {/* <div className="proto-desc-bullet">
          <span className="bullet">•</span>
          <p>
            This screen records materials purchased from a vendor. Vendor name is populated from
            Vendor Microservice, while material category, Material Type and Unit are populated by
            invoking Material Microservice. Data is persisted directly to MySQL.
          </p>
        </div> */}
      </div>

      <div className="prototype-card">
        <div className="proto-banner">Materials Purchased Entry</div>

        {/* Database Warning Banner */}
        {(!isDbConnected || dbError) && (
          <div className="db-warning-banner error" id="entry-db-warning" style={{ margin: '16px 28px 0' }}>
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
              {dbError || 'MySQL is not installed or running on localhost:3306. Cannot load categories, types, units, or vendors. Strict Live Database mode is active.'}
            </p>
          </div>
        )}


        <form className="proto-form-body" onSubmit={handleSubmit}>
          {errors.form && (
            <div style={{ marginBottom: 20, padding: 12, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 6, color: '#dc2626', display: 'flex', gap: 8, alignItems: 'center' }}>
              <AlertCircle size={18} />
              <span>{errors.form}</span>
            </div>
          )}

          <div className="form-grid">
            {/* Vendor Name */}
            <div className="form-row">
              <label className="form-label" htmlFor="vendorName">
                Vendor Name <span className="required-star">*</span>
              </label>
              <div className="form-input-group">
                <select
                  id="vendorName"
                  name="vendorName"
                  className="proto-select"
                  value={formData.vendorName}
                  onChange={handleChange}
                  disabled={isLoadingDropdowns || vendors.length === 0}
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
                {errors.vendorName && <span className="field-error-text">{errors.vendorName}</span>}
              </div>
              {/* <div className="ms-annotation-bubble">
                <span className="ms-pill-tag">Vendor MS</span>
                Microservice - To be accessed from Vendor Application
              </div> */}
            </div>

            {/* Material Category */}
            <div className="form-row">
              <label className="form-label" htmlFor="materialCategoryId">
                Material Category <span className="required-star">*</span>
              </label>
              <div className="form-input-group">
                <select
                  id="materialCategoryId"
                  name="materialCategoryId"
                  className="proto-select"
                  value={formData.materialCategoryId}
                  onChange={handleChange}
                  disabled={isLoadingDropdowns || categories.length === 0}
                >
                  {categories.length === 0 ? (
                    <option value="">-- No categories found (Database Offline) --</option>
                  ) : (
                    <>
                      <option value="">-- Select Category --</option>
                      {categories.map((c) => (
                        <option key={c.categoryId} value={c.categoryId}>
                          {c.categoryName}
                        </option>
                      ))}
                    </>
                  )}
                </select>
                {errors.materialCategoryId && (
                  <span className="field-error-text">{errors.materialCategoryId}</span>
                )}
              </div>
              {/* <div className="ms-annotation-bubble">
                <span className="ms-pill-tag">Material MS</span>
                Microservice - To be accessed from Material Application
              </div> */}
            </div>

            {/* Material Type */}
            <div className="form-row">
              <label className="form-label" htmlFor="materialTypeId">
                Material Type <span className="required-star">*</span>
              </label>
              <div className="form-input-group">
                <select
                  id="materialTypeId"
                  name="materialTypeId"
                  className="proto-select"
                  value={formData.materialTypeId}
                  onChange={handleChange}
                  disabled={!formData.materialCategoryId || isLoadingTypesAndUnits || materialTypes.length === 0}
                >
                  {materialTypes.length === 0 ? (
                    <option value="">
                      {isLoadingTypesAndUnits
                        ? 'Loading types from DB...'
                        : formData.materialCategoryId
                        ? '-- No types found (Database Offline) --'
                        : '-- Select Category First --'}
                    </option>
                  ) : (
                    <>
                      <option value="">-- Select Type --</option>
                      {materialTypes.map((t) => (
                        <option key={t.typeId} value={t.typeId}>
                          {t.typeName}
                        </option>
                      ))}
                    </>
                  )}
                </select>
                {errors.materialTypeId && <span className="field-error-text">{errors.materialTypeId}</span>}
              </div>
              {/* <div className="ms-annotation-bubble" style={{ opacity: 0.85 }}>
                <span className="ms-pill-tag">Material MS</span>
                Dynamic types for category
              </div> */}
            </div>

            {/* Unit */}
            <div className="form-row">
              <label className="form-label" htmlFor="unitId">
                Unit <span className="required-star">*</span>
              </label>
              <div className="form-input-group">
                <select
                  id="unitId"
                  name="unitId"
                  className="proto-select"
                  value={formData.unitId}
                  onChange={handleChange}
                  disabled={!formData.materialCategoryId || isLoadingTypesAndUnits || units.length === 0}
                >
                  {units.length === 0 ? (
                    <option value="">
                      {isLoadingTypesAndUnits
                        ? 'Loading units from DB...'
                        : formData.materialCategoryId
                        ? '-- No units found (Database Offline) --'
                        : '-- Select Category First --'}
                    </option>
                  ) : (
                    <>
                      <option value="">-- Select Unit --</option>
                      {units.map((u) => (
                        <option key={u.unitId} value={u.unitId}>
                          {u.unitName}
                        </option>
                      ))}
                    </>
                  )}
                </select>
                {errors.unitId && <span className="field-error-text">{errors.unitId}</span>}
              </div>
              {/* <div className="ms-annotation-bubble" style={{ opacity: 0.85 }}>
                <span className="ms-pill-tag">Material MS</span>
                Dynamic units for category
              </div> */}
            </div>

            {/* Brand Name */}
            <div className="form-row">
              <label className="form-label" htmlFor="brandName">
                Brand Name <span className="required-star">*</span>
              </label>
              <div className="form-input-group">
                <input
                  type="text"
                  id="brandName"
                  name="brandName"
                  className="proto-input"
                  placeholder="e.g. Raymonds"
                  value={formData.brandName}
                  onChange={handleChange}
                />
                {errors.brandName && <span className="field-error-text">{errors.brandName}</span>}
              </div>
              <div></div>
            </div>

            {/* Quantity */}
            <div className="form-row">
              <label className="form-label" htmlFor="quantity">
                Quantity <span className="required-star">*</span>
              </label>
              <div className="form-input-group">
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  className="proto-input"
                  placeholder="e.g. 25"
                  value={formData.quantity}
                  onChange={handleChange}
                />
                {errors.quantity && <span className="field-error-text">{errors.quantity}</span>}
              </div>
              <div></div>
            </div>

            {/* Purchase Amount */}
            <div className="form-row">
              <label className="form-label" htmlFor="purchaseAmount">
                Purchase Amount <span className="required-star">*</span>
              </label>
              <div className="form-input-group">
                <input
                  type="number"
                  id="purchaseAmount"
                  name="purchaseAmount"
                  step="0.01"
                  min="0.01"
                  className="proto-input"
                  placeholder="e.g. 10000"
                  value={formData.purchaseAmount}
                  onChange={handleChange}
                />
                {errors.purchaseAmount && (
                  <span className="field-error-text">{errors.purchaseAmount}</span>
                )}
              </div>
              <div></div>
            </div>

            {/* Purchase Date */}
            <div className="form-row">
              <label className="form-label" htmlFor="purchaseDate">
                Purchase Date <span className="required-star">*</span>
              </label>
              <div className="form-input-group">
                <input
                  type="date"
                  id="purchaseDate"
                  name="purchaseDate"
                  className="proto-input"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                />
                {errors.purchaseDate && <span className="field-error-text">{errors.purchaseDate}</span>}
              </div>
              <div></div>
            </div>
          </div>

          <div className="submit-row-section">
            <button
              type="submit"
              className="proto-submit-btn"
              disabled={isSubmitting}
              id="btn-submit-purchase"
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  <span>Processing...</span>
                </>
              ) : (
                'Submit'
              )}
            </button>

            <p className="proto-note-text">
              Note: <em>Purchase Id is generated on submit</em> Ex:{' '}
              <code>P_ONL_05172020_THR_1</code>
            </p>
          </div>
        </form>

        {submittedResult && (
          <div style={{ padding: '0 40px 36px' }}>
            <div className="success-banner-card" id="purchase-success-alert">
              <div className="success-header-row">
                <div className="success-title">
                  <CheckCircle2 color="#16a34a" size={22} />
                  <span>Purchase Saved to MySQL Database Successfully!</span>
                </div>
                <div className="generated-tx-badge" id="generated-transaction-id">
                  <span>Tx ID:</span>
                  <strong>{submittedResult.purchase?.transactionId}</strong>
                </div>
              </div>

              <div className="success-details-grid">
                <div>
                  <div className="detail-item-label">Vendor</div>
                  <div className="detail-item-val">{submittedResult.purchase?.vendorName}</div>
                </div>
                <div>
                  <div className="detail-item-label">Brand & Material</div>
                  <div className="detail-item-val">
                    {submittedResult.purchase?.brandName} ({submittedResult.purchase?.materialCategoryName} - {submittedResult.purchase?.materialTypeName})
                  </div>
                </div>
                <div>
                  <div className="detail-item-label">Quantity</div>
                  <div className="detail-item-val">
                    {submittedResult.purchase?.quantity} {submittedResult.purchase?.materialUnitName}
                  </div>
                </div>
                <div>
                  <div className="detail-item-label">Total Amount</div>
                  <div className="detail-item-val">
                    ₹{Number(submittedResult.purchase?.purchaseAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div>
                  <div className="detail-item-label">Purchase Date</div>
                  <div className="detail-item-val">{submittedResult.purchase?.purchaseDate}</div>
                </div>
              </div>

              <div className="success-actions">
                <button
                  type="button"
                  className="quick-preset-btn"
                  onClick={handleResetForm}
                >
                  <RotateCcw size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                  Record Another
                </button>
                <button
                  type="button"
                  className="search-btn"
                  onClick={() => onNavigateToReport(submittedResult.purchase?.vendorName)}
                  id="btn-view-in-report"
                >
                  <span>View in Vendor Report</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
