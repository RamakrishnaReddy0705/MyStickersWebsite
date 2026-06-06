package com.eazybytes.eazystore.config;

import com.stripe.Stripe;
import jakarta.annotation.PostConstruct;
// Corrected Import
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StripConfig {
   // private static final Logger log=  LoggerFactory.getLogger(StripConfig.class);
    @Value("${stripe.apiKey}")
    private String apiKey;
    @PostConstruct
    public void init(){
        Stripe.apiKey=apiKey;
       }



}
