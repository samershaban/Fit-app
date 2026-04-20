package com.samer.fitapp.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

//import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "workout")
@Data
public class Workout {

    @Id
    @Column(name = "email")
    private String userEmail;

    @Column(name = "workout")
    private String workout;
}
