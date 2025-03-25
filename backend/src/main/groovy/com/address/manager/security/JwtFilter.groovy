package com.address.manager.security

import com.address.manager.repository.LoginRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

import javax.servlet.FilterChain
import javax.servlet.ServletException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
class JwtFilter extends OncePerRequestFilter {
    @Autowired
    private final JwtUtil jwtUtil
    private final LoginRepository Repository

    JwtFilter(JwtUtil jwtUtil, LoginRepository Repository) {
        this.jwtUtil = jwtUtil
        this.Repository = Repository
    }

    @Override
    void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String token = request.getHeader("Authorization")?.replace("Bearer ", "")

        if (token && jwtUtil.validateToken(token)) {
            String email = jwtUtil.extractEmail(token)
            Repository.findByEmail(email).ifPresent { login ->
                UserDetails loginDetails = login.withUsername(login.email).password(login.password).roles("LOGIN").build()
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(loginDetails, null, loginDetails.authorities)
                auth.details = new WebAuthenticationDetailsSource().buildDetails(request)
                SecurityContextHolder.context.authentication = auth
            }
        }
        chain.doFilter(request, response)
    }
}