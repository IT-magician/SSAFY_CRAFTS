package com.ssafy.board.model.dto;

import java.time.LocalDateTime;

import org.springframework.boot.context.properties.ConstructorBinding;

import lombok.*;

public class ArticleDTO {
	private Long id;
	
	private String userID;
	
	private String title;
	
	private String content;
	
	private String RegisterDate;
	

	String service_name;
	String service_item_id;
	long views;
	
	String AptId;
	String AptName;
	String AptSidoVal;
	String AptGugunVal;
	String AptDong;
	String AptJibun;
	
	ArticleDTO(){}

	@Override
	public String toString() {
		return "ArticleDTO [id=" + id + ", userID=" + userID + ", title=" + title + ", content=" + content
				+ ", RegisterDate=" + RegisterDate + ", service_name=" + service_name + ", service_item_id="
				+ service_item_id + ", views=" + views + ", AptId=" + AptId + ", AptName=" + AptName + ", AptSidoVal="
				+ AptSidoVal + ", AptGugunVal=" + AptGugunVal + ", AptDong=" + AptDong + ", AptJibun=" + AptJibun + "]";
	}

	public ArticleDTO(String userID, String title, String content, String registerDate, String service_name,
			String service_item_id, String aptId, String aptName, String aptSidoVal, String aptGugunVal,
			String aptDong, String aptJibun) {
		super();
		this.userID = userID;
		this.title = title;
		this.content = content;
		RegisterDate = registerDate;
		this.service_name = service_name;
		this.service_item_id = service_item_id;
		this.views = 0;
		AptId = aptId;
		AptName = aptName;
		AptSidoVal = aptSidoVal;
		AptGugunVal = aptGugunVal;
		AptDong = aptDong;
		AptJibun = aptJibun;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getRegisterDate() {
		return RegisterDate;
	}

	public void setRegisterDate(String registerDate) {
		RegisterDate = registerDate;
	}

	public String getService_name() {
		return service_name;
	}

	public void setService_name(String service_name) {
		this.service_name = service_name;
	}

	public String getService_item_id() {
		return service_item_id;
	}

	public void setService_item_id(String service_item_id) {
		this.service_item_id = service_item_id;
	}

	public long getViews() {
		return views;
	}

	public void setViews(long views) {
		this.views = views;
	}

	public String getAptId() {
		return AptId;
	}

	public void setAptId(String aptId) {
		AptId = aptId;
	}

	public String getAptName() {
		return AptName;
	}

	public void setAptName(String aptName) {
		AptName = aptName;
	}

	public String getAptSidoVal() {
		return AptSidoVal;
	}

	public void setAptSidoVal(String aptSidoVal) {
		AptSidoVal = aptSidoVal;
	}

	public String getAptGugunVal() {
		return AptGugunVal;
	}

	public void setAptGugunVal(String aptGugunVal) {
		AptGugunVal = aptGugunVal;
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



}
