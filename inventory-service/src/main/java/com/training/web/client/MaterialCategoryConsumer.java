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

import com.training.business.bean.MaterialCategoryBean;
import com.training.exceptions.MicroServiceException;


@Service
public class MaterialCategoryConsumer {

	private static Logger LOGGER = LoggerFactory.getLogger(MaterialCategoryConsumer.class);

	@Value("${MaterialServiceConsumer.serviceURL}")
	private String serviceURL;
	@Value("${MaterialCategoryConsumer.apiURL}")
	private String apiURL;
	@Value("${MaterialCategoryConsumer.apiURLForById}")
	private String apiURLForById;
	private RestTemplate restTemplate;
	private List<MaterialCategoryBean> materialCategoryBeanList;
	private Map<String, String> categoryMap;

	public Map<String, String> getCategoryMap() throws MicroServiceException {
		if(categoryMap == null) {
			categoryMap = getMaterialCategoryBeanList().stream()
					.collect(Collectors.toMap(MaterialCategoryBean::getCategoryId, MaterialCategoryBean::getCategoryName));
		}		
		return categoryMap;
	}

	public List<MaterialCategoryBean> getMaterialCategoryBeanList() throws MicroServiceException {
		if (materialCategoryBeanList == null) {
			hitGetMaterialCategories();
		}
		return materialCategoryBeanList;
	}

	public MaterialCategoryConsumer() {
		restTemplate = new RestTemplate();
	}

	/**
	 * This method is hitting microservice to get the list of Material category.
	 * 
	 * @return
	 * @throws MicroServiceException 
	 */
	private void hitGetMaterialCategories() throws MicroServiceException {
		LOGGER.info("Execution Started [hitGetMaterialCategories()] ");
		try {
			ResponseEntity<MaterialCategoryBean[]> response = restTemplate.getForEntity(serviceURL + apiURL,
					MaterialCategoryBean[].class);
			List<MaterialCategoryBean> materialCategoryList = Arrays.asList(response.getBody());
			LOGGER.info("Execution over [hitGetMaterialCategories()]");
			this.materialCategoryBeanList = materialCategoryList;
		} catch (Exception exception) {
			throw new MicroServiceException();
		}
	}

	/**
	 * This method is hitting microservice to get the details of Material category
	 * for given category id.
	 * 
	 * @param categoryId
	 * @return
	 * @throws MicroServiceException 
	 */
	public MaterialCategoryBean hitGetMaterialCategoryById(String categoryId) throws MicroServiceException {
		LOGGER.info("Execution Started [hitGetMaterialCategoryById()] with categoryId:[" + categoryId + "]");
		try {
			ResponseEntity<MaterialCategoryBean> response = restTemplate
					.getForEntity(serviceURL + apiURLForById + categoryId, MaterialCategoryBean.class);
			MaterialCategoryBean materialCategory = response.getBody();
			LOGGER.info("Execution over [hitGetMaterialCategoryById()] with categoryId:[" + categoryId + "]");
			return materialCategory;
		} catch (Exception exception) {
			throw new MicroServiceException();
		}
	}

}
