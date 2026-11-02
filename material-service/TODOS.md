# MaterialService Participant TODOs

This module is prepared as a participant exercise.
Controller, service, and selected DAO custom logic are intentionally removed so participants can implement them.

## Implementation Order

1. Controller - Material category endpoints
- File: src/main/java/com/training/controller/MaterialController.java
- Implement getMaterialCategories()
  - Call materialService.getMaterialCategories()
  - Return ResponseEntity with list and HTTP 200
- Implement getMaterialCategoryById(categoryId)
  - Call materialService.getMaterialCategoryById(categoryId)
  - Return ResponseEntity with object and HTTP 200

2. Controller - Material type endpoints
- File: src/main/java/com/training/controller/MaterialTypeContoller.java
- Implement getTypeDetails()
  - Call materialTypeService.getMaterialTypes()
  - Return ResponseEntity with list and HTTP 200
- Implement getTypesBasedOnCategoryId(categoryId)
  - Call materialTypeService.getMaterialTypesBasedOnCategoryId(categoryId)
  - Return ResponseEntity with list and HTTP 200

3. Controller - Unit endpoints
- File: src/main/java/com/training/controller/UnitController.java
- Implement getUnitDetails()
  - Call unitService.getUnits()
  - Return ResponseEntity with list and HTTP 200
- Implement getUnitsByCategoryId(categoryId)
  - Call unitService.getUnitsBasedOnCategoryId(categoryId)
  - Return ResponseEntity with list and HTTP 200

4. Service - Material category mapping
- File: src/main/java/com/training/service/MaterialServiceImpl.java
- Implement getMaterialCategoryById(categoryId)
  - Fetch entity from materialCategoryDAO
  - Map entity to MaterialCategoryBean
- Implement getMaterialCategories()
  - Fetch entity list from materialCategoryDAO.findAll()
  - Map each entity to MaterialCategoryBean list

5. Service - Material type mapping
- File: src/main/java/com/training/service/MaterialTypeServiceImpl.java
- Implement getMaterialTypesBasedOnCategoryId(categoryId)
  - Fetch entities from DAO
  - Map to MaterialTypeBean list
  - Set categoryId in bean from relation
- Implement getMaterialTypes()
  - Fetch all entities
  - Map to MaterialTypeBean list
  - Set categoryId in bean from relation

6. Service - Unit mapping
- File: src/main/java/com/training/service/UnitServiceImpl.java
- Implement getUnitsBasedOnCategoryId(categoryId)
  - Fetch entities from DAO
  - Map to UnitBean list
  - Set categoryId in bean from relation
- Implement getUnits()
  - Fetch all entities
  - Map to UnitBean list
  - Set categoryId in bean from relation

7. DAO - Custom queries
- File: src/main/java/com/training/dao/MaterialTypeDAO.java
  - Add method to fetch material types by categoryId
- File: src/main/java/com/training/dao/UnitDAO.java
  - Add method to fetch units by categoryId
- File: src/main/java/com/training/dao/MaterialCategoryDAO.java
  - Keep JpaRepository as-is unless new use case requires custom queries

8. Service Test Layer - MaterialServiceTest
- File: src/test/java/com/training/test/service/MaterialServiceTest.java
- TODO:
  - Autowire the MaterialService object in the test class.
  - Method - notNullMaterialServiceTest()
    - Assert only that MaterialService object is not null.
  - Method - getMaterialCategoryByIdTest()
    - Assert that MaterialCategoryBean object fetched using getMaterialCategoryById("C001") is not null.
    - Assert that fetched object name equals "Thread".
  - Method - getMaterialCategoriesTest()
    - Assert that MaterialCategoryBean list fetched using getMaterialCategories() is not null.
    - Assert that list size matches 3.

9. DAO Test Layer - MaterialCategoryDAOTest
- File: src/test/java/com/training/test/dao/MaterialCategoryDAOTest.java
- TODO:
  - Autowire the MaterialCategoryDAO object in the test class.
  - Method - notNullMaterialCategoryDAOTest()
    - Assert only that MaterialCategoryDAO object is not null.
  - Method - findByIdMaterialCategoryTest()
    - Fetch entity by ID "C001" using MaterialCategoryDAO.
    - Assert fetched entity is not null.
    - Assert fetched material category name equals "Thread".
  - Method - findAllMaterialCategoryTest()
    - Fetch all entities using MaterialCategoryDAO.
    - Assert list is not null.
    - Assert count of entities matches 3.

## Verification Steps

1. Build the project
- mvn clean compile

2. Run the application
- mvn spring-boot:run

3. Validate endpoints after implementation
- GET /material/controller/getMaterialCategories
- GET /material/controller/getMaterialCategoryById/{categoryId}
- GET /type/controller/getTypeDetails
- GET /type/controller/getTypeDetailsByCategoryId/{categoryId}
- GET /unit/controller/getUnitDetails
- GET /unit/controller/getUnitsByCategoryId/{categoryId}

## Note

Current project state is import-safe and compile-safe for participants. Logic is intentionally replaced with TODO placeholders.
