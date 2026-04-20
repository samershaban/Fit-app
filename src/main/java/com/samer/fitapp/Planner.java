package com.samer.fitapp;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Planner {
    static Map<String, Map<String, List<String>>> exercises = new HashMap<>();

    static {
        exercises.put("chest", Map.of(
                "strength", List.of("Barbell Bench Press", "Incline Dumbbell Press"),
                "hypertrophy", List.of("Cable Flys", "Dumbbell Press"),
                "endurance", List.of("Push-Ups", "Medicine Ball Chest Throws")
        ));
        exercises.put("legs", Map.of(
                "strength", List.of("Back Squat", "Deadlift"),
                "hypertrophy", List.of("Leg Press", "Lunges"),
                "endurance", List.of("Bodyweight Squats", "Jump Lunges")
        ));
        exercises.put("back", Map.of(
                "strength", List.of("Deadlifts", "Barbell Rows"),
                "hypertrophy", List.of("Lat Pulldowns", "Seated Rows"),
                "endurance", List.of("Superman Hold", "Band Pull-Aparts")
        ));
        // Add more body parts as needed
    }

    public static void generateWorkoutRoutine(int daysOfWorkout, List<String> bodyParts, String workoutType) {
//        Collections.shuffle(bodyParts); // Randomize the order
        int partsPerDay = Math.max(1, bodyParts.size() / daysOfWorkout);

        System.out.println("Workout Plan (" + workoutType.toUpperCase() + "):");

        for (int i = 0; i < daysOfWorkout; i++) {
            System.out.println("\nDay " + (i + 1) + ":");
            int start = i * partsPerDay;
            int end = Math.min(start + partsPerDay, bodyParts.size());
            List<String> todaysParts = bodyParts.subList(start, end);

            for (String part : todaysParts) {
                System.out.println("  " + capitalize(part) + " exercises:");
                List<String> options = exercises.getOrDefault(part, Collections.emptyMap())
                        .getOrDefault(workoutType.toLowerCase(), List.of("No exercises available"));
                options.forEach(ex -> System.out.println("    - " + ex));
            }
        }
    }

    private static String capitalize(String word) {
        return word.substring(0, 1).toUpperCase() + word.substring(1);
    }

    public static void main(String[] args) {
        int daysOfWorkout = 4;
        List<String> bodyParts = List.of("chest", "legs", "back");
        String workoutType = "strength";

        generateWorkoutRoutine(daysOfWorkout, bodyParts, workoutType);
    }
}
