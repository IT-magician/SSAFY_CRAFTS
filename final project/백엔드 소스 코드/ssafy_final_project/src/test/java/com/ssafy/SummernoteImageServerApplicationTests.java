package com.ssafy;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.time.LocalDateTime;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.aggregator.AggregateWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.ssafy.apartment.dao.XMLParser;
import com.ssafy.apartment.dao.kakaoMapAPI;
import com.ssafy.apartment.model.dto.gpsDTO;
import com.ssafy.apartment.model.mapper.apartmentMapper;
import com.ssafy.board.model.dto.ArticleDTO;
import com.ssafy.board.model.dto.BoardFileInfoDTO;
import com.ssafy.board.model.mapper.ArticleMapper;
import com.ssafy.board.model.mapper.FileInfoMapper;
import com.ssafy.member.model.dto.MemberDTO;
import com.ssafy.member.model.mapper.MemberMapper;

@SpringBootTest
class SummernoteImageServerApplicationTests {
	@Autowired
	FileInfoMapper fileinfo_mapper;

	@Autowired
	ArticleMapper article_mapper;
	
	@Autowired
	MemberMapper member_mapper;
	
	@Autowired
	kakaoMapAPI kakao;
	
	@Autowired
	XMLParser data_portal;
	
	@Autowired
	apartmentMapper apartment_mapper;
	

	@Test
	void contextLoads() {
	}

	@Test
	void board() {
		
		
		
		
		System.out.println(apartment_mapper.getRandom());
		
		
		
		
		
		
		
		
		
//		article_mapper.increaseView("ssafy", 2);
//		System.out.println(fileinfo_mapper.get("ssafy", "d5186a9f-5951-4903-bc73-c2bb0596e7dc.home1.jpg"));

		//fileinfo_mapper.addFile(new BoardFileInfoDTO("ssafy", "abc.avi", "abc.avi", "/", "aa", 12, LocalDateTime.now().toString());
		

//		article_mapper.addArticle(new ArticleDTO("Title 또 추가한다","헤이마마 봤냐",LocalDateTime.now()));

//		System.out.println(article_mapper.getAll());
//		System.out.println(article_mapper.get("ssafy", "2022-11-20 01:33:05"));
		
//		article_mapper.updateArticle(new ArticleDTO("ssafy", "abc", "new content", "2022-11-20 01:33:05"));
	}
	
	@Test
	void member() {
//		member_mapper.registerMember(new MemberDTO("ssafy", "ssafy", "ssafy", "daejeon"));
//		System.out.println(member_mapper.check(new MemberDTO("ssafy","ssafy",null,null)));
//		System.out.println(member_mapper.check(new MemberDTO("ssafy1","ssafy",null,null)));
//		member_mapper.UpdateUserInfo(new MemberDTO("ssafy","ssafy12", "ssafy", "ssafy daejeon"));
//		member_mapper.DeleteUser("ssafy");
	}
	

	@Test
	void userDetails() {
//		System.out.println(user_mapper.getAll());
	}
	
	@Test
	void kakaoTest() throws SAXException, IOException, ParserConfigurationException {
//		System.out.println(kakao.getGPS("대전 유성구 동서대로 98-39"));
		
//		NodeList nList = data_portal.getXML("201512", "30200");
//		

//		NodeList nList = data_portal.getXML("201512", "30200");
////		
////		String code = "11";
////		if (code.length() < 10)
////			code = String.format("%1$-" + 11 + "s", code + "*").replace(' ', '0');
////		System.out.println(code);
////		
//		for (int i = 0;i < nList.getLength();i++) {
//			Node nNode = nList.item(i);
//			
//			if (nNode.getNodeType() == Node.ELEMENT_NODE) {
//				Element eElement = (Element)nNode;
////				System.out.println(data_portal.getTagValue(eElement, "아파트"));
//				
//				gpsDTO gps = kakao.getGPS("서울특별시" + " " 
//										+ "종로구" + " " 
//										+ data_portal.getTagValue(eElement, "법정동") + " " 
//										+ data_portal.getTagValue(eElement, "지번"));
//				
////				System.out.println("서울특별시" + " " 
////										+ "종로구" + " " 
////										+ data_portal.getTagValue(eElement, "법정동") + " " 
////										+ data_portal.getTagValue(eElement, "지번") + "        "
////										+gps);
//			}
//		}
	}
	
	@Test
	void apt() {
//		System.out.println(apartment_mapper.countApartments("11110"));
//		System.out.println(apartment_mapper.getApartments("11110", "내수동"));
	}

	@Test
	void insertTest() {
		// http://openAPI.seoul.go.kr:8088/686e43656b77686436334b6c6d716e/xml/SearchParkInfoService/1/1000
		
//		try {
//			parkDAO park = new parkDAO();
//			
//			NodeList nList = park.get();
//			for (int i = 0;i < nList.getLength();i++) {
//				Node nNode = nList.item(i);
//				
//				
//				if (nNode.getNodeType() == Node.ELEMENT_NODE) {
//					Element eElement = (Element)nNode;
//					System.out.println(park.getTagValue(eElement, "P_PARK"));
//				}
//			}
//			
//		} catch (Exception e) {
//			// TODO: handle exception
//			e.printStackTrace();
//		}
	}
}
