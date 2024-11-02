import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import CreateAccount from './pages/create_account/CreateAccount';
import HomePage from './pages/HomePage';
import Triage from './pages/Triage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/home" element={<HomePage />} />
		  <Route path="/triage" element={<Triage />} />
          <Route path="/" element={<Navigate to="/landing" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


