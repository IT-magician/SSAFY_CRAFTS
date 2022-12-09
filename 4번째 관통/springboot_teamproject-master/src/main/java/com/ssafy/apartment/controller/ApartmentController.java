package com.ssafy.apartment.controller;

import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.server.Session;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.ssafy.apartment.dto.apartmentDTO;
import com.ssafy.apartment.service.apartmentService;

@Controller
public class ApartmentController {
	@Autowired
	apartmentService service;
	
	@RequestMapping("/")
	public String root() {
		return "index";
	}
	
	@RequestMapping("/getApartment")
	public @ResponseBody ResponseEntity<?> getApartment(String sVal, String gVal, String dong) throws SQLException, Exception{
		String sigunguCode = /*sVal +*/ gVal.substring(0, 5);
		
		List<apartmentDTO> ret = service.getApartments(sigunguCode, dong);
		
		
		if (ret == null || ret.isEmpty())
			return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity<List<apartmentDTO>>(ret, HttpStatus.OK);
	}

}
