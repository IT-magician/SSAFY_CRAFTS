package com.ssafy.member.model.mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.apartment.dto.apartmentDTO;
import com.ssafy.member.dto.Member;

@Mapper
public interface MemberMapper {
	int idCheck(String userId) throws SQLException;
	void joinMember(Member member) throws SQLException;
	Member loginMember(Map<String, String> map) throws SQLException;
	
	List<Member> test() throws SQLException, Exception;

	int updateUserInfo(Member mem) throws Exception;
	int deleteUser(String id) throws Exception;
}
