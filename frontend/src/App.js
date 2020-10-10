import React from 'react';
import './App.css';
import Navbar from "./Components/Navbar"
import Login from './Routes/Login'
import Register from './Routes/Register'
import {Routes} from './Routes/Routes'


function App() {
  return (
    <div>
      <Routes />
    </div>
  );
}

export default App;
