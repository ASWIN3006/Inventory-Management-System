import {
  fetchVendors,
  fetchCategories,
  fetchUnitAndTypeList,
  fetchVendorPurchaseReport
} from './src/services/api.js';

async function runTests() {
  console.log('--- Verifying Material Type, Unit, and Past Report Data ---');

  // Test 1: Categories
  const catRes = await fetchCategories();
  console.log(`✓ Categories loaded: ${catRes.data.map(c => c.categoryName).join(', ')}`);

  // Test 2: Types & Units for C001 (Thread)
  const threadRes = await fetchUnitAndTypeList('C001');
  console.log(`✓ Thread Types: ${threadRes.types.map(t => t.typeName).join(', ')}`);
  console.log(`✓ Thread Units: ${threadRes.units.map(u => u.unitName).join(', ')}`);
  if (threadRes.types.length === 0 || threadRes.units.length === 0) {
    throw new Error('Thread types or units missing!');
  }

  // Test 3: Types & Units for C002 (Cloth)
  const clothRes = await fetchUnitAndTypeList('C002');
  console.log(`✓ Cloth Types: ${clothRes.types.map(t => t.typeName).join(', ')}`);
  console.log(`✓ Cloth Units: ${clothRes.units.map(u => u.unitName).join(', ')}`);
  if (clothRes.types.length === 0 || clothRes.units.length === 0) {
    throw new Error('Cloth types or units missing!');
  }

  // Test 4: Types & Units for C003 (Button)
  const buttonRes = await fetchUnitAndTypeList('C003');
  console.log(`✓ Button Types: ${buttonRes.types.map(t => t.typeName).join(', ')}`);
  console.log(`✓ Button Units: ${buttonRes.units.map(u => u.unitName).join(', ')}`);
  if (buttonRes.types.length === 0 || buttonRes.units.length === 0) {
    throw new Error('Button types or units missing!');
  }

  // Test 5: Past purchases for all 5 vendors in Vendor Purchase Report
  const vendors = ['Only Vimal', 'PRR Enterprises', 'SRS Enterprises', 'SKR Traders', 'Mind Tree Textiles'];
  for (const v of vendors) {
    const report = await fetchVendorPurchaseReport({
      vendorName: v,
      fromDate: '2018-01-01',
      toDate: '2026-12-31'
    });
    console.log(`✓ Vendor [${v}] past purchases found: ${report.data.length}`);
    if (report.data.length === 0) {
      throw new Error(`Expected past purchases for ${v} but got 0!`);
    }
    report.data.forEach(p => {
      console.log(`    - ${p.materialCategoryName} | ${p.materialTypeName} | Brand: ${p.brandName} | Qty: ${p.quantity} | Unit: ${p.materialUnitName} | Price: ₹${p.purchaseAmount} | Date: ${p.purchaseDate}`);
      if (!p.materialCategoryName || !p.materialTypeName || !p.materialUnitName) {
        throw new Error(`Item names null in purchase record: ${JSON.stringify(p)}`);
      }
    });
  }

  console.log('\nALL TESTS PASSED: Material Types, Units, and Past Report Data are 100% verified!');
}

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
