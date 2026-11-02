package com.training.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.training.business.bean.MaterialCategoryBean;
import com.training.dao.MaterialCategoryDAO;
import com.training.entity.MaterialCategoryEntity;

@Service
public class MaterialServiceImpl implements MaterialService {

	private static final Logger logger = LoggerFactory.getLogger(MaterialServiceImpl.class);

	
	/*
	 *TODO: Autowire MaterialCategoryDAO object
	 * 
	 * */
	@Autowired
	private MaterialCategoryDAO materialCategoryDAO;
	
	/*
	 * TODO: 
	 * Method - getMaterialCategoryById()
	 * Use MaterialCategoryDAO object findById method to fetch the entity by passing --> categoryId
	 * Check if the entity is present
	 * 		initialize the materialCategoryBean object
	 * 		copy the properties value from entity to materialCategoryBean object
	 * */
	
	@Override
	public MaterialCategoryBean getMaterialCategoryById(String categoryId) {
		MaterialCategoryBean materialCategoryBean = null;
		MaterialCategoryEntity entity = materialCategoryDAO.findById(categoryId).orElse(null);
		if (entity != null) {
			materialCategoryBean = new MaterialCategoryBean();
			materialCategoryBean.setCategoryId(entity.getCategoryId());
			materialCategoryBean.setCategoryName(entity.getCategoryName());
		}
		return materialCategoryBean;
	}

	
	/*
	 * TODO:
	 * Method - getMaterialCategories()
	 * Use the MaterialCategoryDAO to get all the MaterialCategoryEntity objects
	 * Check if list is not empty then 
	 * 		Declare a MaterialCategoryBean object with null value
	 * 		Loop through all the material categories
	 * 			Initialize a new MaterialCategoryBean object 
	 * 			Copy each property value of entity object to bean object
	 * 			Add the bean object to the materialCategoryBeans list
	 */

	
	@Override
	public List<MaterialCategoryBean> getMaterialCategories() {
		List<MaterialCategoryBean> materialCategoryBeans = new ArrayList<>();
		List<MaterialCategoryEntity> entities = materialCategoryDAO.findAll();
		if (!entities.isEmpty()) {
			MaterialCategoryBean bean = null;
			for (MaterialCategoryEntity entity : entities) {
				bean = new MaterialCategoryBean();
				bean.setCategoryId(entity.getCategoryId());
				bean.setCategoryName(entity.getCategoryName());
				materialCategoryBeans.add(bean);
			}
		}
		return materialCategoryBeans;
	}

}
