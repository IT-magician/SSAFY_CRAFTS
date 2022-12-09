package com.ssafy.member.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.member.dto.Member;
import com.ssafy.member.model.mapper.MemberMapper;

@Service
public class MemberServiceImpl implements MemberService {

	private MemberMapper memberMapper;
	
	@Autowired
	private MemberServiceImpl(MemberMapper memberMapper) {
		this.memberMapper = memberMapper;
	}
	
	@Override
	public int idCheck(String id) throws Exception {
		return memberMapper.idCheck(id);
	}

	@Override
	public void joinMember(Member member) throws Exception {
		memberMapper.joinMember(member);
	}

	@Override
	public Member loginMember(Map<String, String> map) throws Exception {
		return memberMapper.loginMember(map);
	}

	@Override
	public int updateUserInfo(Member mem) throws Exception {
		// TODO Auto-generated method stub
		return memberMapper.updateUserInfo(mem);
	}

	@Override
	public int deleteUser(String id) throws Exception {
		// TODO Auto-generated method stub
		return memberMapper.deleteUser(id);
	}
	
}
