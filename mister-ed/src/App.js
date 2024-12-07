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
import DispatchRequests from './pages/dispatchRequests';
import HomePatient from './pages/homepage/HomePatient';
import HomeNurse from './pages/homepage/HomeNurse';
import HomeAdmin from './pages/homepage/HomeAdmin';
import HomeDoctor from './pages/homepage/HomeDoctor';
import ProtectedRoute from './pages/ProtectedRoute';
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
          <Route path="/dispatchRequests" element={<DispatchRequests />} />
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/support" element={<ProtectedRoute><SupportPage /></ProtectedRoute>} />
          <Route path="/support-admin" element={<ProtectedRoute><SupportAdminPage /></ProtectedRoute>} />
          <Route path="/ticket-details/:id" element={<ProtectedRoute><TicketDetailPage /></ProtectedRoute>} />
		      <Route path="/triage" element={<ProtectedRoute><Triage /></ProtectedRoute>} />
		      <Route path="/request-triage" element={<ProtectedRoute><RequestTriage /></ProtectedRoute>} />
          <Route path='/perform-triage' element={<ProtectedRoute><QueueProvider><PerformTriage /></QueueProvider></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/appointment" element={<ProtectedRoute><Appointment /></ProtectedRoute>} />
          <Route path="/homeEMT" element={<ProtectedRoute><HomeEMT /></ProtectedRoute>} />
          <Route path="/homePatient" element={<ProtectedRoute><HomePatient /></ProtectedRoute>} />
          <Route path="/homeNurse" element={<ProtectedRoute><HomeNurse /></ProtectedRoute>} />
          <Route path="/homeAdmin" element={<ProtectedRoute><HomeAdmin /></ProtectedRoute>} />
          <Route path="/homeDoctor" element={<ProtectedRoute><HomeDoctor /></ProtectedRoute>} />
          <Route path="/" element={<Navigate to="/landing" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
