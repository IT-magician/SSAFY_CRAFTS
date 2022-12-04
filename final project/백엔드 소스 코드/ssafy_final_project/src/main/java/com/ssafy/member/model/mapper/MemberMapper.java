package com.ssafy.member.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.member.model.dto.MemberDTO;

@Mapper
public interface MemberMapper {
	MemberDTO get(MemberDTO dto);
	MemberDTO check(MemberDTO dto);
	int registerMember(MemberDTO dto);
	int UpdateUserInfo(MemberDTO dto);
	int DeleteUser(String userID);

}
