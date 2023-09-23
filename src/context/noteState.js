import { useState } from "react";
import NoteContext from "./notecontext";

import React from 'react'

const NoteState=(props) =>{
    const host = process.env.REACT_APP_BACKEND_HOST_URL;
    const currNotes = [];
    const [notes, setNotes] = useState(currNotes);

  return (
    <NoteContext.Provider value={{ notes}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
