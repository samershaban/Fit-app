package com.samer.fitapp.dao;

import com.samer.fitapp.entity.Weight;
import com.samer.fitapp.entity.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    Workout findByUserEmail(@RequestParam("user_email") String userEmail);

//    Page<Note> findByUserId(@RequestParam("user_id") String userId, Pageable pageable);

//    List<Note> findByUserEmail(@RequestParam("user_email") String userEmail);

//    Workout findByIdAndUserEmail(@RequestParam("id") Long id, @RequestParam("user_email") String userEmail);
}
