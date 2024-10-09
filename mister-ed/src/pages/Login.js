import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="error" 
          style={{ marginTop: '20px', width: '100%' }}
        >
          Submit
        </Button>
      </form>
      <Link to="/landing" style={{ textDecoration: 'none', display: 'block', marginTop: '20px' }}>
        <Button 
          variant="contained" 
          color="error"
        >
          Back to Landing
        </Button>
      </Link>
    </div>
  );
}

export default Login;