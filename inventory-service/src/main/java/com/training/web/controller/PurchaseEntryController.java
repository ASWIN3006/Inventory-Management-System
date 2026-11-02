package com.training.web.controller;

import java.util.List;
import javax.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import com.training.business.bean.MaterialCategoryBean;
import com.training.business.bean.MaterialTypeBean;
import com.training.business.bean.PurchaseBean;
import com.training.business.bean.UnitBean;
import com.training.business.bean.VendorBean;
import com.training.exceptions.MicroServiceException;
import com.training.service.PurchaseService;
import com.training.web.client.MaterialCategoryConsumer;
import com.training.web.client.MaterialTypeConsumer;
import com.training.web.client.UnitServiceConsumer;
import com.training.web.client.VendorServiceConsumer;

/**
 * <br/>
 * CLASS DESCRIPTION: <br/>
 * A controller class for receiving and handling all material purchase related
 * transactions from the User Interface. <br/>
 *
 */
@CrossOrigin(origins = "http://localhost:3001")
@RestController
@SessionAttributes({ "purchaseBean" })
public class PurchaseEntryController {

    private static Logger LOGGER = LoggerFactory.getLogger(PurchaseEntryController.class);


	// Auto wire PurchaseService here
	@Autowired
	private PurchaseService purchaseService;

	// Auto wire VendorServiceConsumer here
	@Autowired
	private VendorServiceConsumer vendorServiceConsumer;

	// Auto wire MaterialCategoryConsumer here
	@Autowired
	private MaterialCategoryConsumer materialCategoryConsumer;

	// Auto wire UnitServiceConsumer here
	@Autowired
	private UnitServiceConsumer unitServiceConsumer;

	// Auto wire MaterialTypeConsumer here
	@Autowired
	private MaterialTypeConsumer materialTypeConsumer;

	/**
	 * METHOD DESCRIPTION: <br/>
	 * This method sets PurchaseBean into the model attribute and redirects to
	 * PurchaseEntry.jsp.
	 * 
	 * @return
	 * @throws Exception
	 */
    @GetMapping("purchaseEntry")
	public ResponseEntity<PurchaseBean> purchaseEntry() throws Exception {
		return ResponseEntity.ok(new PurchaseBean());
    }


	/**
	 * METHOD DESCRIPTION: <br/>
	 * This method returns the vendor list to be populated on the
	 * PurchasEntry.jsp. getVendorBeanList method of VendorServiceConsumer is
	 * called to get the vendor list.
	 * 
	 * @return vendorList - List of vendor values
	 * @throws MicroServiceException
	 */

    @GetMapping("vendors")
	public ResponseEntity<List<VendorBean>> generateVendorList() throws MicroServiceException {
		List<VendorBean> vendors = vendorServiceConsumer.getVendorBeanList();
		return ResponseEntity.ok(vendors == null ? List.of() : vendors);
    }

	/**
	 * METHOD DESCRIPTION: <br/>
	 * This method returns the material unit and type list to be populated in
	 * PurchaseEntry.jsp for chosen material category. hitGetUnitsByCategoryId
	 * method of UnitServiceConsumer class to be called to get the list of
	 * material unit. hitGetTypesBasedOnCategoryId method of
	 * MaterialTypeConsumer class to be called to get the list of material type.
	 * 
	 * @param purchaseBean
	 * @param HttpSession
	 * @return ModelAndView
	 * @throws MicroServiceException
	 */
    @PostMapping("getUnitAndTypeList")
	public ResponseEntity<UnitAndTypeResponse> generateUnitAndTypeList(@RequestBody PurchaseBean purchaseBean,
													   HttpSession session) throws MicroServiceException {
		List<UnitBean> units = unitServiceConsumer.hitGetUnitsByCategoryId(purchaseBean.getMaterialCategoryId());
		List<MaterialTypeBean> materialTypes = materialTypeConsumer
				.hitGetTypesBasedOnCategoryId(purchaseBean.getMaterialCategoryId());
		session.setAttribute("purchaseBean", purchaseBean);
		return ResponseEntity.ok(new UnitAndTypeResponse(units == null ? List.of() : units,
				materialTypes == null ? List.of() : materialTypes));
    }

	/**
	 * METHOD DESCRIPTION: <br/>
	 * This method returns the material category list to be populated on the
	 * PurchasEntry.jsp. getMaterialCategoryBeanList method of
	 * MaterialCategoryConsumer is called to get the material category list.
	 * 
	 * @return List - MaterialCategoryBean
	 * @throws MicroServiceException
	 */
    @GetMapping("categories")
	public ResponseEntity<List<MaterialCategoryBean>> generateCategoryList() throws MicroServiceException {
		List<MaterialCategoryBean> categories = materialCategoryConsumer.getMaterialCategoryBeanList();
		return ResponseEntity.ok(categories == null ? List.of() : categories);
    }
	
	/**
	 * METHOD DESCRIPTION: <br/>
	 * This method is used to insert purchase details filled on
	 * PurchaseEntry.jsp in to the purchase and payment table. Upon successful
	 * insert redirects to PurchaseSuccess.jsp
	 * 
	 * @param purchaseBean
	 * @param BindingResult
	 * @param ModelMap
	 * @param HttpSession
	 * @return ModelAndView
	 * @throws Exception
	 */
    @PostMapping("addPurchaseDetail")
	public ResponseEntity<PurchaseResponse> addPurchaseDetail(@RequestBody @Valid PurchaseBean purchaseBean,
											  HttpSession session) throws Exception {
		LOGGER.info("Execution Started [addPurchaseDetail]");
		PurchaseBean savedPurchaseBean = purchaseService.addPurchaseDetails(purchaseBean);
		session.setAttribute("purchaseBean", savedPurchaseBean);
		LOGGER.info("Execution Over [addPurchaseDetail]");
		return ResponseEntity.ok(new PurchaseResponse("SUCCESS", "Purchase details added successfully", savedPurchaseBean));
    }

    public static class UnitAndTypeResponse {
		private List<UnitBean> unitList;
		private List<MaterialTypeBean> materialTypeList;

		public UnitAndTypeResponse() {
			super();
		}

		public UnitAndTypeResponse(List<UnitBean> unitList, List<MaterialTypeBean> materialTypeList) {
			this.unitList = unitList;
			this.materialTypeList = materialTypeList;
		}

		public List<UnitBean> getUnitList() {
			return unitList;
		}

		public List<MaterialTypeBean> getMaterialTypeList() {
			return materialTypeList;
		}
    }

    public static class PurchaseResponse {
        private String status;
        private String message;
		private PurchaseBean purchase;

		public PurchaseResponse(String status, String message, PurchaseBean purchase) {
            this.status = status;
            this.message = message;
			this.purchase = purchase;
        }

        public String getStatus() { return status; }
        public String getMessage() { return message; }
		public PurchaseBean getPurchase() { return purchase; }
    }
}