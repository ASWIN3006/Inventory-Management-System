package com.training.service;

import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.training.business.bean.PurchaseBean;
import com.training.dao.ReportsDataAccess;

/**
 * <br/>
 * CLASS DESCRIPTION: <br/>
 * Implementation class for ReportsService to deal with all reports related
 * detail.
 *
 */
@Service
public class ReportsServiceImpl implements ReportsService {
	private static Logger LOGGER = LoggerFactory.getLogger(ReportsServiceImpl.class);
	
	@Autowired
	private ReportsDataAccess reportsDataAccess;

	@Override
	public List<PurchaseBean> getVendorWisePurchaseDetails(Date from, Date to, String vendorName) {
		LOGGER.info("Execution Started [getVendorWisePurchaseDetails]");
		List<PurchaseBean> purchaseDetails = reportsDataAccess.getVendorWisePurchaseDetails(from, to, vendorName);
		LOGGER.info("Execution Over [getVendorWisePurchaseDetails]");
		return purchaseDetails;
	}
}
