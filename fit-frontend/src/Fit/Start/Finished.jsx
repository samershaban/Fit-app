import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Container, Grid, LinearProgress, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import { WorkoutService, output } from '../WorkoutService'
import { Workout } from '../Workout';
import { DailyRoutine } from '../DailyRoutine';
import { create, print } from '../WeeklyRoutineService';
import { pull } from '../DailyRoutineService';
import './Finished.css'
import { WeeklyRoutine } from '../WeeklyRoutine';
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


export const Finished = ({activeStep, bodys, daysPerWeek, min, workouts}) => {

  const { upper, lower, core } = bodys;

  const {general, strength, bodybuilding, calisthenics} = workouts;

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

    console.log('bodys', bodys);
    let wr = create(daysPerWeek, min, workouts, bodys);
    console.log(wr);
    // let dr = new DailyRoutine("Push Day", min, []);
    // dr.getRoutine();
    // if(upper) {
    //   dr.bodys.push('chest');
    //   dr.bodys.push('back');
    //   dr.bodys.push('triceps');
    // }
    // if(lower) {
    //   dr.bodys.push('legs');
    // }
    // if(core) {
    //   dr.bodys.push('abs');
    // }
    // dr.createRoutine();
    // console.log('routine', dr.routine);
    // // adding the workouts into the row
    for(let d=0;d<wr.DailyRoutines.length;d++) {
      for(let i=0;i<wr.DailyRoutines[d].routine.length;i++) {
        rows[d].push(createData(wr.DailyRoutines[d].routine[i].name, strength? '3x3-5': '3x8-12'));
      }
    }
  });
  // fix glitch
  useEffect(() => {
    setProgress(0);
    console.log(rows);
  }, [activeStep]);
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
        <Button onClick={print}>output</Button>
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