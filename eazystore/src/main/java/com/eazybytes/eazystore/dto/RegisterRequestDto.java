package com.eazybytes.eazystore.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegisterRequestDto {
    @NotBlank(message="Name cannot be empty")
    @Size(min=5,max=30,message="Name must be between 5 and 30 character")
    private String name;
    @NotBlank(message="email cannot be empty")
    @Email(message="Invalid email address")
    private String email;
    @NotBlank(message="mobileNumber cannot be empty")
    @Pattern(regexp = "^\\d{10}$",message = "Mobile number must be 10 digits")
    private String mobileNumber;
    @NotBlank(message="password is required")
    @Size(min=8,max=20,message="password length must be between 8 and 50 Characters")
    private String password;
}
