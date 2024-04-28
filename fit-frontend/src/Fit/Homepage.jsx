import React, { useEffect, useRef } from 'react';
import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom"
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Checkbox, Container, FilledInput, FormGroup, Grid, InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';

import {IMaskInput} from 'react-imask';
import { NumericFormat } from 'react-number-format';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
const steps = ['Goals', 'Basic Info', 'Routine'];

// Main Component
export const Homepage = () => {

  const { authState } = useOktaAuth();

  //Active step
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // Goal Radio box
  const [goal, setGoal] = React.useState('maintain');

  const handleChangeGoal = (event) => {
    setGoal(event.target.value);
  };

  // Basic Info
  const [feet, setFeet] = React.useState('5');
  const [inches, setInches] = React.useState('0');
  const [weight, setWeight] = React.useState('');

  const [daysPerWeek, setDaysPerWeek] = React.useState('');
  const [time, setTime] = React.useState('');

  // Workouts Check boxes
  const [state, setState] = React.useState({
    general: true,
    strength: false,
    bodybuilding: false,
    calisthenics: false,
  });
  
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { strength, bodybuilding, calisthenics, general } = state;
  const error = [general, strength, bodybuilding, calisthenics].filter((v) => v).length > 2;

  useEffect(() => {
    console.log(weight)
  }, [weight]);

  const handleChangeFeet = (e) => {
    setFeet(e.target.value);
  };

  const handleChangeInches = (e) => {
    setInches(e.target.value);
  };

  const handleChangeWeight = (e) => {
    if(e.target.value < 0){
      (e.target.value = 0)
    }
    setWeight(e.target.value);
  };

  const handleChangeDPW = (e) => {
    setDaysPerWeek(e.target.value);
  };

  const handleChangeTime = (e) => {
    setTime(e.target.value);
  };

  return(
    <div className="container mt-3">
      <h1>Welcome to Fit App</h1>
      <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Generating Routine
          </Typography>
          <Container fixed sx={{ margin: 0 }} >
            <Box sx={{ height: '300px' }}>
            </Box>
          </Container>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (<></>)}

      {activeStep === 0 ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step 1: What are your goals?</Typography>
          <Container fixed sx={{ margin: 0 }} >
            <Box sx={{ height: '300px' }}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Goal</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={goal}
                  onChange={handleChangeGoal}
                  name="radio-buttons-group"
                >
                  <FormControlLabel value="loose" control={<Radio />} label="Loose Weight" />
                  <FormControlLabel value="maintain" control={<Radio />} label="Maintain Weight" />
                  <FormControlLabel value="gain" control={<Radio />} label="Gain Lean Weight" />
                </RadioGroup>
              </FormControl>
            </Box>
          </Container>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      ) : (<></>)}

      {activeStep === 1 ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step 2: We need some basic info</Typography>
          <Container fixed sx={{ margin: 0 }} >
            <Box sx={{ height: '300px' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Height</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    size='2'
                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                      endAdornment: <InputAdornment position="start">lbs</InputAdornment>,
                    }}
                    value={feet}
                    // label="Feet"
                    onChange={handleChangeFeet}
                  >
                    <MenuItem value={1}>1 ft</MenuItem>
                    <MenuItem value={2}>2 ft</MenuItem>
                    <MenuItem value={3}>3 ft</MenuItem>
                    <MenuItem value={4}>4 ft</MenuItem>
                    <MenuItem value={5}>5 ft</MenuItem>
                    <MenuItem value={6}>6 ft</MenuItem>
                    <MenuItem value={7}>7 ft</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Height</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    size='2'
                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                      endAdornment: <InputAdornment position="start">lbs</InputAdornment>,
                    }}
                    value={inches}
                    // label="Height"
                    onChange={handleChangeInches}
                  >
                    <MenuItem value={0}>0 in</MenuItem>
                    <MenuItem value={1}>1 in</MenuItem>
                    <MenuItem value={2}>2 in</MenuItem>
                    <MenuItem value={3}>3 in</MenuItem>
                    <MenuItem value={4}>4 in</MenuItem>
                    <MenuItem value={5}>5 in</MenuItem>
                    <MenuItem value={6}>6 in</MenuItem>
                    <MenuItem value={7}>7 in</MenuItem>
                    <MenuItem value={8}>8 in</MenuItem>
                    <MenuItem value={9}>9 in</MenuItem>
                    <MenuItem value={10}>10 in</MenuItem>
                    <MenuItem value={11}>11 in</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <TextField
                    label="Weight"
                    // id="outlined-start-adornment"
                    id="demo-simple-select-label"
                    value={weight}
                    size='2'
                    sx={{ m: 1, width: '22.2ch' }}
                    onKeyDown={(evt) => ["e", "E", "+", "-", "."].includes(evt.key) && evt.preventDefault()}
                    inputProps={{
                      endadornment: <InputAdornment position="start">lbs</InputAdornment>,
                      type: 'number',
                      min: 0,
                      max: 999,
                      length: 3
                    }}
                    onChange={handleChangeWeight}
                  />
                </FormControl>
                <Typography sx={{ mt: 2, mb: 1 }} >Your BMI is:</Typography>
            </Box>
          </Container>
          
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      ) : (<></>)}


      {activeStep === 2 ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step 3: Lets finalize your routine</Typography>
          <Container fixed sx={{ margin: 0 }} >
            <Box sx={{ height: '300px' }}>
            <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
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
                    value={time}
                    // // label="Feet"
                    onChange={handleChangeTime}
                  >
                    {/* <MenuItem value={1}>1 Day</MenuItem> */}
                    <MenuItem value={30}>30 Min</MenuItem>
                    <MenuItem value={45}>45 Min</MenuItem>
                    <MenuItem value={60}>60 Min</MenuItem>
                  </Select>
                </FormControl>
                </Grid>
                <Grid item xs={6}>
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
            </Grid> 
            </Box>
            </Box>
          </Container>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      ) : (<></>)}

    </Box>
      {authState?.isAuthenticated ?
      <>
        <p>Go to my dashboard</p>
        <Link type="button" className="btn main-color btn-lg text-white" to="/dashboard">Dashboard</Link>
      </>:
      <>
        <p>Login to save data</p>
        <Link type="button" className="btn main-color btn-lg text-white" to="/login">Login</Link>
      </>
      }
      
    </div>
  )
}