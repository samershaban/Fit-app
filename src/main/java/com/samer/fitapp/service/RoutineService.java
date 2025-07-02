package com.samer.fitapp.service;

import com.samer.fitapp.dao.NoteRepository;
import com.samer.fitapp.entity.Note;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
//@Transactional
public class RoutineService {

//    private NoteRepository noteRepository;
    public List<String> createRoutine() {
        return new ArrayList<>();
    }


//    @Autowired
//    public RoutineService(NoteRepository noteRepository) {
//        this.noteRepository = noteRepository;
//    }
}
