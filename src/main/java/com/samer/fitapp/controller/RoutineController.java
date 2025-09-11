package com.samer.fitapp.controller;

import com.samer.fitapp.entity.Note;
import com.samer.fitapp.service.NoteService;
import com.samer.fitapp.service.RoutineService;
import com.samer.fitapp.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
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

    @PostMapping("/generate")
    public String[] generate(@Valid @RequestBody RoutineRequest request) {

//        if (request.getType() == null || request.getDaysPerWeek() == null
//                || request.getGoal() == null || request.getExperience() == null) {
//            throw new IllegalArgumentException("All fields are required");
//        }
        return routineService.generateRoutine(
                request.getType(),
                request.getDaysPerWeek(),
                request.getGoal(),
                request.getExperience()
        );
    }

    // Add new training example
    @PostMapping("/train")
    public String train(@RequestBody TrainRequest request) {
        routineService.trainExample(
                request.type,
                request.daysPerWeek,
                request.goal,
                request.experience,
                request.exerciseId
        );
        return "Model updated!";
    }

    @PostMapping("/train/bulk")
    public String trainBulk(@Valid @RequestBody BulkTrainRequest request) {
        routineService.trainBatch(request.getExamples());
        return "Bulk training completed successfully!";
    }

    // DTOs
    public static class WorkoutRequest {
        @NotBlank(message = "Type is required")
        public String type;

        @NotNull(message = "Days per week is required")
        @Min(value = 1, message = "Days per week must be at least 1")
        public int daysPerWeek;

        @NotBlank(message = "Goal is required")
        public String goal;

        @NotBlank(message = "Experience is required")
        public String experience;
    }

    public static class TrainRequest {
        public String type;
        public int daysPerWeek;
        public String goal;
        public String experience;
        public int exerciseId;
    }


}
