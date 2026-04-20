import React, { useEffect, useRef, useState } from 'react';
// import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom"
import axios from 'axios';
import { Button, Container, Grid, LinearProgress, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import { app_url } from "../config/config";
import { useAuth0 } from "@auth0/auth0-react";
import './Start/Finished.css';

const steps = ['Goals', 'Basic Info', 'sRoutine'];

// Main Component
export const Routine = ({options, loggedIn}) => {

  // const { authState } = useOktaAuth();
  const[routine, setRoutine] = useState({});
  const app_url = 'http://localhost:8080';
  // const app_url = 'https://react-fit-app-631cc6edc570.herokuapp.com';
  
  const {
    isLoading, // Loading state, the SDK needs to reach Auth0 on load
    isAuthenticated,
    error,
    loginWithRedirect: login, // Starts the login flow
    logout: auth0Logout, // Starts the logout flow
    user, // User profile
    getAccessTokenSilently
  } = useAuth0();

  let loaded = false;
  function createData(wrkt, sets) {
    return { wrkt, sets };
  }
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  let strength = false;
  const [rows, setRows] = useState([
    [],
    [],
    [],
    [],
    []
  ]);
  
  const getNewCustomRoutine = async ( token) => {
      const url = `${app_url}/api/routines/generate`;
      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        type:"strength",daysPerWeek:3,goal:"muscle_gain",experience:"beginner",exerciseId:2
      };
      axios.post(url, requestOptions)
      .then((res) =>{
        console.log(res.data);
      }).catch(err => {
        console.log(err);
      })
  }

  const fetchRoutine = async (token) => {
  // console.log(authState);
  
    if (isAuthenticated) {
      const url = `${app_url}/api/workout/byUserEmail`;
      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      };
      axios.get(url, requestOptions)
      .then((res) =>{
        let wr = JSON.parse(res.data.workout);
        console.log("routine:",wr);
        
        for(let d=0;d<wr.DailyRoutines.length;d++) {
          for(let i=0;i<wr.DailyRoutines[d].routine.length;i++) {
            rows[d].push(createData(wr.DailyRoutines[d].routine[i].name, strength? '3x3-5': '3x8-12'));
            // console.log(createData(wr.DailyRoutines[d].routine[i].name, strength? '3x3-5': '3x8-12'));
            // try to mutate array to force a rerender
          }
        }
        setRoutine(res.data.workout);
      }).catch(err => {
        console.log(err);
      })
    }
  }

  const getLocalRoutine = () => {
    let wr = JSON.parse(localStorage.getItem('workout'));
      for(let d=0;d<wr.DailyRoutines.length;d++) {
        for(let i=0;i<wr.DailyRoutines[d].routine.length;i++) {
          rows[d].push(createData(wr.DailyRoutines[d].routine[i].name, strength? '3x3-5': '3x8-12'));
          // console.log(createData(wr.DailyRoutines[d].routine[i].name, strength? '3x3-5': '3x8-12'));
          // try to mutate array to force a rerender
        }
      }
      setRoutine(wr);
  }

  // useEffect(() => {
  //   const getToken = async () => {
  //     try {
  //       const token = await getAccessTokenSilently();
  //       console.log("token:", token);
  //       // this.token = token;
  //       fetchRoutine(token);
  //     } catch (e) {
  //       console.log(e.message);
  //     }
  //   }
  //   getToken();

  //   // // getNewCustomRoutine();
  //   // // if not logged in and has local storage
  //   // if(!isAuthenticated && localStorage.getItem('workout')) {
  //   //   getLocalRoutine();
  //   //   loaded = true;
  //   // // if logged in
  //   // } else if(isAuthenticated) {
  //   //   if(localStorage.getItem('workout'))
  //   //     getLocalRoutine();
  //   //   else
  //   //     fetchRoutine();
  //   //   loaded = true;
  //   // } else {
  //   //   console.log('workout empty:'+ authState);
  //   // }
  // },[]);

  useEffect(() => {
    
    const getToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        console.log("token:", token);
        // this.token = token;
        fetchRoutine(token);
      } catch (e) {
        console.log(e.message);
      }
    }
    getToken();
  }, [isAuthenticated])// not sure if will work

 const tables = rows.map((row, i) => (
  <div className='item'>
    <TableContainer 
      sx={{ maxWidth: 300 }}
      component={Paper} elevation={3} style={{height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",}}
    >
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
    <div className="container mt-3">
      <h1>Your current routine</h1>
      <div className='flex'>{tables}</div>
      {/* {JSON.stringify(routine)} */}
      {options===true && <>
      {isAuthenticated?
      <>
        <p>Go to my dashboard</p>
        <Link type="button" className="btn main-color btn-lg text-white" to="/dashboard">Dashboard</Link>
      </>:
      <>
        <p>Login to save data</p>
        <Link type="button" className="btn main-color btn-lg text-white" to="/login">Login</Link>
      </>
      }
      <p>Create routine</p>
        <Link type="button" className="btn main-color btn-lg text-white" to="/start"
          style={{marginBottom: "8px"}}
        >
          Start
        </Link>
      </>}
    </div>
  )
}