package com.eazybytes.eazystore.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class PublicPathConfig {
    @Bean
    List<String> getPublic(){
        return List.of(
                "/api/v1/dummy/**",
                "/api/v1/products",
                "/api/v1/auth/**",
                "/error",
                "/api/v1/csrf/token");
    }
}
