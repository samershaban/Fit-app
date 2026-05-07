import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import {
  Box, Typography, Button, LinearProgress,
  Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import { create } from '../WeeklyRoutineService';
import './Finished.css';
import axios from 'axios';
import { app_url } from "../../config/config";

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

function buildRows(wr, strength) {
  return (wr.DailyRoutines || []).map(day =>
    (day.routine || []).map(ex => ({
      wrkt: ex.name,
      sets: strength ? '3×3–5' : '3×8–12',
    }))
  );
}

export const Finished = ({ activeStep, bodys, daysPerWeek, min, workouts }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { strength } = workouts;

  const [progress, setProgress] = useState(0);
  const [rows, setRows] = useState([[], [], [], [], []]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setProgress(0);
    setDone(false);
  }, [activeStep]);

  useEffect(() => {
    const wr = create(daysPerWeek, min, workouts, bodys);
    const parsed = buildRows(wr, strength);
    while (parsed.length < 5) parsed.push([]);
    setRows(parsed);
    localStorage.setItem('workout', JSON.stringify(wr));

    const postRoutine = async () => {
      try {
        const token = await getAccessTokenSilently();
        await axios.post(
          `${app_url}/api/workout/byUserEmail`,
          { workout: JSON.stringify(wr) },
          { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
        );
      } catch (e) {
        console.log(e.message);
      }
    };

    if (isAuthenticated) postRoutine();

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = Math.min(prev + Math.random() * 20, 100);
        if (next >= 100) {
          clearInterval(timer);
          setDone(true);
        }
        return next;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>
        {done ? 'Routine ready! 🎉' : 'Creating your routine...'}
      </Typography>

      <Box sx={{ width: '100%', mb: 3 }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>

      {done && (
        <Grid container spacing={2}>
          {WEEKDAYS.map((day, i) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={day}>
              <Paper sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1.5 }}>
                  <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: 'primary.main' }} />
                  <Typography sx={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.2px', color: 'primary.main', textTransform: 'uppercase' }}>
                    {day}
                  </Typography>
                </Box>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 11, px: 0 }}>Exercise</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 11, px: 0 }}>Sets</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows[i]?.length > 0 ? rows[i].map((r, j) => (
                      <TableRow key={j} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row" sx={{ px: 0, fontSize: 12 }}>{r.wrkt}</TableCell>
                        <TableCell align="right" sx={{ px: 0, fontSize: 12, color: 'text.secondary' }}>{r.sets}</TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={2} sx={{ px: 0, color: 'text.secondary', fontSize: 12, border: 0 }}>No exercises</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
