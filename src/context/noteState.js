import { useState ,useContext} from "react";
import NoteContext from "./notecontext";
import React from 'react'
import AlertContext from "./alertContext";


const NoteState=(props) =>{
    const host = process.env.REACT_APP_BACKEND_HOST_URL;
    const currNotes = [];
    const [notes, setNotes] = useState(currNotes);
    const [sharedNote , setSharedNote] = useState({});
    const [shareLink, setshareLink] = useState('');

    const ui = process.env.REACT_APP_FRONTEND_HOST_URL;
    const context1  = useContext(AlertContext);
    const{showAlert} = context1;

    const fetchNotes = async () => {
        const response = await fetch(`${host}/notekeeper/note/user/notes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer "+ localStorage.getItem('token'),
          },
        });
        if (!response.ok) {
          const data = await response.json();
          showAlert(data.error , "danger");
        }
        
        const json = await response.json();
        console.log(json)
        setNotes(json);
      };
      const fetchSharedUserNotes = async () => {
        const response = await fetch(`${host}/notekeeper/shareuser/shared`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer "+ localStorage.getItem('token'),
          },
        });
        if (!response.ok) {
          const data = await response.json();
          showAlert(data.error , "danger");
        }
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
      if (!response.ok) {
        const data = await response.json();
        showAlert(data.error , "danger");
      }
      const json = await response.json();
      console.log(json);
      currNotes.id=json.id;
      currNotes.permission=json.permission;
      currNotes.sharing = json.sharing;
      setNotes(notes.concat(currNotes))
      showAlert("Note Added Successfully","success")
      
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
        if (!response.ok) {
          const data = await response.json();
          showAlert(data.error , "danger");
        }
        console.log( await response.json());
        const newNotes = notes.filter((notes) => {
          return notes.id !== id;
        });
        console.log(newNotes);
        setNotes(newNotes);
        showAlert("Note Deleted Successfully","danger")
      }
      

    };
    const deleteNoteSharedUser = async(id) => {

      const confirmed = window.confirm("Are you sure you want to delete this note?");
      if(confirmed){
        const response = await fetch(`${host}/notekeeper/shareuser/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer "+ localStorage.getItem('token'),
          }
        });
        if (!response.ok) {
          const data = await response.json();
          showAlert(data.error , "danger");
        }
        console.log( await response.json());
        const newNotes = notes.filter((notes) => {
          return notes.id !== id;
        });
        console.log(newNotes);
        setNotes(newNotes);
        showAlert("Note Deleted Successfully","danger")
      }
      

    };
    const RemoveSharedUserAccess = async(id , email) => {

      const confirmed = window.confirm("Are you sure you want to delete this note?");
      if(confirmed){
        const response = await fetch(`${host}/notekeeper/shareuser/user/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer "+ localStorage.getItem('token'),
            body: JSON.stringify({ email}),
          }
        });
        if (!response.ok) {
          const data = await response.json();
          showAlert(data.error , "danger");
        }
        console.log( await response.json());
        const newNotes = notes.filter((notes) => {
          return notes.id !== id;
        });
        console.log(newNotes);
        setNotes(newNotes);
        showAlert("Note Deleted Successfully","danger")
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
        if (!response.ok) {
          const data = await response.json();
          showAlert(data.error , "danger");
        }
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
      showAlert("Note Updated Successfully","success")
      
    };
    const editNoteSharedUser = async (id , title, description) => {
      const response = await fetch(`${host}/notekeeper/shareuser/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : "Bearer "+ localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description}),
      });
      if (!response.ok) {
        const data = await response.json();
        showAlert(data.error , "danger");
      }
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
    showAlert("Note Updated Successfully","success")
    
  };

    const sharingNote = async (id , permission , sharing , email) => {
      const response = await fetch(`${host}/notekeeper/shareuser/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : "Bearer "+ localStorage.getItem('token'),
        },
        body: JSON.stringify({"sharedPermission": permission , "sharing":sharing , "email":email}),
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
        newNotes[index].sharing = sharing;
        break;
      }    
    }
    setNotes(newNotes);
    //eslint-disable-next-line
    if(sharing == '1'){
      setshareLink(`${ui}/share/emails/${link}`)
    }
    else{
      setshareLink(`${ui}/share/${link}`);
    }
    

  };
const sharingNoteEmail = async (id) => {
    setshareLink(`${ui}/share/emails/${id}`)
};
  const fetchSharedNotes = async (shareId) => {

    const response = await fetch(`${host}/notekeeper/sharenote/${shareId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const data = await response.json();
      showAlert(data.error , "danger");
    }
    const json = await response.json();
    console.log(json);
    setSharedNote(json);
  };
  const fetchSharedToEmailNotes = async (shareId) => {

    const response = await fetch(`${host}/notekeeper/shareuser/${shareId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer "+ localStorage.getItem('token'),
      },
    });
    if (!response.ok) {
      const data = await response.json();
      showAlert(data.error , "danger");
    }
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
    if (!response.ok) {
      const data = await response.json();
      showAlert(data.error , "danger");
    }
    const json = await response.json();
    console.log(json)
    let newNote = JSON.parse(JSON.stringify(sharedNote));
      newNote.title = title;
      newNote.description = description;
  setSharedNote(newNote);
  showAlert("Note Updated Successfully","success")
};



  return (
    <NoteContext.Provider value={{ 
    notes ,sharedNote,shareLink,setshareLink,
    fetchNotes ,addNote , deleteNote ,editNote , 
    sharingNote ,fetchSharedNotes ,editSharedNote , fetchSharedUserNotes 
    ,editNoteSharedUser ,deleteNoteSharedUser ,RemoveSharedUserAccess, fetchSharedToEmailNotes , sharingNoteEmail }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
