import {
  fetchVendors,
  fetchCategories,
  fetchUnitAndTypeList,
  fetchVendorPurchaseReport,
  submitPurchaseDetail
} from './src/services/api.js';

async function testDatabaseWarningHandling() {
  console.log('--- Testing Strict Live Database & Zero Preview Data ---');

  // 1. Fetch Vendors
  const venRes = await fetchVendors();
  console.log(`Vendors Live Status: ${venRes.isLive} | Count: ${venRes.data.length} | Error: ${venRes.error ? 'YES' : 'NO'}`);
  if (venRes.isLive === false && venRes.data.length === 0 && venRes.error) {
    console.log('✓ fetchVendors strictly returns 0 records and reports DB offline error.');
  } else {
    throw new Error('fetchVendors did not enforce strict live database mode');
  }

  // 2. Fetch Categories
  const catRes = await fetchCategories();
  console.log(`Categories Live Status: ${catRes.isLive} | Count: ${catRes.data.length} | Error: ${catRes.error ? 'YES' : 'NO'}`);
  if (catRes.isLive === false && catRes.data.length === 0 && catRes.error) {
    console.log('✓ fetchCategories strictly returns 0 records and reports DB offline error.');
  } else {
    throw new Error('fetchCategories did not enforce strict live database mode');
  }

  // 3. Fetch Unit & Type List
  const typeRes = await fetchUnitAndTypeList('C001');
  console.log(`Types Live Status: ${typeRes.isLive} | Types Count: ${typeRes.types.length} | Units Count: ${typeRes.units.length} | Error: ${typeRes.error ? 'YES' : 'NO'}`);
  if (typeRes.isLive === false && typeRes.types.length === 0 && typeRes.units.length === 0 && typeRes.error) {
    console.log('✓ fetchUnitAndTypeList strictly returns 0 types/units and reports DB offline error.');
  } else {
    throw new Error('fetchUnitAndTypeList did not enforce strict live database mode');
  }

  // 4. Fetch Vendor Purchase Report
  const reportRes = await fetchVendorPurchaseReport({
    vendorName: 'Only Vimal',
    fromDate: '2018-01-01',
    toDate: '2026-12-31'
  });
  console.log(`Report Live Status: ${reportRes.isLive} | Report Records Count: ${reportRes.data.length} | Error: ${reportRes.error ? 'YES' : 'NO'}`);
  if (reportRes.isLive === false && reportRes.data.length === 0 && reportRes.error) {
    console.log('✓ fetchVendorPurchaseReport strictly returns 0 records and reports DB offline error.');
  } else {
    throw new Error('fetchVendorPurchaseReport did not enforce strict live database mode');
  }

  // 5. Submit Purchase Detail
  const submitRes = await submitPurchaseDetail({
    vendorName: 'Only Vimal',
    materialCategoryId: 'C001',
    materialTypeId: 'T001',
    unitId: 'U001',
    brandName: 'TestBrand',
    quantity: 10,
    purchaseAmount: 500,
    purchaseDate: '2026-09-04'
  });
  console.log(`Submit Success: ${submitRes.success} | Error: ${submitRes.error ? 'YES' : 'NO'}`);
  if (submitRes.success === false && submitRes.error) {
    console.log('✓ submitPurchaseDetail strictly fails when MySQL is offline and does NOT save mock data.');
  } else {
    throw new Error('submitPurchaseDetail did not enforce strict live database failure');
  }

  console.log('\nALL STRICT LIVE DATABASE & WARNING TESTS PASSED SUCCESSFULLY!');
}

testDatabaseWarningHandling().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
