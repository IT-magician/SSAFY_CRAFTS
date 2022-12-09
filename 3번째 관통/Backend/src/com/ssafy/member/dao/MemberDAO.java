package com.ssafy.member.dao;

import java.sql.SQLException;
import java.util.List;

import com.ssafy.member.dto.Member;

public interface MemberDAO {
	int insertMember(Member m) throws Exception;
	int checkDB(Member m) throws Exception;
	boolean login(String id, String pw) throws Exception;
	void initDBTable() throws SQLException;
}

