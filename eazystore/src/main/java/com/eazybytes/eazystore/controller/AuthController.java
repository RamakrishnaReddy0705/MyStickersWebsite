package com.eazybytes.eazystore.controller;

import com.eazybytes.eazystore.dto.*;
import com.eazybytes.eazystore.entity.Customer;
import com.eazybytes.eazystore.entity.Role;
import com.eazybytes.eazystore.repository.CustomerRepository;
import com.eazybytes.eazystore.util.JwtUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.password.CompromisedPasswordChecker;
import org.springframework.security.authentication.password.CompromisedPasswordDecision;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    //private final InMemoryUserDetailsManager inMemoryUserDetailsManager;
    private final PasswordEncoder passwordEncoder;
    private final CustomerRepository customerRepository;
    private final CompromisedPasswordChecker compromisedPasswordChecker;
    private final JwtUtil jwtUtil;
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> apiLogin(@RequestBody LoginRequestDto loginRequestDto){
       Authentication authentication= authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequestDto.username(),loginRequestDto.password()));
        var user=(Customer)authentication.getPrincipal();
        UserDto userDto=new UserDto();
        BeanUtils.copyProperties(user,userDto);
       userDto.setRoles(authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(",")));
        if (user.getAddress() != null) {
            AddressDto addressDto=new AddressDto();
            BeanUtils.copyProperties(user.getAddress(),addressDto);
            userDto.setAddress(addressDto);

        }
       String jwtToken=jwtUtil.generateJwtToken(authentication);
       //var user=(Customer)authentication.getPrincipal();


      /* userDto.setRoles(authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(",")));*/
        return ResponseEntity.status(HttpStatus.OK).body(new LoginResponseDto(HttpStatus.OK.getReasonPhrase(),userDto,jwtToken));
    }
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequestDto registerRequestDto){
        //inMemoryUserDetailsManager.createUser(new User(registerRequestDto.getEmail(),passwordEncoder.encode(registerRequestDto.getPassword()), List.of(new SimpleGrantedAuthority("USER"))));
        // var user=User.builder().userName("Kittu").password("Kittu@0705").roles("USER").build();
        // var user5=User.builder().username("Vineeth").password(passwordEncoder.encode("Vineeth@0705")).roles("JUNDEV").build();
        CompromisedPasswordDecision decision =compromisedPasswordChecker.check(registerRequestDto.getPassword());
       if(decision.isCompromised()){
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("password","Choose a better password"));
       }
        Optional<Customer> existingCustomer=customerRepository.findByEmailOrMobileNumber(registerRequestDto.getEmail(),registerRequestDto.getMobileNumber());
        if(existingCustomer.isPresent()){
            Map<String,String> errors=new HashMap<String,String>();
            Customer customer=existingCustomer.get();
            if(customer.getEmail().equalsIgnoreCase(registerRequestDto.getEmail())){
                errors.put("email","Email is already registered");

            }
            if(customer.getMobileNumber().equalsIgnoreCase(registerRequestDto.getMobileNumber())){
                errors.put("mobileNumber","Mobilenumber is already registered");
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }
        Customer customer =new Customer();
        BeanUtils.copyProperties(registerRequestDto,customer);

        customer.setPasswordHash(passwordEncoder.encode(registerRequestDto.getPassword()));
        Role role=new Role();
        role.setName("ROLE_USER");
        customer.setRoles(Set.of(role));
        customerRepository.save(customer);
        return ResponseEntity.status(HttpStatus.CREATED).body("User is created");
    }

}
