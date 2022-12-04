package com.ssafy.apartment.dao;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.springframework.stereotype.Repository;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.ssafy.apartment.model.dto.gpsDTO;


@Repository
public class kakaoMapAPI {

	public static String getTagValue(Element eElement, String tag) {
	    NodeList nlList = eElement.getElementsByTagName(tag).item(0).getChildNodes();
	    Node nValue = (Node) nlList.item(0);
	    if(nValue == null) 
	        return null;
	    return nValue.getNodeValue();
	}
	
	public static gpsDTO getGPS(String query) {

			
			
			try {
				String uri =
					    "https://dapi.kakao.com/v2/local/search/address.xml?query=" + URLEncoder.encode(query, "UTF-8");
				URL url = new URL(uri);
				HttpURLConnection connection =
				    (HttpURLConnection) url.openConnection();
				connection.setRequestMethod("GET");
				connection.setRequestProperty("Authorization", "KakaoAK 79c6d214ca859ea2806d6bd426ffb1fe");

				InputStream xml = connection.getInputStream();

				DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
				DocumentBuilder db = dbf.newDocumentBuilder();
				Document doc = db.parse(xml);
				doc.getDocumentElement().normalize();
				
				NodeList nList = doc.getElementsByTagName("address");
//System.out.println("query : " + query + "nList : " + nList.getLength());				
				
				Node nNode = nList.item(0);
				if (nNode.getNodeType() == Node.ELEMENT_NODE) {
					Element eElement = (Element)nNode;
					return new gpsDTO(getTagValue(eElement, "y"), getTagValue(eElement, "x"));
					
				}
			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}
			return null;
	}

}
