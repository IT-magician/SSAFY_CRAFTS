package com.ssafy;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ssafy.member.dto.Member;
import com.ssafy.member.model.mapper.MemberMapper;

@SpringBootTest
class MemberTest {

	@Autowired
	MemberMapper mapper;
	
	@Test
	void test() {
		assertNotNull(mapper);
	}
	
	@Test
	void test_login() throws Exception {
		Map<String, String> hashmap = new HashMap<String, String>();
		hashmap.put("ssafy", "ssafy");
		System.out.println("here!!!");
		System.out.println(mapper.loginMember(hashmap));
	}
	
	@Test 
	void test2() throws Exception {
		
		mapper.updateUserInfo(new Member("ssafy","1234","abcd","1sfd2"));
		mapper.deleteUser("ssafy");
	}
}
