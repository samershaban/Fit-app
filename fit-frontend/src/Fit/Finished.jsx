import React, { useEffect, useRef } from 'react';
import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Checkbox, Container, FilledInput, FormGroup, Grid, InputAdornment, LinearProgress, MenuItem, Select, TextField } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';

import InputLabel from '@mui/material/InputLabel';

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
        </Box>
      </Container>
    </>
  )
}