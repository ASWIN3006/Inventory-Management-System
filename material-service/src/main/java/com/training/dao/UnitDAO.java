package com.training.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.training.entity.UnitEntity;

public interface UnitDAO extends JpaRepository<UnitEntity, String>{
	List<UnitEntity> findByMaterialCategoryEntityCategoryId(String categoryId);
}
