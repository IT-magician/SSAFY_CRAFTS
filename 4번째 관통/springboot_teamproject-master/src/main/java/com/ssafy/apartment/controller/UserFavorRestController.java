package com.ssafy.apartment.controller;

import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.apartment.dto.apartmentDTO;
import com.ssafy.apartment.service.apartmentService;
import com.ssafy.member.dto.Member;

@RestController
@RequestMapping("/users")
public class UserFavorRestController {
	@Autowired
	apartmentService service;
	
	@RequestMapping("/syncCheckbox")
	public ResponseEntity<?> SyncUserFavors(HttpSession session, String code) throws SQLException, Exception {
		Member mem = (Member)session.getAttribute("login");
		
		String id = mem.getId();

		List<String> ret = service.getUserFavorSync(id, code);
		
		if (ret == null || ret.isEmpty())
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity(ret,HttpStatus.OK);
	}
	
	@RequestMapping("/delete")
	@DeleteMapping("/delete")
	public ResponseEntity<?>  delete(HttpSession session, String code, String dong) throws SQLException, Exception {
		Member mem = (Member)session.getAttribute("login");
		String id = mem.getId();
		
	//	id = "ssafy"; // dummy
		
		
		service.deleteFavApt(id, code, dong);
		
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@RequestMapping("/insert")
	@PutMapping("/insert")
	public ResponseEntity<?>  insert(HttpSession session, String code, String dong) throws SQLException, Exception {
		Member mem = (Member)session.getAttribute("login");
		String id = mem.getId();
		
//		id = "ssafy"; // dummy
		
		service.insertFavApt(id, code, dong);
		
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@RequestMapping("/recent_search")
	public ResponseEntity<?>  getRecentSearch(HttpSession session) throws SQLException, Exception {
		Member mem = (Member)session.getAttribute("login");
		String id = mem.getId();
		
//		id = "ssafy"; // dummy
		
		
		List<apartmentDTO> ret = service.getUserRecentApartmentSearch(id);
		
		
		if (ret == null || ret.isEmpty())
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity(ret,HttpStatus.OK);
	}
}
