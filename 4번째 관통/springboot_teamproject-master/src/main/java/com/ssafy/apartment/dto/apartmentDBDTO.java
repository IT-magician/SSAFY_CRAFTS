package com.ssafy.apartment.dto;

public class apartmentDBDTO {
    @Override
	public String toString() {
		return "(\"" + apt + "\", \"" + floor + "\", \"" + area + "\", \"" + jibun + "\", \""
				+ dong + "\", \"" + transactionAmount + "\", \"" + sigunguCode + "\")";
	}

	String apt; // 아파트
    String floor; // 층
    String area; // 전용면적
    String jibun; // 지번
    String dong; // 법정동
    String transactionAmount; // 거래금액
    String sigunguCode; //법정동시군구코드
    
	public apartmentDBDTO(String apt, String floor, String area, String jibun, String dong, String transactionAmount,
			String sigunguCode) {
		super();
		this.apt = apt;
		this.floor = floor;
		this.area = area;
		this.jibun = jibun;
		this.dong = dong;
		this.transactionAmount = transactionAmount;
		this.sigunguCode = sigunguCode;
	}

	public String getApt() {
		return apt;
	}

	public void setApt(String apt) {
		this.apt = apt;
	}

	public String getFloor() {
		return floor;
	}

	public void setFloor(String floor) {
		this.floor = floor;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getJibun() {
		return jibun;
	}

	public void setJibun(String jibun) {
		this.jibun = jibun;
	}

	public String getDong() {
		return dong;
	}

	public void setDong(String dong) {
		this.dong = dong;
	}

	public String getTransactionAmount() {
		return transactionAmount;
	}

	public void setTransactionAmount(String transactionAmount) {
		this.transactionAmount = transactionAmount;
	}

	public String getSigunguCode() {
		return sigunguCode;
	}

	public void setSigunguCode(String sigunguCode) {
		this.sigunguCode = sigunguCode;
	}

	
}

