package com.training.service;

import java.util.List;

import com.training.business.bean.MaterialTypeBean;

public interface MaterialTypeService {
	List<MaterialTypeBean> getMaterialTypesBasedOnCategoryId(String categoryId);
	List<MaterialTypeBean> getMaterialTypes();
}
