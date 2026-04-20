package com.samer.fitapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

//@Service
public class EmailScheduler {

//    @Autowired
    private JavaMailSender mailSender;

//    @Scheduled(fixedRate = 300000) // every 5 minutes
    public void sendEmail(String email, String subject, String text) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("user@example.com");
        message.setSubject("Scheduled Email");
        message.setText("Hello! This email is sent every 5 minutes.");
        message.setFrom("noreply@fit-app.com");

        mailSender.send(message);

        System.out.println("Email sent successfully.");
    }
}