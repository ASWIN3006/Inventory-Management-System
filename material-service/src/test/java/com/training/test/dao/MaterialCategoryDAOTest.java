package com.training.test.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.training.dao.MaterialCategoryDAO;
import com.training.entity.MaterialCategoryEntity;

@SpringBootTest
public class MaterialCategoryDAOTest {
	private static final Logger logger = LoggerFactory.getLogger(MaterialCategoryDAOTest.class);

	/*
	 * Autowire the MaterialCategoryDAO object below
	 */
	@Autowired
	private MaterialCategoryDAO materialCategoryDAO;
	
	
	/*
	 * Method - notNullMaterialCategoryDAOTest()
	 * Assert only that MaterialCategoryDAO object is Not null
	 */	
	
	@Test
	public void notNullMaterialCategoryDAOTest() {
		assertNotNull(materialCategoryDAO);
	}
	
	
	/*
	 * Method - findByIdMaterialCategoryTest()
	 * Using MaterialCategoryDAO fetch an entity by its ID --> "C001" 
	 * Assert that the entity fetch and it is Not null 
	 * Assert that the name of the material category entity fetch is equal to --> "Thread"
	 */

	@Test
	public void findByIdMaterialCategoryTest() {
		MaterialCategoryEntity entity = materialCategoryDAO.findById("C001").orElse(null);
		assertNotNull(entity);
		assertEquals("Thread", entity.getCategoryName());
	}

	/*
	 * Method - findAllMaterialCategoryTest()
	 * Using MaterialCategoryDAO to fetch all the entities 
	 * Assert that the list is Not null 
	 * Assert that the count of entities matches to --> 3
	 */
			
	@Test
	public void findAllMaterialCategoryTest() {
		assertNotNull(materialCategoryDAO.findAll());
		assertEquals(3, materialCategoryDAO.findAll().size());
	}
	
}
