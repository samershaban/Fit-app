import axios from "axios";
import React, { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import {
  Box, Grid, Paper, Typography, Chip,
  Table, TableBody, TableCell, TableHead, TableRow,
} from "@mui/material";
import { app_url } from "../config/config";
import { useAuth0 } from "@auth0/auth0-react";

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const ALL_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const Calendar = () => {
  const today = new Date();
  const [date, setDate] = useState(dayjs(today));
  const [allRows, setAllRows] = useState([[], [], [], [], []]);

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const load = async () => {
      try {
        const token = await getAccessTokenSilently();
        const local = localStorage.getItem('workout');
        if (local) {
          setAllRows(parseRows(JSON.parse(local)));
          return;
        }
        if (!isAuthenticated) return;
        const res = await axios.get(`${app_url}/api/workout/byUserEmail`, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });
        setAllRows(parseRows(JSON.parse(res.data.workout)));
      } catch (e) {
        console.log(e.message);
      }
    };
    load();
  }, [isAuthenticated]);

  const parseRows = (wr) => {
    const parsed = (wr.DailyRoutines || []).map(day =>
      (day.routine || []).map(ex => ({ wrkt: ex.name, sets: '3×8–12' }))
    );
    while (parsed.length < 5) parsed.push([]);
    return parsed;
  };

  const handleChange = (newDate) => {
    if (!date.isSame(newDate, 'day')) setDate(newDate);
  };

  const selectedDayName = ALL_DAYS[date.day()];
  const dayIndex = WEEKDAYS.indexOf(selectedDayName);
  const exercises = dayIndex >= 0 ? allRows[dayIndex] : [];
  const isWeekend = dayIndex < 0;

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4, px: { xs: 2, md: 4 } }}>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.5px' }}>
          Calendar
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Select a day to see your workout
        </Typography>
      </Box>

      <Grid container spacing={2} alignItems="flex-start">

        {/* Calendar picker */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, overflow: 'hidden' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1 }}>
              <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: 'primary.main' }} />
              <Typography sx={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.2px', color: 'primary.main', textTransform: 'uppercase' }}>
                Date
              </Typography>
            </Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <CalendarPicker date={date} onChange={handleChange} />
            </LocalizationProvider>
          </Paper>
        </Grid>

        {/* Workout for selected day */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 2 }}>
              <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: 'success.main' }} />
              <Typography sx={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.2px', color: 'success.main', textTransform: 'uppercase' }}>
                Workout
              </Typography>
            </Box>

            <Chip
              label={selectedDayName}
              size="small"
              sx={{
                bgcolor: '#f0fdf4', color: 'success.main', fontWeight: 700,
                border: '1px solid #bbf7d0', mb: 2, fontSize: 11,
              }}
            />

            {isWeekend ? (
              <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                Rest day — enjoy the break! 🙌
              </Typography>
            ) : exercises.length > 0 ? (
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 11, px: 0 }}>
                      Exercise
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 11, px: 0 }}>
                      Sets
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {exercises.map((ex, i) => (
                    <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row" sx={{ px: 0, fontSize: 13 }}>
                        {ex.wrkt}
                      </TableCell>
                      <TableCell align="right" sx={{ px: 0, fontSize: 13, color: 'text.secondary' }}>
                        {ex.sets}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                No exercises found for this day.
              </Typography>
            )}
          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
};
