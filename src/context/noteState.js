import { useState } from "react";
import NoteContext from "./notecontext";

import React from 'react'

const NoteState=(props) =>{
    const host = process.env.REACT_APP_BACKEND_HOST_URL;
    const currNotes = [];
    const [notes, setNotes] = useState(currNotes);

    const fetchNotes = async () => {
        const response = await fetch(`${host}/notekeeper/note/user/notes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer "+ localStorage.getItem('token'),
          },
        });
        const json = await response.json();
        console.log(json)
        setNotes(json);
      };

    const addNote = async(currNotes)=>{
      const { title, description} = currNotes;
      // eslint-disable-next-line
      const response = await fetch(`${host}/notekeeper/note/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : "Bearer "+ localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description }),
      });
      setNotes(notes.concat(currNotes))
      
    };

    const deleteNote = async(id) => {

      const response = await fetch(`${host}/notekeeper/note/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : "Bearer "+ localStorage.getItem('token'),
        }
      });
      console.log( await response.json());
      const newNotes = notes.filter((notes) => {
        return notes.id !== id;
      });
      console.log(newNotes);
      setNotes(newNotes);
    };

  return (
    <NoteContext.Provider value={{ notes ,fetchNotes ,addNote , deleteNote}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
