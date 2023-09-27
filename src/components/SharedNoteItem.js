
import React, { useContext } from "react";
import NoteContext from "../context/notecontext";
const SharedNoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote ,shareNote } = props;
    let editBtn , deleteBtn;
    if(note.permission>=2){
      editBtn =
       <span className="material-symbols-outlined mx-1 align-items-center icon"
        //  onClick={() => updateNote(sharedNote)}
      >
      edit
      </span>;
    }
      if(note.permission===3){
          deleteBtn =               
          <span
          className=" material-symbols-outlined mx-1 align-items-center icon "
          onClick={() => {
          //  deleteSharedNote(shareId);
          //     //   showAlert("Note Deleted Successfully" , "danger");
           }}
      >
          delete
      </span>
      }
    return (
      <>
        <div className="col-md-4 my-2">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{note.title}</h5>
              <div className="d-flex flex-row-reverse">
                <span className="material-symbols-outlined  align-items-center  icon"
                onClick={()=>shareNote(note)}
                >
                  share
                </span>
                {deleteBtn}
              {editBtn}
              </div>
              <p className="card-text">{note.description}</p>
            </div>
            <div className="card-footer text-muted">
            Shared By : {note.user?.email}
        </div>
          </div>

        </div>
      </>
    );
}

export default SharedNoteItem