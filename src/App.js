
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

function App() {
  return (
    <>
    <NoteState>
      <AlertState>
    <BrowserRouter>
    <Navbar/>
    <AlertBar/>
    <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/about' element={<About />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path={'/share/:shareId'} element={<SharedNote/>} />

          </Routes>
    </BrowserRouter>
    </AlertState>
    </NoteState>
    </>
  );
}

export default App;
