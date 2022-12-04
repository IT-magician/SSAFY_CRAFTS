package com.ssafy.apartment.model.mapper;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.apartment.model.dto.apartmentDTO;

@Mapper
public interface apartmentMapper {
	List<apartmentDTO> getApartments(String sigunguCode, String dong);
	int countApartments(String sigunguCode);
	void insertApartments(List<apartmentDTO> data);
	apartmentDTO SearchById(String id);
	List<apartmentDTO> getRandom();
}
