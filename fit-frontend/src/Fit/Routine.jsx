import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Box, Grid, Paper, Typography, Button,
  Table, TableBody, TableCell, TableHead, TableRow, Chip,
} from '@mui/material';
import { app_url } from '../config/config';
import { useAuth0 } from '@auth0/auth0-react';

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const Routine = ({ options }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [rows, setRows] = useState([[], [], [], [], []]);

  const parseRows = (wr) => {
    const parsed = (wr.DailyRoutines || []).map(day =>
      (day.routine || []).map(ex => ({ wrkt: ex.name, sets: '3×8–12' }))
    );
    while (parsed.length < 5) parsed.push([]);
    return parsed;
  };

  useEffect(() => {
    const load = async () => {
      try {
        const token = await getAccessTokenSilently();
        const res = await axios.get(`${app_url}/api/workout/byUserEmail`, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });
        setRows(parseRows(JSON.parse(res.data.workout)));
      } catch (e) {
        console.log(e.message);
      }
    };
    load();
  }, [isAuthenticated]);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4, px: { xs: 2, md: 4 } }}>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.5px' }}>
          Your Routine
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Monday – Friday workout plan
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {WEEKDAYS.map((day, i) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={day}>
            <Paper sx={{ p: 2.5, height: '100%' }}>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1.5 }}>
                <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: 'primary.main' }} />
                <Typography sx={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.2px', color: 'primary.main', textTransform: 'uppercase' }}>
                  {day}
                </Typography>
              </Box>

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
                  {rows[i].length > 0 ? rows[i].map((r, j) => (
                    <TableRow key={j} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row" sx={{ px: 0, fontSize: 12 }}>
                        {r.wrkt}
                      </TableCell>
                      <TableCell align="right" sx={{ px: 0, fontSize: 12, color: 'text.secondary' }}>
                        {r.sets}
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={2} sx={{ px: 0, color: 'text.secondary', fontSize: 12, border: 0 }}>
                        No exercises
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {options === true && (
        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {isAuthenticated ? (
            <>
              <Typography variant="body2" color="text.secondary">Go to your dashboard</Typography>
              <Button variant="contained" component={Link} to="/dashboard" disableElevation sx={{ alignSelf: 'flex-start' }}>
                Dashboard
              </Button>
            </>
          ) : (
            <>
              <Typography variant="body2" color="text.secondary">Login to save your data</Typography>
              <Button variant="contained" component={Link} to="/login" disableElevation sx={{ alignSelf: 'flex-start' }}>
                Login
              </Button>
            </>
          )}
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Create a new routine</Typography>
          <Button variant="outlined" component={Link} to="/start" sx={{ alignSelf: 'flex-start' }}>
            Start
          </Button>
        </Box>
      )}
    </Box>
  );
};
