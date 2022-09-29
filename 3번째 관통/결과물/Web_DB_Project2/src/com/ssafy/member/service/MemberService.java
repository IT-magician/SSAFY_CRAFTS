package com.ssafy.member.service;

import java.util.List;

import com.ssafy.member.dto.Member;

public interface MemberService {
	int insertMember(String id, String pw, String name, String adr) throws Exception;
	int checkDB(String id, String pw, String name, String adr) throws Exception;
	boolean login(String id, String pw) throws Exception;
}