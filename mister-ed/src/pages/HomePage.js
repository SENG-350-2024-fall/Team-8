import React from 'react';
import { Button, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
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
            onClick={() => alert('Profile Clicked')}
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
            onClick={() => alert('Support Clicked')}
          >
            Support
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

export default HomePage;

