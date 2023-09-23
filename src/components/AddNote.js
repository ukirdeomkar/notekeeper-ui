import React , {useContext , useState}from 'react'
import NoteContext from '../context/notecontext';

function AddNote() {
    const context = useContext(NoteContext);
  
    const { addNote  } = context;
    const [note, setNote] = useState({
      title: "",
      description: ""
    });
  
    const onChange = (e) => {
      setNote({ ...note, [e.target.name]: e.target.value });
    };
  
    const handleClick = (e) => {
      e.preventDefault();
      addNote(note);

      setNote({
        title: "",
        description: ""
      });
    };
  
  return (
<form>
      <div className='mb-3'>
        <label htmlFor='title' className='form-label'>
          Title
        </label>
        <input
          type='text'
          className='form-control'
          id='title'
          name='title'
          onChange={onChange}
          minLength={3}
          value={note.title}
          required
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='description' className='form-label'>
          Description
        </label>
        <input
          type='text'
          className='form-control'
          id='description'
          name='description'
          onChange={onChange}
          value={note.description}
          minLength={5}
          required
        />
      </div>
      <button
        disabled={note.title < 3 || note.description < 5}
        type='submit'
        className='btn btn-primary'
        onClick={handleClick}>
        Add Note
      </button>
    </form>
  )
}

export default AddNote
