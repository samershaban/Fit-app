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
import { FilledInput, InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';

import {IMaskInput} from 'react-imask';
import { NumericFormat } from 'react-number-format';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

const steps = ['Goals', 'Basic Info', 'Routine'];

// Homepage Component
export const Homepage = () => {

  const { authState } = useOktaAuth();

  //active step
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

  // info
  const [height, setHeight] = React.useState('');
  const [weight, setWeight] = React.useState('');

  const handleChangeHeight = (event) => {
    setHeight(event.target.value);
  };

  const handleChangeWeight = (event) => {
    setWeight(event.target.value);
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
            All steps completed - you're finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (<div></div>)}

      {activeStep === 0 ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step 1: What are your goals?</Typography>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Goals</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel value="Loose" control={<Radio />} label="Loose Weight" />
              <FormControlLabel value="Maintain" control={<Radio />} label="Maintain Weight" />
              <FormControlLabel value="Gain" control={<Radio />} label="Gain Lean Weight" />
            </RadioGroup>
          </FormControl>
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
      ) : (<div></div>)}

      {activeStep === 1 ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step 2: We need some basic info</Typography>
          <Stack direction="row" spacing={0}>
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
                value={height}
                label="Height"
                onChange={handleChangeHeight}
              >
                <MenuItem value={4}>4 ft</MenuItem>
                <MenuItem value={5}>5 ft</MenuItem>
                <MenuItem value={6}>6 ft</MenuItem>
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
                value={height}
                label="Height"
                onChange={handleChangeHeight}
              >
                <MenuItem value={0}>0 in</MenuItem>
                <MenuItem value={1}>1 in</MenuItem>
                <MenuItem value={2}>2 in</MenuItem>
                <MenuItem value={3}>3 in</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <br/>
          <TextField
            label="Weight"
            id="outlined-start-adornment"
            size='2'
            sx={{ m: 1, width: '25ch' }}
            InputProps={{
              endAdornment: <InputAdornment position="start">lbs</InputAdornment>,
            }}
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
      ) : (<div></div>)}


      {activeStep === 2 ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step 3: Lets finalize your routine</Typography>
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
      ) : (<div></div>)}
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