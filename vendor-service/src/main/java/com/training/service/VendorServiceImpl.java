package com.training.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.training.business.bean.VendorBean;
import com.training.dao.VendorDAO;
import com.training.entity.VendorEntity;

@Service
public class VendorServiceImpl implements VendorService{

	private static final Logger logger = LoggerFactory.getLogger(VendorServiceImpl.class);
	
	/*
	 * Autowire VendorDAO object
	 * 
	 * */
	@Autowired
	private VendorDAO vendorDAO;

	
	/*
	 * Method - getVendorDetails()
	 * Use the VendorDAO to get all the vendors
	 * Check if vendors is not empty then 
	 * 		Declare VendorBean object with null value
	 * 		Loop through all the vendors 
	 * 			Create a new bean object 
	 * 			Copy each property value of entity object to bean object
	 * 			Add the bean object to the vendorBeans list
	 * */

	@Override
	public List<VendorBean> getVendorDetails() {
		List<VendorBean> vendorBeans = new ArrayList<>();
		List<VendorEntity> vendors = vendorDAO.findAll();
		if (!vendors.isEmpty()) {
			VendorBean bean = null;
			for (VendorEntity entity : vendors) {
				bean = new VendorBean();
				bean.setVendorId(entity.getVendorId());
				bean.setVendorName(entity.getVendorName());
				bean.setVendorAddress(entity.getVendorAddress());
				bean.setContactPerson(entity.getContactPerson());
				bean.setContactNumber(entity.getContactNumber());
				vendorBeans.add(bean);
			}
		}
		return vendorBeans;
	} 

}
