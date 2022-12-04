package com.ssafy.board.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.board.model.dto.ArticleDTO;

@Mapper
public interface ArticleMapper {
	List<ArticleDTO> getAll(String service_name);
	ArticleDTO get(String userID, long id);
	ArticleDTO getByRegistedDate(String userID, String registedDate);
	int addArticle(ArticleDTO article);
	int updateArticle(ArticleDTO article);
	int deleteArticle(String userID, long id);
	int increaseView(String userID, long id);
}
