package com.training;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import java.util.Collections;

import javax.servlet.http.HttpSession;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import com.training.business.bean.MaterialCategoryBean;
import com.training.business.bean.MaterialTypeBean;
import com.training.business.bean.PurchaseBean;
import com.training.business.bean.UnitBean;
import com.training.business.bean.VendorBean;
import com.training.service.PurchaseService;
import com.training.web.client.MaterialCategoryConsumer;
import com.training.web.client.MaterialTypeConsumer;
import com.training.web.client.UnitServiceConsumer;
import com.training.web.client.VendorServiceConsumer;
import com.training.web.controller.PurchaseEntryController;

@ExtendWith(MockitoExtension.class)
public class PurchaseEntryControllerTest {

	@Mock
	private PurchaseService purchaseService;

	@Mock
	private VendorServiceConsumer vendorServiceConsumer;

	@Mock
	private MaterialCategoryConsumer materialCategoryConsumer;

	@Mock
	private UnitServiceConsumer unitServiceConsumer;

	@Mock
	private MaterialTypeConsumer materialTypeConsumer;

	@Mock
	private HttpSession session;

	@InjectMocks
	private PurchaseEntryController purchaseEntryController;

	@Test
	public void testPurchaseEntry() throws Exception {
		ResponseEntity<PurchaseBean> response = purchaseEntryController.purchaseEntry();
		assertNotNull(response.getBody());
	}

	@Test
	public void testGenerateVendorList() throws Exception {
		when(vendorServiceConsumer.getVendorBeanList()).thenReturn(Collections.singletonList(
				new VendorBean("V001", "Only Vimal", "Address", "John", "9002348970")));
		ResponseEntity<?> response = purchaseEntryController.generateVendorList();
		assertEquals(1, ((java.util.List<?>) response.getBody()).size());
	}

	@Test
	public void testGenerateUnitAndTypeList() throws Exception {
		PurchaseBean purchaseBean = new PurchaseBean();
		purchaseBean.setMaterialCategoryId("C001");

		when(unitServiceConsumer.hitGetUnitsByCategoryId("C001"))
				.thenReturn(Collections.singletonList(new UnitBean("U001", "Metres")));
		when(materialTypeConsumer.hitGetTypesBasedOnCategoryId("C001"))
				.thenReturn(Collections.singletonList(new MaterialTypeBean("T001", "Silk", "C001")));

		ResponseEntity<PurchaseEntryController.UnitAndTypeResponse> response = purchaseEntryController
				.generateUnitAndTypeList(purchaseBean, session);
		assertEquals(1, response.getBody().getUnitList().size());
		assertEquals(1, response.getBody().getMaterialTypeList().size());
	}

	@Test
	public void testGenerateCategoryList() throws Exception {
		when(materialCategoryConsumer.getMaterialCategoryBeanList())
				.thenReturn(Collections.singletonList(new MaterialCategoryBean("C001", "Thread")));
		ResponseEntity<?> response = purchaseEntryController.generateCategoryList();
		assertEquals(1, ((java.util.List<?>) response.getBody()).size());
	}

	@Test
	public void testAddPurchaseDetail() throws Exception {
		PurchaseBean purchaseBean = new PurchaseBean();
		purchaseBean.setVendorName("Only Vimal");

		when(purchaseService.addPurchaseDetails(purchaseBean)).thenReturn(purchaseBean);

		ResponseEntity<PurchaseEntryController.PurchaseResponse> response = purchaseEntryController
				.addPurchaseDetail(purchaseBean, session);
		assertEquals("SUCCESS", response.getBody().getStatus());
		assertNotNull(response.getBody().getPurchase());
	}
}
