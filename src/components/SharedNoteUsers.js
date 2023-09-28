
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notecontext";
import SharedNoteItem from "./SharedNoteItem";
const SharedNoteUsers = () => {
    const context = useContext(NoteContext);
    const { notes ,shareLink, fetchSharedUserNotes , sharingNote, editNoteSharedUser ,sharingNoteEmail } = context;
    const [permission, setpermission] = useState(undefined);
    let navigate = useNavigate();
    const [note, setNote] = useState({
        etitle: "",
        edescription: "",
      });



   // eslint-disable-next-line
    const [token, setToken] = useState(localStorage.getItem('token') || '');
      useEffect(()=>{
          fetchSharedUserNotes();

      },
      // eslint-disable-next-line
      [navigate])


      
      
      const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
      };
      const handlePermissionChange = (e) => {
        setpermission(e.target.value)
        console.log("Current Permiision: " +permission);
      };
      useEffect(() => {
        if(permission !== undefined){
          note.epermission = permission
          sharingNote(note.eid,note.epermission)
        }
        
        //eslint-disable-next-line
      }, [permission])



      
      const handleClick = (e) => {
        refClose.current.click();
        editNoteSharedUser(note.eid, note.etitle, note.edescription);
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
        sharingNoteEmail(currNote.id)

      };
      const copyToClipboard = () => {
        const inputFields = document.getElementsByClassName('shareLink');
        if (inputFields.length > 0) {
          const inputField = inputFields[0];
          inputField.select(); // Select the text in the input field
          document.execCommand('copy'); // Copy the selected text to the clipboard
          alert('Copied to Clipboard');
        }
      };
     
      const copyItem =<>
        <p>Share this Link </p>
        <div className="input-group mb-3">

        <input type="text" className="form-control shareLink" defaultValue={shareLink} aria-describedby="basic-addon2"/>
        <span onClick={copyToClipboard} className="input-group-text material-symbols-outlined" id="basic-addon2">
            content_copy
        </span>
        </div>
        </>
      
      
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
            { copyItem }
            
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
              <h5 className="text-center my-5">No Notes to display</h5>
            :
      <div className='row my-5'>
        {notes.map((note) => {
          return (
            <SharedNoteItem key={note.id} note={note} 
            updateNote={updateNote} shareNote={shareNote} sharingNoteEmail={sharingNoteEmail}
             />
          );
        })}
      </div>}
    </>
  )
}

export default SharedNoteUsers