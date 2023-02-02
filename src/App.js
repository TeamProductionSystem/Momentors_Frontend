import React from 'react';
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Nav />
    <Routes>
      <Route path="Hero" element={<Hero />} />
    </Routes>

    </BrowserRouter>
  )
}

export default App;
