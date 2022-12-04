package com.ssafy.places.dao;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.springframework.stereotype.Repository;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

@Repository
public class parkDAO {

	public static String getTagValue(Element eElement, String tag) {
	    NodeList nlList = eElement.getElementsByTagName(tag).item(0).getChildNodes();
	    Node nValue = (Node) nlList.item(0);
	    if(nValue == null) 
	        return null;
	    return nValue.getNodeValue();
	}
	
	public static NodeList get() {
			try {

				String uri =
					    "http://openAPI.seoul.go.kr:8088/686e43656b77686436334b6c6d716e/xml/SearchParkInfoService/1/1000";
				URL url = new URL(uri);
				HttpURLConnection connection =
				    (HttpURLConnection) url.openConnection();
				connection.setRequestMethod("GET");

				InputStream xml = connection.getInputStream();

				DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
				DocumentBuilder db = dbf.newDocumentBuilder();
				Document doc = db.parse(xml);
				doc.getDocumentElement().normalize();
				
				NodeList nList = doc.getElementsByTagName("list_total_count");
				
				if (nList.getLength() < 1) throw new Exception();			
				
				nList = doc.getElementsByTagName("row");
				return nList;
			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}
			return null;
	}

}
