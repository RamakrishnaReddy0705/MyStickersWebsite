package com.eazybytes.eazystore.controller;

import jakarta.validation.constraints.Size;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController

@RequestMapping("api/v1/dummy")
public class DummyController{
    @GetMapping("/search")
    public ResponseEntity<String> getName( @RequestParam("name") String name1){
        return ResponseEntity.ok("The value of the name is "+name1);
    }
    @GetMapping("get/{id}")
    public ResponseEntity<String> pathExample(@PathVariable int id){
        return ResponseEntity.ok("Th is the id is "+10);
    }


}


/*
import com.eazybytes.eazystore.dto.UserDto;
import org.aspectj.weaver.loadtime.Agent;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpHeaders;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/dummy")
public class DummyController {
    @PostMapping("/create-user")
    public String createUser(@RequestBody UserDto userDto){
        System.out.print(userDto);
        return "user created successfully!";
    }

    @GetMapping("/search")
    public String searchUser(@RequestParam String name){
        return "Searching for user :"+name;
    }
    @GetMapping("/multiparams")
    public String Multiparams(@RequestParam Map<String,String> params){
        return params.get("firstname")+" "+params.get("lastname");
    }
   */
/* @GetMapping({"/user/{userId}/posts/{postId}","/user/{userId}"})
    public String getUser(@PathVariable  String userId,@PathVariable(required = false) String postId){
        return "The user id is: "+userId+"and the post id is"+postId;
    }*//*

    @GetMapping({"/user/map/{userId}/posts/{postId}","/user/map/{userId}"})
    public String getUserusingMap(@PathVariable  Map<String,String> pathvariable){
        return "The user id is: "+pathvariable.get("userId")+"and the post id is...."+pathvariable.get("postId");
    }
    @GetMapping("/headers")
    public String readHeader(@RequestHeader(name="User-Agent") String userAgent,@RequestHeader(name="User-Location",required = false) String userLocation){
        return "Received header with values"+userAgent+" : "+userLocation;

    }






}
*/
