package com.ssafy.jwt;

public class AuthRequest {
	String userID;
	String password;
	public AuthRequest() {}
	public AuthRequest(String userID, String password) {
		super();
		this.userID = userID;
		this.password = password;
	}
	@Override
	public String toString() {
		return "AuthRequest [userID=" + userID + ", password=" + password + "]";
	}
	public String getUserID() {
		return userID;
	}
	public void setUserID(String userID) {
		this.userID = userID;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	
}
