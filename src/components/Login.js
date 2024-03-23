import React,{useState,useContext,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { Link  } from "react-router-dom";
import AlertContext from '../context/alertContext';
import loadingContext from '../context/loadingContext';


const Login = (props) => {
  //eslint-disable-next-line
  let {token , setToken} = props
  const navigate = useNavigate();
  const logincontext  = useContext(loadingContext);
  const{toggleLoading} = logincontext;
  // toggleLoading(true);
  useEffect(()=>{
    const isTokenExpired = (token) => {
      if (!token) {
        return true; 
      }
      const tokenData = JSON.parse(atob(token.split('.')[1])); // Decode token payload
      const tokenExpiration = tokenData.exp * 1000; // Convert expiration time to milliseconds

      return Date.now() > tokenExpiration;
    };
    if(!isTokenExpired(token) ){
      navigate('/')
    }
    else{
      navigate("/login");
    }
    // toggleLoading(true);
  },
  // eslint-disable-next-line
  [token,navigate])

    const host = process.env.REACT_APP_BACKEND_HOST_URL;
    const context1  = useContext(AlertContext);
    const{showAlert} = context1;
    const [cred, setCred] = useState({
      email: "",
      password: "",
    });
    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value });
      };

    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        toggleLoading(true);
        const response = await fetch(`${host}/notekeeper/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: cred.email, password: cred.password }),
        });
    
        const json = await response.json();
        console.log(json);
        if (json.success) {
          localStorage.setItem("token", json.token);
          setToken(json.token);
          navigate("/");
          showAlert("Logged In Successfully", "success")
        } else {
          showAlert("Invalid Credentials","danger")
        }}
        catch (error) {
          showAlert(error)
        } finally {
          toggleLoading(false);
        }
      };

  return (
    <>
    <div className='container my-5'>
      <form onSubmit={handleSubmit}>
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
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
        
      </form>
      <Link to="/signup" className='text-center my-2'>Dont have account ? Signup Now</Link>
      </div>
      
    </>
  )
}

export default Login
