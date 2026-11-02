package com.training.service;

import java.util.Date;
import java.util.List;

import com.training.business.bean.PurchaseBean;

public interface ReportsService {
	public List<PurchaseBean> getVendorWisePurchaseDetails(Date from, Date to, String vendorName);
}
