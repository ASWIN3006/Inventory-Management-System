package com.training.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.training.entity.MaterialTypeEntity;

public interface MaterialTypeDAO extends JpaRepository<MaterialTypeEntity, String>{
	List<MaterialTypeEntity> findByMaterialCategoryEntityCategoryId(String categoryId);
}
