package com.ssafy.aop;

import java.util.List;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ssafy.apartment.dao.XMLParser;
import com.ssafy.apartment.dao.apartmentDAO;
import com.ssafy.apartment.dto.apartmentDBDTO;

@Aspect
@Component
public class apartmentAspect {
	@Autowired
	apartmentDAO dao;
	
	@Autowired
	XMLParser xml_loader;
	
	@Before("execution(* com.ssafy.apartment.service.apartmentService.getApartments(..))")
	public void TryUpdate(final JoinPoint joinPoint) throws Throwable{
		Object[] parameterValues = joinPoint.getArgs();
//		System.out.println(parameterValues.length);
//		System.out.println(parameterValues[0]);
//		System.out.println("hey hey hey hey");
		
		if (dao.countApartments((String)parameterValues[0]) > 0) return;
		
		List<apartmentDBDTO> ret = xml_loader.getXML("201512", (String)parameterValues[0]);
		if (ret == null || ret.isEmpty()) return;
		
		System.out.println("from aop(insert `transaction` table with data portal(xml)) : " + ret);
		dao.insertApartments(ret);
	}
}
