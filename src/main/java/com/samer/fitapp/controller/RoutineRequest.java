package com.samer.fitapp.controller;

import com.fasterxml.jackson.annotation.JsonProperty;

//import javax.validation.constraints.Min;
//import javax.validation.constraints.NotBlank;
//import javax.validation.constraints.NotNull;

public class RoutineRequest {

    private String type;
    private int daysPerWeek;
    private String goal;
    private String experience;
    private int exerciseId;

    // Getters and setters
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public int getDaysPerWeek() { return daysPerWeek; }
    public void setDaysPerWeek(int daysPerWeek) { this.daysPerWeek = daysPerWeek; }

    public String getGoal() { return goal; }
    public void setGoal(String goal) { this.goal = goal; }

    public String getExperience() { return experience; }
    public void setExperience(String experience) { this.experience = experience; }

    public int getExerciseId() {
        return exerciseId;
    }

    public void setExerciseId(int exerciseId) {
        this.exerciseId = exerciseId;
    }
}
