package com.eazybytes.eazystore.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContactRequestDto {
    @NotBlank(message="Name cannot be empty")
    @Size(min=5,max=30,message="Name must be between 5 and 30 character")
    private String name;
    @NotBlank(message="email cannot be empty")
    @Email(message="Invalid email address")
    private String email;
    @NotBlank(message="mobileNumber cannot be empty")
    @Pattern(regexp = "^\\d{10}$",message = "Mobile number must be 10 digits")
    private String mobileNumber;
    @NotBlank(message="message cannot be empty")
    @Size(min=5,max=500,message="Message must be between 5 and 500 Characters")
    private String message;

}
