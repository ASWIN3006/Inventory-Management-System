# VendorService Participant TODOs

This module is prepared as a hands-on exercise.
Current controller and service logic is intentionally removed so participants can implement it.

## Implementation Order

1. Controller Layer - `VendorController#getVendorDetails`
- File: `src/main/java/com/training/controller/VendorController.java`
- TODO:
  - Call the service method `vendorServiceImpl.getVendorDetails()`.
  - Store the result in `List<VendorBean>`.
  - Return `ResponseEntity.ok(list)`.
- Expected output:
  - `GET /vendor/controller/getVendors` returns JSON array of vendors.

2. Service Layer - `VendorServiceImpl#getVendorDetails`
- File: `src/main/java/com/training/service/VendorServiceImpl.java`
- TODO:
  - Call `vendorDAO.findAll()`.
  - Loop through `List<VendorEntity>`.
  - Map each entity to `VendorBean`.
  - Return populated `List<VendorBean>`.
- Mapping checklist:
  - `vendorId`
  - `vendorName`
  - `vendorAddress`
  - `contactPerson`
  - `contactNumber`

3. DAO Layer - `VendorDAO`
- File: `src/main/java/com/training/dao/VendorDAO.java`
- TODO:
  - Keep it as `JpaRepository<VendorEntity, String>`.
  - (Optional) Add custom finder methods only if required by new use cases.

4. Service Test Layer - `VendorServiceTest`
- File: `src/test/java/com/training/test/service/VendorServiceTest.java`
- TODO:
  - Autowire the `VendorService` object in the test class.
  - Method - `notNullVendorServiceTest()`:
    - Assert only that `VendorService` object is not null.
  - Method - `notNullGetVendorDetailsTest()`:
    - Assert only that `getVendorDetails()` is not returning a null value.
  - Method - `countGetVendorDetailsTest()`:
    - Assert only that `getVendorDetails()` list size matches `5`.
  - Method - `recordGetVendorDetailsTest()`:
    - Assert only that `getVendorDetails()` first bean name matches `Only Vimal`.

5. DAO Test Layer - `VendorDAOTest`
- File: `src/test/java/com/training/test/dao/VendorDAOTest.java`
- TODO:
  - Autowire the `VendorDAO` object in the test class.
  - Method - `notNullVendorDAOTest()`:
    - Assert only that `VendorDAO` object is not null.
  - Method - `findByIdVendorDAOTest()`:
    - Using `VendorDAO`, fetch an entity by ID `V001`.
    - Assert the fetched entity is not null.
    - Assert the fetched vendor name equals `Only Vimal`.

## Verification Steps

1. Build project
- Command: `mvn clean compile`

2. Run application
- Command: `mvn spring-boot:run`

3. Test endpoint
- URL: `GET http://localhost:8080/vendor/controller/getVendors`
- Expected after TODO completion: HTTP 200 with vendor list.

## Note

Current code is compile-safe and import-safe for participants. Business logic is left as TODOs by design.
