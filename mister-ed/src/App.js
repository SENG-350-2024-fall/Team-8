import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import HomePage from './pages/homepage/HomePage';
import SupportPage from './pages/homepage/support/Support';
import SupportAdminPage from './pages/homepage/support/SupportAdmin';
import TicketDetailPage from './pages/homepage/support/TicketDetails';
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
          <Route path="/support" element={<SupportPage />} />
          <Route path="/support-admin" element={<SupportAdminPage />} />
          <Route path="/ticket-details/:id" element={<TicketDetailPage />} />
          <Route path="/" element={<Navigate to="/landing" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


