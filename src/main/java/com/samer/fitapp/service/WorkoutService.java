package com.samer.fitapp.service;

import com.samer.fitapp.dao.WorkoutRepository;
import com.samer.fitapp.entity.Workout;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
@Transactional
public class WorkoutService {

    private WorkoutRepository workoutRepository;

    public Workout getWorkouts(String email) {

        Workout workouts = workoutRepository.findByUserEmail(email);
        return workouts;
    }

    public Workout postWorkout(String userEmail, Workout workoutRequest) {
        Workout workout = new Workout();
        workout.setUserEmail(userEmail);
        workout.setWorkout(workoutRequest.getWorkout());
        return workoutRepository.save(workoutRequest);
    }

    public void updateWorkout(String userEmail, Workout workoutRequest) throws Exception{
        Workout workout = workoutRepository.findByUserEmail(userEmail);
        if(workout == null || workout.getUserEmail() == null ) {
            throw new Exception("Workout not found");
            // return a 404 error not found
        }

        workout.setWorkout(workoutRequest.getWorkout());
        workoutRepository.save(workout);

    }

    public void deleteWorkout(Long id, String userEmail) throws Exception{
        Workout workout = workoutRepository.findByUserEmail(userEmail);
        if(workout == null || workout.getUserEmail() == null ) {
            throw new Exception("Workout record not found");
            // return a 404 error not found
        }
        workoutRepository.delete(workout);
    }

    @Autowired
    public WorkoutService(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

//    public void postNote(Note noteRequest) {
//        Note note = new Note(noteRequest.getTitle(), noteRequest.getBody(), noteRequest.getUserId());
//        workoutRepository.save(noteRequest);
//    }
}
