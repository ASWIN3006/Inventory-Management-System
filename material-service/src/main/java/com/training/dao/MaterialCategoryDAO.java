package com.training.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.training.entity.MaterialCategoryEntity;


public interface MaterialCategoryDAO extends JpaRepository<MaterialCategoryEntity, String>{}
