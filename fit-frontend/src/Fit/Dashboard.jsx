import { useOktaAuth } from "@okta/okta-react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

import './Dashboard.css'

export const Dashboard = () => {

  const {authState} = useOktaAuth();
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(-1);
  const [selectedNoteBody, setSelectedNoteBody]= useState('');
  const [selectedNoteTitle, setSelectedNoteTitle]= useState('');

  // const app_url = 'fit.app';
  const app_url = 'http://localhost:8080';

  const bodyRef = useRef(null);

 useEffect(() => {
  const fetchNotes = async () => {
    console.log(authState);
    if (authState && authState?.isAuthenticated) {
      const url = `${app_url}/api/notes/byUserEmail`;
      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
          'Content-Type': 'application/json',
        }
      };
      axios.get(url, requestOptions).then((res) =>{
        console.log(res.data);
        setNotes(res.data);
      }).catch(err => {
        console.log(err);
      })
    }
  }
  fetchNotes();
 }, [authState])

 // when selected note changes
 useEffect(() => {
  console.log(notes);
 }, [notes])


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
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="list-group" id="list-tab" role="tablist">
            {notes.length == 0? <div className="list-group-item list-group-item-action disabled">No Routine</div>:
            notes.map((note, i) => (
              <a key={i} onClick={() => {selectNote(i)}} className="list-group-item list-group-item-action" id="list-home-list" data-bs-toggle="list" href="#list-home" role="tab" aria-controls="list-home">
                <h3>{note.title}</h3>
                <p>{note.body.length<35?note.body:note.body.substring(0,33)+".."}</p>
              </a>
            ))}
            </div>
          </div>
          <div className="col-8" style={{paddingBottom: "5px"}}>
            Coming soon
          </div>
          {/* <div className="col-8" style={{paddingBottom: "5px"}}>
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
          </div> */}
        </div>
      </div>
      

    </div>)


}