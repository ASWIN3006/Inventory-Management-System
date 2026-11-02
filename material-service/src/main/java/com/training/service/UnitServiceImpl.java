package com.training.service;

import java.util.ArrayList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.training.business.bean.UnitBean;
import com.training.dao.UnitDAO;
import com.training.entity.UnitEntity;

@Service
public class UnitServiceImpl implements UnitService{	
	
	/*
	 * Autowire UnitDAO object
	 * 
	 */
	@Autowired
	private UnitDAO unitDAO;
	/*
	* TODO:
	* Method getUnitsBasedOnCategoryId()
	* retrieve all the units by passing the categoryId
	* check if the list is not null
	* convert the list of entities to bean 
	* set categoryId to unit and return the list
	*/
	public List<UnitBean> getUnitsBasedOnCategoryId(String categoryId) {		
		List<UnitBean> unitBeans = new ArrayList<>();
		List<UnitEntity> entities = unitDAO.findByMaterialCategoryEntityCategoryId(categoryId);
		if (entities != null && !entities.isEmpty()) {
			UnitBean bean = null;
			for (UnitEntity entity : entities) {
				bean = new UnitBean();
				bean.setUnitId(entity.getUnitId());
				bean.setUnitName(entity.getUnitName());
				bean.setCategoryId(entity.getMaterialCategoryEntity().getCategoryId());
				unitBeans.add(bean);
			}
		}
		return unitBeans;
	}

	/*
	* TODO:
	* Method getUnitsBasedOnCategoryId()
	* retrieve all the units 
	* check if the list is not null
	* convert the list of entities to bean 
	* set categoryId to unit and return the list
	*/
	@Override
	public List<UnitBean> getUnits() {
		List<UnitBean> unitBeans = new ArrayList<>();
		List<UnitEntity> entities = unitDAO.findAll();
		if (!entities.isEmpty()) {
			UnitBean bean = null;
			for (UnitEntity entity : entities) {
				bean = new UnitBean();
				bean.setUnitId(entity.getUnitId());
				bean.setUnitName(entity.getUnitName());
				bean.setCategoryId(entity.getMaterialCategoryEntity().getCategoryId());
				unitBeans.add(bean);
			}
		}
		return unitBeans;
	}
	
}
