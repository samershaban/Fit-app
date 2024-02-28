package com.samer.fitapp.controller;

import com.samer.fitapp.entity.Note;
import com.samer.fitapp.service.NoteService;
import com.samer.fitapp.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
//@CrossOrigin("https://react-note-taker-63f583016776.herokuapp.com")
@RestController
@RequestMapping("/api/notes")
public class NoteController {
    private NoteService noteService;

    @Autowired
    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping("/byUserEmail")
    public List<Note> getNotes(@RequestHeader(value = "Authorization") String token)
        throws Exception{
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return noteService.getNotes(userEmail);
    }

    @PostMapping("/byUserEmail")
    public Note postNote(@RequestHeader(value = "Authorization") String token,
                         @RequestBody Note noteRequest)
        throws Exception{
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        System.out.println("userEmail:"+userEmail);
        noteRequest.setUserEmail(userEmail);
        return noteService.postNote(userEmail, noteRequest);
    }

    @PutMapping("/byUserEmail")
    public void updateNote(@RequestHeader(value = "Authorization") String token,
                           @RequestBody Note noteRequest, @RequestParam Long noteId)
            throws Exception{
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        System.out.println("userEmail:"+userEmail);
        noteService.updateNote(noteId, userEmail, noteRequest);
    }

    @DeleteMapping("/byUserEmail")
    public void deleteNote(@RequestHeader(value = "Authorization") String token,
                         @RequestParam Long noteId)
            throws Exception{
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        noteService.deleteNote(noteId, userEmail);
    }

//    @PostMapping("/add")
//    public void postMessage(@RequestBody Note noteRequest) {
//        noteService.postNote(noteRequest);
//    }
}
