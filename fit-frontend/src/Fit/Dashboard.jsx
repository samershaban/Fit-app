import { useOktaAuth } from "@okta/okta-react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { LineChart } from '@mui/x-charts/LineChart';
import './Dashboard.css'
import { Grid, Paper, InputAdornment, TextField, Typography, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { app_url } from "../config/config";
import { RoutineTable } from "./RoutineTable"
import { useAuth0 } from "@auth0/auth0-react";
const stackStrategy = {
  stack: 'total',
  area: true,
  stackOffset: 'none', // To stack 0 on top of others
};

const customize = {
  height: 300,
  legend: { hidden: true },
  margin: { top: 5 },
};

export const Dashboard = () => {

  const {authState} = useOktaAuth();
  const [notes, setNotes] = useState([]);
  const [weights, setWeights] = useState([]);
  const [selectedNote, setSelectedNote] = useState(-1);
  const [selectedNoteBody, setSelectedNoteBody]= useState('');
  const [selectedNoteTitle, setSelectedNoteTitle]= useState(0);
  const [weight, setWeight] = useState(0);
  const [weightData, setWeightData] = useState([]);
  // const [weightAxis, setWeightAxis] = useState(['1', '2', '3', '5', '8', '10']);
  const [weightAxis, setWeightAxis] = useState([
    // new Date('2024-10-08 00:00:00'),
    // new Date('2024-10-15 00:00:00'),
    // new Date('2024-10-16 00:00:00'),
    // new Date('2024-10-17 00:00:00'),
    // new Date('2024-10-20 00:00:00'),
    // new Date('2024-10-21 00:00:00'),
  ]);
  const [colorX, setColorX] = useState('None');
  const [colorY, setColorY] = useState('None');

  const today = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const dayOfWeek = days[today.getDay()];//Sunday
  
  // const app_url = 'http://localhost:8080';
  // const app_url = 'https://react-fit-app-631cc6edc570.herokuapp.com';
    const {
      isLoading, // Loading state, the SDK needs to reach Auth0 on load
      isAuthenticated,
      error,
      loginWithRedirect: login, // Starts the login flow
      logout: auth0Logout, // Starts the logout flow
      user, // User profile
    } = useAuth0();

  useEffect(() => {

    const fetchWeights = async () => {
    // console.log(authState);
      if (authState && authState?.isAuthenticated) {
        const url = `${app_url}/api/weights/byUserEmail`;
        const requestOptions = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
            'Content-Type': 'application/json',
          }
        };
        axios.get(url, requestOptions).then((res) =>{
          // console.log(res.data);
          setWeights(res.data.sort((a,b) => a.date.localeCompare(b.date)));
          // setWeight(weights[0].value);// fix
          // dates = res.data.date.split('-')
          setWeightData(res.data.map((w) => w.value));
          setWeightAxis(res.data.map((w) => new Date(w.date)));
        }).catch(err => {
          console.log(err);
        })
      }
    }
    fetchWeights();

 }, [authState])


 useEffect(() => {
  console.log(weights);
 }, [weights])

 useEffect(() => {
  console.log(weight);
 }, [weight])

 useEffect(() => {
  console.log(weightData);
 }, [weightData])

 useEffect(() => {
  console.log(weightAxis);
 }, [weightAxis])

  const handleChangeWeight = (e) => {
    if(e.target.value < 0){
      (e.target.value = 0)
    }
    setWeight(e.target.value);
  };

  const handleTextChange = (e) => {
    setSelectedNoteBody(e.target.value);
  }

  const handleTitleTextChange = (e) => {
    console.log(e.target.value);
    setSelectedNoteTitle(e.target.value);
  }

  const addWeight = () => {
      const url = `${app_url}/api/weights/byUserEmail`;
      const requestOptions = {
        method: 'POST',
        url: url,
        headers: {
          Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
          'Content-Type': 'application/json',
        },
        data: {
          "value": weight,
          "date": Date.now()
        }
      };

      axios(requestOptions)
      .then((res) =>{
        // console.log(res.data);
        let currentNotes = notes;
        currentNotes.unshift(res.data);
        setNotes(prevNote => [...currentNotes]);
        document.getElementById("list-home-list").click();
        // selectNote(notes.length-1);
      }).catch(err => {
        console.log(err);
      })
  }

  const postRequest = () => {
    const url = `${app_url}/api/notes/byUserEmail`;
      const requestOptions = {
        method: 'POST',
        url: url,
        headers: {
          Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
          'Content-Type': 'application/json',
        },
        data: {
          "title": "new title",
          "body": "new body"
        }
      };

      axios(requestOptions)
      .then((res) =>{
        // console.log(res.data);
        let currentNotes = notes;
        currentNotes.unshift(res.data);
        setNotes(prevNote => [...currentNotes]);
        document.getElementById("list-home-list").click();
        // selectNote(notes.length-1);
      }).catch(err => {
        console.log(err);
      })
  }

  const deleteRequest = () => {
    if(selectedNote === -1) {
      return
    }
    let currentNotes = notes;
    let noteId = notes[selectedNote].id;
    const url = `${app_url}/api/notes/byUserEmail?noteId=${noteId}`;
      const requestOptions = {
        method: 'DELETE',
        url: url,
        headers: {
          Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
          'Content-Type': 'application/json',
        }
      };
      axios(requestOptions)
      .then((res) =>{
        console.log("deleted note with index "+selectedNote)
        currentNotes.splice(selectedNote, 1);
        setNotes(prevNote => [...currentNotes]);
        if(notes.length <=0) {
          setSelectedNote(-1)
        } else 
          document.getElementById("list-home-list").click();
      }).catch(err => {
        console.log(err);
      })
  }

  const putRequest = () => {
    let currentNotes = notes;
    let noteId = notes[selectedNote].id;
    const url = `${app_url}/api/notes/byUserEmail?noteId=${noteId}`;
      const requestOptions = {
        method: 'PUT',
        url: url,
        headers: {
          Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
          'Content-Type': 'application/json',
        },
        data: {
          "title": selectedNoteTitle,
          "body": selectedNoteBody
        }
      };

      axios(requestOptions)
      .then((res) =>{
        console.log("updated note with index "+noteId);
        let currentNotes = notes;
        currentNotes[selectedNote].body = selectedNoteBody;
        currentNotes[selectedNote].title = selectedNoteTitle;
        setNotes(prevNote => [...currentNotes] );
      }).catch(err => {
        console.log(err);
      })
  }

    return (
    <div className="container mt-3">
      <h1>Welcome to Fit App</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{padding: "16px"}}>
          <Typography variant="h5">Weight</Typography>

          <Box sx={{ display: "flex", alignItems: "center"}}>
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
            <button 
              onClick={addWeight} 
              type="button" 
              className="btn btn-primary"
              sx={{ height: "40px" }} >
              Check in Weight
            </button>
          </Box>
          <div>

          <LineChart
            height={300}
            width={500}
            grid={{ horizontal: false }}
            series={[
              {
                data: weightData,
              },
            ]}

            xAxis={[
              {
                scaleType: 'band',
                data: weightAxis,
                valueFormatter: (value) => value.getMonth()+1+'/'+(value.getDate()+1),
              },
            ]}

          />
          </div>

          </Paper>
        </Grid>
        <Grid item xs={12} md={6} >
          <Paper elevation={3} style={{padding: "16px", height: "100%",
                                      display: "flex",
                                      flexDirection: "column"}} >
            <Typography variant="h5">Todays Workout</Typography>
            {/* <h1>Your current routine</h1> */}
            <div className='flex'><RoutineTable days={dayOfWeek}></RoutineTable></div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
        <Paper elevation={3} style={{padding: "16px", marginBottom: "8px"}}>
          <Typography variant="h5">Diet</Typography>
          <p>coming soon</p>
        </Paper>
        <>
          {
          /* <div className="col-8" style={{paddingBottom: "5px"}}>
          <div className="btn-group" role="group" aria-label="Basic mixed styles example">
            <button onClick={addNewNote} type="button" className="btn btn-primary">Add</button>
            <button onClick={updateNote} type="button" className="btn btn-secondary">Save</button>
            <button onClick={deleteNote} type="button" className="btn btn-danger">Delete</button>
          </div>
          <div className="" id="note-body" >
              <textarea id="title-box"
                onKeyPress={e => {
                  if(e.key === 'Enter')
                    e.preventDefault();
                    document.getElementById("body-box").focus()
                  }}
                onChange={handleTitleTextChange}
                value={selectedNoteTitle}
                maxLength={12}
                rows={1}
                placeholder="Title"
                // style={{width: '100%', resize: 'none'}}
                />
                <hr style={{margin: "0px 5px 0px 5px", padding: "none"}}/>
              <textarea ref={bodyRef} id="body-box"
                onChange={handleTextChange}
                value={selectedNoteBody}
                maxLength={400}
                placeholder="Body"
                // style={{width: '100%', height: '100%', resize: 'none'}}
                />
          </div>
          </div> */
          
          }</>
        </Grid>
      </Grid>
      

    </div>)


}