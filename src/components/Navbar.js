import React, { useEffect} from "react";
import { Link } from "react-router-dom";
function Navbar(props) {
  // var token = localStorage.getItem('token');
 // eslint-disable-next-line

 let {token , setToken} = props
  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken('');
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="">
            NoteKeeper
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ml-auto">
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="">
                  Home
                </Link>
              </li>
              <li>
              <Link className="nav-link " aria-current="page" to="/shared">
                  Shared With Me
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="about">
                  About
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav float-end">
              {!token? (
                <>
                  <li className="nav-item">
                    <Link
                      className="btn btn-primary mx-2 my-1"
                      to="/login"
                      role="button"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    {" "}
                    <Link
                      className="btn btn-primary mx-2 my-1 "
                      to="/signup"
                      role="button"
                    >
                      Signup
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  {" "}
                  <Link
                    className="btn btn-danger mx-2 "
                    onClick={handleLogout}
                    to="/login"
                    role="button"
                  >
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
