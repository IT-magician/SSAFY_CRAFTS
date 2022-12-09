package com.ssafy.apartment.service;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.ssafy.apartment.dao.apartmentDAO;
import com.ssafy.apartment.dto.apartmentDTO;

public interface apartmentService {
	List<apartmentDTO> getApartments(String sigunguCode, String dong) throws SQLException, Exception;
	List<apartmentDTO> getUserRecentApartmentSearch(String id) throws SQLException, Exception;
	
	
	List<String> getUserFavorSync(String id, String code) throws SQLException, Exception;
	int deleteFavApt(String id, String code, String dong) throws SQLException, Exception;
	int insertFavApt(String id, String code, String dong) throws SQLException, Exception;
}
