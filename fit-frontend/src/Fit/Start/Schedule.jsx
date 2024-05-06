import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Checkbox, Container, FormGroup, Grid, InputAdornment, MenuItem, Select } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';

import InputLabel from '@mui/material/InputLabel';

export const Schedule = ({daysPerWeek, handleChangeDPW, minutes, handleChangeMin, workouts, handleChange, bodys, handleChangeBodys}) => {

  const { upper, lower, core } = bodys;
  const { strength, bodybuilding, calisthenics, general } = workouts;
  const error = [general, strength, bodybuilding, calisthenics].filter((v) => v).length > 2;

  return(
    <>
      <Typography sx={{ mt: 2, mb: 1 }}>Step 3: Lets finalize your routine</Typography>
      <Container fixed sx={{ margin: 0 }} >
        <Box sx={{ height: '300px' }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
          <Typography sx={{ mt: 1, mb: 1 }}>How many days per week can you commit?</Typography>
          <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Days</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size='2' 
                sx={{ m: 1, width: '25ch' }}
                InputProps={{
                  endAdornment: <InputAdornment position="start">days</InputAdornment>,
                }}
                value={daysPerWeek}
                // label="Days"
                onChange={handleChangeDPW}
              >
                {/* <MenuItem value={1}>1 Day</MenuItem> */}
                <MenuItem value={2}>2 Days</MenuItem>
                <MenuItem value={3}>3 Days</MenuItem>
                <MenuItem value={4}>4 Days</MenuItem>
                <MenuItem value={5}>5 Days</MenuItem>
              </Select>
            </FormControl>

          <Typography sx={{ mt: 1, mb: 1 }}>How long per session?</Typography>
          <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Minutes</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size='2'
                sx={{ m: 1, width: '25ch' }}
                InputProps={{
                  // endAdornment: <InputAdornment position="start">time</InputAdornment>,
                }}
                value={minutes}
                // // label="Feet"
                onChange={handleChangeMin}
              >
                {/* <MenuItem value={1}>1 Day</MenuItem> */}
                <MenuItem value={30}>30 Min</MenuItem>
                <MenuItem value={45}>45 Min</MenuItem>
                <MenuItem value={60}>60 Min</MenuItem>
              </Select>
            </FormControl>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ mt: 1, mb: 1 }}>What Workouts Interest you?</Typography>
              <Box sx={{ display: 'flex' }}>
                  <FormControl
                    required
                    error={error}
                    component="fieldset"
                    sx={{ m: 3 }}
                    variant="standard"
                  >
                  {/* <FormLabel component="legend">Pick two</FormLabel> */}
                  <FormGroup>
                    <FormControlLabel
                        control={
                          <Checkbox checked={general} onChange={handleChange} name="general" />
                        }
                        label="General Fitness"
                      />
                    <FormControlLabel
                      control={
                        <Checkbox checked={strength} onChange={handleChange} name="strength" />
                      }
                      label="Strength Training"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={bodybuilding} onChange={handleChange} name="bodybuilding" />
                      }
                      label="Bodybuilding"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={calisthenics} onChange={handleChange} name="calisthenics" />
                      }
                      label="Calisthenics"
                    />
                  </FormGroup>
                  <FormHelperText>Pick up to two*</FormHelperText>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={4}>
            <Typography sx={{ mt: 1, mb: 1 }}>What do you want to workout</Typography>
              <Box sx={{ display: 'flex' }}>
                  <FormControl
                    sx={{ m: 3 }}
                  >
                  {/* <FormLabel component="legend">Pick two</FormLabel> */}
                  <FormGroup>
                    <FormControlLabel
                        control={
                          <Checkbox checked={upper} onChange={handleChangeBodys} name="upper" />
                        }
                        label="Upper Body"
                      />
                    <FormControlLabel
                      control={
                        <Checkbox checked={lower} onChange={handleChangeBodys} name="lower" />
                      }
                      label="Lower Body"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={core} onChange={handleChangeBodys} name="core" />
                      }
                      label="Core"
                    />

                  </FormGroup>
                </FormControl>
              </Box>
            </Grid>
        </Grid>
        </Box>
      </Container>
    </>
  )
}