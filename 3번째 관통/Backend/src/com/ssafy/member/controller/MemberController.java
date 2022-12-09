package com.ssafy.member.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ssafy.member.service.MemberService;
import com.ssafy.member.service.MemberServiceImpl;

import com.ssafy.member.dto.Member;

@WebServlet({ "/user", "*.user" })
public class MemberController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private String url = "index.jsp";
	private MemberService service;

	public void init() throws ServletException {
		super.init();
		service = new MemberServiceImpl();
	}

	private void process(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		System.out.println(request.getRequestURI() + " " + request.getQueryString());
		String action = request.getParameter("action");

		try {
			if (action != null) {
				if (action.equals("insertmember")) {
					url = insertMember(request, response);
					if(url.equals("dupMember")) {
						System.out.println("same");
					}
				} else if (action.equals("insertmemberform")) {
					// System.out.println("no here~!");
					url = "member/insertForm.jsp";
				} else if (action.equals("login")) {
					url = login(request, response);
				} else if (action.equals("logout")) {
					url = logout(request, response);
				}else if(action.equals("loginFalse")) {
					url=loginFalse(request,response);
				}

			} else {
				url = "index.jsp";
			}
		} catch (Exception e) {
			e.printStackTrace();
			request.setAttribute("msg", e.getMessage());
			request.setAttribute("exception", e);
			request.setAttribute("comments", "오타는 안났니??");
			url = "error/error.jsp";
		}
		
		// 그냥 던지면 forward되고 redirect하고 싶으면 앞에다 써라 redirect:를
		if (url.startsWith("redirect")) {
			url = url.substring(url.indexOf(":") + 1);
			response.sendRedirect(url);
		} else {
			request.getRequestDispatcher(url).forward(request, response);
		}

	}

	
	private String logout(HttpServletRequest request, HttpServletResponse response) {
		request.getSession().invalidate();
		return "index.jsp";
	}

	private String loginFalse(HttpServletRequest request, HttpServletResponse response) {
		request.getSession().invalidate();
		return "index.jsp";
	}
	
	private String login(HttpServletRequest request, HttpServletResponse response)throws Exception{
			String id = request.getParameter("userid2");
			String pw = request.getParameter("userpwd2");
			
			boolean result = service.login(id, pw);
			String url = null;
			
			if(result) {
				request.getSession().setAttribute("login", id);
				System.out.println("로그인성공");
				url = "index.jsp";
			} else {
				request.getSession().setAttribute("loginVal", id);
				url = "index.jsp";
			}
			return url; 
		}


	private String insertMember(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 1. 파라미터 처리
		String id = request.getParameter("userid");
		String pw = request.getParameter("userpwd");
		String name = request.getParameter("username");
		String addr = request.getParameter("userAdr");

		System.out.println("here is this!!!!");
		System.out.println(id + " " + pw + " " + name + " " + addr);
		// 2. 로직 처리
		int pos = service.checkDB(id, pw, name, addr);
		if(pos==1) {
			url="index.jsp";
			response.setContentType("text/html; charset=UTF-8");
			PrintWriter writer = response.getWriter();
			writer.println("<script>alert('아이디, 비밀번호 정보가 중복됩니다.'); location.href='"+url+"';</script>");
			writer.close();
			
			return url;
		}
		int position = service.insertMember(id, pw, name, addr);
		System.out.println("position"+position);
		if(position==1) {
			url="index.jsp";
			response.setContentType("text/html; charset=UTF-8");
			PrintWriter writer = response.getWriter();
			writer.println("<script>alert('회원가입에 성공했습니다.'); location.href='"+url+"';</script>");
			writer.close();
			
			return url;
		}
		
		// 3. 화면 처리
		String url = "index.jsp";
		System.out.println("insertMember문 내 "+url);
		return url;
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		process(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		process(request, response);
	}
}