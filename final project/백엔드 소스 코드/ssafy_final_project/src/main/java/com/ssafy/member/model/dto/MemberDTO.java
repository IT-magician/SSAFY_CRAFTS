package com.ssafy.member.model.dto;

public class MemberDTO {
	String userID;
	String userPW;
	String userName;
	String userAddr;
	
	public MemberDTO(String userID, String userPW, String userName, String userAddr) {
		super();
		this.userID = userID;
		this.userPW = userPW;
		this.userName = userName;
		this.userAddr = userAddr;
	}
	
//	public MemberDTO(String userPW, String userName, String userAddr) {
//		super();
//		this.userPW = userPW;
//		this.userName = userName;
//		this.userAddr = userAddr;
//	}

	@Override
	public String toString() {
		return "MemberDTO [userID=" + userID + ", userPW=" + userPW + ", userName=" + userName + ", userAddr="
				+ userAddr + "]";
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public String getUserPW() {
		return userPW;
	}

	public void setUserPW(String userPW) {
		this.userPW = userPW;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserAddr() {
		return userAddr;
	}

	public void setUserAddr(String userAddr) {
		this.userAddr = userAddr;
	}
	
	

}
