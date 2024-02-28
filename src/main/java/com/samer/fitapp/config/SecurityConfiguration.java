package com.samer.fitapp.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // Disable CSRF
        http.csrf().disable();

        // Protect endpoints at /api/<type>/secure
        //*// Old Code
        // Makes sure user has auth token in endpoint
        http.authorizeRequests(configurer ->
                        configurer
                                .antMatchers(
                                        "/api/notes/**"
                                )
                                .authenticated())
                .oauth2ResourceServer()
                .jwt();
        //New Code*/

//        http.authorizeHttpRequests(configurer ->
//                configurer
//                        .requestMatchers("/api/books/secure/**")
//                        .authenticated())
//                .oauth2ResourceServer()
//                .jwt();

        // Add CORS filters
        http.cors();

        // Add content to negotiation strategy
        http.setSharedObject(ContentNegotiationStrategy.class,
                new HeaderContentNegotiationStrategy());

        // Force a non-empty body 401
        Okta.configureResourceServer401ResponseBody(http);
        return http.build();
    }

}
