package com.ssafy.board.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.ssafy.apartment.model.dto.apartmentDTO;
import com.ssafy.board.model.dto.ArticleDTO;
import com.ssafy.board.model.dto.BoardFileInfoDTO;
import com.ssafy.board.model.mapper.ArticleMapper;
import com.ssafy.board.model.mapper.FileInfoMapper;

@CrossOrigin
@RestController
@RequestMapping("/board")
public class BoardController {
	@Autowired
	FileInfoMapper fileinfo_mapper;
	
	@Autowired
	ArticleMapper article_mapper;
	
	@PostMapping("/content_image")
	@Transactional(rollbackFor = {Exception.class,RuntimeException.class})
	public ResponseEntity<?> ContentImageUpload(@RequestParam("content_image") MultipartFile[] files, HttpServletRequest req, String userID) throws IOException{System.out.println("ContentImageUpload  ==>  " + userID);
		try {
			String rootDir = "C:\\final_project_fileStorage";

			String createTime = LocalDateTime.now().toString();
			File folder = new File(rootDir + File.separator + userID);
			if (!folder.exists()) folder.mkdirs();
			
			List<BoardFileInfoDTO> result = new ArrayList();
//int i = 0;			
			for (MultipartFile file:files) {//if (i++ > 0) throw new Exception();
				String uuid = UUID.randomUUID().toString();

				fileinfo_mapper.addFile(new BoardFileInfoDTO(userID, file.getOriginalFilename(),
																	uuid + "." + file.getOriginalFilename(),
																	folder.getAbsolutePath(),
																	file.getContentType(),
																	file.getSize(),
																	LocalDateTime.now().toString()));
				
				file.transferTo(new File(folder, uuid + "." + file.getOriginalFilename()));
				

				BoardFileInfoDTO dto = fileinfo_mapper.get(userID, uuid + "." + file.getOriginalFilename());
				dto.setFilePath(req.getRequestURL().toString() + "/static/" + userID + "/" + uuid + "." + file.getOriginalFilename());
				
				result.add(dto);
			}System.out.println("ContentImageUpload  ==>  " + result);
			
			return new ResponseEntity<List<BoardFileInfoDTO>>(result, HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
	}
	
	@RequestMapping("/content_image/static/{userID}/{fileName}")
	public void ContentImageDownload(@PathVariable("fileName") String fileName, @PathVariable("userID") String userID, HttpServletResponse response) throws IOException {

		BoardFileInfoDTO dto = fileinfo_mapper.get(userID, fileName); System.out.println("ContentImageDownload  ==>  " + dto + ", " + fileName + ", " + userID);
		File f = new File(dto.getFilePath(),dto.getSaveFileName());
		
		// file 다운로드 설정
        response.setContentType("application/download");
        response.setContentLength((int)f.length());
        response.setHeader("Content-disposition", "attachment;filename=\"" + dto.getFileName() + "\"");
        // response 객체를 통해서 서버로부터 파일 다운로드
        OutputStream os = response.getOutputStream();
        // 파일 입력 객체 생성
        FileInputStream fis = new FileInputStream(f);
        FileCopyUtils.copy(fis, os);
        fis.close();
        os.close();

	}
	
	@PostMapping("/write")
	public ResponseEntity<?> ContentUpload(ArticleDTO dto) {System.out.println("ContentUpload  ==>  " + dto);
		String createdTime = LocalDateTime.now().toString();
		
		try {
			article_mapper.addArticle(new ArticleDTO(dto.getUserID(), dto.getTitle(), dto.getContent(), createdTime
					, dto.getService_name(), dto.getService_item_id()
					, dto.getAptId(), dto.getAptName(), dto.getAptSidoVal(), dto.getAptGugunVal(), dto.getAptDong(), dto.getAptJibun()));
			
			return new ResponseEntity<ArticleDTO>(article_mapper.getByRegistedDate(dto.getUserID(), createdTime), HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
	}
	
	@PostMapping("/update")
	public ResponseEntity<?> ContentUpdate(ArticleDTO dto) {System.out.println("ContentUpdate  ==  >  " + dto);
		
		
		try {
			article_mapper.updateArticle(dto);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
	}
	
	@RequestMapping("/read")
	public ResponseEntity<?> ContentDownload(String userID,long id, boolean opened) {
		

		try {
			if (opened)
				article_mapper.increaseView(userID, id);
			return new ResponseEntity<ArticleDTO>(article_mapper.get(userID, id), HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
	}
	
	@RequestMapping("/delete")
	public ResponseEntity<?> ContentDelete(String userID, long id) {
		System.out.println("ContentDelete  ==>  userID : " + userID + ", id" + id);
		try {
			article_mapper.deleteArticle(userID, id);
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
	}
	
	@RequestMapping("/get/all")
	public ResponseEntity<?> ContentListAll(String service_name){
		String userID = "ssafy";
		
		try {
			return new ResponseEntity<List<ArticleDTO>>(article_mapper.getAll(service_name), HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
	}
}
