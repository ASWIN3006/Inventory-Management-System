// Mock seed data sourced STRICTLY from backend files:
// - VendorService/src/main/resources/import.sql
// - MaterialService/src/main/resources/import.sql
// - InventoryManagementSystem/src/main/resources/import.sql

export const INITIAL_VENDORS = [
  {
    vendorId: 'V001',
    vendorName: 'Only Vimal',
    vendorAddress: 'Stock Home Road,Sector 22, New Delhi-110 001',
    contactNumber: '9002348970',
    contactPerson: 'John'
  },
  {
    vendorId: 'V002',
    vendorName: 'PRR Enterprises',
    vendorAddress: '10, GST Road, Mumbai-400 001',
    contactNumber: '8700112345',
    contactPerson: 'Sam'
  },
  {
    vendorId: 'V003',
    vendorName: 'SRS Enterprises',
    vendorAddress: 'Section - B, Gandhi Nagar, West Bengal-700 010',
    contactNumber: '9444467812',
    contactPerson: 'Elizabeth'
  },
  {
    vendorId: 'V004',
    vendorName: 'SKR Traders',
    vendorAddress: '16, Park Town Street,Nungambakkam Chennai-600 003',
    contactNumber: '9003406789',
    contactPerson: 'Amelia'
  },
  {
    vendorId: 'V005',
    vendorName: 'Mind Tree Textiles',
    vendorAddress: 'Mind Tree Division, Sector-12, Bengaluru-560 003',
    contactNumber: '9989076758',
    contactPerson: 'Peter'
  }
];

export const INITIAL_CATEGORIES = [
  { categoryId: 'C001', categoryName: 'Thread' },
  { categoryId: 'C002', categoryName: 'Cloth' },
  { categoryId: 'C003', categoryName: 'Button' }
];

export const INITIAL_TYPES = [
  { typeId: 'T001', typeName: 'Silk', categoryId: 'C001' },
  { typeId: 'T002', typeName: 'Silk', categoryId: 'C002' },
  { typeId: 'T003', typeName: 'Linen', categoryId: 'C001' },
  { typeId: 'T004', typeName: 'Linen', categoryId: 'C002' },
  { typeId: 'T005', typeName: 'Silk Cotton', categoryId: 'C003' },
  { typeId: 'T006', typeName: 'Suit', categoryId: 'C003' },
  { typeId: 'T007', typeName: 'Silk Cotton', categoryId: 'C002' }
];

export const INITIAL_UNITS = [
  { unitId: 'U001', unitName: 'Metres', categoryId: 'C001' },
  { unitId: 'U002', unitName: 'Metres', categoryId: 'C002' },
  { unitId: 'U003', unitName: 'Yards', categoryId: 'C001' },
  { unitId: 'U004', unitName: 'Yards', categoryId: 'C002' },
  { unitId: 'U005', unitName: 'Kilograms', categoryId: 'C003' }
];

