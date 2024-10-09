import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div>
      <h1>Welcome to Mister ED</h1>
      <Link to="/login" style={{ textDecoration: 'none' }}>
        <Button 
          variant="contained" 
          color="error" 
          style={{ marginTop: '20px' }}
        >
          Go to Login
        </Button>
      </Link>
    </div>
  );
}

export default Landing;