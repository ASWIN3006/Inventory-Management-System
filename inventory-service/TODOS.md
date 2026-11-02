# InventoryManagementSystem Participant TODOs

This module is prepared as a participant exercise.
Validation and purchase-save flow are intentionally removed so participants can implement them.
Record fetching/report flow is kept as-is.

## Implementation Order

1. Bean Validation - PurchaseBean
- File: src/main/java/com/training/business/bean/PurchaseBean.java
- TODO:
  - Add spring validation annotations for mandatory fields.
  - Add validation for:
    - vendorName
    - materialCategoryId
    - materialTypeId
    - brandName
    - unitId
    - quantity
    - purchaseAmount
    - purchaseDate

2. Controller - Save purchase endpoint
- File: src/main/java/com/training/web/controller/PurchaseEntryController.java
- Method: addPurchaseDetail(...)
- TODO:
  - Validate incoming request.
  - Call purchaseService.addPurchaseDetails(purchaseBean).
  - Store saved PurchaseBean into session.
  - Return success response payload.

3. Service - Save purchase orchestration
- File: src/main/java/com/training/service/PurchaseServiceImpl.java
- Method: addPurchaseDetails(...)
- TODO:
  - Generate transaction id using transactionIdGenerator(...).
  - Set transaction id into PurchaseBean.
  - Delegate persistence to purchaseDataAccess.savePurchaseDetail(...).
  - Return saved PurchaseBean.

4. DAO - Persist purchase details
- File: src/main/java/com/training/dao/PurchaseDataAccess.java
- Method: savePurchaseDetail(...)
- TODO:
  - Map PurchaseBean to PurchaseEntity.
  - Persist PurchaseEntity using purchaseDAO.save(...).
  - Map saved PurchaseEntity back to PurchaseBean.
  - Return saved PurchaseBean.

## Keep As-Is (Do Not Modify)

1. Record fetching endpoints and report retrieval flow.
- Keep existing fetch/list/report APIs unchanged.

2. DAO interfaces and repository contracts not related to purchase save TODO.

## Verification Steps

1. Build the project
- mvn clean compile

2. Run the application
- mvn spring-boot:run

3. Validate purchase save endpoint after TODO completion
- POST /addPurchaseDetail

4. Validate record fetching/report endpoints still work
- Keep existing fetch/report endpoints behavior unchanged.
