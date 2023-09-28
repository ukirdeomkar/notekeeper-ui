import React, { useState, useContext ,useEffect} from "react";
import NoteContext from "../context/notecontext";

const ManageEmail = (props) => {

    const host = process.env.REACT_APP_BACKEND_HOST_URL;
  const context = useContext(NoteContext);
  const { sharingNote } = context;
  const { note, sharing } = props;

  const [emails, setEmails] = useState([]);

  useEffect(() => {
    fetchEmails();
  
  }, [note])
  

  const fetchEmails = async () => {
    const response = await fetch(`${host}/notekeeper/shareuser/emails/${note.eid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer "+ localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json)
    setEmails(json);
  };

  const handleAddEmail = (newEmail) => {
    // Api Call here
    console.log(note.eid);
    setEmails([...emails, newEmail]);
  };

  const handleRemoveEmail = (indexToRemove) => {

    // API CALL here
    const updatedEmails = emails.filter((email, index) => index !== indexToRemove);
    setEmails(updatedEmails);
  };
  
  

  function EmailList({ emailList, onRemoveEmail }) {
    
    // Api Call to get Email List 
    //emailList = fetchEmails();

    return (
      <ul>
        {emailList.map((email, index) => (
          <li key={index}>
            {email}{' '}
            <button onClick={() => onRemoveEmail(index)} className="btn btn-sm btn-danger">
              Remove
            </button>
          </li>
        ))}
      </ul>
    );
  }
  function EmailForm({ onAddEmail }) {
    const [email, setEmail] = useState('');
  
    const handleAddEmail = () => {
      if (email.trim() !== '') {
        onAddEmail(email);
        setEmail('');
      }
    };
  
    return (
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
        <button onClick={handleAddEmail} className="btn btn-primary">
          Add Email
        </button>
      </div>
    );
  }
  return (
    <>
    <div>
      <EmailForm onAddEmail={handleAddEmail} />
      <EmailList emailList={emails} onRemoveEmail={handleRemoveEmail} />
    </div>
    </>
  );
};

export default ManageEmail;
