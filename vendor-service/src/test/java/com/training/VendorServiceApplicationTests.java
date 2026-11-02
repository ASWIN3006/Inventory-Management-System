package com.training;


import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class VendorServiceApplicationTests {

	Logger logger = LoggerFactory.getLogger(VendorServiceApplicationTests.class);
	
	@Test
	public void contextLoads() {
		logger.info("UNIT TEST STARTED");
		assertEquals("Spring Boot", "Spring Boot", "Mismatch in value");
	}

}
