package com.ssafy.park.model.dto;

public class parkDTO {
	long id;
	String P_PARK; // 공원명
	String P_LIST_CONTENT; // 공원개요
	String AREA; // 면적
	String VISIT_ROAD; // 오시는 길
	String P_ZONE; // 지역
	String P_ADMINTEL; // 전화번호
	String P_ADDR; // 주소 
	String LONGITUDE; // X좌표 (WGS84)
	String LATITUDE; // Y좌표 (WGS84)
	public parkDTO(String p_PARK, String p_LIST_CONTENT, String aREA, String vISIT_ROAD, String p_ZONE,
			String p_ADMINTEL, String p_ADDR, String lONGITUDE, String lATITUDE) {
		super();
		this.P_PARK = p_PARK;
		this.P_LIST_CONTENT = p_LIST_CONTENT;
		this.AREA = aREA;
		this.VISIT_ROAD = vISIT_ROAD;
		this.P_ZONE = p_ZONE;
		this.P_ADMINTEL = p_ADMINTEL;
		this.P_ADDR = p_ADDR;
		this.LONGITUDE = lONGITUDE;
		this.LATITUDE = lATITUDE;
	}
	@Override
	public String toString() {
		return "parkDTO [id=" + id + ", P_PARK=" + P_PARK + ", P_LIST_CONTENT=" + P_LIST_CONTENT + ", AREA=" + AREA
				+ ", VISIT_ROAD=" + VISIT_ROAD + ", P_ZONE=" + P_ZONE + ", P_ADMINTEL=" + P_ADMINTEL + ", P_ADDR="
				+ P_ADDR + ", LONGITUDE=" + LONGITUDE + ", LATITUDE=" + LATITUDE + "]";
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getP_PARK() {
		return P_PARK;
	}
	public void setP_PARK(String p_PARK) {
		P_PARK = p_PARK;
	}
	public String getP_LIST_CONTENT() {
		return P_LIST_CONTENT;
	}
	public void setP_LIST_CONTENT(String p_LIST_CONTENT) {
		P_LIST_CONTENT = p_LIST_CONTENT;
	}
	public String getAREA() {
		return AREA;
	}
	public void setAREA(String aREA) {
		AREA = aREA;
	}
	public String getVISIT_ROAD() {
		return VISIT_ROAD;
	}
	public void setVISIT_ROAD(String vISIT_ROAD) {
		VISIT_ROAD = vISIT_ROAD;
	}
	public String getP_ZONE() {
		return P_ZONE;
	}
	public void setP_ZONE(String p_ZONE) {
		P_ZONE = p_ZONE;
	}
	public String getP_ADMINTEL() {
		return P_ADMINTEL;
	}
	public void setP_ADMINTEL(String p_ADMINTEL) {
		P_ADMINTEL = p_ADMINTEL;
	}
	public String getP_ADDR() {
		return P_ADDR;
	}
	public void setP_ADDR(String p_ADDR) {
		P_ADDR = p_ADDR;
	}
	public String getLONGITUDE() {
		return LONGITUDE;
	}
	public void setLONGITUDE(String lONGITUDE) {
		LONGITUDE = lONGITUDE;
	}
	public String getLATITUDE() {
		return LATITUDE;
	}
	public void setLATITUDE(String lATITUDE) {
		LATITUDE = lATITUDE;
	}
	
	
	
}
