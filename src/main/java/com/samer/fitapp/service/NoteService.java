package com.samer.fitapp.service;

import com.samer.fitapp.dao.NoteRepository;
import com.samer.fitapp.entity.Note;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
@Transactional
public class NoteService {

    private NoteRepository noteRepository;

    public List<Note> getNotes(String userEmail) {

        List<Note> books = noteRepository.findByUserEmail(userEmail);
        Collections.reverse(books);
        return books;
    }

    public Note postNote(String userEmail, Note noteRequest) {
        Note note = new Note();
        note.setTitle(noteRequest.getTitle());
        note.setBody(noteRequest.getBody());
        return noteRepository.save(noteRequest);
    }

    public void updateNote(Long noteId, String userEmail, Note noteRequest) throws Exception{
        Note note = noteRepository.findByIdAndUserEmail(noteId, userEmail);
        if(note == null || note.getId() == null ) {
            throw new Exception("Note not found");
            // return a 404 error not found
        }

        note.setTitle(noteRequest.getTitle());
        note.setBody(noteRequest.getBody());

        noteRepository.save(note);

    }

    public void deleteNote(Long noteId, String userEmail) throws Exception{
        Note note = noteRepository.findByIdAndUserEmail(noteId, userEmail);
        if(note == null || note.getId() == null ) {
            throw new Exception("Note not found");
            // return a 404 error not found
        }

        noteRepository.delete(note);


    }

    @Autowired
    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

//    public void postNote(Note noteRequest) {
//        Note note = new Note(noteRequest.getTitle(), noteRequest.getBody(), noteRequest.getUserId());
//        noteRepository.save(noteRequest);
//    }
}
