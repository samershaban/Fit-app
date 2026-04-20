package com.samer.fitapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().authenticated()
                )
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(withDefaults()));
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http
//                .authorizeHttpRequests(authorize -> authorize
//                        .anyRequest().authenticated()
//                )
//                .oauth2ResourceServer(oauth2 -> oauth2
//                        .jwt(Customizer.withDefaults())
//                );
//        return http.build();
//    }

//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//
//        // Disable CSRF
//        http.csrf().disable();
//
//        // Protect endpoints at /api/<type>/secure
//        //*// Old Code
//        // Makes sure user has auth token in endpoint
//        http.authorizeRequests(configurer ->
//                        configurer
//                                .antMatchers(
//                                        "/api/notes/**"
//                                )
//                                .authenticated())
//                .oauth2ResourceServer()
//                .jwt();
//        //New Code*/
//
////        http.authorizeHttpRequests(configurer ->
////                configurer
////                        .requestMatchers("/api/books/secure/**")
////                        .authenticated())
////                .oauth2ResourceServer()
////                .jwt();
//
//        // Add CORS filters
//        http.cors();
//
//        // Add content to negotiation strategy
//        http.setSharedObject(ContentNegotiationStrategy.class,
//                new HeaderContentNegotiationStrategy());
//
//        // Force a non-empty body 401
//        Okta.configureResourceServer401ResponseBody(http);
//        return http.build();
//    }

}
