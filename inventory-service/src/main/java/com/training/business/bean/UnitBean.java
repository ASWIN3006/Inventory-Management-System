package com.training.business.bean;

public class UnitBean {

	private String unitId;
	private String unitName;
	
	public UnitBean()
	{
		super();
	}

	public UnitBean(String unitId, String unitName) {
		super();
		this.unitId = unitId;
		this.unitName = unitName;
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

	@Override
	public String toString() {
		return "UnitBean [unitId=" + unitId + ", unitName=" + unitName + "]";
	}
	

}
