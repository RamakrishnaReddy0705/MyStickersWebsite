/*
package com.eazybytes.eazystore.service.impl;

import com.eazybytes.eazystore.dto.ProfileRequestDto;
import com.eazybytes.eazystore.dto.ProfileResponseDto;
import com.eazybytes.eazystore.entity.Address;
import com.eazybytes.eazystore.entity.Customer;
import com.eazybytes.eazystore.repository.CustomerRepository;
import com.eazybytes.eazystore.service.IProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements IProfileService {
    //ProfileRequestDto profileRequestDto=new ProfileRequestDto();
    private ProfileResponseDto mapCustomerToProfileResponseDto(Customer customer) {
        ProfileResponseDto profileResponseDto = new ProfileResponseDto();
        BeanUtils.copyProperties(customer, profileResponseDto);
        if (customer.getAddress() != null) {
            profileResponseDto.setStreet(customer.getAddress().getStreet());
            profileResponseDto.setCity(customer.getAddress().getCity());
            profileResponseDto.setState(customer.getAddress().getState());
            profileResponseDto.setPostalCode(customer.getAddress().getPostalCode());
            profileResponseDto.setCountry(customer.getAddress().getCountry());
        }
        return profileResponseDto;
    }
    private final CustomerRepository customerRepository;
    @Override
    public ProfileResponseDto getProfile() {
        Customer customer=  getAuthenticatedCustomer();
        ProfileResponseDto profileResponseDto=new ProfileResponseDto();
        return mapCustomerToProfileResponseDto(customer);

    }


   */
/* public ProfileResponseDto updateProfile(ProfileRequestDto profileRequestDto) {
        Customer customer = getAuthenticatedCustomer();
        boolean isEmailUpdated = !customer.getEmail().equals(profileRequestDto.getEmail().trim());
        BeanUtils.copyProperties(profileRequestDto, customer);
        Address address = customer.getAddress();
        if (address == null) {
            address = new Address();
            address.setCustomer(customer);
        }
        address.setStreet(profileRequestDto.getStreet());
        address.setCity(profileRequestDto.getCity());
        address.setState(profileRequestDto.getState());
        address.setPostalCode(profileRequestDto.getPostalCode());
        address.setCountry(profileRequestDto.getCountry());
        customer.setAddress(address);
        Customer savedCustomer = customerRepository.save(customer);
        ProfileResponseDto profileResponseDto = mapCustomerToProfileResponseDto(savedCustomer);
        profileResponseDto.setEmailUpdated(isEmailUpdated);
        return profileResponseDto;
    }*//*

    @Override
    public ProfileResponseDto updateProfile(ProfileRequestDto profileRequestDto) {
        // 1. Get the customer based on the CURRENT login (old email)
        Customer customer = getAuthenticatedCustomer();

        // 2. Determine if the email is actually changing
        // We compare current DB email with the new one from the request
        boolean isEmailUpdated = !customer.getEmail().equalsIgnoreCase(profileRequestDto.getEmail().trim());

        // 3. Map values from DTO to the existing customer entity
        // Note: Be careful with BeanUtils if it overwrites the ID or password
        customer.setName(profileRequestDto.getName());
        customer.setEmail(profileRequestDto.getEmail().trim());
        customer.setMobileNumber(profileRequestDto.getMobileNumber());

        // 4. Update Address logic
        Address address = customer.getAddress();
        if (address == null) {
            address = new Address();
            address.setCustomer(customer);
        }
        address.setStreet(profileRequestDto.getStreet());
        address.setCity(profileRequestDto.getCity());
        address.setState(profileRequestDto.getState());
        address.setPostalCode(profileRequestDto.getPostalCode());
        address.setCountry(profileRequestDto.getCountry());
        customer.setAddress(address);

        // 5. SAVE the updated customer
        Customer savedCustomer = customerRepository.save(customer);

        // 6. CRITICAL FIX: Map the 'savedCustomer' object directly to Response
        // DO NOT call getProfile() or getAuthenticatedCustomer() here
        ProfileResponseDto profileResponseDto = mapCustomerToProfileResponseDto(savedCustomer);

        // Set the flag so React knows to log the user out
        profileResponseDto.setEmailUpdated(isEmailUpdated);

        return profileResponseDto;
    }

    private Customer getAuthenticatedCustomer(){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String email=authentication.getName();
        System.out.println("Attempting to find customer with email: " + email);
        return customerRepository.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("User name not found"));

    }
}
*/
package com.eazybytes.eazystore.service.impl;

import com.eazybytes.eazystore.dto.AddressDto;
import com.eazybytes.eazystore.dto.ProfileRequestDto;
import com.eazybytes.eazystore.dto.ProfileResponseDto;
import com.eazybytes.eazystore.entity.Address;
import com.eazybytes.eazystore.entity.Customer;
import com.eazybytes.eazystore.repository.CustomerRepository;
import com.eazybytes.eazystore.service.IProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements IProfileService {

    private final CustomerRepository customerRepository;

    @Override
    public ProfileResponseDto getProfile() {
        Customer customer = getAuthenticatedCustomer();
        return mapCustomerToProfileResponseDto(customer);
    }

    @Override
    public ProfileResponseDto updateProfile(ProfileRequestDto profileRequestDto) {
        Customer customer = getAuthenticatedCustomer();
        boolean isEmailUpdated = !customer.getEmail().equals(profileRequestDto.getEmail().trim());
        BeanUtils.copyProperties(profileRequestDto, customer);
        Address address = customer.getAddress();
        if (address == null) {
            address = new Address();
            address.setCustomer(customer);
        }
        address.setStreet(profileRequestDto.getStreet());
        address.setCity(profileRequestDto.getCity());
        address.setState(profileRequestDto.getState());
        address.setPostalCode(profileRequestDto.getPostalCode());
        address.setCountry(profileRequestDto.getCountry());
        customer.setAddress(address);
        customer = customerRepository.save(customer);
        ProfileResponseDto profileResponseDto = mapCustomerToProfileResponseDto(customer);
        profileResponseDto.setEmailUpdated(isEmailUpdated);
        return profileResponseDto;
    }

    public Customer getAuthenticatedCustomer() {
        Authentication authentication =SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        System.out.print(email);
        return customerRepository.findByEmail(email).
                orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    private ProfileResponseDto mapCustomerToProfileResponseDto(Customer customer) {
        ProfileResponseDto profileResponseDto = new ProfileResponseDto();
        BeanUtils.copyProperties(customer, profileResponseDto);
        if (customer.getAddress() != null) {
            AddressDto addressDto=new AddressDto();
            BeanUtils.copyProperties(customer.getAddress(),addressDto);
            profileResponseDto.setAddress(addressDto);

        }
        return profileResponseDto;
    }
}