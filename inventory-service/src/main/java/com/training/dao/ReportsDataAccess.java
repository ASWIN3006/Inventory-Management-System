package com.training.dao;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.training.business.bean.PurchaseBean;
import com.training.entity.PurchaseEntity;

@Repository
public class ReportsDataAccess {
	@Autowired
	private ReportsDAO reportsDAO;

	public List<PurchaseBean> getVendorWisePurchaseDetails(Date from, Date to, String vendorName) {
		List<PurchaseEntity> purchaseEntities = reportsDAO.getVendorWisePurchaseDetails(from, to, vendorName);
		return purchaseEntities.stream().map(purchaseEntity -> {
			PurchaseBean purchaseBean = new PurchaseBean();
			purchaseBean.setPurchaseId(purchaseEntity.getPurchaseId());
			purchaseBean.setTransactionId(purchaseEntity.getTransactionId());
			purchaseBean.setVendorName(purchaseEntity.getVendorName());
			purchaseBean.setMaterialCategoryId(purchaseEntity.getMaterialCategoryId());
			purchaseBean.setMaterialTypeId(purchaseEntity.getMaterialTypeId());
			purchaseBean.setBrandName(purchaseEntity.getBrandName());
			purchaseBean.setUnitId(purchaseEntity.getUnitId());
			purchaseBean.setQuantity(purchaseEntity.getQuantity());
			purchaseBean.setPurchaseAmount(purchaseEntity.getPurchaseAmount());
			purchaseBean.setPurchaseDate(purchaseEntity.getPurchaseDate());
			purchaseBean.setStatus(purchaseEntity.getStatus());
			return purchaseBean;
		}).collect(Collectors.toList());
	}
}