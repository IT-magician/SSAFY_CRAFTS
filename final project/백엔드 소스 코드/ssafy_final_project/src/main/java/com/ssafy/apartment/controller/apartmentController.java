package com.ssafy.apartment.controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.xml.parsers.ParserConfigurationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;
import java.util.List;

import com.ssafy.apartment.dao.XMLParser;
import com.ssafy.apartment.dao.kakaoMapAPI;
import com.ssafy.apartment.model.dto.apartmentDTO;
import com.ssafy.apartment.model.dto.gpsDTO;
import com.ssafy.apartment.model.mapper.apartmentMapper;

@CrossOrigin
@RestController
@RequestMapping("/building")
public class apartmentController {
	@Autowired
	apartmentMapper mapper;

	@Autowired
	XMLParser data_portal;
	
	@Autowired
	kakaoMapAPI kakaoMap;
	
	@RequestMapping("/get/random")
	public ResponseEntity<?> getRandom(){
		return new ResponseEntity<List<apartmentDTO>>(mapper.getRandom(),HttpStatus.OK);
	}
	
	@PostMapping("/get")
	public ResponseEntity<?> getApartment(String sVal, String gVal, String dVal, String dong, String sidoVal, String gugunVal) throws SAXException, IOException, ParserConfigurationException{
		String sigunguCode = dVal==null? gVal.substring(0, 5):dVal;
System.out.println("getApartment  ==>  sVal : " + sVal + ", gVal : " + gVal + ", dVal : " + dVal + ", dong : " + dong + ", sidoVal : " + sidoVal);		


		List<apartmentDTO> list = new ArrayList();
//		System.out.println("sigunguCode : " + sigunguCode);
//mapper.getApartments("11110", null);		
		if (mapper.countApartments(sigunguCode) == 0)
		{
			NodeList nList = data_portal.getXML("201512", sigunguCode);
			
			for (int i = 0;i < nList.getLength();i++) {
				Node nNode = nList.item(i);
				
				if (nNode.getNodeType() == Node.ELEMENT_NODE) {
					Element eElement = (Element)nNode;
//					System.out.println(data_portal.getTagValue(eElement, "아파트"));
					
					gpsDTO gps = kakaoMap.getGPS(sidoVal + " " 
											+ gugunVal + " " 
											+ data_portal.getTagValue(eElement, "법정동").trim() + " " 
											+ data_portal.getTagValue(eElement, "지번").trim());
					
//					System.out.println("서울특별시" + " " 
//											+ "종로구" + " " 
//											+ data_portal.getTagValue(eElement, "법정동") + " " 
//											+ data_portal.getTagValue(eElement, "지번") + "        "
//											+gps);
//					
					list.add(new apartmentDTO(			sigunguCode,
														data_portal.getTagValue(eElement, "아파트").trim(),
														data_portal.getTagValue(eElement, "층").trim(),
														data_portal.getTagValue(eElement, "전용면적").trim(),
														data_portal.getTagValue(eElement, "법정동").trim(),
														data_portal.getTagValue(eElement, "지번").trim(),
														data_portal.getTagValue(eElement, "거래금액").trim(),
														gps!=null?gps.getLatY():null,gps!=null?gps.getLatX():null,sidoVal,gugunVal));
				}
				
				mapper.insertApartments(list);
				System.out.println("getApartment() => "+list + " => DB");
			}
		}

		list = mapper.getApartments(sigunguCode, dong);
		
//System.out.println(list);		
		return new ResponseEntity<List<apartmentDTO>>(list, HttpStatus.OK);
	}
	
	@RequestMapping("/search")
	public ResponseEntity<apartmentDTO> SearchById(String id){System.out.println("SearchById  ==>  " + id + " , " + mapper.SearchById(id));
		try {
			return new ResponseEntity<apartmentDTO>(mapper.SearchById(id), HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.badRequest().build();
		}
	}
}
