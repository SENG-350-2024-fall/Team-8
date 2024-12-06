import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import HomePage from './pages/homepage/HomePage';
import SupportPage from './pages/homepage/support/Support';
import SupportAdminPage from './pages/homepage/support/SupportAdmin';
import TicketDetailPage from './pages/homepage/support/TicketDetails';
import CreateAccount from './pages/create_account/CreateAccount';
import PerformTriage from './pages/homepage/triage/PerformTriage';
import Triage from './pages/homepage/triage/Triage';
import RequestTriage from './pages/homepage/triage/RequestTriage';
import Profile from './pages/homepage/profile/Profile';
import Appointment from './pages/appointment/AppointmentView';
import HomeEMT from './pages/homepage/HomeEMT';
import { QueueProvider } from './context/QueueContext';
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
		      <Route path="/triage" element={<Triage />} />
		      <Route path="/request-triage" element={<RequestTriage />} />
          <Route path='/perform-triage' element={<QueueProvider><PerformTriage /></QueueProvider>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/homeEMT" element={<HomeEMT />} />
          <Route path="/" element={<Navigate to="/landing" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
