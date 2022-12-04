package com.ssafy.jwt;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ssafy.member.model.dto.MemberDTO;
import com.ssafy.member.model.mapper.MemberMapper;

@Service
public class CustomUserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	MemberMapper member_mapper;

	@Override
	public UserDetails loadUserByUsername(String userID) throws UsernameNotFoundException {
		MemberDTO dto = member_mapper.get(new MemberDTO(userID, null, null, null));
        return new org.springframework.security.core.userdetails.User(dto.getUserID(), "{noop}" + dto.getUserPW(), new ArrayList<>()); // 에러(There is no PasswordEncoder mapped for the id "null") 해결 url : https://dbjh.tistory.com/79
	}

}
