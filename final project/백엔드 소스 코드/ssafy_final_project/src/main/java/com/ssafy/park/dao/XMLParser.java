package com.ssafy.park.dao;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.springframework.stereotype.Repository;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

public class XMLParser {
	private String Url = "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?";
	private String serviceKey = "serviceKey=z9xZ%2BPZeuGn2771k8ayKNK1Lk5%2Fe1xKhlJqEEtMDzxTka5y1y449ue4E7wYH2Ev2ZKX78XKb%2FvdHIwopygE9tw%3D%3D";
	
	public XMLParser() {}
	XMLParser(String serviceKey, String url) {
		this.serviceKey = serviceKey;
		this.Url = url;
	}
	
	public static String getTagValue(Element eElement, String tag) {
	    NodeList nlList = eElement.getElementsByTagName(tag).item(0).getChildNodes();
	    Node nValue = (Node) nlList.item(0);
	    if(nValue == null) 
	        return null;
	    return nValue.getNodeValue();
	}
	
	public NodeList getXML(String DEAL_YMD, String LAWD_CD/*, String pageNo, String numOfRows*/,String... pageInfo) throws SAXException, IOException, ParserConfigurationException {
		String pageNo = pageInfo.length == 0?"1":pageInfo[0];
		String numOfRows = pageInfo.length == 0?"10":pageInfo[1];
		String url = this.Url + this.serviceKey
				 + "&pageNo=" + pageNo
				 + "&numOfRows=" + numOfRows
				 + "&LAWD_CD=" + LAWD_CD
				 + "&DEAL_YMD=" + DEAL_YMD;
		
//		System.out.println(url);
		
		Document documentInfo = DocumentBuilderFactory
				.newInstance()
				.newDocumentBuilder()
				.parse(url);
		
		documentInfo.getDocumentElement().normalize();
//		System.out.println("Root element :" + documentInfo.getDocumentElement().getNodeName());
		
		NodeList nList = documentInfo.getElementsByTagName("item");
//		System.out.println("파싱할 리스트 수 : "+ nList.getLength());
		
		return nList;
		
	}
	
}
