package com.training.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.training.business.bean.PurchaseBean;
import com.training.entity.PurchaseEntity;

@Repository
public class PurchaseDataAccess {
	
	@Autowired
	private PurchaseDAO purchaseDAO;

	public PurchaseBean savePurchaseDetail(PurchaseBean purchaseBean) throws Exception {
		PurchaseEntity purchaseEntity = new PurchaseEntity();
		purchaseEntity.setVendorName(purchaseBean.getVendorName());
		purchaseEntity.setMaterialCategoryId(purchaseBean.getMaterialCategoryId());
		purchaseEntity.setMaterialTypeId(purchaseBean.getMaterialTypeId());
		purchaseEntity.setBrandName(purchaseBean.getBrandName());
		purchaseEntity.setUnitId(purchaseBean.getUnitId());
		purchaseEntity.setQuantity(purchaseBean.getQuantity());
		purchaseEntity.setPurchaseAmount(purchaseBean.getPurchaseAmount());
		purchaseEntity.setPurchaseDate(purchaseBean.getPurchaseDate());
		purchaseEntity.setTransactionId(purchaseBean.getTransactionId());
		purchaseEntity.setStatus("SUCCESS");

		PurchaseEntity savedPurchaseEntity = purchaseDAO.save(purchaseEntity);

		String finalTransactionId = savedPurchaseEntity.getTransactionId() + "_" + savedPurchaseEntity.getPurchaseId();
		savedPurchaseEntity.setTransactionId(finalTransactionId);
		savedPurchaseEntity = purchaseDAO.save(savedPurchaseEntity);
		
		
		PurchaseBean savedPurchaseBean = new PurchaseBean();
		savedPurchaseBean.setPurchaseId(savedPurchaseEntity.getPurchaseId());
		savedPurchaseBean.setTransactionId(savedPurchaseEntity.getTransactionId());
		savedPurchaseBean.setVendorName(savedPurchaseEntity.getVendorName());
		savedPurchaseBean.setMaterialCategoryId(savedPurchaseEntity.getMaterialCategoryId());
		savedPurchaseBean.setMaterialTypeId(savedPurchaseEntity.getMaterialTypeId());
		savedPurchaseBean.setBrandName(savedPurchaseEntity.getBrandName());
		savedPurchaseBean.setUnitId(savedPurchaseEntity.getUnitId());
		savedPurchaseBean.setQuantity(savedPurchaseEntity.getQuantity());
		savedPurchaseBean.setPurchaseAmount(savedPurchaseEntity.getPurchaseAmount());
		savedPurchaseBean.setPurchaseDate(savedPurchaseEntity.getPurchaseDate());
		savedPurchaseBean.setStatus(savedPurchaseEntity.getStatus());

		return savedPurchaseBean;
	}
}