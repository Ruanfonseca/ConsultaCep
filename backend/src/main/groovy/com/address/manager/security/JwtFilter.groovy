package com.address.manager.security;

import com.address.manager.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private final JwtUtil jwtUtil;
    private final LoginRepository Repository;

    public JwtFilter(JwtUtil jwtUtil, LoginRepository Repository) {
        this.jwtUtil = jwtUtil;
        this.Repository = Repository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type, Accept");
        response.setHeader("Access-Control-Allow-Credentials", "true");

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        String requestURI = request.getRequestURI();

        if (requestURI.startsWith("/api/login") || requestURI.startsWith("/api/cadastro")) {
            chain.doFilter(request, response);
            return;
        }

        String token = request.getHeader("Authorization");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.replace("Bearer ", "");
            if (jwtUtil.validateToken(token)) {
                String email = jwtUtil.extractEmail(token);
                Repository.findByEmail(email).ifPresent(login -> {
                    UserDetails loginDetails = login.withUsername(login.getEmail())
                            .password(login.getPassword())
                            .roles("LOGIN")
                            .build();
                    UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(loginDetails, null, loginDetails.getAuthorities());
                    auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(auth);
                });
            }
        }

        chain.doFilter(request, response);
    }
}
