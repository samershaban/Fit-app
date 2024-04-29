import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container, Grid, LinearProgress, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import TableCell from '@mui/material/TableCell';

// Table
function createData(mon, tues, wed, thurs, fri, sat) {
  return { mon, tues, wed, thurs, fri, sat };
}

const rows = [
  createData('Bench 3x8-12',    'Squat',       'Rest', 'Bar Rows',     'Rest','Rest'),
  createData('Shoulder Press',  'Leg curl',    '',     'Cable Row'),
  createData('Incline Bench',   'Calf raises', '',     'Lat Pulldowns',''),
  createData('Tricep extension','Ab crunches', '',     'Bar curls',    ''),
  createData('Dips',            'Leg raises',  '',     'Dumbel curls', ''),
  
];


export const Finished = ({activeStep}) => {

  // Generating Routine 
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        // if (oldProgress === 100) {
        //   return 0;
        // }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);
  // fix glitch
  useEffect(() => {
    setProgress(0);
  }, [activeStep]);

  return(
    <>
      <Typography sx={{ mt: 2, mb: 1 }}>Generating Routine</Typography>
      <Container fixed sx={{ margin: 0 }} >
        <Box sx={{ height: '300px' }}>
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Mon</TableCell>
                <TableCell align="right">Tues</TableCell>
                <TableCell align="right">Wed</TableCell>
                <TableCell align="right">Thurs</TableCell>
                <TableCell align="right">Fri</TableCell>
                <TableCell align="right">Sat</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.mon}
                  </TableCell>
                  <TableCell align="right">{row.tues}</TableCell>
                  <TableCell align="right">{row.wed}</TableCell>
                  <TableCell align="right">{row.thurs}</TableCell>
                  <TableCell align="right">{row.fri}</TableCell>
                  <TableCell align="right">{row.sat}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Box>
      </Container>
    </>
  )
}