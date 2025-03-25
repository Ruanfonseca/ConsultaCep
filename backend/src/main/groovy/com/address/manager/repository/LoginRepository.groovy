package com.address.manager.repository

import com.address.manager.entity.Login
import org.springframework.data.jpa.repository.JpaRepository

interface LoginRepository extends JpaRepository<Login, Long> {
    Login findByEmail(String email)
}