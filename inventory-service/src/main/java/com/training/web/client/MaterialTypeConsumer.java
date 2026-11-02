package com.training.web.client;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.training.business.bean.MaterialTypeBean;
import com.training.exceptions.MicroServiceException;


@Service
public class MaterialTypeConsumer {
	
	private static Logger LOGGER =  LoggerFactory.getLogger(MaterialTypeConsumer.class);
	
	@Value("${MaterialServiceConsumer.serviceURL}")
	private String serviceURL;
	
	@Value("${MaterialTypeConsumer.apiURL}")
	private String apiURL;
	
	@Value("${MaterialTypeConsumer.apiURLByCategoryId}")
	private String apiURLByCategoryId;
	
	private RestTemplate restTemplate;
	
	private List<MaterialTypeBean> materialTypeBeanList;
	
	private Map<String, String> categoryTypeMap;
	
	

	public List<MaterialTypeBean> getMaterialTypeBeanList() throws MicroServiceException {
		if (materialTypeBeanList == null) {
			hitGetMaterialType();
		}
		return materialTypeBeanList;
	}

	public Map<String, String> getCategoryTypeMap() throws MicroServiceException {
		if(categoryTypeMap == null) {
			categoryTypeMap = getMaterialTypeBeanList().stream()
					.collect(Collectors.toMap(MaterialTypeBean::getTypeId, MaterialTypeBean::getTypeName));
		}		
		return categoryTypeMap;
	}

	public MaterialTypeConsumer() {
		restTemplate = new RestTemplate();
	}
	
	
	/**
	 * This method is hitting microservice to get the list of Material type.
	 * 
	 * @return
	 * @throws MicroServiceException 
	 */
	private void hitGetMaterialType() throws MicroServiceException {
		LOGGER.info("Execution Started [hitGetMaterialType()] ");
		try {
			ResponseEntity<MaterialTypeBean[]> response = restTemplate.getForEntity(serviceURL + apiURL,
					MaterialTypeBean[].class);
			List<MaterialTypeBean> materialTypeList = Arrays.asList(response.getBody());
			LOGGER.info("Execution over [hitGetMaterialType()]");
			this.materialTypeBeanList = materialTypeList;
		} catch (Exception exception) {
			throw new MicroServiceException();
		}
	}

	/**
	 * This method is hitting microservice to get the details of Material type based on category id.
	 * @param categoryId
	 * @return
	 * @throws MicroServiceException 
	 */
	public List<MaterialTypeBean> hitGetTypesBasedOnCategoryId(String categoryId) throws MicroServiceException {
		LOGGER.info("Execution Started [hitGetTypesBasedOnCategoryId()] with categoryId:["+categoryId+"]");
		try {
			if (categoryId != null) {
				ResponseEntity<MaterialTypeBean[]> response = restTemplate
						.getForEntity(serviceURL + apiURLByCategoryId + categoryId, MaterialTypeBean[].class);
				List<MaterialTypeBean> materialTypeList = Arrays.asList(response.getBody());
				LOGGER.info("Execution over [hitGetTypesBasedOnCategoryId()] with categoryId:["+categoryId+"]");
				return materialTypeList;
			} else {
				return null;
			}
		} catch (Exception exception) {
			throw new MicroServiceException();
		}
	}

}
