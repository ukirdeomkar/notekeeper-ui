import React from 'react'
import { Link  } from "react-router-dom";
function Navbar() {
  const token = localStorage.getItem("token");
  const handleLogout = ()=>{
    localStorage.removeItem("token");
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="">NoteKeeper</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="about">About</Link>
        </li>
        <div className='d-flex'>
            {!token ?
            <>
            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
            </>
            :
            <Link className="btn btn-danger mx-2" onClick={handleLogout} to="/login" role="button">Logout</Link>
            }
              
             
          
            
          </div>


      </ul>

    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar
