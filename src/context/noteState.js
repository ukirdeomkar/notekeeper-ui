import { useState } from "react";
import NoteContext from "./notecontext";

import React from 'react'


const NoteState=(props) =>{
    const host = process.env.REACT_APP_BACKEND_HOST_URL;
    const currNotes = [];
    const [notes, setNotes] = useState(currNotes);
    const [sharedNote , setSharedNote] = useState({});
    const [shareLink, setshareLink] = useState('');
    const ui = process.env.REACT_APP_FRONTEND_HOST_URL;

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

      const confirmed = window.confirm("Are you sure you want to delete this note?");
      if(confirmed){
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
        alert("Note Deleted Successfully")
      }
      

    };
    const editNote = async (id , title, description) => {
        const response = await fetch(`${host}/notekeeper/note/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer "+ localStorage.getItem('token'),
          },
          body: JSON.stringify({ title, description}),
        });
        const json = await response.json();
        console.log(json)
        let newNotes = JSON.parse(JSON.stringify(notes));
        // logic to edit in client
        for (let index = 0; index < notes.length; index++) {
        const element = newNotes[index];
        if (element.id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          break;
        }
       
      }
      setNotes(newNotes);
      
    };

    const sharingNote = async (id , permission) => {

      const response = await fetch(`${host}/notekeeper/sharenote/share/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : "Bearer "+ localStorage.getItem('token'),
        },
        body: JSON.stringify({"sharedPermission": permission}),
      });
      const data = await response.json();
      let link = data.link

      console.log(link);
      let newNotes = JSON.parse(JSON.stringify(notes));
      // logic to edit in client
      for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element.id === id) {
        newNotes[index].permission = permission;
        break;
      }

     
    }
    setNotes(newNotes);
    setshareLink(`${ui}/share/${link}`);

  };
  const fetchSharedNotes = async (shareId) => {

    const response = await fetch(`${host}/notekeeper/sharenote/${shareId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    setSharedNote(json);
  };
  const editSharedNote = async (shareId , title, description) => {
    const response = await fetch(`${host}/notekeeper/sharenote/${shareId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description}),
    });
    const json = await response.json();
    console.log(json)
    let newNote = JSON.parse(JSON.stringify(sharedNote));
      newNote.title = title;
      newNote.description = description;
  setSharedNote(newNote);
};



  return (
    <NoteContext.Provider value={{ notes ,sharedNote,shareLink,fetchNotes ,addNote , deleteNote ,editNote , sharingNote ,fetchSharedNotes ,editSharedNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
