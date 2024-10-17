package com.samer.fitapp.dao;

import com.samer.fitapp.entity.Note;
import com.samer.fitapp.entity.Weight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface WeightRepository extends JpaRepository<Weight, Long> {
    List<Weight> findByUserEmail(@RequestParam("user_email") String userEmail);

//    Page<Note> findByUserId(@RequestParam("user_id") String userId, Pageable pageable);

//    List<Note> findByUserEmail(@RequestParam("user_email") String userEmail);

    Weight findByIdAndUserEmail(@RequestParam("id") Long id, @RequestParam("user_email") String userEmail);
}
