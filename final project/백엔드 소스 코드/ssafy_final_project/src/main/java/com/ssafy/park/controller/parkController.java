package com.ssafy.park.controller;

import java.io.IOException;
import java.util.*;

import javax.xml.parsers.ParserConfigurationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.ssafy.apartment.dao.XMLParser;
import com.ssafy.apartment.dao.kakaoMapAPI;
import com.ssafy.apartment.model.dto.gpsDTO;
import com.ssafy.park.model.dto.parkDTO;
import com.ssafy.park.model.mapper.parkMapper;
import com.ssafy.places.dao.parkDAO;

@CrossOrigin
@RestController
@RequestMapping("/park")
public class parkController {

	@Autowired
	parkMapper mapper;
		
	@Autowired
	parkDAO park = new parkDAO();
	
	@RequestMapping("/get/{id}")
	public ResponseEntity<?> searchById(@PathVariable("id") long id){
		return new ResponseEntity<parkDTO>(mapper.searchById(id),HttpStatus.OK);
	}

	@PostMapping("/get")
	public ResponseEntity<?> getPark(String P_PARK, String AREA, String P_ZONE /*, String P_LIST_CONTENT, String VISIT_ROAD, String P_ADMINTEL, String LONGITUDE, String LATITUDE */) throws SAXException, IOException, ParserConfigurationException {
		System.out.println("getPark  ==>  mapper.countAll() : " + mapper.countAll() + ", P_PARK : " + P_PARK + ", AREA : " + AREA + ", P_ZONE : " + P_ZONE);
		List<parkDTO> list = new ArrayList();
		if (mapper.countAll() == 0) {
			NodeList nList = park.get(); System.out.println("size : " + nList.getLength());
			for (int i = 0; i < Math.min(nList.getLength(), 10000);i++) {
				Node nNode = nList.item(i);
				if (nNode.getNodeType() == Node.ELEMENT_NODE) {
					Element eElement = (Element)nNode;
					String tmp_P_PARK = park.getTagValue(eElement, "P_PARK").trim();
					String tmp_P_LIST_CONTENT = park.getTagValue(eElement, "P_LIST_CONTENT") != null?park.getTagValue(eElement, "P_LIST_CONTENT").trim():null;
					String tmp_AREA = park.getTagValue(eElement, "AREA") != null?park.getTagValue(eElement, "AREA").trim():park.getTagValue(eElement, "AREA");
					String tmp_VISIT_ROAD = park.getTagValue(eElement, "VISIT_ROAD") != null?park.getTagValue(eElement, "VISIT_ROAD").trim():null;
					String tmp_P_ZONE = park.getTagValue(eElement, "P_ZONE") != null?park.getTagValue(eElement, "P_ZONE").trim():park.getTagValue(eElement, "P_ZONE");
					String tmp_P_ADMINTEL = park.getTagValue(eElement, "P_ADMINTEL") != null?park.getTagValue(eElement, "P_ADMINTEL").trim():null;
					String tmp_P_ADDR = park.getTagValue(eElement, "P_ADDR") !=null? park.getTagValue(eElement, "P_ADDR").trim():null;
					String tmp_LONGITUDE = park.getTagValue(eElement, "LONGITUDE") != null?park.getTagValue(eElement, "LONGITUDE").trim():null;
					String tmp_LATITUDE = park.getTagValue(eElement, "LATITUDE") != null?park.getTagValue(eElement, "LATITUDE").trim():null;
					list.add(new parkDTO(tmp_P_PARK, tmp_P_LIST_CONTENT, tmp_AREA, tmp_VISIT_ROAD, tmp_P_ZONE, tmp_P_ADMINTEL, tmp_P_ADDR, tmp_LONGITUDE, tmp_LATITUDE));
				}
			}
			mapper.insertPark(list);
		}
		return new ResponseEntity<List<parkDTO>>(mapper.getParkInfo(P_PARK,  AREA,  P_ZONE), HttpStatus.OK);
	}
	
	@PostMapping("/get/parks")
	public ResponseEntity<?> getParks(String P_PARK) throws SAXException, IOException, ParserConfigurationException {
		List<String> list = new ArrayList();
		if (mapper.countAll() == 0) {
			NodeList nList = park.get(); System.out.println("size : " + nList.getLength());
			for (int i = 0; i < Math.min(nList.getLength(), 10000);i++) {
				Node nNode = nList.item(i);
				if (nNode.getNodeType() == Node.ELEMENT_NODE) {
					Element eElement = (Element)nNode;
					String tmp_P_PARK = park.getTagValue(eElement, "P_PARK").trim();
					
					list.add((tmp_P_PARK));
				}
			}
		}
		return new ResponseEntity<List<parkDTO>>(mapper.getParks(P_PARK), HttpStatus.OK);
	}
	
}




