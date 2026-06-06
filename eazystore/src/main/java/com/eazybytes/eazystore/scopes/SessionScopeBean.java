package com.eazybytes.eazystore.scopes;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Setter
@Getter
@Slf4j
public class SessionScopeBean {
    private String userName;
    public SessionScopeBean(){
      log.trace("SessionBean is intialized");
    }
}
