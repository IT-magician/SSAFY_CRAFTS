package com.ssafy.apartment.dto;

public class apartmentDTO {
    String apt; // 아파트
    String floor; // 층
    String area; // 전용면적
    String dong; // 법정동
    String transactionAmount; // 거래금액
    String jibun; // 지번
	@Override
	public String toString() {
		return "{\"apt\":" + apt
				+ ", \"floor\":" + floor
				+ ", \"area\":" + area
				+ ", \"dong\":" + dong
				+ ", \"transactionAmount\":" + transactionAmount
				+ ", \"jibun\":" + jibun + "}";
	}
	public apartmentDTO(String apt, String floor, String area, String dong, String transactionAmount, String jibun) {
		super();
		this.apt = "\"" + apt + "\"";
		this.floor = "\"" + floor + "\"";
		this.area = "\"" + area + "\"";
		this.dong = "\"" + dong + "\"";
		this.transactionAmount = "\"" + transactionAmount + "\"";
		this.jibun = "\"" + jibun + "\"";
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
    
    
}

