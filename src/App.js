import React from "react";
import { useState } from 'react';
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import Hero from "./components/Hero";
import Sessions from "./components/Sessions";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";


function App() {

  const [userName, setUserName] = useState('')

  const [token, setToken] = useState('')

  const setAuth = (userName, token) => {
    setToken(token)
    setUserName(userName)
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
      <Route path="/login" element={<Login setAuth={setAuth} isLoggedIn={isLoggedIn} setUserName={setUserName} userName={userName}/>} />
      <Route path="/sessions" element={<Sessions setAuth={setAuth} isLoggedIn={isLoggedIn}/>} />
    </Routes>
    </BrowserRouter>
  )
}


export default App;
