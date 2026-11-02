package com.training.service;

import java.util.List;

import com.training.business.bean.MaterialCategoryBean;

public interface MaterialService {
	MaterialCategoryBean getMaterialCategoryById(String categoryId);
	List<MaterialCategoryBean> getMaterialCategories();
}
