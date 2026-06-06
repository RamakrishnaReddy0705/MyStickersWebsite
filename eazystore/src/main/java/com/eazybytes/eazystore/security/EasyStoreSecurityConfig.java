package com.eazybytes.eazystore.security;

import com.eazybytes.eazystore.Filter.JWTTokenValidatorFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.authentication.password.CompromisedPasswordChecker;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.password.HaveIBeenPwnedRestApiPasswordChecker;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.security.web.csrf.CsrfTokenRequestHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.security.Provider;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity//optional
@RequiredArgsConstructor
public class EasyStoreSecurityConfig {
    private final List<String> publicConfigs;
    @Bean

    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()).csrfTokenRequestHandler(new CsrfTokenRequestAttributeHandler())).cors(corsConfig -> corsConfig.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(req -> {
                    publicConfigs.forEach(p -> req.requestMatchers(p).permitAll());
                    req.requestMatchers("api/v1/admin/**").hasAnyRole("ADMIN");
                    req.anyRequest().hasAnyRole("USER", "ADMIN");
                  //  req.anyRequest().authenticated();
                })
                .addFilterBefore(new JWTTokenValidatorFilter(publicConfigs), BasicAuthenticationFilter.class)
                .formLogin(withDefaults())
                .httpBasic(withDefaults())

                .build();

}

/*@Bean
public UserDetailsService userDetailsService(PasswordEncoder passwordEncoder){
    var user1=User.builder().username("Ramakrishna").password(passwordEncoder.encode("Kittu@0705")).roles("USER").build();
    var user2=User.builder().username("Rakesh").password(passwordEncoder.encode("Rakesh@0705")).roles("DEV").build();
    var user3=User.builder().username("Praveen").password(passwordEncoder.encode("Pavs@0705")).roles("TEST").build();
    var user4=User.builder().username("Vamshi").password(passwordEncoder.encode("Vamshi@0705")).roles("MANAGER").build();
    var user5=User.builder().username("Vineeth").password(passwordEncoder.encode("Vineeth@0705")).roles("JUNDEV").build();
    return new InMemoryUserDetailsManager(user1,user2,user3,user4,user5);
}*/
@Bean
public AuthenticationManager authenticationManager(AuthenticationProvider authenticationProvider){

        var providerManager=new ProviderManager(authenticationProvider);


    return providerManager;

}
@Bean
    CompromisedPasswordChecker compromisedPasswordChecker(){
    return new HaveIBeenPwnedRestApiPasswordChecker();
}

@Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
}
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
        config.setAllowedMethods(Collections.singletonList("*"));
        config.setAllowedHeaders(Collections.singletonList("*"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

}


