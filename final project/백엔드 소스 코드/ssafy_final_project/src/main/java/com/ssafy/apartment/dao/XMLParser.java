package com.ssafy.apartment.dao;

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

@Repository
public class XMLParser {
	private String Url = "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?";
	private String serviceKey = "serviceKey=z9xZ%2BPZeuGn2771k8ayKNK1Lk5%2Fe1xKhlJqEEtMDzxTka5y1y449ue4E7wYH2Ev2ZKX78XKb%2FvdHIwopygE9tw%3D%3D";

	public XMLParser(){}
	XMLParser(String Url, String serviceKey){
		this.Url = Url;
		this.serviceKey = serviceKey;
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
		
		
		
		
		
		
		
		
		
		
		
		
//		List<apartmentDBDTO> list = new LinkedList();
//		
//		for (int i = 0;i < nList.getLength();i++) {
//			Node nNode = nList.item(i);
//			if (nNode.getNodeType() == Node.ELEMENT_NODE) {
//
//				Element eElement = (Element)nNode;
////				System.out.println("######################");
////				System.out.println(getTagValue("아파트",eElement));
////				System.out.println(getTagValue("층",eElement));
////				System.out.println(getTagValue("전용면적",eElement));
////				System.out.println(getTagValue("지번",eElement));
////				System.out.println(getTagValue("법정동",eElement));
////				System.out.println(getTagValue("거래금액",eElement));
////				System.out.println(getTagValue("일련번호",eElement));
////				System.out.println(getTagValue("법정동시군구코드",eElement));
//				
//				list.add(new apartmentDBDTO(getTagValue("아파트",eElement).trim()
//										,getTagValue("층",eElement).trim()
//										,getTagValue("전용면적",eElement).trim()
//										,getTagValue("지번",eElement).trim()
//										,getTagValue("법정동",eElement).trim()
//										,getTagValue("거래금액",eElement).trim()
////										,getTagValue("일련번호",eElement).trim()
//										,getTagValue("법정동시군구코드",eElement).trim()));
//			}
//		}
//		
//		return list;
	}
}
