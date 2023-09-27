import React, { useState, useContext } from "react";
import NoteContext from "../context/notecontext";

const ManageEmail = (props) => {
  const [emailList, setEmailList] = useState([]);
  const [cred, setCred] = useState({
    email: "",
  });
  const context = useContext(NoteContext);
  const { sharingNote } = context;
  const { note, sharing } = props;
  const onEmailChange = (e) => {
    const { name, value } = e.target;
    setCred({ ...cred, [name]: value });
  };
  const handleSubmit = () => {
    const emailString = emailList.join(',');
    // Now you can send emailString to your backend API.
    // Make an API request to submit the email addresses.
  };
  
  
  const handleAddEmail = async (e) => {
    e.preventDefault();
    //sharingNote(note.eid,note.epermission,sharing,cred.email)
    if (cred.email.trim() !== '') {
        setEmailList([...emailList, cred.email]);
        setCred({ ...cred, email: '' }); // Clear the input field
      }
  };
  return (
    <>
      <form onSubmit={handleAddEmail}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onEmailChange}
            value={cred.email}
          />
        </div>
        <button className="btn btn-primary my-1" onClick={handleAddEmail}>
          Add
        </button>
        <ul>
          {emailList.map((email, index) => (
            <li key={index}>{email}</li>
          ))}
        </ul>
        <button
          className="btn btn-primary text-center mx-1"
          onClick={handleSubmit}
        >
          Save Changes
        </button>
      </form>
    </>
  );
};

export default ManageEmail;
