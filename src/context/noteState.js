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
            //"token":
            //localStorage.getItem('token'),
            "Authorization" : "Bearer "+ localStorage.getItem('token'),
          },
        });
        const json = await response.json();
        console.log(json)
        setNotes(json);
      };


  return (
    <NoteContext.Provider value={{ notes ,fetchNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
