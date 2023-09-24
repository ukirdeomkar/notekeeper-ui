import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notecontext";
import NoteItem from "./NoteItem";

function Notes() {

    const context = useContext(NoteContext);
    const { notes , fetchNotes ,editNote } = context;
    let navigate = useNavigate();
    const [note, setNote] = useState({
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
        editNote(note.eid, note.etitle, note.edescription);
        //showAlert("Note Updated Successfully" , "success");
      };
      const updateNote = (currNote) => {
        ref.current.click();
        
        setNote({
          eid : currNote.id,
          etitle: currNote.title,
          edescription: currNote.description,
        });      
      };
      const shareNote = (currNote) => {
        refShare.current.click();
        setNote({
          eid : currNote.id,
          etitle: currNote.title,
          edescription: currNote.description,
        });      

      };
      const handleShareClick =()=>{
        refShare.current.click();
        console.log("Handling share")
      }

      const ref = useRef(null);
      const refClose = useRef(null);
      const refShare = useRef(null);
      const refShareClose = useRef(null);

  return (
    <>

    {/* Edit Note Modal */}
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
                  <textarea
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

      {/* Share Note Modal */}
      <button
        type='button'
        className='btn btn-primary d-none '
        data-bs-toggle='modal'
        ref={refShare}
        data-bs-target='#shareModal'>
        shareModal
      </button>

      <div
        className='modal fade'
        id='shareModal'
        tabIndex='-1'
        aria-labelledby='shareModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='shareModalLabel'>
                Share this Note ??
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <form>
              <div class="input-group mb-3">
                <label class="input-group-text" for="inputGroupSelect01">Sharing Options</label>
                <select class="form-select" id="inputGroupSelect01">
                  <option selected >Choose...</option>
                  <option value="0">Private</option>
                  <option value="1">Shared with View Only Access</option>
                  <option value="2">Shared with View and Edit Access</option>
                  <option value="3">Shared with View,Edit and Delete Access</option>
                </select>
              </div>
              <button
                // disabled={note.etitle < 5 || note.edescription < 5}
                type='button'
                className='btn btn-primary'
                onClick={handleShareClick}>
                Save Changes
              </button>
              </form>
              <div className='mb-3 my-5'>
                  <p><strong >Title :</strong> {note.etitle}</p>
                  <p><strong>Description :</strong> {note.edescription} </p>
              </div>

            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                ref={refShareClose}
                data-bs-dismiss='modal'>
                Close
              </button>

            </div>
          </div>
        </div>
      </div>



      {/* Display Notes for User */}
      {notes.length===0?
              <h5>No Notes to display</h5>
            :
      <div className='row my-5'>
        {notes.map((note) => {
          return (
            <NoteItem key={note.id} note={note} 
            updateNote={updateNote} shareNote={shareNote}
             />
          );
        })}
      </div>}
    </>
  )
}

export default Notes
