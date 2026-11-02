package com.training.test.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.training.dao.VendorDAO;
import com.training.entity.VendorEntity;

@SpringBootTest
public class VendorDAOTest {

	private static final Logger logger = LoggerFactory.getLogger(VendorDAOTest.class);

	/*
	 * Autowire the VendorDAO object below
	 */
	@Autowired
	private VendorDAO vendorDAO;

	
	/*
	 * Method - notNullVendorDAOTest()
	 * Assert only that VendorDAO object is Not null
	 */
	
	@Test
	public void notNullVendorDAOTest() {
		assertNotNull(vendorDAO);
	}

	/*
	 * Method - findByIdVendorDAOTest()
	 * Using VendorDAO fetch an entity by its ID --> "V001" 
	 * Assert that the entity fetch and it is Not null 
	 * Assert that the name of the vendor entity fetch is equal to --> "Only Vimal"
	 */

	@Test
	public void findByIdVendorDAOTest() {
		VendorEntity entity = vendorDAO.findById("V001").orElse(null);
		assertNotNull(entity);
		assertEquals("Only Vimal", entity.getVendorName());
	}
}
