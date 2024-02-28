package com.samer.fitapp.entity;

import lombok.Data;
import javax.persistence.*;

@Entity
@Table(name = "note")
@Data
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "title")
    private String title;

    @Column(name = "body")
    private String body;


}
