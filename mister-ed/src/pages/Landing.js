import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginTop: '40px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Welcome to Mister ED</h1>
      <Link to="/login" style={{ textDecoration: 'none', width: '100%' }}>
        <Button 
          variant="contained" 
          color="error" 
          fullWidth
        >
          Go to Login
        </Button>
      </Link>
      <Link to="/create-account" style={{ textDecoration: 'none', width: '100%' }}>
        <Button 
          variant="contained" 
          color="error" 
          fullWidth
        >
          Create Account
        </Button>
      </Link>
    </div>
  );
}

export default Landing;

