package com.samer.fitapp.service;

import com.samer.fitapp.dao.WeightRepository;
import com.samer.fitapp.entity.Weight;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
@Transactional
public class WeightService {

    private WeightRepository weightRepository;

    public List<Weight> getWeights(String email) {

        List<Weight> weights = weightRepository.findByUserEmail(email);
        Collections.reverse(weights);
        return weights;
    }

    public Weight postWeight(String userEmail, Weight weightRequest) {
        Weight weight = new Weight();
        weight.setDate(weightRequest.getDate());
        weight.setValue(weightRequest.getValue());
        return weightRepository.save(weightRequest);
    }

    public void updateWeight(Long id, String userEmail, Weight weightRequest) throws Exception{
        Weight weight = weightRepository.findByIdAndUserEmail(id, userEmail);
        if(weight == null || weight.getId() == null ) {
            throw new Exception("Weight not found");
            // return a 404 error not found
        }

        weight.setDate(weightRequest.getDate());
        weight.setValue(weightRequest.getValue());

        weightRepository.save(weight);

    }

    public void deleteWeight(Long id, String userEmail) throws Exception{
        Weight weight = weightRepository.findByIdAndUserEmail(id, userEmail);
        if(weight == null || weight.getId() == null ) {
            throw new Exception("Weight record not found");
            // return a 404 error not found
        }

        weightRepository.delete(weight);
    }

    @Autowired
    public WeightService(WeightRepository weightRepository) {
        this.weightRepository = weightRepository;
    }

//    public void postNote(Note noteRequest) {
//        Note note = new Note(noteRequest.getTitle(), noteRequest.getBody(), noteRequest.getUserId());
//        weightRepository.save(noteRequest);
//    }
}
