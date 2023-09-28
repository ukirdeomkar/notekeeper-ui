import React, {useState,useEffect , useContext ,useRef} from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoteContext from "../context/notecontext";

const SharedNote = (props) => {
  const { shareId } = useParams();
  const isEmailsRoute = window.location.pathname.includes('emails');
  console.log(isEmailsRoute);
  useEffect(() => {
    if(!isEmailsRoute){
      fetchSharedNotes(shareId);
    }
    else{
      fetchSharedToEmailNotes(shareId);
    }
     
  },
  // eslint-disable-next-line
   []);
const context = useContext(NoteContext);
const {sharedNote ,fetchSharedNotes,editSharedNote , fetchSharedToEmailNotes}= context;
const host = process.env.REACT_APP_BACKEND_HOST_URL;
var shareLink = window.location.href;
const navigate = useNavigate();
const [note, setNote] = useState({
    eid : '',
    etitle: '',
    edescription: '',
  });
const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
const handleClick = (e) => {
    refClose.current.click();
    editSharedNote(shareId,note.etitle, note.edescription);
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
      epermission : currNote.permission,
      
    });    

  };

const ref = useRef(null);
const refClose = useRef(null);
const refShare = useRef(null);
const refShareClose = useRef(null);

const deleteSharedNote = async(shareId) => {
    const confirmed = window.confirm("Are you sure you want to delete this note?");
    if(confirmed){
    //eslint-disable-next-line
    const response = await fetch(`${host}/notekeeper/sharenote/${shareId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });
      if(response.status === 200){
        alert("Note Deleted Succesfully")
        navigate("/");
      }
     
    }

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
      const json = await response.json();
      if(json.success){
        alert("Note Deleted Successfully")
        navigate("/")
      }

      
    }
    

  };


  //const { note, updateNote ,shareNote } = props;




  let editBtn , deleteBtn;
  if(sharedNote.permission>=2){
    editBtn =
     <span className="material-symbols-outlined mx-1 align-items-center icon"
       onClick={() => updateNote(sharedNote)}
    >
    edit
    </span>;
  }
    if(sharedNote.permission===3){
        deleteBtn =               
        <span
        className=" material-symbols-outlined mx-1 align-items-center icon "
        onClick={() => {
          !isEmailsRoute ?deleteSharedNote(shareId) : deleteNoteSharedUser(shareId)
        //     //   showAlert("Note Deleted Successfully" , "danger");
         }}    
    >
        delete
    </span>
    }

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
                 onClick={handleClick}
                >
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
            

            <div className="input-group mb-3">
            
            <input type="text" className="form-control shareLink" defaultValue={shareLink} aria-describedby="basic-addon2"/>
           
            <span onClick={copyToClipboard} className="input-group-text material-symbols-outlined" id="basic-addon2">
                content_copy
            </span>
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





    {/* Render The Note */}

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
                 onClick={()=>shareNote(sharedNote)}
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
