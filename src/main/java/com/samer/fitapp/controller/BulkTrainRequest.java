package com.samer.fitapp.controller;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import java.util.List;

public class BulkTrainRequest {

    @JsonProperty("examples")
    @NotEmpty(message = "At least one training example is required")
    @Valid
    private List<RoutineRequest> examples;

    public List<RoutineRequest> getExamples() {
        return examples;
    }

    public void setExamples(List<RoutineRequest> examples) {
        this.examples = examples;
    }
}