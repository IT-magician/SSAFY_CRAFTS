package com.ssafy.board.model.dto;

import java.time.LocalDateTime;

import lombok.*;

@Setter
@Getter
//@Data
public class BoardFileInfoDTO {
	private Long id;
	
	private String userID;
	
	private String FileName;                //img.jpg
	
	private String SaveFileName;            //uuid_img.jpg
	
	private String FilePath;                // D:/image/uuid_img.jpg

	private String ContentType;             // image/jpeg
	
	private long FileSize;                      // 4476873 (byte)
	
	private String RegisterDate;     // 2022-11-19 14:07:24.xxx

	BoardFileInfoDTO(){};
	

	public BoardFileInfoDTO(String userID, String fileName, String saveFileName, String filePath, String contentType,
			long fileSize, String registerDate) {
		super();
		this.userID = userID;
		FileName = fileName;
		SaveFileName = saveFileName;
		FilePath = filePath;
		ContentType = contentType;
		FileSize = fileSize;
		RegisterDate = registerDate;
	}


	@Override
	public String toString() {
		return "BoardFileInfoDTO [FileName=" + FileName + ", SaveFileName=" + SaveFileName + ", FilePath=" + FilePath
				+ ", ContentType=" + ContentType + ", FileSize=" + FileSize + ", RegisterDate=" + RegisterDate + "]";
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getUserID() {
		return userID;
	}


	public void setUserID(String userID) {
		this.userID = userID;
	}


	public String getFileName() {
		return FileName;
	}


	public void setFileName(String fileName) {
		FileName = fileName;
	}


	public String getSaveFileName() {
		return SaveFileName;
	}


	public void setSaveFileName(String saveFileName) {
		SaveFileName = saveFileName;
	}


	public String getFilePath() {
		return FilePath;
	}


	public void setFilePath(String filePath) {
		FilePath = filePath;
	}


	public String getContentType() {
		return ContentType;
	}


	public void setContentType(String contentType) {
		ContentType = contentType;
	}


	public long getFileSize() {
		return FileSize;
	}


	public void setFileSize(long fileSize) {
		FileSize = fileSize;
	}


	public String getRegisterDate() {
		return RegisterDate;
	}


	public void setRegisterDate(String registerDate) {
		RegisterDate = registerDate;
	}
	
	
}
