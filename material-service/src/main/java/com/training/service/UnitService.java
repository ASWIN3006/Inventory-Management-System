package com.training.service;

import java.util.List;

import com.training.business.bean.UnitBean;

public interface UnitService {
	List<UnitBean> getUnitsBasedOnCategoryId(String categoryId);
	List<UnitBean> getUnits();
}
