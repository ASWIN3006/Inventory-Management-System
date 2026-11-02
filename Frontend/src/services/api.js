const INVENTORY_BASE = '/api/inventory';
const MATERIAL_BASE = '/api/material';
const VENDOR_BASE = '/api/vendor';

/**
 * Check health status of all 3 microservices
 */
export async function checkMicroservicesHealth() {
  const status = {
    inventory: { url: 'http://localhost:8089', online: false },
    material: { url: 'http://localhost:8088', online: false },
    vendor: { url: 'http://localhost:8087', online: false }
  };

  try {
    const resInv = await fetch(`${INVENTORY_BASE}/health`, { signal: AbortSignal.timeout(1500) });
    status.inventory.online = resInv.ok;
  } catch {
    status.inventory.online = false;
  }

  try {
    const resMat = await fetch(`${MATERIAL_BASE}/health`, { signal: AbortSignal.timeout(1500) });
    status.material.online = resMat.ok;
  } catch {
    status.material.online = false;
  }

  try {
    const resVen = await fetch(`${VENDOR_BASE}/`, { signal: AbortSignal.timeout(1500) });
    status.vendor.online = resVen.ok;
  } catch {
    status.vendor.online = false;
  }

  return status;
}

/**
 * 1. Fetch Vendors List (Strict Live Database Only)
 * Queries Spring Boot Vendor microservice / MySQL vendordb.
 * Returns empty array and error if database/service is offline.
 */
export async function fetchVendors() {
  try {
    const res = await fetch(`${INVENTORY_BASE}/vendors`, { signal: AbortSignal.timeout(2500) });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return { data, isLive: true, error: null };
    }
  } catch {
    try {
      const res = await fetch(`${VENDOR_BASE}/vendor/controller/getVendors`, { signal: AbortSignal.timeout(2500) });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return { data, isLive: true, error: null };
      }
    } catch {
      // Offline
    }
  }

  return {
    data: [],
    isLive: false,
    error: 'Unable to fetch vendors from MySQL database (vendordb). Vendor Microservice (port 8087) is unreachable or MySQL is not running on localhost:3306.'
  };
}

/**
 * 2. Fetch Material Categories (Strict Live Database Only)
 * Queries Spring Boot Material microservice / MySQL materialdb.
 * Returns empty array and error if database/service is offline.
 */
export async function fetchCategories() {
  try {
    const res = await fetch(`${INVENTORY_BASE}/categories`, { signal: AbortSignal.timeout(2500) });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return { data, isLive: true, error: null };
    }
  } catch {
    try {
      const res = await fetch(`${MATERIAL_BASE}/material/controller/getMaterialCategories`, { signal: AbortSignal.timeout(2500) });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return { data, isLive: true, error: null };
      }
    } catch {
      // Offline
    }
  }

  return {
    data: [],
    isLive: false,
    error: 'Unable to fetch categories from MySQL database (materialdb). Material Microservice (port 8088) is unreachable or MySQL is not running on localhost:3306.'
  };
}

/**
 * 3. Fetch Units and Types by Category ID (Strict Live Database Only)
 * Queries Spring Boot Material microservice / MySQL materialdb.
 * Returns empty arrays and error if database/service is offline.
 */
export async function fetchUnitAndTypeList(categoryId) {
  if (!categoryId) return { units: [], types: [], isLive: false, error: null };

  // 1. Try InventoryManagementSystem POST /getUnitAndTypeList
  try {
    const res = await fetch(`${INVENTORY_BASE}/getUnitAndTypeList`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ materialCategoryId: categoryId }),
      signal: AbortSignal.timeout(2500)
    });
    if (res.ok) {
      const data = await res.json();
      const rawUnits = data.unitList || data.units || [];
      const rawTypes = data.materialTypeList || data.types || [];
      return { units: rawUnits, types: rawTypes, isLive: true, error: null };
    }
  } catch {
    // Inventory service connection failed, proceed to MaterialService fallback
  }

  // 2. Fallback: Query MaterialService direct endpoints on port 8088
  try {
    const [typesRes, unitsRes] = await Promise.all([
      fetch(`${MATERIAL_BASE}/type/controller/getTypeDetailsByCategoryId/${categoryId}`, { signal: AbortSignal.timeout(2500) }),
      fetch(`${MATERIAL_BASE}/unit/controller/getUnitsByCategoryId/${categoryId}`, { signal: AbortSignal.timeout(2500) })
    ]);
    if (typesRes.ok && unitsRes.ok) {
      const types = await typesRes.json();
      const units = await unitsRes.json();
      if (Array.isArray(types) && Array.isArray(units)) {
        return { units, types, isLive: true, error: null };
      }
    }
  } catch {
    // Offline
  }

  return {
    units: [],
    types: [],
    isLive: false,
    error: 'Unable to fetch dynamic Material Types & Units from MySQL database (materialdb). Material Microservice (port 8088) is unreachable.'
  };
}

/**
 * 4. Submit Material Purchase Detail (Strict Live Database Only)
 * Tries backend POST /addPurchaseDetail (persisting to MySQL dbpurchase).
 * Fails with explicit error if database/service is offline.
 */
export async function submitPurchaseDetail(purchaseData) {
  try {
    const res = await fetch(`${INVENTORY_BASE}/addPurchaseDetail`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(purchaseData),
      signal: AbortSignal.timeout(3500)
    });
    if (res.ok) {
      const data = await res.json();
      return { success: true, isLive: true, data };
    }
    const errText = await res.text();
    return {
      success: false,
      isLive: false,
      error: `Database Error (${res.status}): Failed to save purchase to MySQL dbpurchase. ${errText}`
    };
  } catch (err) {
    return {
      success: false,
      isLive: false,
      error: 'Database Connection Error: Unable to persist purchase to MySQL database (dbpurchase). Microservice (port 8089) is unreachable or MySQL is not running on localhost:3306.'
    };
  }
}

/**
 * 5. Fetch Vendor Purchase Report (Strict Live Database Only)
 * Queries backend POST /report/controller/getPurchaseDetails (MySQL dbpurchase).
 * Returns empty array and explicit error if database/service is offline.
 */
export async function fetchVendorPurchaseReport({ fromDate, toDate, vendorName }) {
  try {
    const res = await fetch(`${INVENTORY_BASE}/report/controller/getPurchaseDetails`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fromDate, toDate, vendorName }),
      signal: AbortSignal.timeout(3500)
    });
    if (res.ok) {
      const rawList = await res.json();
      if (Array.isArray(rawList)) {
        return {
          data: rawList,
          isLive: true,
          error: null,
          totalRecords: rawList.length
        };
      }
    }
    return {
      data: [],
      isLive: false,
      error: `Database Error (${res.status}): Failed to query purchase details from MySQL dbpurchase table.`,
      totalRecords: 0
    };
  } catch (err) {
    return {
      data: [],
      isLive: false,
      error: 'Unable to fetch purchase records from MySQL database (dbpurchase). Inventory Management Service (port 8089) is unreachable or MySQL is not installed/running on localhost:3306.',
      totalRecords: 0
    };
  }
}


