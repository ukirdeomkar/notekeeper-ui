import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SharedNote = (props) => {
  const shareId = useParams().shareId;
  console.log(shareId);
  // const context = useContext(NoteContext);
  // const { deleteNote } = context;
  //const { note, updateNote ,shareNote } = props;
  const [note, setNote] = useState({});
  const host = process.env.REACT_APP_BACKEND_HOST_URL;
  const fetchNotes = async () => {
    const response = await fetch(`${host}/notekeeper/sharenote/${shareId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    setNote(json);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  let editBtn , deleteBtn;
  if(note.permission===2){
    editBtn =
     <span className="material-symbols-outlined mx-1 align-items-center icon"
    //   onClick={() => updateNote(note)}
    >
    edit
    </span>;
  }
if(note.permission===3){
    editBtn =
    <span className="material-symbols-outlined mx-1 align-items-center icon"
   //   onClick={() => updateNote(note)}
   >
   edit
   </span>;
    deleteBtn =               
    <span
    className=" material-symbols-outlined mx-1 align-items-center icon "
    //   onClick={() => {
    //     deleteNote(note.id);
    //     //   showAlert("Note Deleted Successfully" , "danger");
    //   }}
  >
    delete
  </span>
}

  return (
    <>
    {note.permission > 0 ? 
    <>
      <h5 className="text-center my-5">This Note has been Shared with you. </h5>
      <div className="container my-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <div className="d-flex flex-row-reverse">
              <span
                className="material-symbols-outlined  align-items-center  icon"
                // onClick={()=>shareNote(note)}
              >
                share
              </span>
              {deleteBtn}
              {editBtn}





            </div>
            <p className="card-text">{note.description}</p>
          </div>
        </div>
      </div>
      </>
      :
      <h5 className="text-center my-5"> You don't permission to access this note</h5>}
    </>
  );
};

export default SharedNote;
