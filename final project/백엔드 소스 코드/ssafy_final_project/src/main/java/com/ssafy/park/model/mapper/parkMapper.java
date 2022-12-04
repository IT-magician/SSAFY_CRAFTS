package com.ssafy.park.model.mapper;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.park.model.dto.parkDTO;

@Mapper
public interface parkMapper {
	List<parkDTO> getParkInfo(String P_PARK,  String AREA,  String P_ZONE);
	void insertPark(List<parkDTO> data);
	int countParks(String P_PARK);
	List<parkDTO> getParks(String P_PARK);
	long countAll();
	parkDTO searchById(long id);
}
