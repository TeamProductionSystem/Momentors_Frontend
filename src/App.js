import React from "react";
import useLocalStorageState from "use-local-storage-state";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Sessions from "./components/Sessions";
import SessionSignup from "./components/SessionSignup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import PacmanLoader from "react-spinners/PacmanLoader";
import "./App.css";


function App() {

  const [token, setToken] = useLocalStorageState('momentorsToken', null)
  
  const [userName, setUserName] = useLocalStorageState('momentorsUserName', '')
  const [pk, setPk] = useLocalStorageState('pk', '');

  const setAuth = (userName, token, pk) => {
    setToken(token)
    setUserName(userName)
    setPk(pk)
  }

  const handleLogout = () => {
    axios
      .post(
        'https://team-production-system.onrender.com/auth/token/logout/',
        {},
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        setAuth("", null)
      })
  }

  const isLoggedIn = userName && token
  
  return (
    <BrowserRouter>
    <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/register" element={<Register isLoggedIn={isLoggedIn}/>} />
      <Route path="/login" element={<Login setAuth={setAuth}/>} />
      <Route path="/profile" element={<Profile token={token} pk={pk} />} />
      <Route path="/editprofile" element={<EditProfile token={token} pk={pk} />} />
      <Route path="/sessions" element={<Sessions setAuth={setAuth} isLoggedIn={isLoggedIn}/>} />
      <Route path="/sessionsignup" element={<SessionSignup setAuth={setAuth} isLoggedIn={isLoggedIn}/>} />
    </Routes>
    </BrowserRouter>
  )
}


export default App;
