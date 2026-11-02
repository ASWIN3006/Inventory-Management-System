package com.training.business.bean;

import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.NumberFormat;


/*
 *Declare fields to set or get purchaseid, transactionId, vendor name,material category id,material type id,
 *brand name, unit id,quantity,purchase amount, balance, purchase date,material category name,
	material type name,material unit name and status.
	Participant TODO: Add spring validation annotations for mandatory fields.
 *Generate toString method. Add default and parameterized constructors.
 */
public class PurchaseBean {

	private Integer purchaseId;
    private String transactionId;
	@NotBlank(message = "Vendor name is a required field.")
	private String vendorName;
	@NotBlank(message = "Material category is a required field.")
	private String materialCategoryId;
	@NotBlank(message = "Material type is a required field.")
	private String materialTypeId;
	@NotBlank(message = "Brand name is a required field.")
	private String brandName;
	@NotBlank(message = "Unit is a required field.")
	private String unitId;
	@NotNull(message = "Quantity is a required field.")
	private Integer quantity;
	@NotNull(message = "Purchase amount is a required field.")
    private Double purchaseAmount;
    @NumberFormat
	private Double balance;
    @DateTimeFormat(pattern="yyyy-MM-dd")
	@NotNull(message = "PurchaseDate is a required field.")
	@Past
	private Date purchaseDate;
	private String materialCategoryName;
	private String materialTypeName;
	private String materialUnitName;
	private String status;
		
	public PurchaseBean() {
		super();
	}

	public PurchaseBean(Integer purchaseId, String transactionId, String vendorName, String materialCategoryId, String materialTypeId,Double balance,
			String brandName, String unitId, Integer quantity, Double purchaseAmount, Date purchaseDate,String materialCategoryName, String materialTypeName, String materialUnitName, String status) {
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
		this.materialCategoryName = materialCategoryName;
		this.materialTypeName = materialTypeName;
		this.materialUnitName = materialUnitName;
		this.status = status;
		this.balance = balance;
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

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Double getPurchaseAmount() {
		return purchaseAmount;
	}

	public void setPurchaseAmount(Double purchaseAmount) {
		this.purchaseAmount = purchaseAmount;
	}

	public Date getPurchaseDate() {
		return purchaseDate;
	}

	public void setPurchaseDate(Date purchaseDate) {
		this.purchaseDate = purchaseDate;
	}	

	public String getMaterialCategoryName() {
		return materialCategoryName;
	}

	public void setMaterialCategoryName(String materialCategoryName) {
		this.materialCategoryName = materialCategoryName;
	}
	
	public String getMaterialTypeName() {
		return materialTypeName;
	}

	public void setMaterialTypeName(String materialTypeName) {
		this.materialTypeName = materialTypeName;
	}

	public String getMaterialUnitName() {
		return materialUnitName;
	}

	public void setMaterialUnitName(String materialUnitName) {
		this.materialUnitName = materialUnitName;
	}
	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}	

	public Double getBalance() {
		return balance;
	}

	public void setBalance(Double balance) {
		this.balance = balance;
	}

	@Override
	public String toString() {
		return "PurchaseBean [purchaseId=" + purchaseId + ", transactionId=" + transactionId + ", balance=" + balance + ", vendorName="
				+ vendorName + ", materialCategoryId=" + materialCategoryId + ", materialTypeId=" + materialTypeId
				+ ", brandName=" + brandName + ", unitId=" + unitId + ", quantity=" + quantity + ", purchaseAmount="
				+ purchaseAmount + ", purchaseDate=" + purchaseDate + ", materialCategoryName=" + materialCategoryName
				+ ", materialTypeName=" + materialTypeName + ", materialUnitName=" + materialUnitName + ", status="
				+ status + "]";
	}


	
}
