package com.eazybytes.eazystore.controller;

import com.eazybytes.eazystore.dto.ContactRequestDto;
import com.eazybytes.eazystore.dto.ProductDto;
import com.eazybytes.eazystore.service.IContactService;
import com.eazybytes.eazystore.service.IProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1/contacts")
@RequiredArgsConstructor

public class ContactController {
    private final IContactService icontactService;
    @PostMapping

    public ResponseEntity<String> saveContact(@Valid @RequestBody  ContactRequestDto contactRequestDto)  {
        boolean isSaved=icontactService.saveContact(contactRequestDto);

       if(isSaved){
           return ResponseEntity.status(HttpStatus.CREATED).body("Request Processed Successfully");
       }else{
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An Error occured please try again");
       }

    }
}
