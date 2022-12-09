package com.ssafy.member.controller;

import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ssafy.member.dto.Member;
import com.ssafy.member.service.MemberService;

@Controller
public class MemberController {

	private final Logger logger = LoggerFactory.getLogger(MemberController.class);
	private MemberService memberService;

	@Autowired
	public MemberController(MemberService memberService) {
		this.memberService = memberService;
	}

	@RequestMapping("/login")
	public String login(@RequestParam Map<String, String> map, Model model, HttpSession session,
			HttpServletResponse response) {
		System.out.println(map);
		logger.debug("map : {}", map.get("id"));

		try {
			Member member = memberService.loginMember(map);

			if (member != null) {
				session.setAttribute("login", member);

				return "redirect:/";
			}

		} catch (Exception e) {
			e.printStackTrace();
			model.addAttribute("msg", "로그인 중 문제발생!!!");
			return "error/error";
		}
		return "redirect:/";
	}

	@GetMapping("/logout")
	public String logout(HttpSession session) {
		session.invalidate();
		return "redirect:/";
	}

	@RequestMapping("/members/join")
	public @ResponseBody ResponseEntity<?> join(Member member, Model model) {

		logger.debug("member info : {}", member);
		try {
			memberService.joinMember(member);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Void>(HttpStatus.SERVICE_UNAVAILABLE);
		}
	}

	@PostMapping("/members/update")
	public @ResponseBody ResponseEntity<?> updateUserInfo(HttpSession session, Member mem) {
		
		
		if ((Member) session.getAttribute("login") == null)
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);

		try {
			memberService.updateUserInfo(mem);
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<Void>(HttpStatus.SERVICE_UNAVAILABLE);
		}

		return new ResponseEntity<Void>(HttpStatus.OK);

	}
	
	@PostMapping("/members/delete")
	public @ResponseBody ResponseEntity<?> deleteUser(HttpSession session, Member mem) {
		if ((Member) session.getAttribute("login") == null)
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);

		try {
			memberService.deleteUser(mem.getId());
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<Void>(HttpStatus.SERVICE_UNAVAILABLE);
		}

		return new ResponseEntity<Void>(HttpStatus.OK);

	}
	
}