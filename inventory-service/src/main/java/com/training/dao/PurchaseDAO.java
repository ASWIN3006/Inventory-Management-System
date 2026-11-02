package com.training.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.training.entity.PurchaseEntity;

public interface PurchaseDAO extends JpaRepository<PurchaseEntity, Integer> {
}