package com.ssafy.apartment.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ssafy.apartment.dao.apartmentDAOImpl;
import com.ssafy.apartment.dto.apartmentDTO;

/**
 * Servlet implementation class apartmentServlet
 */
@WebServlet("*.apartmentServlet")
public class apartmentServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private apartmentDAOImpl dao = new apartmentDAOImpl();
    
    
    /**
     * Default constructor. 
     */
    public apartmentServlet() {
        // TODO Auto-generated constructor stub
    }

    /**
     * @see Servlet#init(ServletConfig)
     */
    public void init(ServletConfig config) throws ServletException {
        // TODO Auto-generated method stub
        try {
            dao.initDBTable();
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
        process(request,response);
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
        process(request,response);
    }

    private void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        
        // 넘어온 파라미터의 인코딩 설정을 UTF-8로 설정
        request.setCharacterEncoding("utf-8");
    
        // HTML이 UTF-8 형식이라는 것을 브라우저에게 전달
        response.setContentType("text/html; charset=utf-8");
    
        // 서블릿을 통해 생성되는 HTML 파일의 인코딩을 UTF-8로 설정
        response.setCharacterEncoding("utf-8");
        

//        System.out.println(request.getRequestURI() + " " + request.getQueryString());
        
        StringBuilder sb = new StringBuilder(request.getServletPath());
        sb.deleteCharAt(0);
        sb.delete(sb.indexOf("."), sb.length());

        ArrayList<apartmentDTO> list = new ArrayList();
        try {
            switch(sb.toString()) {
            case "getApartment":
                if (!request.getParameter("dVal").equals("null")) {
                    list = dao.getApartments(request.getParameter("gVal").substring(0, 5), request.getParameter("dVal"));
                }
                else if (!request.getParameter("gVal").equals("null")) {
                    list = dao.getApartments(request.getParameter("gVal").substring(0, 5));
                }
                else {
                    //list = dao.getApartments(request.getParameter("sVal").substring(0,2) + "%");
                }
                
                
                

//              System.out.println("size : " + list.size());
//              System.out.println("stringfy json + " + list.toString());
              response.getWriter().write(list.toString());
                break;
                
            ///////
            
            case "syncCheckbox":
            {
            	ArrayList<String> list1 = dao.getUserFavorSync("ssafy",request.getParameter("code"));
            	System.out.println(list1);
            	StringBuilder sb1 = new StringBuilder(list1.toString());
            	sb1.deleteCharAt(sb1.length()-1);
            	sb1.deleteCharAt(0);
            	
            	response.getWriter().write(sb1.toString());
            }
                break;
            
            //////
            case "insertApartment":
            {
            	
            	int res=-1;
            	dao.insertFavApt("ssafy", request.getParameter("code"));
            	response.getWriter().write("asdsfsadffsad2");
//            	System.out.println("insert");
            }
            	break;
            case "deleteApartment":
            {
            	int res=-1;
            	dao.deleteFavApt("ssafy", request.getParameter("code"));
            	response.getWriter().write("asdsfsadffsad1");
//            	System.out.println("delete");
            }
            	break;
            	
            case "":
            	break;
            }
            
            
        }
        catch (Exception e) {
            
        }


    }
}