import { useOktaAuth } from "@okta/okta-react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { LineChart } from '@mui/x-charts/LineChart';
import './Dashboard.css'
import { Button, Grid, Card, Paper, InputAdornment, TextField, Typography } from "@mui/material";

export const Dashboard = () => {

  const {authState} = useOktaAuth();
  const [notes, setNotes] = useState([]);
  const [weights, setWeights] = useState([]);
  const [selectedNote, setSelectedNote] = useState(-1);
  const [selectedNoteBody, setSelectedNoteBody]= useState('');
  const [selectedNoteTitle, setSelectedNoteTitle]= useState(0);
  const [weight, setWeight] = useState(0);
  // const app_url = 'fit.app';
  const app_url = 'http://localhost:8080';

  const bodyRef = useRef(null);

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
        setWeights(res.data.sort((a,b) => b.date.localeCompare(a.date)));
        setWeight(weights[0].value);// fix
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


  const selectNote = (i) => {
    setSelectedNote(i);
    setSelectedNoteBody(notes[i].body);
    setSelectedNoteTitle(notes[i].title);
    // console.log(selectedNote);
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

  const addNewNote = () => {
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

  const deleteNote = () => {
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

  const updateNote = () => {
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
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <Paper variant="outlined" margin={5}>
          <Typography>Weight</Typography>
          <br/>
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
          <button onClick={addWeight} type="button" className="btn btn-primary">Check in Weight</button>
          <div>
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            width={500}
            height={300}
          />
          </div>
          <div className="list-group" id="list-tab" role="tablist">
          {weights.length == 0? <div className="list-group-item list-group-item-action disabled">No Weight entrees</div>:
          weights.map((w, i) => (
            <a key={i} onClick={() => {/*selectNote(i)*/}} className="list-group-item list-group-item-action" id="list-home-list" data-bs-toggle="list" href="#list-home" role="tab" aria-controls="list-home">
              <h3>{w?.value}</h3>
              <p>{w?.date}</p>
            </a>
          ))}
          </div>
          </Paper>
        </Grid>
        <Grid item xs={6}>
        <Paper variant="outlined" margin={5}>
          <Typography>Diet</Typography>
        </Paper>
        </Grid>
        <Grid item xs={12}>
        <Paper variant="outlined" margin={5}>
          <Typography>Routine</Typography>
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