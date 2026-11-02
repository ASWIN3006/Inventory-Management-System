package com.training.web.client;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.training.business.bean.VendorBean;
import com.training.exceptions.MicroServiceException;


@Service
public class VendorServiceConsumer {

	private static Logger LOGGER =  LoggerFactory.getLogger(VendorServiceConsumer.class);
	
	@Value("${VendorServiceConsumer.serviceURL}")
	private String serviceURL;
	
	@Value("${VendorServiceConsumer.apiURL}")
	private String apiURL;
	
	private List<VendorBean> vendorBeanList;
	
	private Map<String, VendorBean> vendorMap;
	
	private RestTemplate restTemplate;	
	
	
	public List<VendorBean> getVendorBeanList() throws MicroServiceException {
		if(vendorBeanList == null) {
			hitGetVendorDetails();
		}
		return vendorBeanList;
	}	

	public Map<String, VendorBean> getVendorMap() {
		if(vendorMap == null) {		
			vendorMap = new HashMap<String, VendorBean>();
			for(VendorBean bean : vendorBeanList) {				
				vendorMap.put(bean.getVendorName(), bean);
			}			
		}
		return vendorMap;
	}



	public VendorServiceConsumer(){
		restTemplate =  new RestTemplate();
	}

	/**
	 * This method is hitting microservice to get the list of vendors
	 * @return
	 * @throws MicroServiceException 
	 */
	private void hitGetVendorDetails() throws MicroServiceException{
		LOGGER.info("Execution Started [hitGetVendorDetails()]");
		try{
			VendorBean[] response= restTemplate.getForObject(serviceURL+apiURL, VendorBean[].class);
			List<VendorBean> vendorList = Arrays.asList(response);		
			LOGGER.info("Execution over [hitGetVendorDetails()]");
			this.vendorBeanList = vendorList;
		}catch(Exception exception){
			throw new MicroServiceException();
		}
	}


}
