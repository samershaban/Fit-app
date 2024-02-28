package com.samer.fitapp.dao;

import com.samer.fitapp.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {

//    Page<Note> findByUserId(@RequestParam("user_id") String userId, Pageable pageable);

    List<Note> findByUserEmail(@RequestParam("user_email") String userEmail);

    Note findByIdAndUserEmail(@RequestParam("id") Long id, @RequestParam("user_email") String userEmail);
}
