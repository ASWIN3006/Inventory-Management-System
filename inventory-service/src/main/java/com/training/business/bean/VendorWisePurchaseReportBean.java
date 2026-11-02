package com.training.business.bean;

import java.util.Date;


import javax.validation.constraints.NotBlank;
import org.springframework.format.annotation.DateTimeFormat;

/*
 *Declare fields to set or get from date, to date and vendor name.
  Validate the fields using spring validation annotations.
 *Generate toString method. Add default and parameterized constructors.
 */
public class VendorWisePurchaseReportBean {
	
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date fromDate;
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date toDate;
	@NotBlank
	private String vendorName;
	public VendorWisePurchaseReportBean() {
		super();
	}
	
	public VendorWisePurchaseReportBean(Date fromDate,  Date toDate, String vendorName) {
		super();
		this.fromDate = fromDate;
		this.toDate = toDate;
		this.vendorName = vendorName;
	}

	public Date getFromDate() {
		return fromDate;
	}

	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}

	public Date getToDate() {
		return toDate;
	}

	public void setToDate(Date toDate) {
		this.toDate = toDate;
	}	
	
	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}

	@Override
	public String toString() {
		return "DateWisePurchaseReportBean [fromDate=" + fromDate + ", toDate="
				+ toDate + "]  vendorName [" + vendorName + "]";
	}


}
