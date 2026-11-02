package com.training.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/*
 *Declare fields to set or get purchaseid, transactionId, vendor name,material category id,material type id,
 *brand name, unit id,quantity,purchase amount, purchase date and status.
 *Generate toString method. Add default and parameterized constructors.
 */

@Entity
@Table(name = "purchase")
public class PurchaseEntity {
	@Id
	@Column(name="purchase_id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer purchaseId;
	@Column(name="transaction_id")
	private String transactionId;
	@Column(name="vendor_name")
	private String vendorName;
	@Column(name="material_category_id")
	private String materialCategoryId;
	@Column(name="material_type_id")
	private String materialTypeId;	
	@Column(name="brandname")
	private String brandName;
	@Column(name="unit_id")
	private String unitId;
	@Column(name="quantity")
	private int quantity;
	@Column(name="purchase_amount")
	private double purchaseAmount;
	
	
	@Temporal(TemporalType.DATE)
	@Column(name="purchase_date")
	private Date purchaseDate;
	
	@Column(name="status")
	private String status;
		
	public PurchaseEntity() {
		super();
	}

	public PurchaseEntity(Integer purchaseId, String transactionId, String vendorName, String materialCategoryId, String materialTypeId,
			String brandName, String unitId, int quantity, double purchaseAmount, Date purchaseDate, String status) {
		super();
		this.purchaseId = purchaseId;
		this.transactionId = transactionId;
		this.vendorName = vendorName;
		this.materialCategoryId = materialCategoryId;
		this.materialTypeId = materialTypeId;
		this.brandName = brandName;
		this.unitId = unitId;
		this.quantity = quantity;
		this.purchaseAmount = purchaseAmount;
		this.purchaseDate = purchaseDate;
		this.status = status;
	}

	public Integer getPurchaseId() {
		return purchaseId;
	}

	public void setPurchaseId(Integer purchaseId) {
		this.purchaseId = purchaseId;
	}	

	public String getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}

	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}

	public String getMaterialCategoryId() {
		return materialCategoryId;
	}

	public void setMaterialCategoryId(String materialCategoryId) {
		this.materialCategoryId = materialCategoryId;
	}

	public String getMaterialTypeId() {
		return materialTypeId;
	}

	public void setMaterialTypeId(String materialTypeId) {
		this.materialTypeId = materialTypeId;
	}

	public String getBrandName() {
		return brandName;
	}

	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}

	public String getUnitId() {
		return unitId;
	}

	public void setUnitId(String unitId) {
		this.unitId = unitId;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public double getPurchaseAmount() {
		return purchaseAmount;
	}

	public void setPurchaseAmount(double purchaseAmount) {
		this.purchaseAmount = purchaseAmount;
	}

	public Date getPurchaseDate() {
		return purchaseDate;
	}

	public void setPurchaseDate(Date purchaseDate) {
		this.purchaseDate = purchaseDate;
	}
	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "PurchaseEntity [purchaseId=" + purchaseId + ", transactionId="  + transactionId + ", vendorName=" + vendorName + ", materialCategoryId="
				+ materialCategoryId + ", materialTypeId=" + materialTypeId + ", brandName=" + brandName + ", status="  + status +  ", unitId="
				+ unitId + ", quantity=" + quantity + ", purchaseAmount=" + purchaseAmount + ", purchaseDate="
				+ purchaseDate + "]";
	}
	
	
	
	
}
