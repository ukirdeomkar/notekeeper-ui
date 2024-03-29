
import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './context/noteState';
import AlertState from './context/alertState';
import Signup from './components/Signup';
import Login from './components/Login';
import SharedNote from './components/SharedNote';
import AlertBar from './components/AlertBar';
import SharedNoteUsers from './components/SharedNoteUsers';
import React,{useState} from 'react'
import { LoadingProvider } from './context/loadingContext';
import Loading from './components/Loading';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  return (
    <>
    <AlertState>
    <NoteState>
    <LoadingProvider>  
    <BrowserRouter>
    <Navbar token={token} setToken={setToken}/>
    <AlertBar/>
    <Loading />
      <Routes>

            <Route path='/' element={<Home/>} />
            <Route path='/about' element={<About />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login token={token} setToken={setToken}/>} />
            <Route path='/shared' element={<SharedNoteUsers />} />
            <Route path={'/share/:shareId'} element={<SharedNote/>} />
            <Route path={'/share/emails/:shareId'} element={<SharedNote/>} />

      </Routes>

    </BrowserRouter>
    </LoadingProvider>
    </NoteState>
    </AlertState>
    </>
  );
}

export default App;