// Exactly matching the 10 purchase records in InventoryManagementSystem/src/main/resources/import.sql
export const INITIAL_PURCHASES = [
  {
    purchaseId: 1,
    brandName: 'Kanchi',
    materialCategoryId: 'C001',
    materialCategoryName: 'Thread',
    materialTypeId: 'T001',
    materialTypeName: 'Silk',
    purchaseAmount: 400.0,
    balance: 400.0,
    purchaseDate: '2020-05-17',
    quantity: 4,
    status: 'Pending',
    transactionId: 'P_ONL_05172020_THR_1',
    unitId: 'U001',
    materialUnitName: 'Metres',
    vendorName: 'Only Vimal'
  },
  {
    purchaseId: 2,
    brandName: 'Raymonds',
    materialCategoryId: 'C001',
    materialCategoryName: 'Thread',
    materialTypeId: 'T003',
    materialTypeName: 'Linen',
    purchaseAmount: 20000.0,
    balance: 20000.0,
    purchaseDate: '2019-01-04',
    quantity: 100,
    status: 'Pending',
    transactionId: 'P_ONL_01042019_THR_2',
    unitId: 'U003',
    materialUnitName: 'Yards',
    vendorName: 'Only Vimal'
  },
  {
    purchaseId: 3,
    brandName: 'Raymonds',
    materialCategoryId: 'C003',
    materialCategoryName: 'Button',
    materialTypeId: 'T005',
    materialTypeName: 'Silk Cotton',
    purchaseAmount: 400.0,
    balance: 400.0,
    purchaseDate: '2020-03-26',
    quantity: 4,
    status: 'Pending',
    transactionId: 'P_PRR_03262020_BUT_3',
    unitId: 'U005',
    materialUnitName: 'Kilograms',
    vendorName: 'PRR Enterprises'
  },
  {
    purchaseId: 4,
    brandName: 'Raymonds',
    materialCategoryId: 'C002',
    materialCategoryName: 'Cloth',
    materialTypeId: 'T007',
    materialTypeName: 'Silk Cotton',
    purchaseAmount: 10000.0,
    balance: 10000.0,
    purchaseDate: '2020-02-12',
    quantity: 20,
    status: 'Pending',
    transactionId: 'P_SRS_02122020_CLO_4',
    unitId: 'U002',
    materialUnitName: 'Metres',
    vendorName: 'SRS Enterprises'
  },
  {
    purchaseId: 5,
    brandName: 'SM Silks',
    materialCategoryId: 'C001',
    materialCategoryName: 'Thread',
    materialTypeId: 'T001',
    materialTypeName: 'Silk',
    purchaseAmount: 32000.0,
    balance: 32000.0,
    purchaseDate: '2019-08-16',
    quantity: 32,
    status: 'Pending',
    transactionId: 'P_SRS_08162019_THR_5',
    unitId: 'U001',
    materialUnitName: 'Metres',
    vendorName: 'SRS Enterprises'
  },
  {
    purchaseId: 6,
    brandName: 'Raymonds',
    materialCategoryId: 'C001',
    materialCategoryName: 'Thread',
    materialTypeId: 'T003',
    materialTypeName: 'Linen',
    purchaseAmount: 3000.0,
    balance: 3000.0,
    purchaseDate: '2019-11-01',
    quantity: 30,
    status: 'Pending',
    transactionId: 'P_PRR_11012019_THR_6',
    unitId: 'U003',
    materialUnitName: 'Yards',
    vendorName: 'PRR Enterprises'
  },
  {
    purchaseId: 7,
    brandName: 'Raymonds',
    materialCategoryId: 'C003',
    materialCategoryName: 'Button',
    materialTypeId: 'T006',
    materialTypeName: 'Suit',
    purchaseAmount: 1230.0,
    balance: 1230.0,
    purchaseDate: '2018-09-15',
    quantity: 10,
    status: 'Pending',
    transactionId: 'P_SKR_09152018_BUT_7',
    unitId: 'U005',
    materialUnitName: 'Kilograms',
    vendorName: 'SKR Traders'
  },
  {
    purchaseId: 8,
    brandName: 'Otto',
    materialCategoryId: 'C003',
    materialCategoryName: 'Button',
    materialTypeId: 'T006',
    materialTypeName: 'Suit',
    purchaseAmount: 549.0,
    balance: 549.0,
    purchaseDate: '2019-07-16',
    quantity: 5,
    status: 'Pending',
    transactionId: 'P_SKR_07162019_BUT_8',
    unitId: 'U005',
    materialUnitName: 'Kilograms',
    vendorName: 'SKR Traders'
  },
  {
    purchaseId: 9,
    brandName: 'Akshaya Tex',
    materialCategoryId: 'C001',
    materialCategoryName: 'Thread',
    materialTypeId: 'T001',
    materialTypeName: 'Silk',
    purchaseAmount: 7899.0,
    balance: 7899.0,
    purchaseDate: '2019-04-23',
    quantity: 50,
    status: 'Pending',
    transactionId: 'P_PRR_04232019_THR_9',
    unitId: 'U001',
    materialUnitName: 'Metres',
    vendorName: 'PRR Enterprises'
  },
  {
    purchaseId: 10,
    brandName: 'Raymonds',
    materialCategoryId: 'C002',
    materialCategoryName: 'Cloth',
    materialTypeId: 'T007',
    materialTypeName: 'Silk Cotton',
    purchaseAmount: 4000.0,
    balance: 4000.0,
    purchaseDate: '2019-07-23',
    quantity: 10,
    status: 'Pending',
    transactionId: 'P_MIN_07232019_CLO_10',
    unitId: 'U002',
    materialUnitName: 'Metres',
    vendorName: 'Mind Tree Textiles'
  }
];

/**
 * Transaction ID generator matching backend PurchaseServiceImpl.java
 * Logic: "P_" + vendorPrefix(3) + "_" + MMDDYYYY + "_" + categoryPrefix(3) + "_" + purchaseId
 */
export function generateTransactionId(vendorName, categoryName, purchaseDate, purchaseId) {
  const safePrefix = (str) => {
    if (!str) return 'NA';
    const clean = str.trim().replace(/\s+/g, '');
    return clean.length >= 3 ? clean.substring(0, 3).toUpperCase() : clean.toUpperCase();
  };

  const vPrefix = safePrefix(vendorName);
  const cPrefix = safePrefix(categoryName);

  const d = new Date(purchaseDate);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yyyy = d.getFullYear();
  const datePart = `${mm}${dd}${yyyy}`;

  return `P_${vPrefix}_${datePart}_${cPrefix}_${purchaseId}`;
}
