package com.training.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.training.entity.PurchaseEntity;

public interface ReportsDAO extends JpaRepository<PurchaseEntity, Integer> {

    @Query("SELECT p FROM PurchaseEntity p " +
           "WHERE p.purchaseDate BETWEEN :fromDate AND :toDate " +
           "AND p.vendorName = :vendorName")
    List<PurchaseEntity> getVendorWisePurchaseDetails(
            @Param("fromDate") Date fromDate,
            @Param("toDate") Date toDate,
            @Param("vendorName") String vendorName);

}