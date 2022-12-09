package com.ssafy.apartment.dao;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.apartment.dto.apartmentDBDTO;
import com.ssafy.apartment.dto.apartmentDTO;

@Mapper
public interface apartmentDAO {
	List<apartmentDTO> test() throws SQLException, Exception;
	List<apartmentDTO> getApartments(String sigunguCode, String dong) throws SQLException, Exception;
	int countApartments(String sigunguCode) throws SQLException, Exception;
	void insertApartments(List<apartmentDBDTO> data) throws SQLException, Exception;
	

	List<apartmentDTO> getUserRecentApartmentSearch(String id) throws SQLException, Exception;
	List<String> getUserFavorSync(String id, String code) throws SQLException, Exception;
	int deleteFavApt(String id, String code, String dong) throws SQLException, Exception;
	int insertFavApt(String id, String code, String dong) throws SQLException, Exception;
}
