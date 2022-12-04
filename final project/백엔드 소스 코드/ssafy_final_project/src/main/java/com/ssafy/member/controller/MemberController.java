package com.ssafy.member.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.board.model.dto.ArticleDTO;
import com.ssafy.member.model.dto.MemberDTO;
import com.ssafy.member.model.mapper.MemberMapper;

@CrossOrigin
@RestController
@RequestMapping("/member")
public class MemberController {
	@Autowired
	MemberMapper member_mapper;
	
	@PostMapping("/get")
	public ResponseEntity<?> getAccount(MemberDTO dto) { System.out.println("checkAccount ==>  " + dto);
		try {
			return new ResponseEntity<MemberDTO>(member_mapper.get(dto), HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
	}
	
	@PostMapping("/check")
	public ResponseEntity<?> checkAccount(MemberDTO dto) { System.out.println("checkAccount ==>  " + dto);
		Map<String, Boolean> map = new HashMap();
		
		
		try {
			map.put("isLogin", member_mapper.check(dto) != null);
			return new ResponseEntity<Map<String, Boolean>>(map, HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
	}
	
	@PostMapping("/regist")
	public ResponseEntity<?> registerMember(MemberDTO dto) { System.out.println("registerMember ==>  " + dto);
	
		try {
			member_mapper.registerMember(dto);
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
	}
	
	@PostMapping("/update")
	public ResponseEntity<?> UpdateUserInfo(MemberDTO dto) { System.out.println("UpdateUserInfo ==>  " + dto);
		try {
			member_mapper.UpdateUserInfo(dto);
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
	}
	
	@PostMapping("/delete")
	public ResponseEntity<?> DeleteUser(String userID) { System.out.println("DeleteUser ==>  " + userID);
		try {
			member_mapper.DeleteUser(userID);
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
	}

}
