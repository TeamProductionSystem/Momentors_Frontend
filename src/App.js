import React from "react";
import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import Hero from "./pages/Home/Hero";
import NavBar from "./components/NavBar";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Profile from "./pages/Register/Profile";
import EditProfile from "./pages/Profile/EditProfile";
import MentorSessions from "./pages/Sessions/MentorSessions";
import SessionSignup from "./pages/SessionSignup/SessionSignup";
import MenteeSessions from "./pages/Sessions/MenteeSessions";
import TimeSlot from "./pages/Profile/TimeSlot";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import "./assets/App.css";

function App() {
  const [token, setToken] = useLocalStorageState("momentorsToken", null);

  const [userName, setUserName] = useLocalStorageState("momentorsUserName", "");
  const [pk, setPk] = useLocalStorageState("pk", "");
  const [mentor, setMentor] = useState(false);
  const [mentee, setMentee] = useState(false);

  const setAuth = (userName, token, pk) => {
    setUserName(userName);
    setToken(token);
    setPk(pk);
  };

  const handleLogout = () => {
    axios
      .post(
        "https://team-production-system.onrender.com/auth/token/logout/",
        {},
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        setAuth("", null);
        setMentor(false);
        setMentee(false);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setAuth("", null);
          setMentor(false);
          setMentee(false);
        }
      });
  };

  const isLoggedIn = userName && token;

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} token={token} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route
          path="/register"
          element={<Register isLoggedIn={isLoggedIn} setAuth={setAuth} />}
        />
        <Route
          path="/login"
          element={
            <Login
              setAuth={setAuth}
              setMentor={setMentor}
              setMentee={setMentee}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              token={token}
              pk={pk}
              setAuth={setAuth}
              mentor={mentor}
              setMentor={setMentor}
              mentee={mentee}
              setMentee={setMentee}
            />
          }
        />
        <Route
          path="/editprofile"
          element={<EditProfile token={token} pk={pk} />}
        />
        <Route
          path="/mentorsessions"
          element={
            <MentorSessions
              token={token}
              setAuth={setAuth}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route
          path="/menteesessions"
          element={
            <MenteeSessions
              token={token}
              setAuth={setAuth}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route
          path="/sessionsignup"
          element={
            <SessionSignup
              token={token}
              setAuth={setAuth}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route
          path="/timeslot"
          element={
            <TimeSlot token={token} setAuth={setAuth} isLoggedIn={isLoggedIn} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
