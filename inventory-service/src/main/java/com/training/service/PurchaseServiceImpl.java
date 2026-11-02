package com.training.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.training.business.bean.PurchaseBean;
import com.training.dao.PurchaseDataAccess;

@Service
@Transactional
public class PurchaseServiceImpl implements PurchaseService {

	private static Logger LOGGER = LoggerFactory.getLogger(PurchaseServiceImpl.class);

	// Auto wire PurchaseDAO here
	@Autowired
	private PurchaseDataAccess purchaseDataAccess;
	/**
	 * METHOD DESCRIPTION: <br/>
	 * This method is used to insert purchase details data into the purchase table.
	 * Also, this method will add a single row into the payment table with paid
	 * amount as zero to keep the track of the balance amount for a specific
	 * purchase.
	 * 
	 * @param purchaseBean
	 * @return purchaseBean
	 * @throws Exception
	 */

	@Override
	public PurchaseBean addPurchaseDetails(PurchaseBean purchaseBean) throws Exception {
		LOGGER.info("Inside addPurchaseDetails method");
		String transactionId = transactionIdGenerator(purchaseBean.getVendorName(),
				purchaseBean.getMaterialCategoryName(), purchaseBean.getPurchaseDate());
		purchaseBean.setTransactionId(transactionId);
		return purchaseDataAccess.savePurchaseDetail(purchaseBean);
	}

	/**
	 * METHOD DESCRIPTION: <br/>
	 * This method is used to generate the transaction id as per logic- P_first 3
	 * characters of vendor name_purchase date in mmddyyyy format_first 3 characters
	 * of material category purchased_primary key of purchase table
	 * 
	 * @param vendorName
	 * @param materialCategoryName
	 * @param purchaseDate
	 * @return String
	 */
	private String transactionIdGenerator(String vendorName, String materialCategoryName, Date purchaseDate) {
		String vendorPrefix = safePrefix(vendorName);
		String categoryPrefix = safePrefix(materialCategoryName);
		String datePart = new SimpleDateFormat("MMddyyyy", Locale.ENGLISH).format(purchaseDate);
		return "P_" + vendorPrefix + "_" + datePart + "_" + categoryPrefix;

	}

	private String safePrefix(String value) {
		if (value == null) {
			return "NA";
		}
		String clean = value.trim().replaceAll("\\s+", "");
		if (clean.length() >= 3) {
			return clean.substring(0, 3).toUpperCase(Locale.ENGLISH);
		}
		return clean.toUpperCase(Locale.ENGLISH);
	}

}