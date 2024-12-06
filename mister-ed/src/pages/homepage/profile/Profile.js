import React, { useEffect, useState } from 'react';
import { Button, Grid, Box } from '@mui/material'; // Import Button, Grid, and Box from MUI
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Logger from '../../../logging/Logger';
import DatabaseClient from '../../../clients/DatabaseClient'

const LOG = new Logger();

function Profile() {
  const [user, setUser] = useState(null);
  const [hospitalName, setHospitalName] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        console.log(parsedUser);
        if (parsedUser.hospitalID) fetchHospitalName(parsedUser.hospitalID);
      } catch (error) { 
        LOG.error(`Error parsing user data in Profile Page`, error);
      }
    }
  }, []);

  const fetchHospitalName = async (hospitalID) => {
    const hospitals = await DatabaseClient.fetch('hospitals');
    const foundHospital = hospitals?.find(
      (hospital) => String(hospital.id) === String(hospitalID)
    );
    if (foundHospital) setHospitalName(foundHospital.name);
  };

  // Function to handle going back
  const handleGoBack = () => {
    // Navigate to the Home Page

    if (user.role === 'Admin') {
      navigate('/homeAdmin');
    } else if (user.role === 'Nurse') {
      navigate('/homeNurse');
    } else if (user.role === 'Doctor') {
      navigate('/homeDoctor');
    } else if (user.role === 'EMT') {
      navigate('/homeEMT');
    } else {
      navigate('/homePatient');
    }

  };

  // Function to handle updating info
  const handleUpdateInfo = () => {
    alert('Update Info Clicked'); // Placeholder for now
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '50px' }}>
      <h1>User Profile</h1>

      {user ? (
        <div style={{ marginBottom: '20px' }}>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Postal Code:</strong> {user.postal}</p>
          <p><strong>Role:</strong> {user.role}</p>
          {hospitalName && (
            <p><strong>Hospital:</strong> {hospitalName}</p>
          )}
        </div>
      ) : (
        <p>Loading user information...</p>
      )}

      {/* Grid of buttons */}
      <Grid container spacing={2} justifyContent="center" style={{ maxWidth: '600px' }}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="error"
            fullWidth
            style={{ padding: '20px' }}
            onClick={handleGoBack}
          >
            Home Page
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="error"
            fullWidth
            style={{ padding: '20px' }}
            onClick={handleUpdateInfo}
          >
            Update Info
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile;
