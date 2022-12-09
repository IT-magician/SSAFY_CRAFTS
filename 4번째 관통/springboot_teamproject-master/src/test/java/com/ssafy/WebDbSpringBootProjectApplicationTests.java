package com.ssafy;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.sql.SQLException;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ssafy.apartment.dao.XMLParser;
import com.ssafy.apartment.dao.apartmentDAO;
import com.ssafy.apartment.service.apartmentService;

@SpringBootTest
class WebDbSpringBootProjectApplicationTests {
	@Autowired
	apartmentDAO dao;

	XMLParser xml_loader = new XMLParser();
	
	@Test
	void contextLoads() throws SQLException, Exception {
		assertNotNull(dao);
		
//		System.out.println(dao.test());
		
//		System.out.println(dao.getApartments("1", "1"));
//		System.out.println(dao.getApartments("2", null));
//
//		System.out.println(dao.countApartments("1"));
//		System.out.println(xml_loader.getXML("201512", "11110"));
		
//		dao.insertFavApt("a", "a1111", "a1");
//		dao.insertFavApt("a", "a1222", "a2");
		System.out.println(dao.getUserFavorSync("a","a1"));
//		dao.deleteFavApt("a", "a", "a");
	}
	
	@Autowired
	apartmentService service;
	
	@Test
	void aspectTest() throws SQLException, Exception {
		assertNotNull(service);
		
		service.getApartments("213465","abcd");
	}

}
