import React from 'react';
import { Button, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Triage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '50px' }}>
      <h1>Triage</h1>

      {/* Grid of buttons */}
      <Grid container spacing={2} justifyContent="center" style={{ maxWidth: '600px' }}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="error"
            fullWidth
            style={{ padding: '20px' }}
            onClick={() => navigate('/home')}
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
            onClick={() => navigate('/request-triage')}
          >
			Request Triage
          </Button>
        </Grid>
      </Grid>

    </div>
  );
}

export default Triage;
