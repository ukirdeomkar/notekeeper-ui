
import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './context/noteState';
import Signup from './components/Signup';
import Login from './components/Login';
import SharedNote from './components/SharedNote';

function App() {
  return (
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar/>
    <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/about' element={<About />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path={'/share/:shareId'} element={<SharedNote/>} />

          </Routes>
    </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
