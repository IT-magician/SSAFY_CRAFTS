package com.ssafy.apartment.model.dto;

public class gpsDTO {
	String latY;
	String latX;
	public gpsDTO(String latY, String latX) {
		super();
		this.latY = latY;
		this.latX = latX;
	}
	
	@Override
	public String toString() {
		return "gpsDTO [latY=" + latY + ", latX=" + latX + "]";
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

}
