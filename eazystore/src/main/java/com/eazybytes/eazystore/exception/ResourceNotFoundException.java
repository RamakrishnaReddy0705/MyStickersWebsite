package com.eazybytes.eazystore.exception;

public class ResourceNotFoundException extends RuntimeException{
    public ResourceNotFoundException(String resourcename,String fileldName,String fieldValue){
        super(String.format("%s not found with the given input data %s:'%s'",resourcename,fileldName,fieldValue));
    }
}
