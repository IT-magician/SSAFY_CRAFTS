package com.ssafy.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

// https://oingdaddy.tistory.com/206


@CrossOrigin
@RestController
public class WelcomeController {
 
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @PostMapping("/hello")
    public String checkSimpleJWT() {
    	return "hello, you camed here!!";
    }
 
    @PostMapping("/authenticate")
    public String generateToken(AuthRequest authRequest) throws Exception {System.out.println(authRequest);
    authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(authRequest.getUserID(), authRequest.getPassword())
    );
    
        return jwtUtil.generateToken(authRequest.getUserID());
    }
}
