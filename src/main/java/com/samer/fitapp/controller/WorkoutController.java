package com.samer.fitapp.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.samer.fitapp.entity.Workout;
import com.samer.fitapp.service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@CrossOrigin("http://localhost:3000")
//@CrossOrigin("http://fitapp.us-east-2.elasticbeanstalk.com")
@RestController
@RequestMapping("/api/workout")
public class WorkoutController {

    private final WorkoutService workoutService;
    private final HttpClient httpClient = HttpClient.newHttpClient();
//    private final ObjectMapper objectMapper = new ObjectMapper();

//    private static final String USERINFO_URL = "https://${OKTA_ISSUER}/userinfo";


//    private static final String EMAIL_CLAIM = ${OKTA_AUDIENCE};



    @Autowired
    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

//    private String getEmailFromToken(Jwt jwt) throws Exception {
//        HttpRequest request = HttpRequest.newBuilder()
//                .uri(URI.create(USERINFO_URL))
//                .header("Authorization", "Bearer " + jwt.getTokenValue())
//                .GET()
//                .build();
//
//        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
//        JsonNode userInfo = objectMapper.readTree(response.body());
//        String email = userInfo.get("email").asText();
//        System.out.println("userEmail from /userinfo: " + email);
//        return email;
//    }

    private String getEmail(Jwt jwt) {
        return jwt.getClaimAsString("email");
    }

//    private String getEmail2(Jwt jwt) {
//        return jwt.getClaimAsString(EMAIL_CLAIM);
//    }

    @GetMapping("/byUserEmail")
    public Workout getWorkout(@AuthenticationPrincipal Jwt jwt) throws Exception {
//        String userEmail = getEmailFromToken(jwt);
//        System.out.println("email: "+ userEmail);
//        System.out.println("=== JWT CLAIMS ===");
//        jwt.getClaims().forEach((k, v) -> System.out.println(k + " : " + v));
//        System.out.println("==================");
//        System.out.println("User email from JWT claims: " + getEmail(jwt));
//        System.out.println("User email from api " + getEmail2(jwt));
        String email = getEmail(jwt);
        System.out.println("Email:"+email);
        return workoutService.getWorkouts(email);
    }

    @PostMapping("/byUserEmail")
    public Workout postWorkout(@AuthenticationPrincipal Jwt jwt,
                               @RequestBody Workout workoutRequest) throws Exception {
        String userEmail = getEmail(jwt);
        workoutRequest.setUserEmail(userEmail);
        return workoutService.postWorkout(userEmail, workoutRequest);
    }

    @PutMapping("/byUserEmail")
    public void updateWorkout(@AuthenticationPrincipal Jwt jwt,
                              @RequestBody Workout workoutRequest) throws Exception {
        String userEmail = getEmail(jwt);
        workoutService.updateWorkout(userEmail, workoutRequest);
    }

    @DeleteMapping("/byUserEmail")
    public void deleteWorkout(@AuthenticationPrincipal Jwt jwt,
                              @RequestParam Long workoutId) throws Exception {
        String userEmail = getEmail(jwt);
        workoutService.deleteWorkout(workoutId, userEmail);
    }

}
