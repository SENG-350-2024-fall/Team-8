import React, { useEffect, useState } from 'react';
import { Button, Grid, Box } from '@mui/material'; // Import Button, Grid, and Box from MUI
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Logger from '../logging/Logger';

const LOG = new Logger();

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
        console.log(JSON.parse(userData));
      } catch (error) { 
        LOG.error(`Error parsing user data in Profile Page`, error);
      }
    }
  }, []);

  // Function to handle going back
  const handleGoBack = () => {
    navigate('/home'); // Navigate to the Home Page
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
