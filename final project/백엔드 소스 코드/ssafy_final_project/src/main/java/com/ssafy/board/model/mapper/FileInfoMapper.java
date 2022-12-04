package com.ssafy.board.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.board.model.dto.BoardFileInfoDTO;

@Mapper
public interface FileInfoMapper {
	List<BoardFileInfoDTO> getAll();
	BoardFileInfoDTO get(String userID, String SaveFileName);
	int addFile(BoardFileInfoDTO file_info);
}
