import React,{useState, useContext} from 'react'
import { useNavigate } from "react-router-dom";
import { Link  } from "react-router-dom";
import AlertContext from '../context/alertContext';

const Signup = () => {

    const host = process.env.REACT_APP_BACKEND_HOST_URL;
    const navigate = useNavigate();
    const context1  = useContext(AlertContext);
    const{showAlert} = context1;
    const [cred, setCred] = useState({
        name : "",
        email: "",
        password: "",
      });
      const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value });
      };
      const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/notekeeper/user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name : cred.name ,email: cred.email, password: cred.password }),
          });
      
          const json = await response.json();
          console.log(json);
          if (json.success) {
            //localStorage.setItem("token", json.authToken);
            navigate("/login");
            showAlert("Signed Up Succesfully","success");
          } else {
           
            showAlert(json.error,"success");
          }
      }

  return (
    <div className='container my-5'>
    <form onSubmit={handleSubmit} >


    <div className='mb-3'>
        <label htmlFor='exampleInputName1' className='form-label'>
          Name
        </label>
        <input
          type='text'
          className='form-control'
          id='name'
          name='name'
          onChange={onChange}
          value={cred.name}
          required
          minLength={5}
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='exampleInputEmail1' className='form-label'>
          Email address
        </label>
        <input
          type='email'
          className='form-control'
          id='email'
          name='email'
          aria-describedby='emailHelp'
          onChange={onChange}
          value={cred.email}
          required
          minLength={5}
        />
     
      </div>
      <div className='mb-3'>
        <label htmlFor='exampleInputPassword1' className='form-label'>
          Password
        </label>
        <input
          type='password'
          className='form-control'
          id='password'
          name='password'
          onChange={onChange}
          value={cred.password}
          required
          minLength={5}
        />
      </div>

      <button type='submit' className='btn btn-primary'>
        Submit
      </button>
    </form>
    <Link to="/login" className='text-center my-2'>Already have an account? Login Here</Link>
  </div>
  )
}

export default Signup
