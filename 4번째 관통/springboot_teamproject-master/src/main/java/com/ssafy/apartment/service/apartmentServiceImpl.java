package com.ssafy.apartment.service;

import java.sql.SQLException;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.apartment.dao.XMLParser;
import com.ssafy.apartment.dao.apartmentDAO;
import com.ssafy.apartment.dto.apartmentDTO;


/*
 * getApartments함수들은 공통관심사를 추가할거야. 그건 바로 해당 select문을 했을 때, 데이터가 없으면 공공데이터로 받아와서 넣을수있는지를 시도하는거야.
 * 
 * */

@Service
public class apartmentServiceImpl implements apartmentService {
	@Autowired
	apartmentDAO dao;
	
	//@ default year + day
	public final String default_DEAL_YMD = "201512";
	
	XMLParser xml = new XMLParser();


	@Override
	public List<apartmentDTO> getApartments(String sigunguCode, String dong) throws SQLException, Exception {
		// TODO Auto-generated method stub
		return dao.getApartments(sigunguCode, dong);
	}
	
	@Override
	public List<apartmentDTO> getUserRecentApartmentSearch(String id) throws SQLException, Exception {
		// TODO Auto-generated method stub
		return dao.getUserRecentApartmentSearch(id);
	}

	@Override
	public List<String> getUserFavorSync(String id, String code) throws SQLException, Exception {
		// TODO Auto-generated method stub
		return dao.getUserFavorSync(id, code);
	}

	@Override
	public int deleteFavApt(String id, String code, String dong) throws SQLException, Exception {
		// TODO Auto-generated method stub
		return dao.deleteFavApt(id, code, dong);
	}

	@Override
	public int insertFavApt(String id, String code, String dong) throws SQLException, Exception {
		// TODO Auto-generated method stub
		return dao.insertFavApt(id, code, dong);
	}

}
