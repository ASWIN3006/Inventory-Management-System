package com.training.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "vendor")
public class VendorEntity {

	@Id
	@Column(name = "vendor_id")
	private String vendorId;
	@Column(name = "vendor_name")
	private String vendorName;
	@Column(name = "vendor_address")
	private String vendorAddress;
	@Column(name = "contact_person")
	private String contactPerson;
	@Column(name = "contact_number")
	private String contactNumber;
	public VendorEntity() {
		super();
	}
	public VendorEntity(String vendorId, String vendorName, String vendorAddress, String contactPerson,
			String contactNumber) {
		super();
		this.vendorId = vendorId;
		this.vendorName = vendorName;
		this.vendorAddress = vendorAddress;
		this.contactPerson = contactPerson;
		this.contactNumber = contactNumber;
	}
	public String getContactNumber() {
		return contactNumber;
	}
	public String getContactPerson() {
		return contactPerson;
	}
	public String getVendorAddress() {
		return vendorAddress;
	}
	public String getVendorId() {
		return vendorId;
	}
	public String getVendorName() {
		return vendorName;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
	public void setContactPerson(String contactPerson) {
		this.contactPerson = contactPerson;
	}
	public void setVendorAddress(String vendorAddress) {
		this.vendorAddress = vendorAddress;
	}
	public void setVendorId(String vendorId) {
		this.vendorId = vendorId;
	}
	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}
	@Override
	public String toString() {
		return "VendorEntity [vendorId=" + vendorId + ", vendorName=" + vendorName + ", vendorAddress=" + vendorAddress
				+ ", contactPerson=" + contactPerson + ", contactNumber=" + contactNumber + "]";
	}

}
