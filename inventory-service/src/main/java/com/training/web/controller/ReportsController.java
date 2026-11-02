package com.training.web.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.training.business.bean.PurchaseBean;
import com.training.business.bean.VendorWisePurchaseReportBean;
import com.training.exceptions.MicroServiceException;
import com.training.service.ReportsService;
import com.training.web.client.MaterialCategoryConsumer;
import com.training.web.client.MaterialTypeConsumer;
import com.training.web.client.UnitServiceConsumer;
import com.training.web.client.VendorServiceConsumer;


/**
 * <br/>
 * CLASS DESCRIPTION: <br/>
 * A controller class for handling the request coming from
 * DateWisePurchaseReport.jsp
 *
 */
@Controller
@CrossOrigin(origins = "http://localhost:3001")
public class ReportsController {

	private static Logger LOGGER = LoggerFactory.getLogger(ReportsController.class);

	@Autowired
	private ReportsService reportsService;

	@Autowired
	private MaterialCategoryConsumer materialCategoryConsumer;

	@Autowired
	private UnitServiceConsumer unitServiceConsumer;

	@Autowired
	private MaterialTypeConsumer materialTypeConsumer;

	@Autowired
	private VendorServiceConsumer vendorServiceConsumer;
	
	List <PurchaseBean> purchaseIdList;

	/**
	 * METHOD DESCRIPTION: <br/>
	 * This method is used to fetch the purchase details for a given vendor and
	 * between the two given dates 
	 *  
	 * @param vendorWisePurchaseReportBean
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="report/controller/getPurchaseDetails",
			method=RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<PurchaseBean>> getPurchaseDetails(@RequestBody VendorWisePurchaseReportBean bean) throws MicroServiceException
	{
		LOGGER.info("Execution Started [getPurchaseDetails]");
		List<PurchaseBean> reportList = reportsService.getVendorWisePurchaseDetails(bean.getFromDate(), bean.getToDate(),
				bean.getVendorName());
		LOGGER.info("Execution Over [getPurchaseDetails]");
		return ResponseEntity.ok(reportList);
	}
		
	
}