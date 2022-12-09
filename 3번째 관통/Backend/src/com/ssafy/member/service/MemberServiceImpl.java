package com.ssafy.member.service;

import java.sql.SQLException;
import java.util.List;

import com.ssafy.member.dao.MemberDAO;
import com.ssafy.member.dao.MemberDAOImpl;
import com.ssafy.member.dto.Member;

public class MemberServiceImpl implements MemberService {
	private MemberDAO dao;
	
	public MemberServiceImpl() {
		dao = new MemberDAOImpl();
	}
	
	public int insertMember(String id, String password, String name, String adr) throws Exception {
		Member m = new Member(id, password, name, adr);
		return dao.insertMember(m);
	}
	
	
	public int checkDB(String id, String password, String name, String adr) throws Exception {
		Member m = new Member(id, password, name, adr);
		return dao.checkDB(m);
	}
	
	
	public boolean login(String id, String pw) throws Exception {
		return dao.login(id, pw);
	}
}
