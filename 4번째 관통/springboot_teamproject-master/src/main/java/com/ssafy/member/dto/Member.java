package com.ssafy.member.dto;

public class Member {
	private String id;
	private String pw;
	private String name;
	private String adr;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPw() {
		return pw;
	}
	public void setPw(String pw) {
		this.pw = pw;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAdr() {
		return adr;
	}
	public void setAdr(String adr) {
		this.adr = adr;
	}
	public Member(String id, String pw, String name, String adr) {
		super();
		this.id = id;
		this.pw = pw;
		this.name = name;
		this.adr = adr;
	}
	@Override
	public String toString() {
		return "Member [id=" + id + ", pw=" + pw + ", name=" + name + ", adr=" + adr + "]";
	}
	
	
}
