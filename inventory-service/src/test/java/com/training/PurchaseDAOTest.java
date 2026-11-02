package com.training;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.Date;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.training.business.bean.PurchaseBean;
import com.training.dao.PurchaseDAO;
import com.training.dao.PurchaseDataAccess;
import com.training.entity.PurchaseEntity;

@ExtendWith(MockitoExtension.class)
public class PurchaseDAOTest {

	@Mock
	private PurchaseDAO purchaseDAO;

	@InjectMocks
	private PurchaseDataAccess purchaseDataAccess;

	@Test
	public void testSavePurchaseDetail() throws Exception {
		PurchaseBean bean = new PurchaseBean();
		bean.setTransactionId("P_ONL_01012026_C01");
		bean.setVendorName("Only Vimal");
		bean.setMaterialCategoryId("C001");
		bean.setMaterialTypeId("T001");
		bean.setBrandName("BrandX");
		bean.setUnitId("U001");
		bean.setQuantity(5);
		bean.setPurchaseAmount(500.0);
		bean.setPurchaseDate(new Date());

		when(purchaseDAO.save(any(PurchaseEntity.class))).thenAnswer(invocation -> {
			PurchaseEntity entity = invocation.getArgument(0);
			entity.setPurchaseId(101);
			return entity;
		});

		PurchaseBean saved = purchaseDataAccess.savePurchaseDetail(bean);
		assertNotNull(saved);
		assertEquals(101, saved.getPurchaseId());
		assertEquals("SUCCESS", saved.getStatus());
		assertEquals("Only Vimal", saved.getVendorName());
	}

}
