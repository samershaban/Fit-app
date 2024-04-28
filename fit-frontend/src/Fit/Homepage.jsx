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
import { Checkbox, Container, FilledInput, FormGroup, Grid, InputAdornment, LinearProgress, MenuItem, Select, TextField } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';

import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { Routine } from './Routine';
import { BasicInfo } from './BasicInfo';
const steps = ['Goals', 'Basic Info', 'Routine'];

// Main Component
export const Homepage = () => {

  const { authState } = useOktaAuth();

  //Active step
  const [activeStep, setActiveStep] = React.useState(2);
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

  // Workouts Check boxes
  const [daysPerWeek, setDaysPerWeek] = React.useState('');
  const [minutes, setMinutes] = React.useState('');
  
  // Routine info
  const [workouts, setWorkouts] = React.useState({
    general: true,
    strength: false,
    bodybuilding: false,
    calisthenics: false,
  });

  const handleChangeWorkouts = (event) => {
    setWorkouts({
      ...workouts,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChangeDPW = (e) => {
    setDaysPerWeek(e.target.value);
  };

  const handleChangeMin = (e) => {
    setMinutes(e.target.value);
  };

  // Generating Routine 
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        // if (oldProgress === 100) {
        //   return 0;
        // }
        const diff = Math.random() * 20;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
  // fix glitch
  useEffect(() => {
    setProgress(0);
  }, [activeStep]);

  // Main Code
  useEffect(() => {
    console.log(weight)
  }, [weight]);

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
        <div className="container mt-3">
          <Typography sx={{ mt: 2, mb: 1 }}>Generating Routine</Typography>
          <Container fixed sx={{ margin: 0 }} >
            <Box sx={{ height: '300px' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ width: '100%' }}>
                    <LinearProgress variant="determinate" value={progress} />
                  </Box>
                </Grid>
              </Grid>
            </Box>
            </Box>
          </Container>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </div>
      ) : (<></>)}

      {activeStep === 0 ? (
        <div className="container mt-3">
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
        </div>
      ) : (<></>)}

      {activeStep === 1 ? (
        <React.Fragment>
          <BasicInfo
            feet={feet}
            handleChangeFeet={handleChangeFeet}
            inches={inches}
            handleChangeInches={handleChangeInches}
            weight={weight}
            handleChangeWeight={handleChangeWeight}
          />
          
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
          <Routine 
            daysPerWeek={daysPerWeek} 
            handleChangeDPW={handleChangeDPW}
            minutes={minutes}
            handleChangeMin={handleChangeMin}
            workouts={workouts}
            handleChange={handleChangeWorkouts}>
          </Routine>
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