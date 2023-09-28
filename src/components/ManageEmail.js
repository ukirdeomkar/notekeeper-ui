import React, { useState, useContext ,useEffect} from "react";
import NoteContext from "../context/notecontext";

const ManageEmail = (props) => {

    const host = process.env.REACT_APP_BACKEND_HOST_URL;
  const context = useContext(NoteContext);
  const { sharingNote } = context;
  const { note, sharing ,permission} = props;

  const [emails, setEmails] = useState([]);

  useEffect(() => {
    fetchEmailsApi();
    //eslint-disable-next-line
  }, [note])
  

  const fetchEmailsApi = async () => {
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
  const addEmailApi = async(emailListToAdd)=>{
    // eslint-disable-next-line
    const response = await fetch(`${host}/notekeeper/shareuser/emails/${note.eid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer "+ localStorage.getItem('token'),
      },
      body: JSON.stringify({ emailList: emailListToAdd , shareNote : {"Sharing" : sharing , "SharedPermission" : permission}}),
    });
    const json = await response.json();
    console.log(json); 
    return json;
  };
  const removeEmailApi = async(id , emailToBeRemoved) => {
    const confirmed = window.confirm("Are you sure you want to remove acces for this email?");
    if(confirmed){
      const response = await fetch(`${host}/notekeeper/shareuser/emails/${note.eid}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : "Bearer "+ localStorage.getItem('token'),
        },
        body: JSON.stringify({ "email" : emailToBeRemoved}),
      });
      const data = await response.json();
      //console.log(data)
      return data;
    }
    return null ;
  };
  

  const handleAddEmail = async(newEmail) => {
    // Api Call here
    const emailListToAdd = [newEmail]
    const data = await addEmailApi( emailListToAdd)
    console.log(note.eid);
    console.log(data)
    if(data.success){
        setEmails([...emails, newEmail]);
    }
  };

  const handleRemoveEmail = async(id) => {

    // API CALL here
    const emailToBeRemoved = emails.find((email, index) => index === id)
    const data = await removeEmailApi(id , emailToBeRemoved)
    if(data.success){
        const updatedEmails = emails.filter((email, index) => index !== id);
        setEmails(updatedEmails);
    }
  };
  
  

  function EmailList({ emailList, onRemoveEmail }) {


    return (
      <ul>
        {emailList.map((email, index) => (
          <li key={index}>
            {email}{' '}
            <button onClick={() => onRemoveEmail(index)} className="btn btn-sm btn-danger my-1 mx-1">
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
        <button onClick={handleAddEmail} className="btn btn-primary my-1 mx-1">
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
