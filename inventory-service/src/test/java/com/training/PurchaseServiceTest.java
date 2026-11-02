package com.training;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.Date;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.training.business.bean.PurchaseBean;
import com.training.dao.PurchaseDataAccess;
import com.training.service.PurchaseServiceImpl;

@ExtendWith(MockitoExtension.class)
public class PurchaseServiceTest {

	@Mock
	private PurchaseDataAccess purchaseDataAccess;

	@InjectMocks
	private PurchaseServiceImpl purchaseService;

	@Test
	public void testAddPurchaseDetails() throws Exception {
		PurchaseBean bean = new PurchaseBean();
		bean.setVendorName("Only Vimal");
		bean.setMaterialCategoryId("C001");
		bean.setPurchaseDate(new Date(System.currentTimeMillis() - 24 * 60 * 60 * 1000));

		when(purchaseDataAccess.savePurchaseDetail(any(PurchaseBean.class))).thenAnswer(invocation -> invocation.getArgument(0));

		PurchaseBean result = purchaseService.addPurchaseDetails(bean);
		assertNotNull(result);
		assertNotNull(result.getTransactionId());
		assertTrue(result.getTransactionId().startsWith("P_"));
	}

}
