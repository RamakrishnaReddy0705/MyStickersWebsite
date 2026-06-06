package com.eazybytes.eazystore.controller;

import com.eazybytes.eazystore.scopes.RequestScopedBean;
import com.eazybytes.eazystore.scopes.SessionScopeBean;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/restScope")
@RequiredArgsConstructor
public class RequestScopeController {
    private final RequestScopedBean requestScopedBean;
    private final SessionScopeBean sessionScopeBean;
    @GetMapping("/test")
    public ResponseEntity<String> test(){
        requestScopedBean.setUserName("John Doe");
        return ResponseEntity.ok().body(requestScopedBean.getUserName());
    }
    @GetMapping("/test1")
    public ResponseEntity<String> test1(){
        //requestScopedBean.setUserName("John Doe");
        return ResponseEntity.ok().body(requestScopedBean.getUserName());
    }
    @GetMapping("/testsessionScope")
    public ResponseEntity<String> testSession(){
        sessionScopeBean.setUserName("Ramakrishna");
        return ResponseEntity.ok().body(sessionScopeBean.getUserName());
    }

}
