import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notecontext";
import NoteItem from "./NoteItem";

function Notes() {

    const context = useContext(NoteContext);
    const { notes , fetchNotes } = context;
    let navigate = useNavigate();
    const [note, setNote] = useState({
        id: "",
        etitle: "",
        edescription: "",
      });
      useEffect(()=>{
        if(localStorage.getItem('token')){
          fetchNotes();
        }
        else{
          navigate("/login");
        }
      },
      // eslint-disable-next-line
      [])
      const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
      };
      const handleClick = (e) => {
        refClose.current.click();
        //editNote(note.id, note.etitle, note.edescription, note.etag);
        //showAlert("Note Updated Successfully" , "success");
      };

      const ref = useRef(null);
      const refClose = useRef(null);

  return (
    <>
      <button
        type='button'
        className='btn btn-primary d-none '
        data-bs-toggle='modal'
        ref={ref}
        data-bs-target='#exampleModal'>
        Launch demo modal
      </button>

      <div
        className='modal fade'
        id='exampleModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='exampleModalLabel'>
                Edit Note
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <form>
                <div className='mb-3'>
                  <label htmlFor='etitle' className='form-label'>
                    Title
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='etitle'
                    name='etitle'
                    onChange={onChange}
                    value={note.etitle}
                    minLength={5}
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='edescription' className='form-label'>
                    Description
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='edescription'
                    name='edescription'
                    onChange={onChange}
                    value={note.edescription}
                    minLength={5}
                    required
                  />
                </div>

              </form>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                ref={refClose}
                data-bs-dismiss='modal'>
                Close
              </button>
              <button
                disabled={note.etitle < 5 || note.edescription < 5}
                type='button'
                className='btn btn-primary'
                onClick={handleClick}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {notes.length===0?
              <h5>No Notes to display</h5>
            :
      <div className='row my-5'>
        {notes.map((note) => {
          return (
            <NoteItem key={note.id} note={note} 
            // updateNote={updateNote}
             />
          );
        })}
      </div>}
    </>
  )
}

export default Notes
