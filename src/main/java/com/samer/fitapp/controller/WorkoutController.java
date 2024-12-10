package com.samer.fitapp.controller;

import com.samer.fitapp.entity.Workout;
import com.samer.fitapp.service.WorkoutService;
import com.samer.fitapp.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

//@CrossOrigin("http://localhost:3000")
@CrossOrigin("http://fitapp.us-east-2.elasticbeanstalk.com")
@RestController
@RequestMapping("/api/workout")
public class WorkoutController {
    private WorkoutService workoutService;

    @Autowired
    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    @GetMapping("/byUserEmail")
    public Workout getWorkout(@RequestHeader(value = "Authorization") String token)
        throws Exception{
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return workoutService.getWorkouts(userEmail);
    }

    @PostMapping("/byUserEmail")
    public Workout postWorkout(@RequestHeader(value = "Authorization") String token,
                         @RequestBody Workout workoutRequest)
        throws Exception{
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        workoutRequest.setUserEmail(userEmail);
        return workoutService.postWorkout(userEmail, workoutRequest);
    }

    @PutMapping("/byUserEmail")
    public void updateWorkout(@RequestHeader(value = "Authorization") String token,
                           @RequestBody Workout workoutRequest)
            throws Exception{
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        System.out.println("userEmail:"+userEmail);
        workoutService.updateWorkout(userEmail, workoutRequest);
    }

    @DeleteMapping("/byUserEmail")
    public void deleteNote(@RequestHeader(value = "Authorization") String token,
                         @RequestParam Long workoutId)
            throws Exception{
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        workoutService.deleteWorkout(workoutId, userEmail);
    }

}
