package com.address.manager.security

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.stereotype.Component

import io.jsonwebtoken.security.Keys

import javax.crypto.SecretKey

@Component
class JwtUtil {
    private final SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256)
    private final long expirationTime = 86400000  // 1 dia

    String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(secretKey)
                .compact()
    }

    String extractEmail(String token) {
        return Jwts.parserBuilder().setSigningKey(secretKey).build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject()
    }

    boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token)
            return true
        } catch (Exception e) {
            return false
        }
    }
}