package com.ssafy.apartment.dao;

import java.sql.*;
import java.util.ArrayList;

import com.ssafy.apartment.dto.apartmentDTO;

public interface apartmentDAO {
	void initDBTable() throws SQLException, Exception;
	ArrayList<apartmentDTO> getApartments(String sigunguCode) throws SQLException, Exception;
	ArrayList<apartmentDTO> getApartments(String sigunguCode, String dong) throws SQLException, Exception;
	ArrayList<apartmentDTO> getUserFavorApartments(String id) throws SQLException, Exception;
	void close(AutoCloseable... a) throws Exception;
	ArrayList<String> getUserFavorSync(String id, String code) throws SQLException, Exception;
	int deleteFavApt(String id, String code, String dong) throws SQLException, Exception;
	int insertFavApt(String id, String code, String dong) throws SQLException, Exception;
}
