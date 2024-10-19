import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { SAMPLE_PATIENTS } from './sampledb';  // Import your sample data

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleSubmit = (e) => {
    e.preventDefault();

    // Find a matching user in the SAMPLE_PATIENTS data
    const foundUser = SAMPLE_PATIENTS.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      console.log('Login successful:', foundUser);
      setError('');
      navigate('/home'); // Redirect to landing page upon successful login
    } else {
      setError('Invalid email or password. Please try again.');
    }
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
        {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Show error message if any */}
        <Button 
          type="submit" 
          variant="contained" 
          color="error" 
          style={{ marginTop: '20px', width: '100%' }}
        >
          Submit
        </Button>
      </form>
      <Link to="/landing" style={{ textDecoration: 'none', width: '100%', display: 'block' }}>
        <Button 
          variant="contained" 
          color="error" 
          style={{ marginTop: '20px', width: '400px' }}  // Matching width for Back to Landing button
        >
          Back to Landing
        </Button>
      </Link>
    </div>
  );
}

export default Login;
