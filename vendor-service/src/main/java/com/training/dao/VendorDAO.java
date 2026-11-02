package com.training.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.training.entity.VendorEntity;

public interface VendorDAO extends JpaRepository<VendorEntity, String> {

}
