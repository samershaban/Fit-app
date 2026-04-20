import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { LineChart } from '@mui/x-charts/LineChart';
import './Dashboard.css';
import {
  Box, Grid, Paper, TextField, Typography, Button,
  InputAdornment, Chip,
} from "@mui/material";
import { app_url } from "../config/config";
import { useAuth0 } from "@auth0/auth0-react";

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const Dashboard = () => {
  const [weights, setWeights] = useState([]);
  const [weight, setWeight] = useState(0);
  const [weightData, setWeightData] = useState([]);
  const [weightAxis, setWeightAxis] = useState([]);
  const [tokenState, setTokenState] = useState(null);
  const [todayExercises, setTodayExercises] = useState([]);

  const chartContainerRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(400);

  const today = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayOfWeek = days[today.getDay()];
  const formattedDate = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const greeting = today.getHours() < 12 ? 'Good morning' : today.getHours() < 18 ? 'Good afternoon' : 'Good evening';
  const dayIndex = WEEKDAYS.indexOf(dayOfWeek);

  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const firstName = user?.name?.split(' ')[0] ?? 'there';

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        setTokenState(token);
        fetchWeights(token);
        fetchWorkout(token);
      } catch (e) {
        console.log(e.message);
      }
    };
    getToken();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!chartContainerRef.current) return;
    const observer = new ResizeObserver(entries => {
      setChartWidth(entries[0].contentRect.width);
    });
    observer.observe(chartContainerRef.current);
    return () => observer.disconnect();
  }, []);

  const parseExercisesForDay = (wr, index) => {
    if (index < 0 || !wr?.DailyRoutines?.[index]) return [];
    return wr.DailyRoutines[index].routine.map(ex => ({
      name: ex.name,
      sets: '3×8–12',
    }));
  };

  const fetchWorkout = async (token) => {
    if (dayIndex < 0) return;
    const local = localStorage.getItem('workout');
    if (local) {
      setTodayExercises(parseExercisesForDay(JSON.parse(local), dayIndex));
      return;
    }
    if (!isAuthenticated) return;
    try {
      const res = await axios.get(`${app_url}/api/workout/byUserEmail`, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      const wr = JSON.parse(res.data.workout);
      setTodayExercises(parseExercisesForDay(wr, dayIndex));
    } catch (e) {
      console.log(e);
    }
  };

  const fetchWeights = async (token) => {
    if (!isAuthenticated) return;
    axios.get(`${app_url}/api/weights/byUserEmail`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    }).then((res) => {
      const sorted = res.data.sort((a, b) => a.date.localeCompare(b.date));
      setWeights(sorted);
      setWeightData(sorted.map(w => w.value));
      setWeightAxis(sorted.map(w => new Date(w.date)));
    }).catch(err => console.log(err));
  };

  const handleChangeWeight = (e) => {
    if (e.target.value < 0) e.target.value = 0;
    setWeight(e.target.value);
  };

  const addWeight = () => {
    axios({
      method: 'POST',
      url: `${app_url}/api/weights/byUserEmail`,
      headers: { Authorization: `Bearer ${tokenState}`, 'Content-Type': 'application/json' },
      data: { value: weight, date: Date.now() },
    }).then(() => fetchWeights(tokenState)).catch(err => console.log(err));
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4, px: { xs: 2, md: 4 } }}>

      {/* Greeting */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.5px' }}>
          {greeting}, {firstName} 👋
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {dayOfWeek}, {formattedDate}
        </Typography>
      </Box>

      <Grid container spacing={2}>

        {/* Weight Card */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 2 }}>
              <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: 'primary.main' }} />
              <Typography sx={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.2px', color: 'primary.main', textTransform: 'uppercase' }}>
                Weight
              </Typography>
            </Box>

            {weights.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography component="span" sx={{ fontSize: 38, fontWeight: 800, color: 'text.primary', letterSpacing: '-2px', lineHeight: 1 }}>
                  {weights[weights.length - 1].value}
                </Typography>
                <Typography component="span" sx={{ fontSize: 16, fontWeight: 500, color: 'text.secondary', ml: 0.5 }}>
                  lbs
                </Typography>
              </Box>
            )}

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
              <TextField
                label="Today's weight"
                type="number"
                value={weight}
                onChange={handleChangeWeight}
                onKeyDown={e => ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault()}
                inputProps={{ min: 0, max: 999 }}
                sx={{ flex: 1 }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">lbs</InputAdornment>,
                }}
              />
              <Button variant="contained" onClick={addWeight} disableElevation>
                Check In
              </Button>
            </Box>

            <Box ref={chartContainerRef} sx={{ bgcolor: '#f8fafc', borderRadius: 2, p: 1.5, overflow: 'hidden' }}>
              <Typography sx={{ fontSize: 11, fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                Last {weightData.length} entries
              </Typography>
              {weightData.length > 0 ? (
                <LineChart
                  width={Math.max(chartWidth - 24, 100)}
                  height={160}
                  series={[{ data: weightData, area: true, color: '#3b82f6' }]}
                  xAxis={[{
                    scaleType: 'band',
                    data: weightAxis,
                    valueFormatter: v => `${v.getMonth() + 1}/${v.getDate()}`,
                  }]}
                  grid={{ horizontal: true }}
                  sx={{
                    '& .MuiLineElement-root': { strokeWidth: 2.5 },
                    '& .MuiMarkElement-root': { display: 'none' },
                  }}
                />
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
                  No weight entries yet. Check in above!
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Today's Workout Card */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 2 }}>
              <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: 'success.main' }} />
              <Typography sx={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.2px', color: 'success.main', textTransform: 'uppercase' }}>
                Today's Workout
              </Typography>
            </Box>

            <Chip
              label={dayOfWeek}
              size="small"
              sx={{
                bgcolor: '#f0fdf4', color: 'success.main', fontWeight: 700,
                border: '1px solid #bbf7d0', mb: 2, fontSize: 11, alignSelf: 'flex-start',
              }}
            />

            {/* Exercise list */}
            {todayExercises.length > 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flexGrow: 1 }}>
                {todayExercises.map((ex, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      px: 1.5, py: 1, bgcolor: '#f8fafc', borderRadius: 2,
                      border: '1px solid #f1f5f9',
                    }}
                  >
                    <Typography sx={{ fontSize: 13, fontWeight: 500, color: 'text.primary' }}>
                      {ex.name}
                    </Typography>
                    <Box sx={{
                      bgcolor: 'white', border: '1.5px solid #e2e8f0', borderRadius: 1.5,
                      px: 1, py: 0.25, fontSize: 11, fontWeight: 700, color: 'text.secondary',
                    }}>
                      {ex.sets}
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 4, gap: 1, flexGrow: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {dayIndex < 0 ? 'Rest day — enjoy the break! 🙌' : 'No routine set up yet.'}
                </Typography>
                {dayIndex >= 0 && (
                  <Button variant="text" size="small" href="/start" sx={{ color: 'primary.main', fontWeight: 600 }}>
                    Create one →
                  </Button>
                )}
              </Box>
            )}

            <Button
              variant="text"
              fullWidth
              href="/routine"
              sx={{
                mt: 2, border: '1.5px dashed', borderColor: 'divider',
                borderRadius: 2, color: 'text.secondary', fontWeight: 600, fontSize: 12,
              }}
            >
              View full routine →
            </Button>
          </Paper>
        </Grid>

        {/* Diet Card */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 2 }}>
              <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: 'warning.main' }} />
              <Typography sx={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.2px', color: 'warning.main', textTransform: 'uppercase' }}>
                Diet
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography sx={{ fontSize: 15, fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                  Coming soon
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Macro tracking, meal logging & calorie goals — on the way.
                </Typography>
              </Box>
              <Box sx={{
                width: 56, height: 56, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
              }}>
                🥗
              </Box>
            </Box>
          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
};
