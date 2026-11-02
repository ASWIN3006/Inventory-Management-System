package com.training.test.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.training.service.MaterialService;

@SpringBootTest
public class MaterialServiceTest {
	private static final Logger logger = LoggerFactory.getLogger(MaterialServiceTest.class);
	
	/*
	 * Autowire the MaterialService object below
	 * 
	 */
	@Autowired
	private MaterialService materialService;

	/*
	 * Method - notNullMaterialServiceTest()
	 * Assert only that MaterialService object is Not null
	 * 
	 */	
	
	@Test
	public void notNullMaterialServiceTest() {
		assertNotNull(materialService);
	}
	
		
	/*
	 * Method - getMaterialCategoryByIdTest()
	 * Assert that MaterialCategoryBean object fetch using MaterialService getMaterialCategoryById --> C001 is not null
	 * Assert that object fetch name is equal to --> "Thread"
	 */
	
	@Test
	public void getMaterialCategoryByIdTest() {
		assertNotNull(materialService.getMaterialCategoryById("C001"));
		assertEquals("Thread", materialService.getMaterialCategoryById("C001").getCategoryName());
	}
	
	
	/*
	 * Method - getMaterialCategoriesTest()
	 * Assert that MaterialCategoryBean list fetch using MaterialService getMaterialCategories is not null
	 * Assert that list size matches to --> 3
	 */
	
	@Test
	public void getMaterialCategoriesTest() {
		assertNotNull(materialService.getMaterialCategories());
		assertEquals(3, materialService.getMaterialCategories().size());
	}
	
}
