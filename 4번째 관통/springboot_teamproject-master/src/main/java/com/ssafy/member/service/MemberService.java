package com.ssafy.member.service;

import java.util.List;
import java.util.Map;

import com.ssafy.member.dto.Member;

public interface MemberService {
//	int insertMember(String id, String pw, String name, String adr) throws Exception;
//	int checkDB(String id, String pw, String name, String adr) throws Exception;
//	boolean login(String id, String pw) throws Exception;
	
	int idCheck(String id) throws Exception;
	void joinMember(Member member) throws Exception;
	Member loginMember(Map<String, String> map) throws Exception;
	
	
	
	int updateUserInfo(Member mem) throws Exception;
	int deleteUser(String id) throws Exception;
}