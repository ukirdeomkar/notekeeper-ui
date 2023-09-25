import React, {useEffect , useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoteContext from "../context/notecontext";

const SharedNote = (props) => {
  const shareId = useParams().shareId;

const context = useContext(NoteContext);
const {sharedNote ,fetchSharedNotes }= context;
const host = process.env.REACT_APP_BACKEND_HOST_URL;
const navigate = useNavigate();
const deleteSharedNote = async(shareId) => {
    //eslint-disable-next-line
    const response = await fetch(`${host}/notekeeper/sharenote/${shareId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });
    alert("Note Deleted Succesfully")
    navigate("/");
  };
  //const { note, updateNote ,shareNote } = props;


  useEffect(() => {
    fetchSharedNotes(shareId);
  },
  // eslint-disable-next-line
   []);

  let editBtn , deleteBtn;
  if(sharedNote.permission>=2){
    editBtn =
     <span className="material-symbols-outlined mx-1 align-items-center icon"
    //   onClick={() => updateNote(note)}
    >
    edit
    </span>;
  }
    if(sharedNote.permission===3){
        deleteBtn =               
        <span
        className=" material-symbols-outlined mx-1 align-items-center icon "
        onClick={() => {
         deleteSharedNote(shareId);
        //     //   showAlert("Note Deleted Successfully" , "danger");
         }}
    >
        delete
    </span>
    }

  return (
    <>
    {sharedNote.permission > 0 ? 
    <>
      <h5 className="text-center my-5">This Note has been Shared with you. </h5>
      <div className="container my-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{sharedNote.title}</h5>
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
            <p className="card-text">{sharedNote.description}</p>
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
