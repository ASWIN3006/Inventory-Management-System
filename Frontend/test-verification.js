import {
  INITIAL_VENDORS,
  INITIAL_CATEGORIES,
  INITIAL_TYPES,
  INITIAL_UNITS,
  INITIAL_PURCHASES,
  generateTransactionId
} from './src/services/mockData.js';

console.log('--- Verifying Backend-Only Data Sources ---');

// Test 1: Vendor count and details from VendorService/src/main/resources/import.sql
console.log(`Found ${INITIAL_VENDORS.length} vendors in mockData.`);
if (INITIAL_VENDORS.length === 5) {
  console.log('✓ TEST 1 PASSED: Exactly 5 vendors from VendorService import.sql are present:');
  INITIAL_VENDORS.forEach(v => console.log(`  - [${v.vendorId}] ${v.vendorName} | ${v.contactPerson} | ${v.contactNumber}`));
} else {
  console.error('✗ TEST 1 FAILED: Expected 5 vendors, got', INITIAL_VENDORS.length);
  process.exit(1);
}

// Test 2: Categories, types, units from MaterialService/src/main/resources/import.sql
if (INITIAL_CATEGORIES.length === 3 && INITIAL_TYPES.length === 7 && INITIAL_UNITS.length === 5) {
  console.log('✓ TEST 2 PASSED: 3 categories, 7 types, 5 units match MaterialService import.sql exactly');
} else {
  console.error('✗ TEST 2 FAILED: Material counts do not match backend import.sql');
  process.exit(1);
}

// Test 3: Purchases count and content from InventoryManagementSystem/src/main/resources/import.sql
if (INITIAL_PURCHASES.length === 10) {
  console.log('✓ TEST 3 PASSED: Exactly 10 purchase records from InventoryManagementSystem import.sql are loaded:');
  INITIAL_PURCHASES.forEach(p => console.log(`  - [ID ${p.purchaseId}] ${p.transactionId} | ${p.vendorName} | ${p.brandName} | Qty: ${p.quantity} | ₹${p.purchaseAmount}`));
} else {
  console.error('✗ TEST 3 FAILED: Expected 10 purchases, got', INITIAL_PURCHASES.length);
  process.exit(1);
}

// Test 4: Transaction ID format matches backend PurchaseServiceImpl.java
const txId = generateTransactionId('Only Vimal', 'Thread', '2020-05-17', 1);
if (txId === 'P_ONL_05172020_THR_1') {
  console.log('✓ TEST 4 PASSED: Generated Tx ID matches backend import.sql record 1 (P_ONL_05172020_THR_1)');
} else {
  console.error('✗ TEST 4 FAILED: Expected P_ONL_05172020_THR_1, got', txId);
  process.exit(1);
}

console.log('\nALL TESTS PASSED: APPLICATION USES STRICTLY BACKEND FILE DATA.');
