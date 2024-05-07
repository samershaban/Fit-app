import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Container, Grid, LinearProgress, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import { WorkoutService, output } from '../WorkoutService'
import { Workout } from '../Workout';
import { DailyRoutine } from '../DailyRoutine';

import './Finished.css'
// Table
function createData(wrkt, sets) {
  return { wrkt, sets };
}

let rows = [
  [],
  [],
  [],
  [],
  []
];


export const Finished = ({activeStep, bodys, min}) => {

  const { upper, lower, core } = bodys;

  // Generating Routine 
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        // if (oldProgress === 100) {
        //   return 0;
        // }
        const diff = Math.random() * 20;
        return Math.min(oldProgress + diff, 100);
      });
    }, 200);

    // return () => {clearInterval(timer);};
    rows = [
      [],
      [],
      [],
      [],
      []
    ];
    let dr = new DailyRoutine("Push Day", min, []);
    dr.getRoutine();
    if(upper) {
      dr.bodys.push('chest');
      dr.bodys.push('back');
      dr.bodys.push('triceps');
    }
    if(lower) {
      dr.bodys.push('legs');
    }
    if(core) {
      dr.bodys.push('abs');
    }
    dr.createRoutine();
    console.log('routine', dr.routine);
    for(let i=0;i<dr.routine.length;i++) {
      rows[0].push(createData(dr.routine[i].name, '3x8-12'));
    }
  }, []);
  // fix glitch
  useEffect(() => {
    setProgress(0);
  }, [activeStep]);
  console.log(rows);
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  const tables = rows.map((row, i) => (
    <div className='item'>
      <TableContainer sx={{ maxWidth: 300 }} component={Paper}>
        <Table sx={{  }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>{daysOfWeek[i]}</TableCell>
              <TableCell align="right">Sets</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {row.map((r, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {r.wrkt}
                </TableCell>
                <TableCell align="right">{r.sets}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  ))

  return(
    <>
      <Typography sx={{ mt: 2, mb: 1 }}>Generating Routine</Typography>
      <Container fixed sx={{ margin: 0 }} >
        <Box sx={{  }}>
        {/* <Box sx={{ flexGrow: 1 }}> */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" value={progress} />
              </Box>
            </Grid>
          </Grid>
        {/* </Box> */}
        <br/>
        <Button onClick={output}>output</Button>
        {/* {progress >=100?  */}
        {/* <> */}
        <div className='flex'>{tables}</div>
          {/* <TableContainer sx={{ maxWidth: 300 }} component={Paper}>
            <Table sx={{  }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Monday</TableCell>
                  <TableCell align="right">Sets</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows[0].map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.wrkt}
                    </TableCell>
                    <TableCell align="right">{row.sets}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> */}
        {/* </>:<></>} */}
        
        </Box>
      </Container>
    </>
  )
}