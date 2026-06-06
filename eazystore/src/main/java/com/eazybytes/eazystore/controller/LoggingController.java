package com.eazybytes.eazystore.controller;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/api/v1/logging")

public class LoggingController {
    private static final Logger log= LoggerFactory.getLogger(LoggingController.class);
    @GetMapping
    public ResponseEntity<?> testLogging(){
      log.trace("This is a trace log used for tracking execuing");
        log.debug("This is a debug log used for tracking executing");
        log.info("This is a info log used for tracking executing");
        log.warn("This is a warn log used for tracking executing");
        log.error("This is a error log used for tracking executing");
        return ResponseEntity.ok().body("Logging Tested Successfully");
    }
}
