package com.samer.fitapp.controller;

import com.samer.fitapp.entity.Note;
import com.samer.fitapp.service.NoteService;
import com.samer.fitapp.service.RoutineService;
import com.samer.fitapp.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
//@CrossOrigin("http://fitapp.us-east-2.elasticbeanstalk.com")
@RestController
@RequestMapping("/api/routines")
public class RoutineController {
    private RoutineService routineService;

    @Autowired
    public RoutineController(RoutineService routineService) {
        this.routineService = routineService;
    }

    @PostMapping("/create")
    public List<String> createWorkoutRoutine() {
        return routineService.createRoutine();
    }

    @GetMapping("/create")
    public List<String> getWorkoutRoutine() {
        return routineService.getRoutine();
    }


}
