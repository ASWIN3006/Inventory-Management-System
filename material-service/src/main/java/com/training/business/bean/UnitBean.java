package com.training.business.bean;

public class UnitBean {
	private String unitId;
	private String unitName;
	private String categoryId;
	
	public UnitBean()
	{
		super();
	}

	public UnitBean(String unitId, String unitName,String categoryId) {
		super();
		this.unitId = unitId;
		this.unitName = unitName;
		this.categoryId = categoryId;
	}

	public String getUnitId() {
		return unitId;
	}

	public void setUnitId(String unitId) {
		this.unitId = unitId;
	}

	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}
	
	public String getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(String categoryId) {
		this.categoryId = categoryId;
	}

	@Override
	public String toString() {
		return "UnitBean [unitId=" + unitId + ", unitName=" + unitName + "categoryId" + categoryId +  "]";
	}
	
	
}
