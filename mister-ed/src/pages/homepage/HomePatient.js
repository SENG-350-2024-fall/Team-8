import React, { useEffect, useState } from 'react';
import { Button, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DatabaseClient from '../../clients/DatabaseClient';

function HomePatient() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    // Retrieve the current user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    if (user) {
        const response = await DatabaseClient.toggleAvailability(user.id, false); // Set unavailable when logged out
        console.log('Availability update response:', response);
    }
    localStorage.removeItem('user'); // Clear the user from localStorage
    navigate('/login');
};

return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '50px' }}>
      <h1>Home</h1>

      {/* Grid of buttons */}
      <Grid container spacing={2} justifyContent="center" style={{ maxWidth: '600px' }}>
        <Grid item xs={6}>
          <Button 
            variant="contained" 
            color="error" 
            fullWidth 
            style={{ padding: '20px' }} 
            onClick={() =>  navigate('/profile')}
          >
            Profile
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button 
            variant="contained" 
            color="error" 
            fullWidth 
            style={{ padding: '20px' }} 
            onClick={() => alert('Notifications Clicked')}
          >
            Notifications
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button 
            variant="contained" 
            color="error" 
            fullWidth 
            style={{ padding: '20px' }} 
            onClick={() => navigate('/triage')}
          >
            Triage
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button 
            variant="contained" 
            color="error" 
            fullWidth 
            style={{ padding: '20px' }} 
            onClick={() => navigate('/support')} //Navigate to the Support Page
          >
            Support
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button 
            variant="contained" 
            color="error" 
            fullWidth 
            style={{ padding: '20px' }} 
            onClick={() => navigate('/appointment')} //Navigate to the Support Admin Page
          >
            Appointments
          </Button>
        </Grid>
      </Grid>

      {/* Logout Button */}
      <Box mt={4}>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleLogout} 
          style={{ padding: '10px 40px' }}
        >
          Logout
        </Button>
      </Box>
    </div>
  );
}

export default HomePatient;


