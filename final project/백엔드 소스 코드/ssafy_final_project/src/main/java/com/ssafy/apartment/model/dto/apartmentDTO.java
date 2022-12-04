package com.ssafy.apartment.model.dto;

public class apartmentDTO {
	int id;
	String sigunguCode;
	String AptName;
	String AptFloor;
	String AptSize;
	String AptDong;
	String AptJibun;
	String AptPrice;
	String latY;
	String latX;
	String sidoVal;
	String gugunVal;
	@Override
	public String toString() {
		return "apartmentDTO [id=" + id + ", sigunguCode=" + sigunguCode + ", AptName=" + AptName + ", AptFloor="
				+ AptFloor + ", AptSize=" + AptSize + ", AptDong=" + AptDong + ", AptJibun=" + AptJibun + ", AptPrice="
				+ AptPrice + ", latY=" + latY + ", latX=" + latX + ", sidoVal=" + sidoVal + ", gugunVal=" + gugunVal
				+ "]";
	}
	public apartmentDTO(String sigunguCode, String aptName, String aptFloor, String aptSize, String aptDong,
			String aptJibun, String aptPrice, String latY, String latX, String sidoVal, String gugunVal) {
		super();
		this.sigunguCode = sigunguCode;
		AptName = aptName;
		AptFloor = aptFloor;
		AptSize = aptSize;
		AptDong = aptDong;
		AptJibun = aptJibun;
		AptPrice = aptPrice;
		this.latY = latY;
		this.latX = latX;
		this.sidoVal = sidoVal;
		this.gugunVal = gugunVal;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getSigunguCode() {
		return sigunguCode;
	}
	public void setSigunguCode(String sigunguCode) {
		this.sigunguCode = sigunguCode;
	}
	public String getAptName() {
		return AptName;
	}
	public void setAptName(String aptName) {
		AptName = aptName;
	}
	public String getAptFloor() {
		return AptFloor;
	}
	public void setAptFloor(String aptFloor) {
		AptFloor = aptFloor;
	}
	public String getAptSize() {
		return AptSize;
	}
	public void setAptSize(String aptSize) {
		AptSize = aptSize;
	}
	public String getAptDong() {
		return AptDong;
	}
	public void setAptDong(String aptDong) {
		AptDong = aptDong;
	}
	public String getAptJibun() {
		return AptJibun;
	}
	public void setAptJibun(String aptJibun) {
		AptJibun = aptJibun;
	}
	public String getAptPrice() {
		return AptPrice;
	}
	public void setAptPrice(String aptPrice) {
		AptPrice = aptPrice;
	}
	public String getLatY() {
		return latY;
	}
	public void setLatY(String latY) {
		this.latY = latY;
	}
	public String getLatX() {
		return latX;
	}
	public void setLatX(String latX) {
		this.latX = latX;
	}
	public String getSidoVal() {
		return sidoVal;
	}
	public void setSidoVal(String sidoVal) {
		this.sidoVal = sidoVal;
	}
	public String getGugunVal() {
		return gugunVal;
	}
	public void setGugunVal(String gugunVal) {
		this.gugunVal = gugunVal;
	}
	
	
}
