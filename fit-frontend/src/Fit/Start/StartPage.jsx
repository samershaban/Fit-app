import React, { useEffect } from 'react';
// import { useOktaAuth } from "@okta/okta-react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom"
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Goals } from './Goals';
import { BasicInfo } from './BasicInfo';
import { Schedule } from './Schedule';
import { Finished } from './Finished';
import { WorkoutService, output } from '../WorkoutService'
import { DailyRoutine } from '../DailyRoutine';
const steps = ['Goals', 'Basic Info', 'Routine'];

// Main Component
export const StartPage = () => {

  // const { authState } = useOktaAuth();
  const {
    isLoading, // Loading state, the SDK needs to reach Auth0 on load
    isAuthenticated,
    error,
    loginWithRedirect: login, // Starts the login flow
    logout: auth0Logout, // Starts the logout flow
    user, // User profile
    getAccessTokenSilently
  } = useAuth0();
  const token = null;
  
  const signup = () =>
    login({ authorizationParams: { screen_hint: "signup" } });

  const logout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });

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
  const [inches, setInches] = React.useState(0);
  const [weight, setWeight] = React.useState(150);

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
  const [daysPerWeek, setDaysPerWeek] = React.useState(3);
  const [minutes, setMinutes] = React.useState(45);
  
  // Routine info
  const [workouts, setWorkouts] = React.useState({
    general: true,
    strength: false,
    bodybuilding: false,
    calisthenics: false,
  });

  // Routine body parts
  const [bodys, setBodys] = React.useState({
    upper: true,
    lower: true,
    core: true,
  });

  const handleChangeWorkouts = (e) => {
    setWorkouts({
      ...workouts,
      [e.target.name]: e.target.checked,
    });
  };

  const handleChangeBodys = (e) => {
    console.log(e.target.name, e.target.checked);
    setBodys({
      ...bodys,
      [e.target.name]: e.target.checked,
    });
  };

  const handleChangeDPW = (e) => {
    setDaysPerWeek(e.target.value);
  };

  const handleChangeMin = (e) => {
    setMinutes(e.target.value);
  };

  // Main Code
  useEffect(() => {
    // console.log(weight)
    const getToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        console.log("token:", token);
        this.token = token;
      } catch (e) {
        console.log(e.message);
      }
    }
    getToken();
  }, []);

  // On component render
  useEffect(() => {
    let dr = new DailyRoutine("Push Day", 30, ['chest', 'shoulders', 'triceps']);
    dr.getRoutine();
  },[])

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
          <Finished
            activeStep={activeStep}
            bodys={bodys}
            daysPerWeek={daysPerWeek}
            min={minutes}
            workouts={workouts}
          />
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </div>
      ) : (<></>)}

      {activeStep === 0 ? (
        <div className="container mt-3">
          <Goals
            goal={goal}
            handleChangeGoal={handleChangeGoal}/>
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
        <div className="container mt-3">
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
        </div>
      ) : (<></>)}

      {activeStep === 2 ? (
        <div className="container mt-3">
          <Schedule
            daysPerWeek={daysPerWeek} 
            handleChangeDPW={handleChangeDPW}
            minutes={minutes}
            handleChangeMin={handleChangeMin}
            workouts={workouts}
            handleChange={handleChangeWorkouts}
            bodys={bodys}
            handleChangeBodys={handleChangeBodys}>
          </Schedule>
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

    </Box>
    {/* {isAuthenticated ? (
      <>
        <p>Logged in as {user.email}</p>

        <h1>User Profile</h1>

        <pre>{JSON.stringify(user, null, 2)}</pre>

        <button onClick={logout}>Logout</button>
      </>
    ) : (
      <>
        {error && <p>Error: {error.message}</p>}

        <button onClick={signup}>Signup</button>

        <button onClick={login}>Login</button>
      </>
    )} */}

    {isAuthenticated ? (
      <>
        <p>Go to my dashboard</p>
        <Button variant="contained" component={Link} to="/dashboard" disableElevation sx={{ mb: 1 }}>
          Dashboard
        </Button>
      </>
    ) : (
      <>
        {error && <p>Error: {error.message}</p>}
        <p>Login to save data</p>
        <Button variant="contained" onClick={login} disableElevation sx={{ mb: 1 }}>
          Login
        </Button>
      </>
    )}
      
    </div>
  )
}