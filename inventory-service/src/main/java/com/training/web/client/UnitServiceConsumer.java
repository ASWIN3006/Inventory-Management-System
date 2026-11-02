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

import com.training.business.bean.UnitBean;
import com.training.exceptions.MicroServiceException;


@Service
public class UnitServiceConsumer {
	
	private static Logger LOGGER =  LoggerFactory.getLogger(UnitServiceConsumer.class);
	
	@Value("${MaterialServiceConsumer.serviceURL}")
	private String serviceURL;
	
	@Value("${UnitServiceConsumer.apiURL}")
	private String apiURL;
	
	@Value("${UnitServiceConsumer.apiURLByCategoryId}")
	private String apiURLByCategoryId;
	
	private List<UnitBean> unitBeanList;
	
	private Map<String, String> unitMap;
	
	private RestTemplate restTemplate;	
	
	public List<UnitBean> getUnitBeanList() throws MicroServiceException {
		if (unitBeanList == null) {
			hitGetUnitDetails();
		}
		return unitBeanList;
	}

	public Map<String, String> getUnitMap() throws MicroServiceException {
		if(unitMap == null) {
			unitMap = getUnitBeanList().stream()
					.collect(Collectors.toMap(UnitBean::getUnitId, UnitBean::getUnitName));
		}		
		return unitMap;
	}

	public UnitServiceConsumer(){
		restTemplate =  new RestTemplate();
	}
	
	/**
	 * This method is hitting microservice to get the list of unit.
	 * 
	 * @return
	 * @throws MicroServiceException 
	 */
	private void hitGetUnitDetails() throws MicroServiceException {
		LOGGER.info("Execution Started [hitGetUnitDetails()] ");
		try {
			ResponseEntity<UnitBean[]> response = restTemplate.getForEntity(serviceURL + apiURL,
					UnitBean[].class);
			List<UnitBean> unitList = Arrays.asList(response.getBody());
			LOGGER.info("Execution over [hitGetUnitDetails()]");
			this.unitBeanList = unitList;
		} catch (Exception exception) {
			throw new MicroServiceException();
		}
	}

	/**
	 * This method is hitting microservice to get the list of unit available for a given category id.
	 * @param categoryId
	 * @return
	 * @throws MicroServiceException 
	 */
	public List<UnitBean> hitGetUnitsByCategoryId(String categoryId) throws MicroServiceException{
		LOGGER.info("Execution Started [hitGetUnitsByCategoryId()] with categoryId:["+categoryId+"]");
		try{
			ResponseEntity<UnitBean[]> response= restTemplate.getForEntity(serviceURL+apiURLByCategoryId+categoryId, UnitBean[].class);
			List<UnitBean> unitList = Arrays.asList(response.getBody());		
			LOGGER.info("Execution over [hitGetUnitsByCategoryId()] with categoryId:["+categoryId+"]");
			return unitList;
		}catch(Exception exception){
			throw new MicroServiceException();
		}
	}




}
