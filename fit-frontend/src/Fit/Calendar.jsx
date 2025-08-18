import { useOktaAuth } from "@okta/okta-react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { Grid, Paper, Typography } from "@mui/material";

// import './Dashboard.css'

export const Calendar = () => {

  const {authState} = useOktaAuth();
  const today = new Date();
  const [date, setDate] = React.useState(dayjs( today ));

  const workouts = [
    { name: "Push Ups", sets: 3, reps: 12 },
    { name: "Squats", sets: 4, reps: 15 },
    { name: "Lunges", sets: 3, reps: 10 },
    { name: "Plank", sets: 3, reps: 60 }, // seconds
    { name: "Bicep Curls", sets: 4, reps: 12 },
  ];

  useEffect(() => {
    // console.log(authState.idToken.claims.email);
  },[])
  
  useEffect(() => {
    console.log(date.format("YYYY-MM-DD"));
  },[date])

  const handleChange = (newDate) => {
    if (!date.isSame(newDate, "day")) { // compare only the day
      setDate(newDate);
    }
  };

    return (
    <div className="container mt-3">
      <h1>Calendar</h1>
      <div className="container">
        <div className="row">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CalendarPicker date={date} onChange={(newDate) => handleChange(newDate)} />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              {workouts.map((workout, index) => (
                <Grid item key={index}>
                  <Paper elevation={3} style={{
                  padding: "16px",
                  marginBottom: "8px",
                }}>
                    <Typography variant="h6">{workout.name}</Typography>
                    <Typography variant="body2">
                      Sets: {workout.sets} | Reps: {workout.reps}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </div>
      </div>
      

    </div>)


}