import React,{useContext} from 'react'
import NoteContext from '../context/notecontext';

const NoteItem =(props)=> {
    const context = useContext(NoteContext);
    const { note } = props;
  return (
    <>
      <div className='col-md-4 my-2'>
        <div className='card'>
          <div className='card-body'>
            <h5 className='card-title'>{note.title}</h5>
            <div className='d-flex flex-row-reverse'>
              <span
                className='material-symbols-outlined mx-1 align-items-center icon'
                // onClick={() => {
                //   deleteNote(note._id);
                //   showAlert("Note Deleted Successfully" , "danger");
                // }}
                >
                delete
              </span>
              <span
                className='material-symbols-outlined mx-1 align-items-center icon'
                // onClick={() => updateNote(note)}
                >
                edit
              </span>
            </div>
            <p className='card-text'>{note.description}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default NoteItem
