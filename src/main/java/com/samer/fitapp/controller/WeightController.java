package com.samer.fitapp.controller;

import com.samer.fitapp.entity.Weight;
import com.samer.fitapp.service.WeightService;
import com.samer.fitapp.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin("http://localhost:3000")
//@CrossOrigin("http://fitapp.us-east-2.elasticbeanstalk.com")
@RestController
@RequestMapping("/api/weights")
public class WeightController {
    private WeightService weightService;

    @Autowired
    public WeightController(WeightService weightService) {
        this.weightService = weightService;
    }

    @GetMapping("/byUserEmail")
    public List<Weight> getNotes(@RequestHeader(value = "Authorization") String token)
        throws Exception{
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return weightService.getWeights(userEmail);
    }

    @PostMapping("/byUserEmail")
    public Weight postWeight(@RequestHeader(value = "Authorization") String token,
                         @RequestBody Weight weightRequest)
        throws Exception{
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        System.out.println("userEmail:"+userEmail);
        weightRequest.setUserEmail(userEmail);
        Date date = new Date();
        weightRequest.setDate(date);
        return weightService.postWeight(userEmail, weightRequest);
    }

    @PutMapping("/byUserEmail")
    public void updateWeight(@RequestHeader(value = "Authorization") String token,
                           @RequestBody Weight weightRequest, @RequestParam Long id)
            throws Exception{
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        System.out.println("userEmail:"+userEmail);
        weightService.updateWeight(id, userEmail, weightRequest);
    }

    @DeleteMapping("/byUserEmail")
    public void deleteNote(@RequestHeader(value = "Authorization") String token,
                         @RequestParam Long weightId)
            throws Exception{
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        weightService.deleteWeight(weightId, userEmail);
    }

}
